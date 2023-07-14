import React, { useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import CurrentUserContext from './Context'

export default function useEthers(name:string | null | undefined) {
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (name && window.ethereum !== null) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        provider.getResolver(name).then(r => {
          console.log('***getResolver', r)
          r?.getAddress().then(a => {
            console.log('***a', a)
            currentUser?.setAddress(a)
          })
        })
      }    
  }, [name]);
}