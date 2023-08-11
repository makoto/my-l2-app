import React, { useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import CurrentUserContext from './Context'
import { getNetwork } from '@wagmi/core'
// Cannot use wagmi while  l2 gateway is hosted locally 
// Because wagmi uses UniversalResolver that tries to hit gateway from CloudFlare and CF cannot reach localhost

interface StateProperties {
  key: string;
  val: string;
}

export default function useEthersText(name:string | null | undefined, keys:string[]) {
  const { chain, chains } = getNetwork()
  const [data, setData] = useState<StateProperties[]>([]);
  
  useEffect(() => {
    if (name && keys.length > 0 && window.ethereum !== null && chain?.id === 5) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      provider.getResolver(name).then(r => {
        const promises = keys.map(key => {
          return new Promise(resolve => {
            r?.getText(key).then(a => {
              resolve(a)
            }).catch(e => {console.log('*** useEthersText error', e)})
          })
        })
        Promise.all(promises)
        .then(d => {
          const r = []
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            const val:any = d[i]
            r.push({
              key,
              val
            })
          }
          setData(r)
          return d
        })
        
      })
    } 
  }, [name, keys]);
  return data;
}
