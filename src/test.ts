import { connectWeb3, web3 } from "./web3"

const getChainId = () => {
    return web3.eth.getChainId()
}
;(async () => {
    try {
        await connectWeb3()
        const address = '0x648C4273C681Ba2E668F29Ac00124005b10D09CD'
        console.log(await web3.eth.getBlockNumber())
    } catch (e) {
        throw e
    }
})()
