import React, { useState, useContext } from 'react'
import CurrentUserContext from './Context'
import { Heading, Card,  Button, Input, Dropdown, Spinner } from '@ensdomains/thorin'
import EditRecord from './EditRecord'
import Record from './Record'
import { useAccount, useContractWrite, useContractRead, useSwitchNetwork, useConnect, useDisconnect } from 'wagmi'
import { getNetwork } from '@wagmi/core'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { utils } from 'ethers'
import {abi as ENSAbi} from './ENS'
import { abi as CCIPAbi } from './CcipResolver'

const registryAddress = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'

  const Resolver = () => {
    const BASE_URL = "https://ccip-resolver-y3ur7hmkna-uc.a.run.app"
    const L2_PUBLIC_RESOLVER_VERIFIER = "0x183C1F81D0159794973c157694627a689DEB9F72"
    const [url, setUrl] = useState(`${BASE_URL}/{sender}/{data}`)
    const [newVerifierAddress, setNewVerifierAddress] = useState(L2_PUBLIC_RESOLVER_VERIFIER)
  
    const defaultResolverAddress = '0xd7a4F6473f32aC2Af804B3686AE8F1932bC35750'
    const bedrockResolverAddress = '0xaeB973dA621Ed58F0D8bfD6299031E8a2Ac39FD4'
    
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
    const { isLoading:setResolverIsLoading, write } = useContractWrite({
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

    const { data: getVerifierOfDomainData, error:getVerifierOfDomainError, isError:getVerifierOfDomainContractIsError, isLoading:getVerifierOfDomainContractIsLoading } = useContractRead({
      address: bedrockResolverAddress,
      abi: CCIPAbi,
      functionName: 'getVerifierOfDomain',
      args: [name],
      enabled:!!(currentUser?.username),
      chainId: 5
    })
    const isOwnedByUser = currentUser?.nameOwner === address
    const cannotSetResolver = chain?.id !== 5 || setResolverIsLoading || !isOwnedByUser
    const cannotSetVerifier = chain?.id !== 5 || setVerifierContractIsLoading || !isOwnedByUser
    const cannotSwitchToOp  = chain?.id !== 5 || !isOwnedByUser
    const isArray = (val: unknown): val is number[] => (
      Array.isArray(val)
    );
    let ccipVerifier, gatewayUrls, verifierAddress, verifierNode
    if(isArray(getVerifierOfDomainData)){
      ccipVerifier = getVerifierOfDomainData[0]
      // Types are blowing up so had to workd around.
      const parsed = JSON.parse(JSON.stringify(ccipVerifier))
      gatewayUrls = parsed.gatewayUrls
      verifierAddress = parsed.verifierAddress
      verifierNode = getVerifierOfDomainData[1]
    }
    if(currentUser?.resolver?.address){
      return (
        <div>
          <Card>
            <h5>{currentUser?.username}</h5>
            <ul>
              <li>Owned by {currentUser?.nameOwner}.</li>
              <li>The current resolver is {currentUser?.resolver?.address}.</li>
              <li>node: {node}</li>
              <li>encoded name: {name}</li>
            </ul>            
            { currentUser?.resolver?.networkName && (
              <div>
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
                  storageLocation:{currentUser?.resolver.storageLocation}
                </li>
                <li>
                  context:{currentUser?.resolver.context}
                </li>
              </ul>
              </div>              
            )}
            <Record></Record>
          </Card>
          <div>
            <Heading> How to setup up Record on L2</Heading>
            <h3>Step 1: Change Resolver to Bedrock CCIP Resolver</h3>
            {cannotSetResolver? (<Button disabled={true} style={{width:'200px'}} >Select Resolver</Button>) : (
            <Dropdown
              align="left"
              items={[
                {
                  label: 'Default Resolver',
                  onClick: () => {
                    write({args:[node, defaultResolverAddress]})
                  },  
                  color: 'text'
                },
                {
                  label: 'Bedrock Ccip Resolver',
                  onClick: () => {
                    write({args:[node, bedrockResolverAddress]})
                  },  
                  color: 'red'
                },
              ]}
              label="Select Resolver"
            />
            )}
            <h3>Step 2: Set verifier</h3>
            {getVerifierOfDomainData ? (
              <Card>
                <ul>
                  <li>Verifier address:{verifierAddress}</li>
                  <li>Gateway urls: {JSON.stringify(gatewayUrls)}</li>
                  <li>node:{verifierNode}</li>
                </ul>
              </Card>
            ): ''}
            <Input
              label="Set Verifier address"
              defaultValue={newVerifierAddress}
              onChange={(e)=>{setNewVerifierAddress(e.target.value)}}
            ></Input>
            <Input
              label="Set Verifier url"
              defaultValue={url}
              onChange={(e)=>{setUrl(e.target.value)}}
            ></Input>
            <Button
              disabled={cannotSetVerifier}
              style={{width:'150px'}} onClick={ () => {
              setVerifierWrite({
                args:[node, newVerifierAddress, [url]]
              })
            }}  >
              {setVerifierContractIsLoading ? (<Spinner></Spinner>) : ('Set Verifier')}
            </Button>
          </div>
          
          <h3>Step 3: Switch Network to OP Goerli</h3>
          <Button
          disabled={cannotSwitchToOp}
          style={{width:'16em'}}
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
              console.log('*** Add network error', {error})
            });
          }}
          >Switch to Op Goerli Network</Button>
          <h3 style={{margin:'1em 0'}}>Step 4: Update Record on L2</h3>
          <EditRecord></EditRecord>
        </div>
      );
    }else{
      return(<></>)
    }
  };
  export default Resolver