import { CONTRACT_MARKETPLACE_ADDRESS, PARAGON_REGENERATION_CYCLE, SERVER_KEY } from "../../../../config"
import { UpdateEnergyParagonHistory } from "../../../../models/UpdateEnergyPrgHistory"
import { mongo, Paragons, UpdateEnergyPRGLog } from "../../../../mongodb"
import { CalculatePower } from "../../../../utils"
import { ErrorCode, ERROR_CODE, ERROR_MESSAGE } from "../../../../utils/error_handler"

interface InputParam {
    server_key: string
    value: number
    paragon_id: string
    timestamp: number
    request_id: string
    reason?: string
}
export const getCurrentEnergy = (params: {
    power: number
    lastUpdateEnergyDate: number
    lastUpdateEnergy: number
    timestamp: number
}) => {
    const { power, lastUpdateEnergyDate, lastUpdateEnergy, timestamp } = params
    const delta_timestamp = Math.max(timestamp - lastUpdateEnergyDate, 0)
    const current_energy = lastUpdateEnergy + (delta_timestamp * power) / PARAGON_REGENERATION_CYCLE
    return Math.min(power, current_energy)
}
export const pr_user_update_energy_paragon = async (root: any, args: any) => {
    const session = mongo.startSession()
    try {
        const { server_key, value, paragon_id, timestamp, request_id, reason } = args as InputParam

        if (!server_key || !value || !paragon_id || !timestamp || !request_id) {
            return {
                errorMessage: ERROR_MESSAGE.MISSING_PARAM,
                errorCode: ErrorCode(ERROR_CODE.MISSING_PARAM),
            }
        }
        if (server_key !== SERVER_KEY) {
            return {
                errorMessage: ERROR_MESSAGE.PERMISSION_MISSING,
                errorCode: ErrorCode(ERROR_CODE.PERMISSION_MISSING),
            }
        }
        let result: any
        await session.withTransaction(async () => {
            const paragon = await Paragons.findOne({ tokenId: paragon_id }, { session })
            const is_request_id_exist = await UpdateEnergyPRGLog.findOne({ request_id }, { session })
            if (is_request_id_exist) {
                result = {
                    errorMessage: ERROR_MESSAGE.REQUEST_ID_EXISTS,
                    errorCode: ErrorCode(ERROR_CODE.REQUEST_ID_EXISTS),
                    data: is_request_id_exist,
                }
                return
            }
            if (!paragon) {
                result = {
                    errorMessage: ERROR_MESSAGE.PARAGON_NOT_EXISTS,
                    errorCode: ErrorCode(ERROR_CODE.PARAGON_NOT_EXISTS),
                }
                return
            }
            if (paragon.owner === CONTRACT_MARKETPLACE_ADDRESS) {
                result = {
                    errorMessage: ERROR_MESSAGE.PARAGON_IS_SELLING,
                    errorCode: ErrorCode(ERROR_CODE.PARAGON_IS_SELLING),
                }
                return
            }
            if (paragon.isUncraft) {
                result = {
                    errorMessage: ERROR_MESSAGE.PARAGON_NOT_EXISTS,
                    errorCode: ErrorCode(ERROR_CODE.PARAGON_NOT_EXISTS),
                }
                return
            }
            if (value > paragon.power) {
                result = {
                    errorMessage: ERROR_MESSAGE.ENERGY_OVER_LIMIT,
                    errorCode: ErrorCode(ERROR_CODE.ENERGY_OVER_LIMIT),
                }
                return
            }
            if (!paragon.isActive) {
                result = {
                    errorMessage: ERROR_MESSAGE.INACTIVE_PARAGON,
                    errorCode: ErrorCode(ERROR_CODE.INACTIVE_PARAGON),
                }
                return
            }
            const power = CalculatePower(paragon.runesList)
            let lastUpdateEnergy = paragon.lastUpdateEnergy != null ? paragon.lastUpdateEnergy : power
            const lastUpdateEnergyDate = paragon.lastUpdateEnergyDate != null ? paragon.lastUpdateEnergyDate : new Date().getTime()
            const get_current_energy = getCurrentEnergy({
                power,
                lastUpdateEnergy,
                lastUpdateEnergyDate,
                timestamp,
            }) 
            const current_energy = Math.min(
                get_current_energy + value,
                power
            )
            if (current_energy < 0) {
                result = {
                    errorMessage: ERROR_MESSAGE.ENERGY_NOT_ENOUGH,
                    errorCode: ErrorCode(ERROR_CODE.ENERGY_NOT_ENOUGH),
                }
                return
            }
            const update_data = await Paragons.findOneAndUpdate(
                { tokenId: paragon_id },
                {
                    $set: {
                        lastUpdateEnergy: current_energy,
                        lastUpdateEnergyDate: timestamp,
                    },
                },
                { session, returnDocument: "after" }
            )
            const _value = update_data.value
            if (!_value) {
                result = {
                    errorMessage: ERROR_MESSAGE.PARAGON_NOT_EXISTS,
                    errorCode: ErrorCode(ERROR_CODE.PARAGON_NOT_EXISTS),
                }
                return
            }
            const update_energy_history: UpdateEnergyParagonHistory = {
                request_id,
                value,
                power: paragon.power,
                paragon_id,
                timestamp,
                update_at: new Date().getTime(),
                energyUpdateBefore: paragon.lastUpdateEnergy,
                energyUpdateAfter: _value.lastUpdateEnergy,
                reason: reason || "update",
            }
            await UpdateEnergyPRGLog.insertOne(update_energy_history, { session })
            result = {
                errorMessage: ERROR_MESSAGE.SUCCESS,
                errorCode: ErrorCode(ERROR_CODE.SUCCESS),
                data: update_energy_history,
            }
        })
        return result
    } catch (e: any) {
        if (session.inTransaction()) await session.abortTransaction()
        if (e.name === "MongoError" || e.code === 112) {
            if (session.inTransaction()) await session.endSession()
            return pr_user_update_energy_paragon(root, args)
        }
        throw e
    } finally {
        if (session.inTransaction()) await session.endSession()
    }
}