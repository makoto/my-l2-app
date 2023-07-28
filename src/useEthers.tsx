import React, { useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import CurrentUserContext from './Context'
import { getNetwork } from '@wagmi/core'
// Cannot use wagmi while  l2 gateway is hosted locally 
// Because wagmi uses UniversalResolver that tries to hit gateway from CloudFlare and CF cannot reach localhost
export default function useEthers(name:string | null | undefined) {
  const currentUser = useContext(CurrentUserContext);
  const { chain, chains } = getNetwork()
  useEffect(() => {
    if (name && window.ethereum !== null && chain?.id === 5) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        provider.getResolver(name).then(r => {
          r?.getAddress().then(a => {
            currentUser?.setAddress(a)
          }).catch(e => {
            console.log('***useEthers error', e)
          })
        })
      }    
  }, [name]);
}