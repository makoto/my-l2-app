export const abi = [
    {
      "inputs": [
        {
          "internalType": "contract ENSRegistry",
          "name": "_ensRegistry",
          "type": "address"
        },
        {
          "internalType": "contract INameWrapper",
          "name": "_nameWrapper",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "string[]",
          "name": "urls",
          "type": "string[]"
        },
        {
          "internalType": "bytes",
          "name": "callData",
          "type": "bytes"
        },
        {
          "internalType": "bytes4",
          "name": "callbackFunction",
          "type": "bytes4"
        },
        {
          "internalType": "bytes",
          "name": "extraData",
          "type": "bytes"
        }
      ],
      "name": "OffchainLookup",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "UnknownVerfier",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "node",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "verifierAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string[]",
          "name": "gatewayUrls",
          "type": "string[]"
        }
      ],
      "name": "VerifierAdded",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "ccipVerifier",
      "outputs": [
        {
          "internalType": "contract ICcipResponseVerifier",
          "name": "verifierAddress",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "ensRegistry",
      "outputs": [
        {
          "internalType": "contract ENSRegistry",
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
          "internalType": "bytes",
          "name": "name",
          "type": "bytes"
        }
      ],
      "name": "getVerifierOfDomain",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string[]",
              "name": "gatewayUrls",
              "type": "string[]"
            },
            {
              "internalType": "contract ICcipResponseVerifier",
              "name": "verifierAddress",
              "type": "address"
            }
          ],
          "internalType": "struct CcipResolver.CcipVerifier",
          "name": "",
          "type": "tuple"
        },
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes",
          "name": "name",
          "type": "bytes"
        }
      ],
      "name": "metadata",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        },
        {
          "internalType": "bytes",
          "name": "",
          "type": "bytes"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "nameWrapper",
      "outputs": [
        {
          "internalType": "contract INameWrapper",
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
          "internalType": "bytes",
          "name": "name",
          "type": "bytes"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "resolve",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "",
          "type": "bytes"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes",
          "name": "response",
          "type": "bytes"
        },
        {
          "internalType": "bytes",
          "name": "extraData",
          "type": "bytes"
        }
      ],
      "name": "resolveWithProof",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "",
          "type": "bytes"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "node",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "verifierAddress",
          "type": "address"
        },
        {
          "internalType": "string[]",
          "name": "urls",
          "type": "string[]"
        }
      ],
      "name": "setVerifierForDomain",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceID",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    }
]