import { useState, useEffect, useContext } from 'react'

import { useContractWrite, useContractRead, useConnect, useAccount, useNetwork, usePublicClient } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { gql, useQuery } from '@apollo/client';
import { abi as l2abi } from './L2PublicResolver'
import CurrentUserContext from './Context'
import {ethers} from 'ethers'
import { ApolloClient, InMemoryCache } from '@apollo/client';
import useEthersText from './useEthersText'
import useEthers from './useEthers';
import useEthersAddr from './useEthersAddr'
import useEthersContenthash from './useEthersContenthash'
import {convertCoinTypeToEVMChainId, SLIP44_MSB} from './utils'

const GET_NAME = gql`
  query GetDomains($name: String!, $context: String!) {
    domains(where:{name:$name, context:$context}) {
      id
      name
      labelName
      labelhash
      resolver{
        texts
        coinTypes
      }
      delegates{
        id
      }
    }
  }
`;
function getContext(resolver:any){
  if(parseInt(resolver?.context) !== 0){
    return resolver?.context
  }else if(parseInt(resolver?.parentContext) !== 0){
    return resolver?.parentContext
  }else{
    return ''
  }
}

function Record() {
  const currentUser = useContext(CurrentUserContext);
  const [l2client, setl2Client] = useState(null);
  useEffect(() => {
    if(currentUser?.resolver?.graphqlUrl){
      let c:any = new ApolloClient({
        cache: new InMemoryCache(),
        uri: currentUser?.resolver?.graphqlUrl
      })
      setl2Client(c)
    }    
  }, [currentUser?.resolver?.graphqlUrl]);
  const context = getContext(currentUser?.resolver)

  const skip = (!currentUser?.username || !l2client)
  const { loading:queryLoading, error:queryError, data:queryData } = useQuery(GET_NAME, {
    client: l2client || undefined,
    variables: { name: currentUser?.username, context },
    skip
  });
  const domain = queryData?.domains[0]
  const delegates = domain?.delegates
  useEffect(() => {
    if(delegates){
      currentUser?.setResolver({
        ...currentUser?.resolver,
        ...{delegates}
      })
    }    
  }, [delegates]);
  const coinTypes = domain?.resolver?.coinTypes || []
  // Adding 'com.twitter' as a default key was causing infinite loop so disabled for now
  const texts = domain?.resolver?.texts || []
  const { chain } = useNetwork()
  const { connector, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const textRecords = useEthersText(currentUser?.username, texts)
  const addrRecords = useEthersAddr(currentUser?.username, coinTypes)
  const contentRecords = useEthersContenthash(currentUser?.username)
  const address = useEthers(currentUser?.username)

  const l2resolverAddress=currentUser?.resolver?.storageLocation
  const node = ethers.utils.namehash(currentUser?.username || '');
  console.log({resolver:currentUser?.resolver, context, node})

  const { data:l2AddrData, error, isError:contractIsError, isLoading:contractIsLoading } = useContractRead({
    address: l2resolverAddress,
    abi: l2abi,
    functionName: 'addr',
    args: [context, node],
    enabled:!!(currentUser?.username),
    chainId: currentUser?.resolver?.chainId
  })
  const isDataSync = l2AddrData === address
  return(
    <div>
      <h3>ETH Address</h3>
      <ul>
        <li>
          ETH Address on Goerli via CCIP-read: {address}
        </li>
        <li>
          ETH Address for {context.slice(0,5)}... on L2: { JSON.stringify(l2AddrData) }
        </li>
        {isDataSync ? (
          <li style={{color:"green"}}>L1 data and l2 are in sync</li>
        ) : (
          <li style={{color:"orange"}}>L1 data and l2 are out of sync</li>
        )}
      </ul>
      <h3>Other Address Record</h3>
      <ul>
      {
        coinTypes.filter((c:string) => c !== '60').map((key:string, index:number)=> {
          const record = addrRecords[index]
          const val = record && record["val"]
          let chainId
          try{
            chainId = convertCoinTypeToEVMChainId(parseInt(key))
          }catch(e){}
          return (<li>
            coinType {key}
            {
              chainId && (`(chainId ${chainId})`)
            }            
            :{val}
          </li>)
        })
      }
      </ul>
      <h3>Text Record</h3>
      <ul>
      {
        texts.map((key:string, index:number)=> {
          const record = textRecords[index]
          const val = record && record["val"]
          return (<li>
            {key}:{val}
          </li>)
        })
      }
      </ul>
      <h3>Contenthash</h3>
      {contentRecords && (
        <div>
          {contentRecords}
        </div>
      )}
    </div>
  )
}
export default Record;
