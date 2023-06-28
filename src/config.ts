import { config } from "dotenv"

config()

const getEnvString = (key: string) => {
    if (!process.env[key]) throw new Error(`${key} must be provided`)
    return process.env[key]?.trim() as string
}

const getBooleanFromEnv = (key: string) => {
    const envString = getEnvString(key)
    if (!["true", "false"].includes(envString.toLowerCase())) throw new Error(`${key} must be true|false|TRUE|FALSE`)
    return JSON.parse(process.env[key] as string) as boolean
}

const getArrStringFromEnv = (key: string, split_char: string) => {
    const envString = getEnvString(key)
    return envString.split(split_char)
}

const getIntFromEnv = (key: string, options?: { greater_than?: number, less_than?: number }) => {
    const envString = getEnvString(key)
    const envNumber = parseInt(envString)
    if (options) {
        if (options.greater_than) {
            if (envNumber <= options.greater_than) throw new Error(`${key} must be int number and greater than ${options.greater_than}`)
        }
        if (options.less_than) {
            if (envNumber >= options.less_than) throw new Error(`${key} must be int number and less than ${options.greater_than}`)
        }
    }
    return parseInt(envString)
}

// SERVER CONFIG
export const PORT = getEnvString("PORT")
export const SERVER_CODE = getEnvString("SERVER_CODE")
export const ADMIN_KEY = getEnvString("ADMIN_KEY")
export const SERVER_CODE_REDIS = getEnvString("SERVER_CODE_REDIS")
export const VISABLE_PLAYGROUND = getBooleanFromEnv("VISABLE_PLAYGROUND")

// MONGO CONFIG
export const MONGO_URI = getEnvString("MONGO_URI")

// CONSUME EVENT CONFIG
export const START_BLOCK_BOX = getIntFromEnv("START_BLOCK_BOX")
export const STEP_BLOCK_BOX = getIntFromEnv("STEP_BLOCK_BOX")
export const START_BLOCK_BOX_2 = getIntFromEnv("START_BLOCK_BOX_2")
export const STEP_BLOCK_BOX_2 = getIntFromEnv("STEP_BLOCK_BOX_2")
export const START_BLOCK_MARKET = getIntFromEnv("START_BLOCK_MARKET")
export const STEP_BLOCK_MARKET = getIntFromEnv("STEP_BLOCK_MARKET")
export const START_BLOCK_RUNE_PACKAGE = getIntFromEnv("START_BLOCK_RUNE_PACKAGE")
export const STEP_BLOCK_RUNE_PACKAGE = getIntFromEnv("STEP_BLOCK_RUNE_PACKAGE")
export const START_BLOCK_PARAART = getIntFromEnv("START_BLOCK_PARAART")
export const STEP_BLOCK_PARAART = getIntFromEnv("STEP_BLOCK_PARAART")
export const START_BLOCK_PARAGON = getIntFromEnv("START_BLOCK_PARAGON")
export const STEP_BLOCK_PARAGON = getIntFromEnv("STEP_BLOCK_PARAGON")
export const START_BLOCK_PARAGON_FACTORY = getIntFromEnv("START_BLOCK_PARAGON_FACTORY")
export const STEP_BLOCK_PARAGON_FACTORY = getIntFromEnv("STEP_BLOCK_PARAGON_FACTORY")
export const START_BLOCK_COPYRIGHT_RENT = getIntFromEnv("START_BLOCK_COPYRIGHT_RENT")
export const STEP_BLOCK_COPYRIGHT_RENT = getIntFromEnv("STEP_BLOCK_COPYRIGHT_RENT")

// SENTRY CONFIG
export const SENTRY_DNS = getEnvString("SENTRY_DNS")
export const SENTRY_SERVER_NAME = getEnvString("SENTRY_SERVER_NAME")

export const PARAGON_REGENERATION_CYCLE = getIntFromEnv("PARAGON_REGENERATION_CYCLE")
export const SERVER_KEY = getEnvString("SERVER_KEY")

// REDIS CONFIG
export const REDIS_URI = getEnvString("REDIS_URI")
export const NODE_ENV = getEnvString("NODE_ENV")

// SMART CONTRACT CONFIG
export const CONTRACT_BOX_ADDRESS = getEnvString("CONTRACT_BOX_ADDRESS")
export const CONTRACT_BOX_2_ADDRESS = getEnvString("CONTRACT_BOX_2_ADDRESS")
export const CONTRACT_MARKETPLACE_ADDRESS = getEnvString("CONTRACT_MARKETPLACE_ADDRESS")
export const CONTRACT_RUNE_PACKAGE_ADDRESS = getEnvString("CONTRACT_RUNE_PACKAGE_ADDRESS")
export const CONTRACT_PARAART_ADDRESS = getEnvString("CONTRACT_PARAART_ADDRESS")
export const CONTRACT_PARAGON_FACTORY_ADDRESS = getEnvString("CONTRACT_PARAGON_FACTORY_ADDRESS")
export const CONTRACT_PARAGON_ADDRESS = getEnvString("CONTRACT_PARAGON_ADDRESS")
export const CONTRACT_COPYRIGHT_RENT_ADDRESS = getEnvString("CONTRACT_COPYRIGHT_RENT_ADDRESS")

// HTTP REQUEST CONFIG
export const PRL_BUILD_URL = getEnvString("PRL_BUILD_URL")
export const AUTH_SERVER_URL = getEnvString("AUTH_SERVER_URL")
export const HTTP_REQUEST_TIME_OUT = getIntFromEnv("HTTP_REQUEST_TIME_OUT")

// WEB3 CONFIG
export const WEB3_PROVIDER = getEnvString("WEB3_PROVIDER")
export const CONFIRMATION_BLOCK_NUMBER = getIntFromEnv("CONFIRMATION_BLOCK_NUMBER")

// CAMPAIGN CONFIG
export const RETROACTIVE_START_CLAIM = getIntFromEnv("RETROACTIVE_START_CLAIM")
export const RETROACTIVE_DEADLINE_CLAIM = getIntFromEnv("RETROACTIVE_DEADLINE_CLAIM")

