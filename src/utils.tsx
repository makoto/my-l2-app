export const L1_CHAIN_ID = 5
export const OP_CHAIN_ID = 420
export const BASE_CHAIN_ID = 84531
export const L2_CHAIN_IDS = [OP_CHAIN_ID, BASE_CHAIN_ID]
export const SLIP44_MSB = 0x80000000
/* tslint:disable:no-bitwise */
export const convertCoinTypeToEVMChainId = (coinType: number) =>{
  if( (coinType & SLIP44_MSB) === 0 ){
    throw Error(`coinType ${coinType} is not an EVM chain`)
  }
  return  ((SLIP44_MSB - 1) & coinType) >> 0
}

export const convertEVMChainIdToCoinType = (chainId: number) =>{
  if( chainId >= SLIP44_MSB ){
    throw Error(`chainId ${chainId} must be less than ${SLIP44_MSB}`)
  }
  return  (SLIP44_MSB | chainId) >>> 0
}

const CHAIN_INFO={
  'op':{
    chainId: "0x1a4",
    rpcUrls: ["https://endpoints.omniatech.io/v1/op/goerli/public"],
    chainName: "Optimism Goerli Testnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18
    },
    blockExplorerUrls: ["https://goerli-optimism.etherscan.io"]
  },
  'base':{
    chainId: "0x14a33",
    rpcUrls: ["https://goerli.base.org"],
    chainName: "Base Goerli Testnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18
    },
    blockExplorerUrls: ["https://goerli.basescan.org"]
  }  
}

export function getChainInfo(chainId:number){
  if(chainId === OP_CHAIN_ID){
    return CHAIN_INFO['op']
  }else if (chainId === BASE_CHAIN_ID){
    return CHAIN_INFO['base']
  }else{
    return null
  }
}
