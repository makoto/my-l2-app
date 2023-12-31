export const abi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "context",
        "type": "bytes"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "name",
        "type": "bytes"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "node",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "contentType",
        "type": "uint256"
      }
    ],
    "name": "ABIChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "context",
        "type": "bytes"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "name",
        "type": "bytes"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "node",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "a",
        "type": "address"
      }
    ],
    "name": "AddrChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "context",
        "type": "bytes"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "name",
        "type": "bytes"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "node",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "coinType",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "newAddress",
        "type": "bytes"
      }
    ],
    "name": "AddressChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "context",
        "type": "bytes"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "name",
        "type": "bytes"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "delegate",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "Approved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "context",
        "type": "bytes"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "name",
        "type": "bytes"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "node",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "hash",
        "type": "bytes"
      }
    ],
    "name": "ContenthashChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "context",
        "type": "bytes"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "node",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "name",
        "type": "bytes"
      },
      {
        "indexed": false,
        "internalType": "uint16",
        "name": "resource",
        "type": "uint16"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "record",
        "type": "bytes"
      }
    ],
    "name": "DNSRecordChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "context",
        "type": "bytes"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "node",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "name",
        "type": "bytes"
      },
      {
        "indexed": false,
        "internalType": "uint16",
        "name": "resource",
        "type": "uint16"
      }
    ],
    "name": "DNSRecordDeleted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "context",
        "type": "bytes"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "node",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "lastzonehash",
        "type": "bytes"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "zonehash",
        "type": "bytes"
      }
    ],
    "name": "DNSZonehashChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "context",
        "type": "bytes"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "name",
        "type": "bytes"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "node",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "string",
        "name": "indexedKey",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "key",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "value",
        "type": "string"
      }
    ],
    "name": "TextChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "context",
        "type": "bytes"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "name",
        "type": "bytes"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "node",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint64",
        "name": "newVersion",
        "type": "uint64"
      }
    ],
    "name": "VersionChanged",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "context",
        "type": "bytes"
      },
      {
        "internalType": "bytes32",
        "name": "node",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "contentTypes",
        "type": "uint256"
      }
    ],
    "name": "ABI",
    "outputs": [
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
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "context",
        "type": "bytes"
      },
      {
        "internalType": "bytes32",
        "name": "node",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "coinType",
        "type": "uint256"
      }
    ],
    "name": "addr",
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
        "name": "context",
        "type": "bytes"
      },
      {
        "internalType": "bytes32",
        "name": "node",
        "type": "bytes32"
      }
    ],
    "name": "addr",
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
        "internalType": "uint64",
        "name": "",
        "type": "uint64"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      },
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "addresses_with_context",
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
        "name": "name",
        "type": "bytes"
      },
      {
        "internalType": "address",
        "name": "delegate",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
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
    "name": "clearRecords",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "context",
        "type": "bytes"
      },
      {
        "internalType": "bytes32",
        "name": "node",
        "type": "bytes32"
      }
    ],
    "name": "contenthash",
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
        "name": "context",
        "type": "bytes"
      },
      {
        "internalType": "bytes32",
        "name": "node",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "name",
        "type": "bytes32"
      },
      {
        "internalType": "uint16",
        "name": "resource",
        "type": "uint16"
      }
    ],
    "name": "dnsRecord",
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
        "name": "context",
        "type": "bytes"
      },
      {
        "internalType": "bytes32",
        "name": "node",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "name",
        "type": "bytes32"
      }
    ],
    "name": "hasDNSRecords",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "context",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "name",
        "type": "bytes"
      },
      {
        "internalType": "address",
        "name": "delegate",
        "type": "address"
      }
    ],
    "name": "isApprovedFor",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes[]",
        "name": "data",
        "type": "bytes[]"
      }
    ],
    "name": "multicall",
    "outputs": [
      {
        "internalType": "bytes[]",
        "name": "results",
        "type": "bytes[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "nodehash",
        "type": "bytes32"
      },
      {
        "internalType": "bytes[]",
        "name": "data",
        "type": "bytes[]"
      }
    ],
    "name": "multicallWithNodeCheck",
    "outputs": [
      {
        "internalType": "bytes[]",
        "name": "results",
        "type": "bytes[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      },
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "recordVersions",
    "outputs": [
      {
        "internalType": "uint64",
        "name": "",
        "type": "uint64"
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
        "internalType": "uint256",
        "name": "contentType",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "setABI",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "context",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "name",
        "type": "bytes"
      },
      {
        "internalType": "uint256",
        "name": "contentType",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "setABIFor",
    "outputs": [],
    "stateMutability": "nonpayable",
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
        "internalType": "uint256",
        "name": "coinType",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "a",
        "type": "bytes"
      }
    ],
    "name": "setAddr",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "context",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "name",
        "type": "bytes"
      },
      {
        "internalType": "uint256",
        "name": "coinType",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "a",
        "type": "bytes"
      }
    ],
    "name": "setAddrFor",
    "outputs": [],
    "stateMutability": "nonpayable",
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
        "name": "hash",
        "type": "bytes"
      }
    ],
    "name": "setContenthash",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "context",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "name",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "hash",
        "type": "bytes"
      }
    ],
    "name": "setContenthashFor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "ensName",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "setDNSRecords",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "context",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "ensName",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "setDNSRecordsFor",
    "outputs": [],
    "stateMutability": "nonpayable",
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
        "internalType": "string",
        "name": "key",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "value",
        "type": "string"
      }
    ],
    "name": "setText",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "context",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "name",
        "type": "bytes"
      },
      {
        "internalType": "string",
        "name": "key",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "value",
        "type": "string"
      }
    ],
    "name": "setTextFor",
    "outputs": [],
    "stateMutability": "nonpayable",
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
        "name": "hash",
        "type": "bytes"
      }
    ],
    "name": "setZonehash",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "context",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "name",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "hash",
        "type": "bytes"
      }
    ],
    "name": "setZonehashFor",
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
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "context",
        "type": "bytes"
      },
      {
        "internalType": "bytes32",
        "name": "node",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "key",
        "type": "string"
      }
    ],
    "name": "text",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint64",
        "name": "",
        "type": "uint64"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      },
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "texts_with_context",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "context",
        "type": "bytes"
      },
      {
        "internalType": "bytes32",
        "name": "node",
        "type": "bytes32"
      }
    ],
    "name": "zonehash",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]