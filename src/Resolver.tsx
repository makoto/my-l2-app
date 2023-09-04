import React, { useState, useContext } from 'react'
import CurrentUserContext from './Context'
import { Heading, Card, Tag, Button, Input, Dropdown, Spinner } from '@ensdomains/thorin'
import EditRecord from './EditRecord'
import Record from './Record'
import { useAccount, useContractWrite, useWaitForTransaction, useContractRead, useSwitchNetwork, useConnect, useDisconnect } from 'wagmi'
import { getNetwork } from '@wagmi/core'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { utils } from 'ethers'
import { L1_CHAIN_ID, L2_CHAIN_IDS, getChainInfo } from './utils'
import { abi as l2abi } from './L2PublicResolver'
import { Link } from 'react-router-dom';
import {abi as ENSAbi} from './ENS'
import { abi as CCIPAbi } from './CcipResolver'
interface ChainInfoType {
  chainId: string,
  rpcUrls: string[],
  chainName: string,
  nativeCurrency: {
    name: string,
    symbol: string,
    decimals: number
  },
  blockExplorerUrls: string[]
}

const registryAddress = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
const wrapperAddress = '0x114D4603199df73e7D157787f8778E21fCd13066'
  const Resolver = () => {
    const BASE_URL = "https://ccip-resolver-y3ur7hmkna-uc.a.run.app"
    const [url, setUrl] = useState(`${BASE_URL}/{sender}/{data}`)
    const [toggle, setToggle] = useState(false)
    const [subname, setSubname] = useState('')
    const [delegate, setDelegate] = useState('')
  
    const defaultResolverAddress = '0xd7a4F6473f32aC2Af804B3686AE8F1932bC35750'
    const bedrockResolverAddress = '0xaeB973dA621Ed58F0D8bfD6299031E8a2Ac39FD4'
    const baseResolverAddress = '0x8cC5263a98161129EBd9C5Ab4fB39D99c767726d'
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
      chainId: L1_CHAIN_ID,
    })
    const { data:waitWriteData, isLoading:waitWriteIsLoading } = useWaitForTransaction({
      hash: writeData?.hash,
      enabled: !!writeData,
      onSuccess() {
        if(currentUser?.resolver?.refetch){
          currentUser?.resolver?.refetch()
        }
        if(currentUser?.resolver?.refetchMetadata){
          currentUser?.resolver?.refetchMetadata()
        }
      },
    })

    const { data:writeWrapperData, isLoading:setWrapperResolverIsLoading, write: writeWrapper } = useContractWrite({
      address: wrapperAddress,
      abi: ENSAbi,
      functionName: 'setResolver',
      chainId: L1_CHAIN_ID
    })
    const { data:waitWriteWrapperData, isLoading:waitWriteWrapperIsLoading } = useWaitForTransaction({
      hash: writeWrapperData?.hash,
      enabled: !!writeWrapperData,
      onSuccess(data) {
        if(currentUser?.resolver?.refetch){
          currentUser?.resolver?.refetch()
        }
        if(currentUser?.resolver?.refetchMetadata){
          currentUser?.resolver?.refetchMetadata()
        }
      },
    })
    
    const isL2Resolver = L2_CHAIN_IDS.includes(currentUser?.resolver?.chainId || 0)
    const { data: getVerifierOfDomainData, error:getVerifierOfDomainError, isError:getVerifierOfDomainContractIsError, isLoading:getVerifierOfDomainContractIsLoading, refetch:getVerifierOfDomainRefetch } = useContractRead({
      address: currentUser?.resolver?.address as `0x${string}`,
      abi: CCIPAbi,
      functionName: 'getVerifierOfDomain',
      args: [name],
      enabled:!!(currentUser?.resolver?.address),
      chainId: L1_CHAIN_ID
    })
    const { data: isApprovedForData, error:isApprovedForError, isError:isApprovedForIsError, isLoading:isApprovedForIsLoading, refetch:isApprovedForRefetch } = useContractRead({
      address: currentUser?.resolver?.storageLocation as `0x${string}`,
      abi: l2abi,
      functionName: 'isApprovedFor',
      args: [currentUser?.resolver?.parentContext, name, address],
      enabled:!!(currentUser?.resolver?.address),
      chainId: currentUser?.resolver?.chainId
    })
    const { data:writeApproveData, isLoading:approveIsLoading, write:writeApprove } = useContractWrite({
      address: registryAddress,
      abi: l2abi,
      functionName: 'approve',
      chainId: currentUser?.resolver?.chainId,
    })
    const { data:waitApproveData, isLoading:waitApproveIsLoading } = useWaitForTransaction({
      hash: writeApproveData?.hash,
      enabled: !!writeApproveData,
      onSuccess(data) {
        if(currentUser?.resolver?.refetch){
          currentUser?.resolver?.refetch()
        }
        if(currentUser?.resolver?.refetchMetadata){
          currentUser?.resolver?.refetchMetadata()
        }
      },
    })


    const isOwnedByUser = currentUser?.nameOwner === address
    console.log({chainId:chain?.id, setResolverIsLoading, setWrapperResolverIsLoading, isOwnedByUser})
    const cannotSetResolver = chain?.id !== L1_CHAIN_ID || setResolverIsLoading || setWrapperResolverIsLoading || !isOwnedByUser
    const cannotApprove = (chain?.id !== currentUser?.resolver?.chainId) 
    const CHAIN_INFO = getChainInfo(currentUser?.resolver?.chainId || 0)
    const l2ExplorerUrl = CHAIN_INFO?.blockExplorerUrls[0]
  
    const isArray = (val: unknown): val is number[] => (
      Array.isArray(val)
    );
    let ccipVerifier, gatewayUrls, verifierAddress
    if(isArray(getVerifierOfDomainData)){
      ccipVerifier = getVerifierOfDomainData[0]
      // Types are blowing up so had to workd around.
      const parsed = JSON.parse(JSON.stringify(ccipVerifier))
      gatewayUrls = parsed.gatewayUrls
      verifierAddress = parsed.verifierAddress
    }
    const cannotSwitchToL2  = chain?.id !== 5 || !(isOwnedByUser || !!isApprovedForData) || !isL2Resolver || !verifierAddress
    let l2param:ChainInfoType | undefined
    if(currentUser?.resolver?.address && currentUser.resolver?.chainId){
      const l2param = getChainInfo(currentUser.resolver.chainId)
      console.log({l2param})
      return (
        <div>
          <Card>
            <h5>
            <span style={{marginRight:'5px'}}>
            {isOwnedByUser ? (
              <Tag style={{ display: 'inline'  }} colorStyle="greenSecondary">owner</Tag>
            ) : (
              isApprovedForData ? (
                <Tag style={{ display: 'inline'}} colorStyle="yellowSecondary">delegate</Tag>
              ) : (<Tag style={{ display: 'inline'}} colorStyle="redSecondary">not owner</Tag>)
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
              {currentUser?.resolver?.delegates && (
                <div>
                  <li>Delegates</li>
                  {
                    (currentUser?.resolver?.delegates)?.map((d:any) => {
                      return(<li><Link to={`/user/${d.id}`}>{d.id}</Link></li>)
                    })
                  }
                </div>
              )}
            </ul>
            { currentUser?.resolver?.networkName && (
              <div>
              {getVerifierOfDomainData ? (
              <div style={{marginBottom:'1em'}}>
                <div style={{display:'flex'}}>
                  <h5>Verifier</h5>
                  <a
            href="https://github.com/corpus-io/ENS-Bedrock-Resolver#l2publicresolververifier-l1"
            target="_blank"
            >(What is verifier?)</a>
                </div>
                <ul>
                  <li>Verifier address:{verifierAddress}</li>
                  <li>Gateway urls: {JSON.stringify(gatewayUrls)}</li>
                </ul>
              </div>
              ): ''}
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
                    (Chain ID : {currentUser?.resolver.chainId})
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
            <h3>Step 1: Change Resolver to L2 Resolver (Optimism, Base)</h3>
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
                  label: 'Optimism Resolver',
                  onClick: () => {
                    if(currentUser?.isWrapped){
                      writeWrapper({args:[node, bedrockResolverAddress]})
                    }else{
                      write({args:[node, bedrockResolverAddress]})
                    }
                  },  
                  color: 'red'
                },
                {
                  label: 'BASE Resolver',
                  onClick: () => {
                    if(currentUser?.isWrapped){
                      writeWrapper({args:[node, baseResolverAddress]})
                    }else{
                      write({args:[node, baseResolverAddress]})
                    }
                  },  
                  color: 'blue'
                }
              ]}
              label="Select Resolver"
            />
            )}
            {writeData? (<div>
              <a style={{color:"blue"}}
                target="_blank" href={`https://goerli.etherscan.io/tx/${writeData.hash}`}>
                {writeData.hash}
              </a>
            </div>) : '' }
            {writeWrapperData? (<div>
              <a style={{color:"blue"}}
                target="_blank" href={`https://goerli.etherscan.io/tx/${writeWrapperData.hash}`}>
                {writeWrapperData.hash}
              </a>
            </div>) : '' }
          </div>
          
          <h3>Step 2: Switch Network to L2</h3>
          <Button
          disabled={cannotSwitchToL2}
          style={{width:'16em'}}
          onClick={()=>{
            if(currentUser.resolver?.chainId){
              window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [l2param]
              }).catch((error:any)=>{
                console.log('*** Add network error', {error})
              });  
            }
          }}
          >Switch to { l2param && l2param.chainName } </Button>
          <h3 style={{margin:'1em 0'}}>Step 3: Update Record on L2</h3>
          <EditRecord parentContext={isApprovedForData && currentUser?.resolver?.parentContext } ></EditRecord>
        {
          isOwnedByUser && (
            <div>
            <Heading> Settign up Delegate</Heading>
            <h3>You can let others to edit record of the name you own or their subnames</h3>
            <div>
            <Input
              width="112"
              label='Subname'
              placeholder=""
              onChange={(evt) => setSubname(evt.target.value) }
            />.{currentUser?.username}
            </div>
            <Input
              width="112"
              label='Delegate'
              placeholder=""
              onChange={(evt) => setDelegate(evt.target.value) }
            />
            <Button
            disabled={cannotApprove}
            style={{width:'16em'}}
            onClick={()=>{
              const name = [subname, currentUser?.username].join('.')
              const encodedName = utils.dnsEncode(name);
              writeApprove({args:[encodedName, delegate, true]})
              }}
            >Add Delegate </Button>
              {writeApproveData? (<div>
                <a style={{color:"blue"}}
                  target="_blank" 
                  href={`${l2ExplorerUrl}/tx/${writeApproveData.hash}`}>
                  {writeApproveData.hash}
                </a>
              </div>) : '' }
          </div>  
          )
        }
        </div>      
      );
    }else{
      return(<></>)
    }
  };
  export default Resolver