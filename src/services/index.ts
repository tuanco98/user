import {
    CONFIRMATION_BLOCK_NUMBER,
    START_BLOCK_BOX,
    START_BLOCK_BOX_2,
    START_BLOCK_COPYRIGHT_RENT,
    START_BLOCK_MARKET,
    START_BLOCK_PARAART,
    START_BLOCK_PARAGON,
    START_BLOCK_PARAGON_FACTORY,
    START_BLOCK_RUNE_PACKAGE,
    STEP_BLOCK_BOX,
    STEP_BLOCK_BOX_2,
    STEP_BLOCK_COPYRIGHT_RENT,
    STEP_BLOCK_MARKET,
    STEP_BLOCK_PARAART,
    STEP_BLOCK_PARAGON,
    STEP_BLOCK_PARAGON_FACTORY,
    STEP_BLOCK_RUNE_PACKAGE,
} from "../config"
import { CurrentBlockType } from "../models/CurrentBlock"
import { cron_handler } from "./cron"
import { getBoxEvents } from "./eventcontracts/boxes"
import { getBox2Events } from "./eventcontracts/boxes_2"
import { ConsumeSmartContract } from "./eventcontracts/consumeSmartContract"
import { getCopyrightRentEvents } from "./eventcontracts/copyright_rents"
import { getMarketplaceEvents } from "./eventcontracts/markets"
import { getParaArtEvents } from "./eventcontracts/paraarts"
import { getParagonEvents } from "./eventcontracts/paragons"
import { getParagonFactoryEvents } from "./eventcontracts/paragon_factorys"
import { getRunePackEvents } from "./eventcontracts/runepacks"

export let confirmation_blockNumber = CONFIRMATION_BLOCK_NUMBER

export const services = async () => {
    try {
        await cron_handler()
        const {
            consumeContractBox,
            consumeContractBox2,
            consumeCopyRight,
            consumeMarketPlace,
            consumeParaArt,
            consumeParaGonFactory,
            consumeParaGon,
            consumeRunePackage,
        } = initConsume()
        
        consumeContractBox.startConsume()
        consumeContractBox2.startConsume()
        consumeCopyRight.startConsume()
        consumeMarketPlace.startConsume()
        consumeParaArt.startConsume()
        consumeParaGonFactory.startConsume()
        consumeParaGon.startConsume()
        consumeRunePackage.startConsume()
    } catch (e) {
        throw e
    }
}
const initConsume = () => {
    const consumeContractBox = new ConsumeSmartContract({
        handle_func: getBoxEvents,
        type_current_block: CurrentBlockType.current_block_box,
        start_block: START_BLOCK_BOX,
        step_block: STEP_BLOCK_BOX,
    })
    const consumeContractBox2 = new ConsumeSmartContract({
        handle_func: getBox2Events,
        type_current_block: CurrentBlockType.current_block_box2,
        start_block: START_BLOCK_BOX_2,
        step_block: STEP_BLOCK_BOX_2,
    })
    const consumeCopyRight = new ConsumeSmartContract({
        handle_func: getCopyrightRentEvents,
        type_current_block: CurrentBlockType.current_block_copyright,
        start_block: START_BLOCK_COPYRIGHT_RENT,
        step_block: STEP_BLOCK_COPYRIGHT_RENT,
    })
    const consumeMarketPlace = new ConsumeSmartContract({
        handle_func: getMarketplaceEvents,
        type_current_block: CurrentBlockType.current_block_market,
        start_block: START_BLOCK_MARKET,
        step_block: STEP_BLOCK_MARKET,
    })
    const consumeParaArt = new ConsumeSmartContract({
        handle_func: getParaArtEvents,
        type_current_block: CurrentBlockType.current_block_para_art,
        start_block: START_BLOCK_PARAART,
        step_block: STEP_BLOCK_PARAART,
    })
    const consumeParaGonFactory = new ConsumeSmartContract({
        handle_func: getParagonFactoryEvents,
        type_current_block: CurrentBlockType.current_block_paragon_factory,
        start_block: START_BLOCK_PARAGON_FACTORY,
        step_block: STEP_BLOCK_PARAGON_FACTORY,
    })
    const consumeParaGon = new ConsumeSmartContract({
        handle_func: getParagonEvents,
        type_current_block: CurrentBlockType.current_block_paragon,
        start_block: START_BLOCK_PARAGON,
        step_block: STEP_BLOCK_PARAGON,
    })
    const consumeRunePackage = new ConsumeSmartContract({
        handle_func: getRunePackEvents,
        type_current_block: CurrentBlockType.current_block_rune_pack,
        start_block: START_BLOCK_RUNE_PACKAGE,
        step_block: STEP_BLOCK_RUNE_PACKAGE,
    })
    return {
        consumeContractBox,
        consumeContractBox2,
        consumeCopyRight,
        consumeMarketPlace,
        consumeParaArt,
        consumeParaGonFactory,
        consumeParaGon,
        consumeRunePackage,
    }
}
