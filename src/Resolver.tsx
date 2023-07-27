import React, { useState, useContext } from 'react'
import CurrentUserContext from './Context'
import { Heading, Card,  Button, Field, Dropdown } from '@ensdomains/thorin'
import Record from './Record'
import { useAccount, useContractWrite, useContractRead, useSwitchNetwork, useConnect, useDisconnect } from 'wagmi'
import { getNetwork } from '@wagmi/core'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { utils } from 'ethers'
import {abi as ENSAbi} from './ENS'
import { abi as CCIPAbi } from './CcipResolver'
console.log({ENSAbi, CCIPAbi})

const registryAddress = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'

  const Resolver = () => {
    const URL = "http://localhost:8081/{sender}/{data}"
    const L2_PUBLIC_RESOLVER_VERIFIER = "0x67AfD6d796d9212541016A2D10b28CC55021Cade"
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
    const name = utils.dnsEncode(currentUser?.username || '');
    console.log('**Resolver', {currentUser, node, name, ENSAbi})
    const { isLoading:contractIsLoading, write } = useContractWrite({
      address: registryAddress,
      abi: ENSAbi,
      functionName: 'setResolver',
      chainId: 5
    })
  
    const { isLoading:setVerifierContractIsLoading, write:setVerifierWrite } = useContractWrite({
      address: bedrockResolverAddress,
      abi: CCIPAbi,
      functionName: 'setVerifierForDomain',
      chainId: 5
    })

    const { data:getVerifierOfDomainData, error:getVerifierOfDomainError, isError:getVerifierOfDomainContractIsError, isLoading:getVerifierOfDomainContractIsLoading } = useContractRead({
      address: bedrockResolverAddress,
      abi: CCIPAbi,
      functionName: 'getVerifierOfDomain',
      args: [name],
      enabled:!!(currentUser?.username),
      chainId: 5
    })
    console.log({name, getVerifierOfDomainData, getVerifierOfDomainError, username:currentUser?.username})

    console.log({chain, chains, currentUser})
    if(currentUser?.resolver?.address){
      return (
        <div>
          <Card>
            The current resolver is {currentUser?.resolver.address}.
            <h5>Metadata</h5>
            <ul>
              <li>
                networkName: {currentUser?.resolver.networkName}
              </li>
              <li>
                coinType: {currentUser?.resolver.coinType}
              </li>
              <li>
                graphqlUrl:{currentUser?.resolver.graphqlUrl}
              </li>
              <li>
                storageType:{currentUser?.resolver.storageType}
              </li>
              <li>
                encodedData:{currentUser?.resolver.encodedData}
              </li>

            </ul>
          </Card>
          {
            chain?.id === 5 ? (
            <div>
              <Heading> How to setup up Record on L2</Heading>
              <h3>Step 1: Change Resolver to Bedrock CCIP Resolver</h3>
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
              <h3>Step 2: Set verifier</h3>
              <Button style={{width:'150px'}} onClick={ () => {
                console.log('***', {node, L2_PUBLIC_RESOLVER_VERIFIER, URL})
                setVerifierWrite({
                  args:[node, L2_PUBLIC_RESOLVER_VERIFIER, [URL]]
                })
              }}  >Set Verifier</Button>
            </div>):(<div>You cannot select a resolver</div>)
          }
          <h3>Step 3: Switch Network to OP Goerli</h3>
          <Button
          style={{width:'14em'}}
          onClick={()=>{
            window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [{
                chainId: "0x1a4",
                rpcUrls: ["https://endpoints.omniatech.io/v1/op/goerli/public"],
                chainName: "Optimism Goerli Testnet",
                nativeCurrency: {
                  name: "ETH",
                  symbol: "ETH",
                  decimals: 18
                },
                blockExplorerUrls: ["https://goerli-optimism.etherscan.io/"]
              }]
            }).catch((error:any)=>{
              console.log({error})
            });
          }}
          >Add Op Goerli Network</Button>
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

          <Card>
            <Record></Record>
          </Card>
        </div>
      );
    }else{
      return(<></>)
    }
  };
  export default Resolver