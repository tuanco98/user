import { IndexDescription } from "mongodb"

export enum SystemLogType {
    MIGRATE = `MIGRATE`,
    CAMPAIGN = `CAMPAIGN`,
    ADMIN = `ADMIN`,
}
export interface SystemLog {
    key: string
    type: SystemLogType
    created_at: number
    description: string
    collection?: string
    reason?: string
    total_document?: number
}
export const SystemLogIndexes: IndexDescription[] = [
    { key: { key: 1 }, unique: true, background: true },
    { key: { key: 1, type: 1 }, background: true },
]
