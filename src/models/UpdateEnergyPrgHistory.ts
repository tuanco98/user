import { IndexDescription } from "mongodb";

export interface UpdateEnergyParagonHistory {
    request_id: string,
    value: number,
    timestamp: number
    power?: number
    energyUpdateBefore?: number,
    energyUpdateAfter?: number,
    is_example?: boolean
    paragon_id?: string,
    update_at: number,
    reason: string
}
export const UpdateEnergyParagonHistoryIndexes: IndexDescription[] = [
    { key: { request_id: 1 }, unique: true, background: true },
    { key: { paragon_id: 1 }, background: true },
    { key: { update_at: 1 }, background: true },
    { key: { reason: 1 }, background: true },
]