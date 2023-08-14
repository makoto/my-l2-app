import React, { useState, useContext } from 'react'
import CurrentUserContext from './Context'
import { Heading, Card, Tag, Button, Input, Dropdown, Spinner } from '@ensdomains/thorin'
import EditRecord from './EditRecord'
import Record from './Record'
import { useAccount, useContractWrite, useWaitForTransaction, useContractRead, useSwitchNetwork, useConnect, useDisconnect } from 'wagmi'
import { getNetwork } from '@wagmi/core'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { utils } from 'ethers'
import {abi as ENSAbi} from './ENS'
import { abi as CCIPAbi } from './CcipResolver'

const registryAddress = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
const wrapperAddress = '0x114D4603199df73e7D157787f8778E21fCd13066'
  const Resolver = () => {
    const BASE_URL = "https://ccip-resolver-y3ur7hmkna-uc.a.run.app"
    const L2_PUBLIC_RESOLVER_VERIFIER = "0x183C1F81D0159794973c157694627a689DEB9F72"
    const [url, setUrl] = useState(`${BASE_URL}/{sender}/{data}`)
    const [toggle, setToggle] = useState(false)
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
    const { data:writeData, isLoading:setResolverIsLoading, write } = useContractWrite({
      address: registryAddress,
      abi: ENSAbi,
      functionName: 'setResolver',
      chainId: 5,
    })
    const { data:waitWriteData, isLoading:waitWriteIsLoading } = useWaitForTransaction({
      hash: writeData?.hash,
      enabled: !!writeData,
      onSuccess(data) {
        if(currentUser?.resolver?.refetch){
          currentUser?.resolver?.refetch()
        }
      },
    })

    const { data:writeWrapperData, isLoading:setWrapperResolverIsLoading, write: writeWrapper } = useContractWrite({
      address: wrapperAddress,
      abi: ENSAbi,
      functionName: 'setResolver',
      chainId: 5
    })
    const { data:waitWriteWrapperData, isLoading:waitWriteWrapperIsLoading } = useWaitForTransaction({
      hash: writeWrapperData?.hash,
      enabled: !!writeWrapperData,
      onSuccess(data) {
        if(currentUser?.resolver?.refetch){
          currentUser?.resolver?.refetch()
        }
      },
    })
    console.log({writeWrapperData, waitWriteWrapperData})

    const { data:setVerifierWriteData, isLoading:setVerifierContractIsLoading, write:setVerifierWrite } = useContractWrite({
      address: bedrockResolverAddress,
      abi: CCIPAbi,
      functionName: 'setVerifierForDomain',
      chainId: 5
    })
    const { data:waitSetVerifierWriteData, isLoading:waitSetVerifierWriteDataIsLoading } = useWaitForTransaction({
      hash: setVerifierWriteData?.hash,
      enabled: !!setVerifierWriteData,
      onSuccess() {
        getVerifierOfDomainRefetch()
      },
    })

    const { data: getVerifierOfDomainData, error:getVerifierOfDomainError, isError:getVerifierOfDomainContractIsError, isLoading:getVerifierOfDomainContractIsLoading, refetch:getVerifierOfDomainRefetch } = useContractRead({
      address: bedrockResolverAddress,
      abi: CCIPAbi,
      functionName: 'getVerifierOfDomain',
      args: [name],
      enabled:!!(currentUser?.username),
      chainId: 5
    })
    const isOwnedByUser = currentUser?.nameOwner === address
    const isBedrockResolver = currentUser?.resolver?.address === bedrockResolverAddress
    const cannotSetResolver = chain?.id !== 5 || setResolverIsLoading || setWrapperResolverIsLoading || !isOwnedByUser
    const cannotSetVerifier = chain?.id !== 5 || setVerifierContractIsLoading || !isOwnedByUser || !isBedrockResolver
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
    const cannotSwitchToOp  = chain?.id !== 5 || !isOwnedByUser || !isBedrockResolver || !verifierAddress
    console.log({cannotSwitchToOp, chainId:chain?.id, isOwnedByUser, isBedrockResolver, verifierAddress})
    if(currentUser?.resolver?.address){
      return (
        <div>
          <Card>
            <h5>
            <span style={{marginRight:'5px'}}>
            {isOwnedByUser ? (
              <Tag style={{ display: 'inline'  }} colorStyle="greenSecondary">owner</Tag>
            ) : (
              <Tag style={{ display: 'inline'}} colorStyle="redSecondary">not owner</Tag>
            )}
            </span>
              {currentUser?.username} (<a href="#" onClick={()=>{
              setToggle(!toggle)
            }}>{toggle ? ('Less') : ('More')}</a>)</h5>
            <ul>
              {toggle && (
                <div>
                  <li>Node: {node}</li>
                  <li>Encoded name: {name}</li>
                </div>
              )}
              <li>Owned by {currentUser?.nameOwner}.</li>
              <li>Resolver is {currentUser?.resolver?.address}.</li>
            </ul>
            { currentUser?.resolver?.networkName && (
              <div>
                <div style={{display:'flex'}}>
                  <h5>Metadata
                  </h5>
                  <a
                    href="https://github.com/ensdomains/docs/blob/95983d0d02bf4cbab7644871749c5f669d1392cf/ens-improvement-proposals/ensip-15-ccip-read-metadata.md#specification"
                    target="_blank"

                  >(What is Metadata?)</a>
                </div>
                <ul>
                  <li>
                    Network Name: {currentUser?.resolver.networkName}
                  </li>
                  <li>
                    Coin Type: {currentUser?.resolver.coinType}
                  </li>
                  <li>
                    Graphql Url:{currentUser?.resolver.graphqlUrl}
                  </li>
                  <li>
                    Storage Type:{currentUser?.resolver.storageType}
                  </li>
                  <li>
                    Storage Location:{currentUser?.resolver.storageLocation}
                  </li>
                  <li>
                    Context:{currentUser?.resolver.context}
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
                    if(currentUser?.isWrapped){
                      writeWrapper({args:[node, defaultResolverAddress]})
                    }else{
                      write({args:[node, defaultResolverAddress]})
                    }
                  },  
                  color: 'text'
                },
                {
                  label: 'Bedrock Ccip Resolver',
                  onClick: () => {
                    if(currentUser?.isWrapped){
                      writeWrapper({args:[node, bedrockResolverAddress]})
                    }else{
                      write({args:[node, bedrockResolverAddress]})
                    }
                  },  
                  color: 'red'
                },
              ]}
              label="Select Resolver"
            />
            )}
            {writeData? (<div>
              <a style={{color:"blue"}}
                target="_blank" href={`https://goerli-optimism.etherscan.io/tx/${writeData.hash}`}>
                {writeData.hash}
              </a>
            </div>) : '' }
            {writeWrapperData? (<div>
              <a style={{color:"blue"}}
                target="_blank" href={`https://goerli-optimism.etherscan.io/tx/${writeWrapperData.hash}`}>
                {writeWrapperData.hash}
              </a>
            </div>) : '' }

            <div style={{display:'flex'}}>
            <h3>Step 2: Set verifier</h3>
            <a
            href="https://github.com/corpus-io/ENS-Bedrock-Resolver#l2publicresolververifier-l1"
            target="_blank"
            >(What is verifier?)</a>
            </div>
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
              label="Verifier address"
              defaultValue={newVerifierAddress}
              onChange={(e)=>{setNewVerifierAddress(e.target.value)}}
            ></Input>
            <Input
              label="Verifier url"
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
            {setVerifierWriteData? (<div>
              <a style={{color:"blue"}}
                target="_blank" href={`https://goerli-optimism.etherscan.io/tx/${setVerifierWriteData.hash}`}>
                {setVerifierWriteData.hash}
              </a>
            </div>) : '' }

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