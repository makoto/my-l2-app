import React, { useState, useContext } from 'react'
import CurrentUserContext from './Context'
import { Input,  Button, Field, Dropdown } from '@ensdomains/thorin'
import Record from './Record'
import { useAccount, useContractWrite, useContractRead, useSwitchNetwork, useConnect, useDisconnect } from 'wagmi'
import { getNetwork } from '@wagmi/core'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { utils } from 'ethers'
import {abi as ENSAbi} from './ENS'
import { abi as CCIPAbi } from './CcipResolver'
console.log({ENSAbi, CCIPAbi})
// Registry
// ["function setResolver(bytes32 node, address resolver) external"]
// Resolver
// ["function setVerifierForDomain(bytes32 node, address resolverAddress, string[] memory urls) external "]
// getVerifierOfDomain
const registryAddress = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'

  const Resolver = () => {
    const defaultResolverAddress = '0xd7a4F6473f32aC2Af804B3686AE8F1932bC35750'
    const bedrockResolverAddress = '0x49e0AeC78ec0dF50852E99116E524a43bE91B789'
    
    const currentUser = useContext(CurrentUserContext);
    const { connect } = useConnect({
      connector: new InjectedConnector(),
    })
    const { address, connector, isConnected } = useAccount()
    const { disconnect } = useDisconnect()
    const { chains, error, isLoading, pendingChainId, switchNetwork, isSuccess } =
    useSwitchNetwork()
    const { chain } = getNetwork()
    
    
    const node = utils.namehash(currentUser?.username || '');
    console.log('**Resolver', {currentUser, node, ENSAbi})
    const { isLoading:contractIsLoading, write } = useContractWrite({
      address: registryAddress,
      abi: ENSAbi,
      functionName: 'setResolver',
      chainId: 5
    })
  

    console.log({chain, chains, currentUser})
    if(currentUser?.resolver?.address){
      return (
        <div>
          <div style={{ marginBottom: '1em' }}>
            The current resolver is {currentUser?.resolver.address} on {currentUser?.resolver.name}
          </div>
          {
            chain?.id === 5 ? (
            <div>
              <Dropdown
                align="left"
                items={[
                  {
                    label: 'Default Resolver',
                    onClick: () => {
                      console.log('***Clicked', {name: currentUser?.username, node, defaultResolverAddress})
                      write({args:[node, defaultResolverAddress]})
                    },  
                    color: 'text'
                  },
                  {
                    label: 'Bedrock Ccip Resolver',
                    onClick: () => {
                      console.log('***Clicked', {name: currentUser?.username, node, bedrockResolverAddress})
                      write({args:[node, bedrockResolverAddress]})
                    },  
                    color: 'red'
                  },
                ]}
                label="Select Resolver"
              />
              <Button>Set Verifier</Button>
            </div>):(<div>You cannot select a resolver</div>)
          }
          <Record></Record>          
          <Dropdown
            align="left"
            items={[
              {
                label: 'Goerli',
                onClick: () => {
                  console.log('***Clicked')
                  if(isConnected){
                    switchNetwork?.(5)
                  }else{
                    connect({
                      chainId: 5,
                      connector: new InjectedConnector(),
                    })  
                  }
                },  
                color: 'text'
              },
              {
                label: 'Op Goerli',
                onClick: () => {
                  if(isConnected){
                    switchNetwork?.(420)
                  }else{
                    connect({
                      chainId: 420,
                      connector: new InjectedConnector(),
                    })  
                  }
                },  
                color: 'red'
              },
            ]}
            label="Switch Network"
          />
        </div>
      );
    }else{
      return(<></>)
    }
  };
  export default Resolver