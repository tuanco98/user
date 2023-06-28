import { NODE_ENV, SERVER_CODE } from "../config"

const ServerCode = SERVER_CODE

export const ErrMsg = (msg: string) => {
    return new Error(`PRL-USER: ${msg}`)
}
export const ErrorCode = (code: string | number) => {
    return `${ServerCode}: ${code}`
}
export const validateMissing = (object: any) => {
    let arr = Object.keys(object)
    for (let el of arr) {
        if (object[el] === null || object[el] === undefined || object[el] === "") throw ErrMsg(ERROR_MESSAGE.MISSING_PARAM)
    }
}
export const validatePageParam = (param: { page: number; pageSize: number }) => {
    const { page, pageSize } = param
    if (page < 0) throw ErrMsg(ERROR_MESSAGE.INVALID_PAGE)
    if (pageSize <= 0 || pageSize >= 1000) throw ErrMsg(ERROR_MESSAGE.INVALID_PAGESIZE)
}
export function ErrorHandler(e: any, args: any, funcName: string) {
    const { message } = e
    if (!message.startsWith(`${ServerCode}:`)) {
        console.log('\n========================================================================================\n')
        console.log('\x1b[31m%s\x1b[0m', `🔥  🔥  🔥  DANGER : UNEXPECTED ERROR HAPPENED!\n `)
        console.log('Function:', funcName)
        console.log(e)
        console.log(`Argument:`, JSON.parse(JSON.stringify(args)))
        console.log('\n========================================================================================')
    }
}
export const ERROR_MESSAGE = {
    //==========UNEXPECTED ERROR==========
    UNEXPECTED_ERROR: "UNEXPECTED_ERROR",
    //==========AUTH==============
    //==========SYSTEM==========
    MISSING_PARAM: "MISSING_PARAM",
    INVALID_PAGE: "INVALID_PAGE",
    INVALID_PAGESIZE: "INVALID_PAGESIZE",
    INVALID_NFT_TYPE: "INVALID_NFT_TYPE",
    INVALID_PACK_ID: "INVALID_PACK_ID",
    SIGNED_MESSAGE_INVALID: "SIGNED_MESSAGE_INVALID",
    VERIFY_SIGNATURE_FAIL: "VERIFY_SIGNATURE_FAIL",
    INVALID_USERNAME: "INVALID_USERNAME",
    USERNAME_IS_EXISTS: "USERNAME_IS_EXISTS",
    ONLY_BE_NAMED_ONCE: "ONLY_BE_NAMED_ONCE",
    INVALID_ADDRESS: "INVALID_ADDRESS",
    //==========ADMIN==========
    ADDRESS_OR_ADDRESSES_OTHER_NULL: 'ADDRESS_OR_ADDRESSES_OTHER_NULL',
    ADDRESS_INVALID: 'ADDRESS_INVALID',
    //===========CAMPAIGN============
    REWARD_ID_NOT_EXISTS: "REWARD_ID_NOT_EXISTS",
    REWARD_HAS_EXPIRED: "REWARD_HAS_EXPIRED",
    REWARD_HAS_CLAIMED: "REWARD_HAS_CLAIMED",
    CAN_NOT_CLAIM_YET: "CAN_NOT_CLAIM_YET",
    //============GAME SERVER============
    SUCCESS: 'SUCCESS',
    PERMISSION_MISSING: 'PERMISSION_MISSING',
    PARAGON_NOT_EXISTS: 'PARAGON_NOT_EXISTS',
    INACTIVE_PARAGON: 'INACTIVE_PARAGON',
    ENERGY_NOT_ENOUGH: 'ENERGY_NOT_ENOUGH',
    REQUEST_ID_EXISTS: 'REQUEST_ID_EXISTS',
    ENERGY_OVER_LIMIT: 'ENERGY_OVER_LIMIT',
    PARAGON_IS_SELLING: 'PARAGON_IS_SELLING',
    REFILL_ENERGY_NOT_ENOUGH: 'REFILL_ENERGY_NOT_ENOUGH',
    //==========BLOCKCHAIN==========
}
export const ERROR_CODE = {
    //============GAME SERVER============
    SUCCESS: '600',
    PERMISSION_MISSING: '601',
    PARAGON_NOT_EXISTS: '602',
    INACTIVE_PARAGON: '603',
    ENERGY_NOT_ENOUGH: '604',
    REQUEST_ID_EXISTS: '605',
    MISSING_PARAM: '606',
    ENERGY_OVER_LIMIT: '607',
    PARAGON_IS_SELLING: '608',
    REFILL_ENERGY_NOT_ENOUGH: '609',
}