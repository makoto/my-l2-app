import { useEnsResolver, useContractRead } from 'wagmi'
// import { getNetwork } from '@wagmi/core'
import CcipResolver from './CcipResolver.json'
const abi = CcipResolver.abi
 
// import { InjectedConnector } from 'wagmi/connectors/injected'
 
function Record() {
  const { data:resolverAddress, isError, isLoading } = useEnsResolver({
    name: 'bedrock.l2-resolver.eth',
    chainId: 5
  })
  const { data, error, isError:contractIsError, isLoading:contractIsLoading } = useContractRead({
    address: resolverAddress,
    abi,
    functionName: 'metadata',
    enabled:!!resolverAddress,
    chainId: 5
  })
  
  
  // console.log({name, coinType, graphurl, storageType, contextId})
  console.log({resolverAddress, abi, data, contractIsError, error})
  if (isLoading) return <div>Fetching resolver…</div>
  if (isError) return <div>Error fetching resolver</div>
  if (contractIsLoading) return <div>Fetching resolver Contract</div>
  if (contractIsError) return <div>Error fetching resolver Contract</div>
  if(data){
    // const [name, coinType, graphurl, storageType, contextId ] = data
    console.log(data)
    return <div>
      Resolver: {JSON.stringify(resolverAddress)}
      {/* Data: {JSON.stringify(data)} */}
    </div>
  }
  return <div></div>
}
export default Record;
