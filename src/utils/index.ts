import BN from "bn.js"
import fs from "fs"
import { Bid } from "../models/Bid"
import { NftType } from "../models/Common"
import { Lease } from "../models/Lease"
import { Order } from "../models/Order"
import { ParaArt } from "../models/ParaArt"
import { Paragon } from "../models/Paragon"
import { Rent } from "../models/Rent"
import { web3 } from "../web3"

export const asyncTimeOut = async (mili_second: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({})
        }, mili_second)
    })
}

export const mili_timestamp = (seconds: string | number) => {
    if (seconds.toString().length >= 13) return Number(seconds)
    return Number(seconds) * 1000
}

export const is_latest_greater_three_block = (block_check: number, latest_block: number): boolean => {
    return latest_block - block_check >= 3
}
export const runeIdMustValid = (runeId: number) => {
    return runeId >= 0 && runeId < 11
}

export const isNullOrEmptyString = (value: string) => {
    return value === null || value === undefined
}

export const convertOptionFusion = (option: string[]): boolean => {
    return option.length === 0 ? false : true
}

export const isBalanceGreaterThanLimit = (balance: string): boolean => {
    const limit = `${1e16}`
    return new BN(balance).gt(new BN(limit))
}

export const convertRuneListByte32 = (packData: string) => {
    const runeAmount: number[] = []
    let totalRune = 0

    for (let i = 2; i < packData.length; i += 4) {
        let amount = parseInt(packData.substr(i, 4), 16)
        runeAmount.push(amount)
        totalRune += amount
    }

    return { runeAmount, totalRune }
}
export const getTimestampFromBlock = async (blockNumber: number) => {
    const timestamp = (await web3.eth.getBlock(blockNumber)).timestamp
    return mili_timestamp(timestamp)
}
export const sumBigNumber = (arr_number: string[]) => {
    const result = arr_number.reduce((total, value) => {
        const _total = new BN(total)
        return _total.add(new BN(value)).toString()
    }, "0")
    return result
}

export const convertDecimaltoStringMyOrder = (array: Order[]) => {
    const result = array.map((el: Order) => {
        return {
            ...el,
            initPrice: el.initPrice.toString(),
            spotPrice: el.spotPrice.toString(),
            lastPrice: el.lastPrice.toString(),
            fee: el.fee?.toString(),
        }
    })
    return result
}
export const convertPriceDecimaltoString = (array: Rent[] | Bid[]) => {
    const result = array.map((el: Rent | Bid) => {
        return { ...el, price: el.price.toString() }
    })
    return result
}
export const convertAmountDecimaltoString = (array: Paragon[]) => {
    const result = array.map((el: Paragon) => {
        return {
            ...el,
            amount1: el.amount1.toString(),
            amount2: el.amount2.toString(),
        }
    })
    return result
}
export const convertDecimaltoStringParaArts = (paraart: ParaArt[]) => {
    const result = paraart.map((el: ParaArt) => {
        return {
            ...el,
            rawData: {
                ...el.rawData,
                rentInfo: { ...el.rawData?.rentInfo, price: el.rawData?.rentInfo?.price.toString() },
            },
        }
    })
    return result
}
export const convertDecimaltoStringLease = (leases: Lease[]) => {
    const result = leases.map((el: Lease) => {
        return {
            ...el,
            price: el.price.toString(),
        }
    })
    return result
}
export const convertDecimaltoStringParaArt = (paraart: ParaArt, rents: any) => {
    return {
        ...paraart,
        rawData: {
            ...paraart.rawData,
            rentInfo: { ...paraart.rawData?.rentInfo, price: paraart.rawData?.rentInfo?.price.toString() },
            recentRented: rents,
        },
    }
}

export const writeFile = async (path: string, value: string) => {
    if (!path) throw new Error("path missing !!!")
    const writeStream = fs.createWriteStream(path)
    writeStream.write(value)
}

const RUNE_POWER = [1, 15, 50, 180, 630, 2200, 7800, 28220, 105800, 259200, 665000, 2200000, 0, 0, 0, 0]
export function CalculatePower(runesList: number[]): number {
    const power = runesList.reduce((power, rune, index) => {
        return power + rune * RUNE_POWER[index]
    }, 0)
    return power
}
export const usernameRegex = /^[a-zA-Z0-9]{5,15}$/