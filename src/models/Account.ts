import { IndexDescription, ObjectId } from "mongodb"

export interface Account {
    _id?: ObjectId
    address: string
    refill_energy: number
    createdAt: number
    is_skip_username: boolean
    username?: string
    last_updated: number
}
export const AccountIndexes: IndexDescription[] = [
    { key: { address: 1 }, unique: true, background: true },
    { key: { username: 1 }, partialFilterExpression: { username: { $exists: true } }, unique: true,background: true},
]
