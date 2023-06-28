import { gql } from "apollo-server";

export const typeDefs = gql`
    type RentInfo {
        txid: String
        price: String
        currency: String
        enable: Boolean
        setAt: Float
    }
    type RawData {
        ownerName: String
        structure: String
        image: String
        runeCount: Int
        submittedAt: Float
        rentCount: Int
        rentInfo: RentInfo
        rented: Boolean
        tokenId: String
        paid: Boolean
        template: Boolean
        recentRented: [Rent]
        rentPrice: Float
        reason: String
        name: String
        refusedAt: Float
        registeredAt: Float
    }
    type ParaArt {
        tokenId: String
        ownerAddress: String
        createdAt: Float
        blockNumber: Float
        txId: String
        hashed: String
        isBidding: Boolean
        rawData: RawData
    }
    type ParaArtPage {
        total: Int
        paraArts: [ParaArt]
    }

    type ParagonPage {
        total: Int
        paragons: [Paragon]
    }
    type Paragon {
        _id: String
        tokenId: String
        owner: String
        originalArt: String
        rawHashed: String
        runesList: [Int]
        totalRune: Float
        currency: String
        isActive: Boolean
        isBidding: Boolean
        isUncraft: Boolean
        fee1: String
        fee2: String
        amount1: String
        amount2: String
        txid: String
        createdAt: Float
        lastUpdatedAt: Float
        paraart_data: RawData
        lastUpdateEnergyDate: Float
        lastUpdateEnergy: Float
        currentEnergy: Float
        power: Float
        uncraftedAt: Float
        txid_active: String
        activedAt: Float
    }
    enum SortDate {
        newest
        oldest
    }
    enum SortPrice {
        lowest
        highest
    }
    enum StatusMylist {
        refund
        bidding
        success
        bid
        canceled
    }
    enum LogBoxStatus {
        opened
        buy
    }
    enum FilterBox {
        gold
        platinum
        diamond
    }
    enum MyBidRentStatus {
        unrented
        rented
    }
    type RunePack {
        id: String
        owner: String
        totalRune: Float
        runeAmount: [Int]
        createdAt: Float
        isBidding: Boolean
    }
    type UnboxDetail {
        runeAmount: [Float]
        totalRune: Float
    }
    type Box {
        tokenId: Int
        ownerAddress: String
        nftType: String
        typeBox: Int
        currency: String
        buyBox_txid: String
        isBidding: Boolean
        createdAt: Float
        unbox: Boolean
        unboxAt: Float
        unboxDetails: UnboxDetail
    }
    type Rent {
        renter: String
        paraArtId: String
        totalRune: Float
        image: String
        para_art_name: String
        hashed: String
        price: String
        status: String
        currency: String
        txid: String
        createdAt: Float
    }
    type BoxPage {
        total: Int
        boxes: [Box]
    }
    type LogUserBox {
        tokenId: Int
        ownerAddress: String
        nftType: String
        typeBox: Int
        status: String
        txid: String
        totalRune: Int
        runeAmount: [Int]
        createdAt: Float
        price: Float
    }
    type LogUserBoxPage {
        total: Int
        logUserBoxes: [LogUserBox]
    }
    type RunePackPage {
        total: Int
        runePacks: [RunePack]
    }
    enum NftType {
        paragon
        paraArt
        rune_pack
    }
    type RunePackBid {
        _id: String
        bidder: String
        orderId: String
        currency: String
        txid: String
        status: String
        nftData: RunePack
        price: String
        createdAt: Float
    }
    type ParaArtBid {
        _id: String
        bidder: String
        orderId: String
        currency: String
        txid: String
        status: String
        nftData: ParaArt
        price: String
        createdAt: Float
    }
    type BoxBid {
        _id: String
        bidder: String
        orderId: String
        currency: String
        txid: String
        status: String
        nftData: Box
        price: String
        createdAt: Float
    }
    type ParagonBid {
        _id: String
        bidder: String
        orderId: String
        currency: String
        txid: String
        status: String
        nftData: Paragon
        price: String
        createdAt: Float
    }
    type RunePackOrder {
        owner: String
        orderId: String
        nftType: String
        status: String
        currency: String
        nftId: String
        nftData: RunePack
        order_txid: String
        bidder: String
        last_bid_txid: String
        initPrice: String
        spotPrice: String
        canceledAt: Float
        confirmedAt: Float
        winner: String
        isExpired: Boolean
        lastPrice: String
        fee: String
        createdAt: Float
        endAt: Float
    }
    type ParaArtOrder {
        owner: String
        orderId: String
        nftType: String
        status: String
        currency: String
        nftId: String
        nftData: ParaArt
        order_txid: String
        bidder: String
        last_bid_txid: String
        initPrice: String
        spotPrice: String
        canceledAt: Float
        confirmedAt: Float
        winner: String
        isExpired: Boolean
        lastPrice: String
        fee: String
        createdAt: Float
        endAt: Float
    }
    type BoxOrder {
        owner: String
        orderId: String
        nftType: String
        status: String
        currency: String
        nftId: String
        nftData: Box
        order_txid: String
        bidder: String
        last_bid_txid: String
        initPrice: String
        spotPrice: String
        canceledAt: Float
        confirmedAt: Float
        winner: String
        isExpired: Boolean
        lastPrice: String
        fee: String
        createdAt: Float
        endAt: Float
    }
    type ParagonOrder {
        owner: String
        orderId: String
        nftType: String
        status: String
        currency: String
        nftId: String
        nftData: Paragon
        order_txid: String
        bidder: String
        last_bid_txid: String
        initPrice: String
        spotPrice: String
        canceledAt: Float
        confirmedAt: Float
        winner: String
        isExpired: Boolean
        lastPrice: String
        fee: String
        createdAt: Float
        endAt: Float
    }
    type Purchased {
        totalAmount: Float
        totalPrice: String
    }
    type PurchasedStatistic {
        totalPurchased: Purchased
        paraartPurchased: Purchased
        paragonPurchased: Purchased
        runepackPurchased: Purchased
        boxPurchased: Purchased
    }
    type MyBidRunePackPage {
        total: Int
        myBids: [RunePackBid]
    }
    type MyOrderRunePackPage {
        total: Int
        myOrders: [RunePackOrder]
    }
    type MyBidParaArtPage {
        total: Int
        myBids: [ParaArtBid]
    }
    type MyOrderParaArtPage {
        total: Int
        myOrders: [ParaArtOrder]
    }
    type MyBidBoxPage {
        total: Int
        myBids: [BoxBid]
    }
    type MyOrderBoxPage {
        total: Int
        myOrders: [BoxOrder]
    }
    type MyBidParagonPage {
        total: Int
        myBids: [ParagonBid]
    }
    type MyOrderParagonPage {
        total: Int
        myOrders: [ParagonOrder]
    }
    
    enum InputPurchasedStatistic {
        myorder
        mybid
    }
    enum StatusRentPRA {
        rented
        no_rented
    }
    type BoxHistoryStatistic {
        totalBuy: Float
        totalOpened: Float
    }
    type MyBidRents {
        total: Int
        rents: [Rent]
    }
    type Forging {
        txid: String
        timestamp: Float
    }
    type UncraftHistory {
        owner: String
        tokenId: String
        burnRunes: [Int]
        burnExternal: [Int]
        txid: String
        blockNumber: Float
        createdAt: Float
        paragonData: Paragon
    }
    type UncraftHistories {
        total: Int
        uncraftHistories: [UncraftHistory]
    }
    type Lease {
        status: String!
        owner: String!
        hashed: String!
        price: String!
        currency: String!
        txid: String!
        enable: Boolean!
        createdAt: Float!
        last_update: Float!
        paraArtId: String!
        para_art_name: String
        totalRune: Int!
        image: String
    }
    type LeasePage {
        total: Int
        leases: [Lease]
    }
    enum StatusLease {
        renting
        canceled
    }
    type UpdateEnergyData {
        request_id: String
        value: Float
        power: Float
        timestamp: Float
        paragon_id: String
        update_at: Float
        energyUpdateBefore: Float
        energyUpdateAfter: Float
        reason: String
    }
    type UpdateEnergyResponse {
        errorMessage: String
        errorCode: String
        data: UpdateEnergyData
    }
    type UpdateEnergyHistories {
        total: Int
        histories: [UpdateEnergyData]
    }
    type RefillEnergyGet {
        address: String
        refill_energy: Int
    }
    type UpdateRefillEnergy {
        address: String
        value: Int
        refillEnergyBefore: Int
        refillEnergyAfter: Int
    }
    type UpdateRefillEnergyResponse{
        errorMessage: String
        errorCode: String
        data: UpdateEnergyData
    }
    type Account {
        address: String
        refill_energy: Int
        createdAt: Float
        is_skip_username: Boolean
        username: String
        last_updated: Float
    }
    type Campaign {
        _id: String
        address: String
        campaign_name: String
        quantity_reward: Int
        reward_type: String
        start_timestamp_claim: Float
        expires_at: Float
        created_at: Float
        claim_at: Float
    }
    type CampaignPage {
        total: Int
        campaign_rewards: [Campaign]
    }
    type SystemLog {
        key: String
        type: String
        created_at: Float
        description: String
        collection: String
        total_document: Int
        reason: String
    }
    enum StatusCampaign {
        AVAILABLE
        CLAIMED
        EXPIRED
    }
    type ClaimCampaign {
        quantity_reward: Int
        reward_type: String
    }
    type Query {
        # Rune pack
        pr_user_invetory_runepacks_get(page: Int!, pageSize: Int!, owner: String, sort: SortDate): RunePackPage
        pr_user_invetory_runepack_detail_get(id: String!): RunePack
        pr_user_mybid_runepacks_get(page: Int!, pageSize: Int!, owner: String!, dateSort: SortDate, priceSort: SortPrice, status: StatusMylist): MyBidRunePackPage
        pr_user_myorder_runepacks_get(page: Int!, pageSize: Int!, owner: String!, dateSort: SortDate, priceSort: SortPrice, status: StatusMylist): MyOrderRunePackPage

        # ParaArt
        pr_user_invetory_para_arts_get(page: Int!, pageSize: Int!, owner: String!, sort: SortDate, status: StatusRentPRA): ParaArtPage
        pr_user_invetory_para_art_detail_get(tokenId: String!): ParaArt
        pr_user_mybid_para_arts_get(page: Int!, pageSize: Int!, owner: String!, dateSort: SortDate, priceSort: SortPrice, status: StatusMylist): MyBidParaArtPage
        pr_user_myorder_para_arts_get(page: Int!, pageSize: Int!, owner: String!, dateSort: SortDate, filter: StatusRentPRA priceSort: SortPrice, status: StatusMylist): MyOrderParaArtPage
        pr_user_my_bid_para_art_rents_get(page: Int!, pageSize: Int!, owner: String!, dateSort: SortDate priceSort: SortPrice): MyBidRents
        pr_user_my_order_para_art_rents_get(page: Int!, pageSize: Int!, owner: String!, dateSort: SortDate priceSort: SortPrice status: StatusLease): LeasePage

        # Box
        pr_user_my_boxes_get(page: Int!, pageSize: Int!, owner: String!, filter: FilterBox): BoxPage
        pr_user_box_histories_get(page: Int!, pageSize: Int!, owner: String!, status: LogBoxStatus, filter: FilterBox): LogUserBoxPage
        pr_user_my_order_boxes_get(page: Int!, pageSize: Int!, owner: String!, dateSort: SortDate, priceSort: SortPrice, status: StatusMylist, filter: FilterBox): MyOrderBoxPage
        pr_user_my_bid_boxes_get(page: Int!, pageSize: Int!, owner: String!, dateSort: SortDate, priceSort: SortPrice, status: StatusMylist, filter: FilterBox): MyBidBoxPage
        pr_user_box_history_statistic_get(owner: String): BoxHistoryStatistic

        # Paragon
        pr_user_invetory_paragons_get(page: Int!, pageSize: Int!, owner: String!, server_key: String sort: SortDate): ParagonPage
        pr_user_invetory_paragon_detail_get(tokenId: String!): Paragon
        pr_user_my_uncraft_paragon_detail_get(tokenId: String!): UncraftHistory
        pr_user_my_uncraft_paragon_histories_get(page: Int!, pageSize: Int!, owner: String!): UncraftHistories
        pr_user_my_bids_paragon_get(page: Int!, pageSize: Int!, owner: String!, dateSort: SortDate, priceSort: SortPrice, status: StatusMylist): MyBidParagonPage
        pr_user_my_orders_paragon_get(page: Int!, pageSize: Int!, owner: String!, dateSort: SortDate, priceSort: SortPrice, status: StatusMylist): MyOrderParagonPage
        pr_user_update_energy_histories_get(page: Int!, pageSize: Int!, paragon_id: String! dateSort: SortDate): UpdateEnergyHistories
        pr_user_refill_energy_get(address: String! server_key: String): RefillEnergyGet
        pr_user_paragons_get(page: Int!, pageSize: Int!, tokenIds: [String]! server_key: String sort: SortDate): ParagonPage

        #Account
        pr_user_account_get(address: String! server_key: String): Account
        pr_user_version_api_get: String
        
        pr_user_campaign_rewards_get(address: String page: Int!, pageSize: Int! dateSort: SortDate status: StatusCampaign): CampaignPage

        # Statistic
        pr_user_mylist_purchased_statistic(owner: String!,type: InputPurchasedStatistic!): PurchasedStatistic
    }
    type Mutation {
        # Paragon
        pr_user_update_energy_paragon(server_key: String! value: Int! paragon_id: String! timestamp: Float! request_id: String!, reason: String): UpdateEnergyResponse
        pr_user_update_refill_energy(address: String!, server_key:String!, value:Int!, request_id: String quantity_per_turn: Int, paragon_id: String reason: String is_example:Boolean): UpdateRefillEnergyResponse
        
        # Account
        pr_user_skip_submit_username(signed_message: String signature: String server_key: String address: String!): Boolean
        pr_user_submit_username(signed_message: String signature: String server_key: String address: String! username: String!): Account

        # Campaign
        pr_user_campaign_claim_reward(signed_message: String! signature: String! address: String! id: String!): ClaimCampaign

        #admin
        pr_user_admin_update_refill_energy(addresses: [String]! quantity_energy: Int!, reason: String!): SystemLog
    }
`;
