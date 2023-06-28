import { IndexDescription, ObjectId } from "mongodb"
export enum RewardType {
    REFILL_ENERGY = "REFILL_ENERGY"
}
export enum CampaignName {
    RETROACTIVE = "RETROACTIVE"
} 
export interface Campaign {
    _id?: ObjectId
    address: string
    campaign_name: string
    quantity_reward: number
    reward_type: RewardType
    start_timestamp_claim: number
    expires_at: number
    created_at: number
    claim_at?: number
}
export const CampaignIndexes: IndexDescription[] = [
    { key: { address: 1, campaign_name: 1 }, background: true },
    { key: { campaign_name: 1 }, background: true },
    { key: { expires_at: 1 }, background: true },
    { key: { claim_at: 1 }, background: true },
    { key: { address: 1, claim_at: 1, expires_at: 1 }, background: true },
    { key: { address: 1, expires_at: 1 }, background: true },
    { key: { address: 1, claim_at: 1 }, background: true },
]
