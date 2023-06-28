import axios from "axios"
import { HTTP_REQUEST_TIME_OUT } from "../config"

export const httpRequest = async (http_url: string, query: string, params: any): Promise<any> => {
    try {
        return new Promise((resolve, reject) => {
            axios
                .post(http_url, { query, variables: params }, { timeout: HTTP_REQUEST_TIME_OUT })
                .then((response) => resolve(response))
                .catch(async (err) => {
                    reject(new Error(err.message))
                })
        })
    } catch (e: any) {
        throw e
    }
}
