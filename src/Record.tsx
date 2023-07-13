import EditRecord from './EditRecord'
import { useEnsResolver, useContractRead, useConnect, useAccount, useNetwork, usePublicClient } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { PublicClient, Transport } from "viem";
import { useEnsText } from './useEnsText'
// import { getNetwork } from '@wagmi/core'
import CcipResolver from './CcipResolver.json'


const abi = CcipResolver.abi
 
// import { InjectedConnector } from 'wagmi/connectors/injected'


function Record() {
  const { chain } = useNetwork()
  const { address, connector, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const publicClient = usePublicClient();
  console.log({publicClient})
  const { data:textData } = useEnsText({
    name:'newmatoken.eth',
    key:'com.twitter'
  })
  console.log({textData})

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
