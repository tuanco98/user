import Web3 from "web3"
import { Contract } from "web3-eth-contract"
import { AbiItem } from "web3-utils"

import {
    CONTRACT_BOX_2_ADDRESS,
    CONTRACT_BOX_ADDRESS,
    CONTRACT_COPYRIGHT_RENT_ADDRESS,
    CONTRACT_MARKETPLACE_ADDRESS,
    CONTRACT_PARAART_ADDRESS,
    CONTRACT_PARAGON_ADDRESS,
    CONTRACT_PARAGON_FACTORY_ADDRESS,
    CONTRACT_RUNE_PACKAGE_ADDRESS,
    WEB3_PROVIDER,
} from "./config"
import { Box_ABI } from "./abi_contracts/box"
import { successConsoleLog } from "./utils/color-log"
import { MarketPlace_ABI } from "./abi_contracts/market"
import { RunePack_ABI } from "./abi_contracts/rune_package"
import { Paraart_ABI } from "./abi_contracts/paraart"
import { ParagonFactory_ABI } from "./abi_contracts/paragon_factory"
import { CopyRightRent_ABI } from "./abi_contracts/copyright_rent"
import { Box2_ABI } from "./abi_contracts/box2"
import { Paragon_ABI } from "./abi_contracts/paragon"

export let web3: Web3
// CONTRACT
export let marketContract: Contract
export let runePackageContract: Contract
export let paraartContract: Contract
export let paragonFactoryContract: Contract
export let paragonContract: Contract
export let copyrightRentContract: Contract
export let boxContract: Contract
export let boxContract_2: Contract
export let fusionContract: Contract

export const connectWeb3 = async () => {
    try {
        web3 = new Web3(WEB3_PROVIDER)

        //init smart contract
        boxContract = initContract(Box_ABI, CONTRACT_BOX_ADDRESS)
        boxContract_2 = initContract(Box2_ABI, CONTRACT_BOX_2_ADDRESS)
        marketContract = initContract(MarketPlace_ABI, CONTRACT_MARKETPLACE_ADDRESS)
        runePackageContract = initContract(RunePack_ABI, CONTRACT_RUNE_PACKAGE_ADDRESS)
        paraartContract = initContract(Paraart_ABI, CONTRACT_PARAART_ADDRESS)
        paragonContract = initContract(Paragon_ABI, CONTRACT_PARAGON_ADDRESS)
        paragonFactoryContract = initContract(ParagonFactory_ABI, CONTRACT_PARAGON_FACTORY_ADDRESS)
        copyrightRentContract = initContract(CopyRightRent_ABI, CONTRACT_COPYRIGHT_RENT_ADDRESS)

        successConsoleLog(`🚀 Web3: connected`)
    } catch (e) {
        throw e
    }
}
const initContract = (abi: AbiItem[], address: string) => {
    try {
        return new web3.eth.Contract(abi, address)
    } catch (e) {
        throw e
    }
}