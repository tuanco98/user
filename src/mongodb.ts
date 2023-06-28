import { MongoClient, Collection } from 'mongodb'
import { Account, AccountIndexes } from './models/Account'
import { Bid, BidIndexes } from './models/Bid'
import { Box, BoxIndexes } from './models/Box'
import { CurrentBlock, CurrentBlockIndexes } from './models/CurrentBlock'
import { Lease, LeaseIndexes } from './models/Lease'
import { LogBoxDetail, LogBoxDetailIndexes } from './models/LogBoxDetail'
import { Notify, NotifyIndexes } from './models/Notify'
import { Order, OrderIndexes } from './models/Order'
import { ParaArt, ParaartIndexes } from './models/ParaArt'
import { Paragon, ParagonIndexes } from './models/Paragon'
import { Rent, RentIndexes } from './models/Rent'
import { Campaign, CampaignIndexes } from './models/Campaign'
import { RunePack, RunePackIndexes } from './models/RunePack'
import { UncraftParagonHistory, UncraftPRGIndexes } from './models/UncraftParagonHistory'
import { UpdateEnergyParagonHistory, UpdateEnergyParagonHistoryIndexes } from './models/UpdateEnergyPrgHistory'
import { successConsoleLog } from './utils/color-log'
import { SystemLog, SystemLogIndexes } from './models/SystemLog'

let mongo: MongoClient

export let RunePacks: Collection<RunePack>
export let Paragons: Collection<Paragon>
export let ParaArts: Collection<ParaArt>
export let Boxes: Collection<Box>
export let LogBoxDetails: Collection<LogBoxDetail>
export let Orders: Collection<Order>
export let UncraftHistories: Collection<UncraftParagonHistory>
export let UpdateEnergyPRGLog: Collection<UpdateEnergyParagonHistory>
export let Bids: Collection<Bid>
export let Notifys: Collection<Notify>
export let Rents: Collection<Rent>
export let Leases: Collection<Lease>
export let Current_Block: Collection<CurrentBlock>
export let Accounts: Collection<Account>
export let Campaigns: Collection<Campaign>
export let SystemLogs: Collection<SystemLog>

const collections = {
    rune_packs: 'rune_packs',
    paragons: 'paragons',
    paraarts: 'paraarts',
    boxes: 'boxes',
    fusions: 'fusions',
    campaigns: 'campaigns',
    orders: 'orders',
    bids: 'bids',
    notifys: 'notifys',
    rents: 'rents',
    leases: 'leases',
    log_box_details: 'log_box_details',
    uncraft_histories: 'uncraft_histories',
    update_energy_prg_logs: 'update_energy_prg_logs',
    current_block: 'current_block',
    accounts: 'accounts',
    system_logs: 'system_logs',
}

const connectMongo = async (MONGO_URI: string) => {
    try {
        console.log('MONGO_URI', MONGO_URI)
        
        mongo = new MongoClient(MONGO_URI)

        await mongo.connect()

        mongo.on('error', async (e) => {
            try {
                await mongo.close()
                await connectMongo(MONGO_URI)
            } catch (e) {
                setTimeout(connectMongo, 1000)
                throw e
            }
        })

        mongo.on('timeout', async () => {
            try {
                await mongo.close()
                await connectMongo(MONGO_URI)
            } catch (e) {
                setTimeout(connectMongo, 1000)
                throw e
            }
        })

        mongo.on('close', async () => {
            try {
                await connectMongo(MONGO_URI)
            } catch (e) {
                throw e
            }
        })
        const db = mongo.db()

        RunePacks = db.collection(collections.rune_packs)
        Paragons = db.collection(collections.paragons)
        ParaArts = db.collection(collections.paraarts)
        Boxes = db.collection(collections.boxes)
        LogBoxDetails = db.collection(collections.log_box_details)
        Orders = db.collection(collections.orders)
        Bids = db.collection(collections.bids)
        Notifys = db.collection(collections.notifys)
        Rents = db.collection(collections.rents)
        Leases = db.collection(collections.leases)
        UncraftHistories = db.collection(collections.uncraft_histories)
        UpdateEnergyPRGLog = db.collection(collections.update_energy_prg_logs)
        Current_Block = db.collection(collections.current_block)
        Accounts = db.collection(collections.accounts)
        Campaigns = db.collection(collections.campaigns)
        SystemLogs = db.collection(collections.system_logs)

        await Promise.all([
            RunePacks.createIndexes(RunePackIndexes),
            Paragons.createIndexes(ParagonIndexes),
            ParaArts.createIndexes(ParaartIndexes),
            LogBoxDetails.createIndexes(LogBoxDetailIndexes),
            Boxes.createIndexes(BoxIndexes),
            Notifys.createIndexes(NotifyIndexes),
            Orders.createIndexes(OrderIndexes),
            Bids.createIndexes(BidIndexes),
            Rents.createIndexes(RentIndexes),
            Leases.createIndexes(LeaseIndexes),
            UncraftHistories.createIndexes(UncraftPRGIndexes),
            UpdateEnergyPRGLog.createIndexes(UpdateEnergyParagonHistoryIndexes),
            Current_Block.createIndexes(CurrentBlockIndexes),
            Accounts.createIndexes(AccountIndexes),
            Campaigns.createIndexes(CampaignIndexes),
            SystemLogs.createIndexes(SystemLogIndexes),
        ])
        
        successConsoleLog(`🚀 mongodb: connected`)
    } catch (e) {
        console.error(`mongodb: disconnected`)
        await mongo?.close(true)
        setTimeout(connectMongo, 1000)
        throw e
    }
}

export { mongo, connectMongo, collections }


