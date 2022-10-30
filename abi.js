"use strict";

module.exports = { 
    ABI: [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "quantity",
                    "type": "uint256"
                }
            ],
            "name": "addClones",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "clonesAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "nftNumberPerClone",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "nftPrice",
                    "type": "uint256"
                }
            ],
            "name": "clonesFund",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "saleAddress",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "nftPrice",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "clonesAmount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint8",
                            "name": "txPerClone",
                            "type": "uint8"
                        },
                        {
                            "internalType": "uint8",
                            "name": "mintPerCall",
                            "type": "uint8"
                        },
                        {
                            "internalType": "bool",
                            "name": "payableMint",
                            "type": "bool"
                        },
                        {
                            "internalType": "bytes",
                            "name": "datacall",
                            "type": "bytes"
                        }
                    ],
                    "internalType": "struct MintParams",
                    "name": "_mintParam",
                    "type": "tuple"
                }
            ],
            "name": "deployedClonesMint",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address payable",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "ethBackClones",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address payable",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "ethBackMain",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "address payable",
                            "name": "cloneAddress",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "tokenIds",
                            "type": "uint256[]"
                        }
                    ],
                    "internalType": "struct WithdrawData[]",
                    "name": "withdrawData",
                    "type": "tuple[]"
                },
                {
                    "internalType": "address",
                    "name": "nftContract",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "getArrayNft",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "address payable",
                            "name": "cloneAddress",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct WithdrawData1155[]",
                    "name": "withdrawData",
                    "type": "tuple[]"
                },
                {
                    "internalType": "address",
                    "name": "nftContract",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "massWithdraw1155",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "sale",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_mintPerClone",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_nftPrice",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "datacall",
                    "type": "bytes"
                }
            ],
            "name": "mintClone",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "saleAddress",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "nftPrice",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "clonesAmount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint8",
                            "name": "txPerClone",
                            "type": "uint8"
                        },
                        {
                            "internalType": "uint8",
                            "name": "mintPerCall",
                            "type": "uint8"
                        },
                        {
                            "internalType": "bool",
                            "name": "payableMint",
                            "type": "bool"
                        },
                        {
                            "internalType": "bytes",
                            "name": "datacall",
                            "type": "bytes"
                        }
                    ],
                    "internalType": "struct MintParams",
                    "name": "_mintParam",
                    "type": "tuple"
                }
            ],
            "name": "mintWithLoop",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256[]",
                    "name": "tokenIds",
                    "type": "uint256[]"
                },
                {
                    "internalType": "address",
                    "name": "sale",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "nftWithdrawMain",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "",
                    "type": "bytes"
                }
            ],
            "name": "onERC1155Received",
            "outputs": [
                {
                    "internalType": "bytes4",
                    "name": "",
                    "type": "bytes4"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "",
                    "type": "bytes"
                }
            ],
            "name": "onERC721Received",
            "outputs": [
                {
                    "internalType": "bytes4",
                    "name": "",
                    "type": "bytes4"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "setOwner",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "sale",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "withdrawNft1155",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        },
        {
            "inputs": [],
            "name": "_owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "clones",
            "outputs": [
                {
                    "internalType": "address payable",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "clonesMinted",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
 }