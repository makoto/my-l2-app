import { useState, useContext } from 'react'
import EditRecord from './EditRecord'
import { useEnsAddress, useEnsResolver, useContractRead, useConnect, useAccount, useNetwork, usePublicClient } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { PublicClient, Transport } from "viem";
import { useEnsText } from './useEnsText'
// import { getNetwork } from '@wagmi/core'
import CcipResolver from './CcipResolver.json'
import CurrentUserContext from './Context'
import { Button } from '@ensdomains/thorin'


const abi = CcipResolver.abi
 
// import { InjectedConnector } from 'wagmi/connectors/injected'


function Record() {
  const currentUser = useContext(CurrentUserContext);
  const { chain } = useNetwork()
  const { address, connector, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { data:addressData, isError, isLoading } = useEnsAddress({
    name:currentUser?.username || '',
    enabled:!!(currentUser && currentUser.username),
    chainId: 5
  })
  console.log({addressData, username:currentUser?.username})
  if(addressData){
    return(<div style={{ marginTop: '1em' }}>
      Address:{addressData}
    </div>)
  }

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
  return <div>Record</div>
}
export default Record;
