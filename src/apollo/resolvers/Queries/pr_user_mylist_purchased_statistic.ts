import { Bid } from "../../../models/Bid"
import { NftType, StatusMyList } from "../../../models/Common"
import { Order } from "../../../models/Order"
import { Bids, Orders } from "../../../mongodb"
import { sumBigNumber } from "../../../utils"
import { validateMissing } from "../../../utils/error_handler"
import {  verify_auth_or_server_key } from "../../../utils/verify_auth"

enum MyListType {
    mybid = `mybid`,
    myorder = `myorder`,
}
export const pr_user_mylist_purchased_statistic = async (root: any, args: any, ctx: any) => {
    try {
        const { owner, type } = args as { owner: string; type: MyListType }

        validateMissing({ owner, type })
        
        await verify_auth_or_server_key({
            address: owner,
            ctx,
        })

        let arr_rune_pack: any[] = []
        let arr_paraart: any[] = []
        let arr_paragon: any[] = []
        let arr_box: any[] = []

        if (type === MyListType.mybid) {
            const getData = await Bids.find({ bidder: owner, status: StatusMyList.SUCCESS }).toArray()

            arr_rune_pack = getArrayBidPrice(getData, NftType.RUNE_PACK)

            arr_paraart = getArrayBidPrice(getData, NftType.PARAART)

            arr_paragon = getArrayBidPrice(getData, NftType.PARAGON)

            arr_box = getArrayBidPrice(getData, NftType.BOX)
        } else if (type === MyListType.myorder) {
            const getData = await Orders.find({ owner, status: StatusMyList.SUCCESS }).toArray()

            arr_rune_pack = getArrayOrderPrice(getData, NftType.RUNE_PACK)

            arr_paraart = getArrayOrderPrice(getData, NftType.PARAART)

            arr_paragon = getArrayOrderPrice(getData, NftType.PARAGON)

            arr_box = getArrayOrderPrice(getData, NftType.BOX)
        }

        const [totalRunePackAmount, totalBoxAmount, totalParagonAmount, totalParaartAmount] = [
            arr_rune_pack.length,
            arr_box.length,
            arr_paragon.length,
            arr_paraart.length,
        ]

        let [totalParaartPrice, totalParagonPrice, totalRunePackPrice, totalBoxPrice] = [
            sumBigNumber(arr_paraart),
            sumBigNumber(arr_paragon),
            sumBigNumber(arr_rune_pack),
            sumBigNumber(arr_box),
        ]

        const totalPurchasedAmount = totalParaartAmount + totalParagonAmount + totalRunePackAmount + totalBoxAmount
        const totalPurchasedPrice = sumBigNumber([totalParaartPrice, totalParagonPrice, totalRunePackPrice, totalBoxPrice])

        const result = {
            totalPurchased: {
                totalAmount: totalPurchasedAmount,
                totalPrice: totalPurchasedPrice,
            },
            paraartPurchased: {
                totalAmount: totalParaartAmount,
                totalPrice: totalParaartPrice,
            },
            paragonPurchased: {
                totalAmount: totalParagonAmount,
                totalPrice: totalParagonPrice,
            },
            runepackPurchased: {
                totalAmount: totalRunePackAmount,
                totalPrice: totalRunePackPrice,
            },
            boxPurchased: {
                totalAmount: totalBoxAmount,
                totalPrice: totalBoxPrice,
            },
        }
        return result
    } catch (e) {
        throw e
    }
}
const getArrayBidPrice = (getData: Bid[], nft_type: NftType) => {
    return getData.filter((el: Bid) => el.nftType === nft_type).map((el: Bid) => el.price.toString())
}
const getArrayOrderPrice = (getData: Order[], nft_type: NftType) => {
    return getData.filter((el: Order) => el.nftType === nft_type).map((el: Order) => el.lastPrice.toString())
}
