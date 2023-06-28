export enum RunePack {
    Soil,
    Stone,
    Wood,
    Rubber, 
    Plastic, 
    Crystal,
    Metal,
    Gem,
    Onixius, 
    Crypton,
    Pythium,
    Paranium,
}
export enum SubTopic {
    NOTIFY_MARKET = `NOTIFY_MARKET`
}
export enum NftType {
    RUNE_PACK = `rune_pack`,
    PARAART = `paraart`,
    PARAGON = `paragon`,
    BOX = `box`,
}
export enum StatusMyList {
    BID = `bid`,
    BIDDING = `bidding`,
    SUCCESS = `success`,
    REFUND = `refund`,
    CANCELED = `canceled`,
}
export enum MyBidRentStatus {
    RENTED = `rented`,
    UNRENTED = `unrented`
}
export enum SortDateType {
    NEWEST = `newest`,
    OLDEST = `oldest`,
}
export enum SortPriceType {
    LOWEST = `lowest`,
    HIGHEST = `highest`,
}
export enum FilterBoxType {
    GOLD = `gold`,
    PLATINUM = `platinum`,
    DIAMOND = `diamond`,
}
export enum EventName {
    ALL_EVENTS = `allEvents`,

    // order
    ORDER_CREATE = `OrderCreate`,
    ORDER_CANCEL = `OrderCancel`,
    ORDER_CONFIRMED = `OrderConfirmed`,

    // bid
    BID = `Bid`,

    // rune pack
    PACK = `Pack`,
    UNPACK = `UnPack`,

    // paraart
    COPYRIGHT_RESERVED = `CopyrightReserved`,
    COPYRIGHT_RENTAL = `CopyrightRental`,

    // copyright rent
    SET_ROYALTY_FEE = `SetRoyaltyFee`,
    RENT = `Rent`,
    
    // box
    UNBOX = `Unbox`,
    BUY_BOX = `BuyBox`,
    REWARD = `Reward`,

    // paragon
    CRAFT_PARAGON = `CraftParagon`,
    UNCRAFT_PARAGON = `UncraftParagon`,
    ACTIVE_PARAGON = `ActiveParagon`,

    TRANSFER = `Transfer`,
}
export enum LogBoxStatus {
    OPENED = `opened`,
    BUY = `buy`,
}
export enum StatusRentPRA {
    RENTED = `rented`,
    NO_RENTED = `no_rented`,
}
export enum FusionStatus {
    SUCCESS = `success`,
    PROCESSING = `processing`,
    FAILED = `failed`,
    PAYING = `paying`,
    PAID = `paid`,
}
export enum LeaseStatus {
    RENTING = `renting`,
    CANCELED = `canceled`,
} 
export interface TransactionError {
    txid: string
    blockNumber: number
    timestamp: number
    status: boolean
    message?: string
}
export const null_address = '0x0000000000000000000000000000000000000000'