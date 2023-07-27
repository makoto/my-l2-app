import React, { useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import CurrentUserContext from './Context'
import { getNetwork } from '@wagmi/core'
export default function useEthers(name:string | null | undefined) {
  const currentUser = useContext(CurrentUserContext);
  const { chain, chains } = getNetwork()
  console.log('***useEthers1', chain?.id)
  useEffect(() => {
    if (name && window.ethereum !== null && chain?.id === 5) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        provider.getResolver(name).then(r => {
          console.log('***useEthers2', r)
          r?.getAddress().then(a => {
            console.log('***useEthers3', a)
            currentUser?.setAddress(a)
          }).catch(e => {
            console.log('***useEthers4', e)
          })
        })
      }    
  }, [name]);
}