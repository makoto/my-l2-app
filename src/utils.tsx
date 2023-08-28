export const SLIP44_MSB = 0x80000000
/* tslint:disable:no-bitwise */
export const convertCoinTypeToEVMChainId = (coinType: number) =>{
  if( (coinType & SLIP44_MSB) === 0 ){
    throw Error(`coinType ${coinType} is not an EVM chain`)
  }
  return  ((SLIP44_MSB - 1) & coinType) >> 0
}
