import { AbiItem } from "web3-utils"
export const MarketPlace_ABI: AbiItem[] = [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
        anonymous: false,
        inputs: [
            { indexed: false, internalType: "address", name: "bidder", type: "address" },
            { indexed: false, internalType: "uint256", name: "timestamp", type: "uint256" },
            { indexed: false, internalType: "uint256", name: "orderId", type: "uint256" },
            { indexed: false, internalType: "uint256", name: "price", type: "uint256" },
        ],
        name: "Bid",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: false, internalType: "address", name: "token", type: "address" },
            { indexed: false, internalType: "uint256", name: "fee", type: "uint256" },
            { indexed: false, internalType: "bool", name: "status", type: "bool" },
        ],
        name: "EditCurrency",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [{ indexed: false, internalType: "uint256", name: "newFee", type: "uint256" }],
        name: "FeeChange",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: false, internalType: "uint256", name: "orderId", type: "uint256" },
            { indexed: false, internalType: "uint256", name: "timestamp", type: "uint256" },
        ],
        name: "OrderCancel",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: false, internalType: "uint256", name: "orderId", type: "uint256" },
            { indexed: false, internalType: "address", name: "buyer", type: "address" },
            { indexed: false, internalType: "uint256", name: "price", type: "uint256" },
            { indexed: false, internalType: "uint256", name: "fee", type: "uint256" },
            { indexed: false, internalType: "uint256", name: "timestamp", type: "uint256" },
        ],
        name: "OrderConfirmed",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: false, internalType: "uint256", name: "orderId", type: "uint256" },
            { indexed: false, internalType: "address", name: "contractNft", type: "address" },
            { indexed: false, internalType: "address", name: "currency", type: "address" },
            { indexed: false, internalType: "address", name: "creator", type: "address" },
            { indexed: false, internalType: "uint256", name: "timestamp", type: "uint256" },
            { indexed: false, internalType: "uint256", name: "nftId", type: "uint256" },
            { indexed: false, internalType: "uint256", name: "timeEnd", type: "uint256" },
            { indexed: false, internalType: "uint256", name: "currentPrice", type: "uint256" },
            { indexed: false, internalType: "uint256", name: "spotPrice", type: "uint256" },
        ],
        name: "OrderCreate",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [{ indexed: false, internalType: "address", name: "account", type: "address" }],
        name: "Paused",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
            { indexed: true, internalType: "bytes32", name: "previousAdminRole", type: "bytes32" },
            { indexed: true, internalType: "bytes32", name: "newAdminRole", type: "bytes32" },
        ],
        name: "RoleAdminChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
            { indexed: true, internalType: "address", name: "account", type: "address" },
            { indexed: true, internalType: "address", name: "sender", type: "address" },
        ],
        name: "RoleGranted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
            { indexed: true, internalType: "address", name: "account", type: "address" },
            { indexed: true, internalType: "address", name: "sender", type: "address" },
        ],
        name: "RoleRevoked",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [{ indexed: false, internalType: "address", name: "account", type: "address" }],
        name: "Unpaused",
        type: "event",
    },
    {
        inputs: [],
        name: "DEFAULT_ADMIN_ROLE",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "MARKET_CONFIG",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "PAUSER_ROLE",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "_nftAddress", type: "address" }],
        name: "addSupportedNFT",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "orderId", type: "uint256" }],
        name: "adminCancelOrder",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "orderId", type: "uint256" }],
        name: "approveSold",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "uint256", name: "orderId", type: "uint256" },
            { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "bid",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "orderId", type: "uint256" }],
        name: "cancelOrder",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "orderId", type: "uint256" }],
        name: "claim",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "contractNft", type: "address" },
            { internalType: "address", name: "currency", type: "address" },
            { internalType: "uint256", name: "nftId", type: "uint256" },
            { internalType: "uint256", name: "timeEnd", type: "uint256" },
            { internalType: "uint256", name: "initPrice", type: "uint256" },
            { internalType: "uint256", name: "spotPrice", type: "uint256" },
        ],
        name: "createOrder",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "token", type: "address" },
            { internalType: "uint256", name: "fee", type: "uint256" },
            { internalType: "uint256", name: "minNextBid", type: "uint256" },
            { internalType: "bool", name: "status", type: "bool" },
        ],
        name: "editSupportedCurrency",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }],
        name: "getRoleAdmin",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "bytes32", name: "role", type: "bytes32" },
            { internalType: "address", name: "account", type: "address" },
        ],
        name: "grantRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "bytes32", name: "role", type: "bytes32" },
            { internalType: "address", name: "account", type: "address" },
        ],
        name: "hasRole",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "minTime",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "orders",
        outputs: [
            { internalType: "uint256", name: "nftId", type: "uint256" },
            { internalType: "uint256", name: "timeEnd", type: "uint256" },
            { internalType: "uint256", name: "currentPrice", type: "uint256" },
            { internalType: "uint256", name: "spotPrice", type: "uint256" },
            { internalType: "address", name: "nftContract", type: "address" },
            { internalType: "address", name: "currency", type: "address" },
            { internalType: "address", name: "lastBid", type: "address" },
            { internalType: "address", name: "saler", type: "address" },
            { internalType: "bool", name: "isEnd", type: "bool" },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [{ internalType: "address payable", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    { inputs: [], name: "pause", outputs: [], stateMutability: "nonpayable", type: "function" },
    {
        inputs: [],
        name: "paused",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "_nftAddress", type: "address" }],
        name: "removeSupportedNFT",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "bytes32", name: "role", type: "bytes32" },
            { internalType: "address", name: "account", type: "address" },
        ],
        name: "renounceRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "bytes32", name: "role", type: "bytes32" },
            { internalType: "address", name: "account", type: "address" },
        ],
        name: "revokeRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "_time", type: "uint256" }],
        name: "setMinTime",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "supportedCurrency",
        outputs: [
            { internalType: "uint256", name: "fee", type: "uint256" },
            { internalType: "uint256", name: "minNextBid", type: "uint256" },
            { internalType: "bool", name: "status", type: "bool" },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "supportedNFT",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
        name: "supportsInterface",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    { inputs: [], name: "unpause", outputs: [], stateMutability: "nonpayable", type: "function" },
    {
        inputs: [
            { internalType: "address", name: "token", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
]