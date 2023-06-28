import { AbiItem } from "web3-utils"
export const ParagonFactory_ABI: AbiItem[] = [
    {
        inputs: [
            { internalType: "address", name: "_paragon", type: "address" },
            { internalType: "address", name: "_art", type: "address" },
            { internalType: "address", name: "_proxy", type: "address" },
            { internalType: "address", name: "_fee1", type: "address" },
            { internalType: "address", name: "_fee2", type: "address" },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: false, internalType: "bytes32", name: "originalArt", type: "bytes32" },
            { indexed: false, internalType: "bytes32", name: "rawHashed", type: "bytes32" },
            { indexed: false, internalType: "bytes32", name: "runesList", type: "bytes32" },
            { indexed: false, internalType: "address", name: "owner", type: "address" },
            { indexed: false, internalType: "uint256", name: "tokenId", type: "uint256" },
            { indexed: false, internalType: "address", name: "fee1", type: "address" },
            { indexed: false, internalType: "address", name: "fee2", type: "address" },
            { indexed: false, internalType: "uint256", name: "amount1", type: "uint256" },
            { indexed: false, internalType: "uint256", name: "amount2", type: "uint256" },
        ],
        name: "CraftParagon",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: false, internalType: "address", name: "currency", type: "address" },
            { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
            { indexed: false, internalType: "bool", name: "enable", type: "bool" },
        ],
        name: "FeeChange",
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
        inputs: [
            { indexed: false, internalType: "uint256", name: "tokenId", type: "uint256" },
            { indexed: false, internalType: "uint256[16]", name: "burnRunes", type: "uint256[16]" },
            { indexed: false, internalType: "uint256[16]", name: "burnExternal", type: "uint256[16]" },
        ],
        name: "UncraftParagon",
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
        name: "PAUSER_ROLE",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "amount1",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "amount2",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "art",
        outputs: [{ internalType: "contract IParaArt", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "bytes32", name: "data", type: "bytes32" }],
        name: "bytes32ToAmount16",
        outputs: [{ internalType: "uint256[16]", name: "amount", type: "uint256[16]" }],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "_newProxy", type: "address" }],
        name: "changeProxy",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "bytes32", name: "originalArt", type: "bytes32" },
            { internalType: "bytes32", name: "rawHashed", type: "bytes32" },
            { internalType: "bytes32", name: "runesList", type: "bytes32" },
        ],
        name: "createParagon",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "uint256", name: "_min", type: "uint256" },
            { internalType: "uint256", name: "_max", type: "uint256" },
        ],
        name: "editParagon",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256[16]", name: "newPower", type: "uint256[16]" }],
        name: "editRunePower",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "_fee1", type: "address" },
            { internalType: "address", name: "_fee2", type: "address" },
            { internalType: "uint256", name: "_amount1", type: "uint256" },
            { internalType: "uint256", name: "_amount2", type: "uint256" },
        ],
        name: "editSupportedFee",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "percent", type: "uint256" }],
        name: "editUncraftBurnPercent",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "fee1",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "fee2",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
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
        name: "maxParagon",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "minParagon",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "paragon",
        outputs: [{ internalType: "contract IParagon", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "paused",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "proxy",
        outputs: [{ internalType: "contract IProxy", name: "", type: "address" }],
        stateMutability: "view",
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
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "runePower",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
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
    {
        inputs: [
            { internalType: "uint256", name: "tokenId", type: "uint256" },
            { internalType: "uint256[16]", name: "burnRunes", type: "uint256[16]" },
            { internalType: "uint256[16]", name: "burnExternal", type: "uint256[16]" },
        ],
        name: "uncraft",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "uncraftBurnPercent",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
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