import axios from "axios"
import { verify } from "crypto"
import { AUTH_SERVER_URL, HTTP_REQUEST_TIME_OUT, SERVER_KEY } from "../config"
import { web3 } from "../web3"
import { ErrMsg, ERROR_MESSAGE } from "./error_handler"
import { GRAPHQL_QUERY } from "./queryString"

export const verify_auth_or_server_key = async (params: {address?: string, ctx?: any, server_key?: string}) => {
    try {
        let { address, ctx, server_key} = params
        address = address?.trim()
        server_key = server_key?.trim()
        const authorization = ctx?.req?.headers?.authorization
        if (authorization && address) {
            const verify = await verifyAuth(address, authorization)
            if (!verify) throw ErrMsg(ERROR_MESSAGE.VERIFY_SIGNATURE_FAIL)
        } else if (server_key) {
            if (server_key !== SERVER_KEY) throw ErrMsg(ERROR_MESSAGE.PERMISSION_MISSING)
            if (address) {
                const isAddress = web3.utils.checkAddressChecksum(address)
                if (!isAddress) throw ErrMsg(ERROR_MESSAGE.INVALID_ADDRESS)
            }
        } else {
            throw ErrMsg(ERROR_MESSAGE.PERMISSION_MISSING)
        }
    } catch (e) {
        throw e
    }
}
const verifyAuth = async (address: string, token: string) => {
    try {
        const { data: { data: { auth_verify_token } } } = await axios.post(
            AUTH_SERVER_URL,
            {
                query: GRAPHQL_QUERY.AUTH_VERIFY_TOKEN,
                variables: {
                    address,
                },
            },
            {
                headers: { Authorization: token },
                timeout: HTTP_REQUEST_TIME_OUT 
            }
        )
        if (auth_verify_token?.resultCode === "AUTH:000") return true
        return false
    } catch (e) {
        return false
    }
}
