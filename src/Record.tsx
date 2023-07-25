import { useState, useContext } from 'react'
import EditRecord from './EditRecord'
import { useEnsAddress, useEnsResolver, useContractRead, useConnect, useAccount, useNetwork, usePublicClient } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { PublicClient, Transport } from "viem";
import { useEnsText } from './useEnsText'
import { getNetwork } from '@wagmi/core'
import CcipResolver from './CcipResolver.json'
import L2PublicResolver from './L2PublicResolver.json'
import CurrentUserContext from './Context'
import { Button } from '@ensdomains/thorin'
import {ethers} from 'ethers'

const abi = CcipResolver.abi
const l2abi = L2PublicResolver.abi
 
// import { InjectedConnector } from 'wagmi/connectors/injected'


function Record() {
  const currentUser = useContext(CurrentUserContext);
  const { chain } = useNetwork()
  const { address, connector, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  // Have problem getting data from CCIP-read
  const { data:addressData, isError, isLoading } = useEnsAddress({
    name:currentUser?.username || '',
    enabled:!!(currentUser && currentUser.username),
    chainId: 5
  })
  console.log({
    addressData,
    username:currentUser?.username,
    resolverName:currentUser?.resolver?.name,
    IsResolverName:currentUser?.resolver?.name
  })

  const l2resolverAddress='0x39dc8a3a607970fa9f417d284e958d4ca69296c8'
  const context = ethers.utils.arrayify('0xDBBC2C0FE2A1D0FB4056B35A22E543BEB715E7FC')
  const node = ethers.utils.namehash(currentUser?.username || '');
  console.log('***', {context, node, enabled:!!(currentUser?.username), chainId: chain?.id})
  const { data, error, isError:contractIsError, isLoading:contractIsLoading } = useContractRead({
    address: l2resolverAddress,
    abi: l2abi,
    // functionName: 'addr(bytes,bytes32)',
    functionName: 'addr',
    args: [context, node],
    enabled:!!(currentUser?.username && chain?.id === 420),
    chainId: 420
  })
  console.log('***Record', {data, contractIsError, contractIsLoading, error})
  // const L2PublicResolver = L2PublicResolverFactory.attach(l2ResolverAddress);
  // const context = ethers.utils.arrayify('0xDBBC2C0FE2A1D0FB4056B35A22E543BEB715E7FC')
  // const node = ethers.utils.namehash(ENS_NAME);
  // console.log({context, node})
  // const result = await L2PublicResolver.callStatic.text(context, node,"com.twitter");
  // console.log({result});
  // const result2 = await L2PublicResolver.callStatic['addr(bytes,bytes32)'](context, node);
  // console.log({result2});



  if(addressData){
    return(<div style={{ marginTop: '1em' }}>
      Address:{addressData}
    </div>)
  }
  // const EditRecord = currentUser?.resolver?.name === 'CCIP RESOLVER' ? (<div>Can edit</div>)

  // const publicClient = usePublicClient();
  // console.log({publicClient})
  // const { data:textData } = useEnsText({
  //   name:currentUser?.username || '',
  //   key:'my-record',
  //   enabled:!!(currentUser && currentUser.username),
  //   chainId:5
  // })
  // console.log({textData})
  // if(textData){
  //   return(<div style={{ marginTop: '1em' }}>
  //     twitter:{textData}
  //   </div>)
  // }
  // const { data:resolverAddress, isError, isLoading } = useEnsResolver({
  //   name: 'bedrock.l2-resolver.eth',
  //   chainId: 5
  // })
  // const { data, error, isError:contractIsError, isLoading:contractIsLoading } = useContractRead({
  //   address: resolverAddress,
  //   abi,
  //   functionName: 'metadata',
  //   enabled:!!resolverAddress,
  //   chainId: 5
  // })

  // console.log({resolverAddress, abi, data, contractIsError, error})
  // if (isLoading) return <div>Fetching resolver…</div>
  // if (isError) return <div>Error fetching resolver</div>
  // if (contractIsLoading) return <div>Fetching resolver Contract</div>
  // if (contractIsError) return <div>Error fetching resolver Contract</div>
  // if(data){
  //   // const [name, coinType, graphurl, storageType, contextId ] = data
  //   console.log(data)
  //   console.log({address, connector, isConnected, chain})
  //   return <div>
  //     Resolver: {JSON.stringify(resolverAddress)}
  //     {/* Data: {JSON.stringify(data)} */}
  //     <button onClick={() => connect({
  //           chainId: 420,
  //           connector: new InjectedConnector(),
  //     })}>Connect Optimism Testnet</button>
  //     {/* {
  //       chain?.id === 420 && (<EditRecord ></EditRecord>)
  //     } */}
  //   </div>
  // }
  return(
    <div>
      ETH: {currentUser?.address}
      {
        (
          currentUser?.resolver?.name === 'CCIP RESOLVER'
          && chain?.name === 'Optimism Goerli'
        ) ? (<EditRecord></EditRecord>) : (<></>)
      }
    </div>
  )
}
export default Record;
