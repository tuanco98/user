import { IndexDescription, ObjectId } from "mongodb";

export enum App {
    MARKET = "market",
    FUSION = "fusion",
    OFFCHAIN = "offchain",
}
export enum TypeNotify {
    // market
    ORDER_ENDED ='order_ended',
    ORDER_CONFIRMED = 'order_confirmed', 
    RENTED = 'rented',

    // fusion
    RECEIPT = 'receipt',

    //offchain
    DEPOSIT = 'deposit', 
    WITHDRAW = 'withdraw', 
    SWAP = 'swap'
}
export interface NotifyFusion {
    runeId: number;
    key: string
    amount: number;
}
export interface OffchainNotify {
    token: string
    amount: string
    toAmount?: string
}
export interface Notify {
    _id: ObjectId
    app: App
    type: TypeNotify
    id_msg: string
    isRead: boolean
    address: string
    hashed?: string
    orderId?: string
    fusion?: NotifyFusion
    offchain?: OffchainNotify
    timestamp: number
    triggerAt: number
}
export const NotifyIndexes: IndexDescription[] = [
    { key: { id_msg: 1 }, unique: true, background: true },
    { key: { app: 1 }, background: true },
    { key: { type: 1 }, background: true },
    { key: { address: 1, isRead: 1 }, background: true },
    { key: { address: 1 }, background: true },
    { key: { isRead: 1, timestamp: 1}, background: true },
    { key: { timestamp: 1 }, background: true },
]