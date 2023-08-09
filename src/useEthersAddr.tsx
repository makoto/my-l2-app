import React, { useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import CurrentUserContext from './Context'
import { getNetwork } from '@wagmi/core'
// Cannot use wagmi while  l2 gateway is hosted locally 
// Because wagmi uses UniversalResolver that tries to hit gateway from CloudFlare and CF cannot reach localhost

interface StateProperties {
  coinType: number;
  val: string;
}


export default function useEthersAddr(name:string | null | undefined, coinTypes:number[]) {
  const { chain, chains } = getNetwork()
  const [data, setData] = useState<StateProperties[]>([]);
  
  useEffect(() => {
    if (name) {
      if (name && window.ethereum !== null && chain?.id === 5) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        provider.getResolver(name).then(r => {
          const promises = coinTypes.map(coinType => {
            return new Promise(resolve => {
              r?.getAddress(coinType).then(a => {
                resolve(a)
              })
            })
          })
          Promise.all(promises)
          .then(d => {
            const r = []
            for (let i = 0; i < coinTypes.length; i++) {
              const coinType = coinTypes[i]
              const val:any = d[i]
              r.push({
                coinType,
                val
              })
            }
            console.log("text23", {r})
            setData(r)
            return d
          })
        })
      } 
    }
  }, [name]);
  return data;
}

