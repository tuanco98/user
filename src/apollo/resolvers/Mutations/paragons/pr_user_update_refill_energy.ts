import { ClientSession } from "mongodb"
import { SERVER_KEY } from "../../../../config"
import { Accounts, mongo, Paragons, UpdateEnergyPRGLog } from "../../../../mongodb"
import { ErrorCode, ERROR_CODE, ERROR_MESSAGE } from "../../../../utils/error_handler"

interface ParamType {
    address: string
    server_key: string
    value: number
    request_id: string
    paragon_id: string
    quantity_per_turn: number
    reason: string
    is_example: boolean
}

const updateEnergyParagon = async (
    params: {
        paragon_id: string
        value: number
        quantity_per_turn: number
        request_id: string
        reason: string
        owner: string
    },
    session: ClientSession
) => {
    try {
        const { paragon_id, value, quantity_per_turn, request_id, reason, owner } = params
        if (!paragon_id) {
            await session.abortTransaction()
            return {
                errorMessage: ERROR_MESSAGE.MISSING_PARAM,
                errorCode: ErrorCode(ERROR_CODE.MISSING_PARAM),
            }
        }
        const paragon = await Paragons.findOne({ owner, tokenId: paragon_id }, { session })
        if (!paragon) {
            await session.abortTransaction()
            return {
                errorMessage: ERROR_MESSAGE.PARAGON_NOT_EXISTS,
                errorCode: ErrorCode(ERROR_CODE.PARAGON_NOT_EXISTS),
            }
        }
        const total_energy = Math.abs(value) * quantity_per_turn
        const current_energy = Math.min(paragon.lastUpdateEnergy + total_energy, paragon.power)
        const update_data = await Paragons.findOneAndUpdate(
            { owner, tokenId: paragon_id },
            {
                $set: {
                    lastUpdateEnergy: current_energy,
                    lastUpdateEnergyDate: new Date().getTime(),
                },
            },
            { session, returnDocument: "after" }
        )
        if (!update_data?.value) {
            await session.abortTransaction()
            return {
                errorMessage: ERROR_MESSAGE.PARAGON_NOT_EXISTS,
                errorCode: ErrorCode(ERROR_CODE.PARAGON_NOT_EXISTS),
            }
        }
        const timestamp = new Date().getTime()
        const log_update_energy = {
            request_id,
            value: total_energy,
            power: paragon.power,
            paragon_id,
            timestamp,
            update_at: timestamp,
            energyUpdateBefore: paragon.lastUpdateEnergy,
            energyUpdateAfter: update_data.value.lastUpdateEnergy,
            reason: reason || "REFILL_ENERGY",
        }
        await UpdateEnergyPRGLog.insertOne(log_update_energy, { session })
        return {
            errorMessage: ERROR_MESSAGE.SUCCESS,
            errorCode: ErrorCode(ERROR_CODE.SUCCESS),
            data: log_update_energy,
        }
    } catch (e) {
        throw e
    }
}
export const pr_user_update_refill_energy = async (root: any, args: any) => {
    const session = mongo.startSession()
    try {
        const { address, server_key, value, request_id, quantity_per_turn = 200, paragon_id, reason, is_example } = args as ParamType
        if (!server_key || !address || !value) {
            return {
                errorMessage: ERROR_MESSAGE.MISSING_PARAM,
                errorCode: ErrorCode(ERROR_CODE.MISSING_PARAM),
            }
        }
        if (server_key.trim() !== SERVER_KEY.trim()) {
            return {
                errorMessage: ERROR_MESSAGE.PERMISSION_MISSING,
                errorCode: ErrorCode(ERROR_CODE.PERMISSION_MISSING),
            }
        }
        let result: any
        await session.withTransaction(async () => {
            const account = await Accounts.findOne({ address }, { session })
            if (value > 0) {
                const timestamp = new Date().getTime()
                if (!account) {
                    await Accounts.insertOne(
                        {
                            address,
                            refill_energy: value,
                            createdAt: timestamp,
                            last_updated: timestamp,
                            is_skip_username: false,
                        },
                        { session }
                    )
                }
            } else {
                if (!quantity_per_turn || !request_id) {
                    result = {
                        errorMessage: ERROR_MESSAGE.MISSING_PARAM,
                        errorCode: ErrorCode(ERROR_CODE.MISSING_PARAM),
                    }
                    return
                }
                const is_request_id_exist = await UpdateEnergyPRGLog.findOne({ request_id }, { session })
                if (is_request_id_exist) {
                    result = {
                        errorMessage: ERROR_MESSAGE.REQUEST_ID_EXISTS,
                        errorCode: ErrorCode(ERROR_CODE.REQUEST_ID_EXISTS),
                        data: is_request_id_exist,
                    }
                    return
                }
                const value_update = await Accounts.findOneAndUpdate({ address }, { $inc: { refill_energy: value } }, { session, returnDocument: "after" })
                if (!value_update || (value_update.value && value_update.value?.refill_energy < 0)) {
                    result = {
                        errorMessage: ERROR_MESSAGE.REFILL_ENERGY_NOT_ENOUGH,
                        errorCode: ErrorCode(ERROR_CODE.REFILL_ENERGY_NOT_ENOUGH),
                    }
                    await session.abortTransaction()
                    return
                }
                if (!is_example) {
                    result = await updateEnergyParagon({ paragon_id, value, quantity_per_turn, request_id, reason, owner: address }, session)
                    return
                }
                const total_energy = Math.abs(value) * quantity_per_turn
                const log_update_energy = {
                    request_id,
                    value: total_energy,
                    is_example,
                    timestamp: +new Date(),
                    update_at: +new Date(),
                    reason: reason || "REFILL_ENERGY",
                }
                await UpdateEnergyPRGLog.insertOne(log_update_energy, { session })
                result = {
                    errorMessage: ERROR_MESSAGE.SUCCESS,
                    errorCode: ErrorCode(ERROR_CODE.SUCCESS),
                    data: log_update_energy,
                }
            }
        })
        return result
    } catch (e: any) {
        if (session.inTransaction()) await session.abortTransaction()
        if (e.name === "MongoError" || e.code === 112) {
            if (session.inTransaction()) await session.endSession()
            return pr_user_update_refill_energy(root, args)
        }
        throw e
    } finally {
        if (session.inTransaction()) await session.endSession()
    }
}
