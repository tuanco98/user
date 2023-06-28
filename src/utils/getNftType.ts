import { CONTRACT_BOX_2_ADDRESS, CONTRACT_BOX_ADDRESS, CONTRACT_PARAART_ADDRESS, CONTRACT_PARAGON_ADDRESS, CONTRACT_RUNE_PACKAGE_ADDRESS } from "../config";
import { NftType } from "../models/Common";

export function getNftType(address: string) {
    try {
        switch (address) {
            case CONTRACT_BOX_ADDRESS: 
                return NftType.BOX
            case CONTRACT_BOX_2_ADDRESS:
                return NftType.BOX
            case CONTRACT_RUNE_PACKAGE_ADDRESS:
                return NftType.RUNE_PACK
            case CONTRACT_PARAART_ADDRESS:
                return NftType.PARAART
            case CONTRACT_PARAGON_ADDRESS:
                return NftType.PARAGON
            default:
                break;
        }
    } catch (e) {
        throw e
    }
}