import { useState, useContext } from 'react'

import { useContractWrite, useContractRead, useConnect, useAccount, useNetwork, usePublicClient } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { gql, useQuery } from '@apollo/client';
import { PublicClient, Transport } from "viem";
import { useEnsText } from './useEnsText'
import { getNetwork } from '@wagmi/core'
import { abi } from './CcipResolver'
import { abi as l2abi } from './L2PublicResolver'
import CurrentUserContext from './Context'
import { Button } from '@ensdomains/thorin'
import {ethers} from 'ethers'
import { ApolloClient, InMemoryCache } from '@apollo/client';
import useEthersText from './useEthersText'
import useEthers from './useEthers';
import useEthersAddr from './useEthersAddr'
import useEthersContenthash from './useEthersContenthash'

// TODO: This should be set dynamically based on URL passed from metadata endpoint
const l2client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://api.thegraph.com/subgraphs/id/QmNsi5HQiV9aTBMAHHzRE2wtmnpwYZibenETQbS4dtSjKx"
});
const GET_NAME = gql`
  query GetDomains($name: String!) {
    domains(where:{name:$name}) {
      id
      name
      labelName
      labelhash
      resolver{
        texts
        coinTypes
      }
    }
  }
`;

function Record() {
  const currentUser = useContext(CurrentUserContext);
  const { loading:queryLoading, error:queryError, data:queryData } = useQuery(GET_NAME, {
    client: l2client,
    variables: { name: currentUser?.username },
    skip:(!currentUser?.username)
  });
  const domain = queryData?.domains[0]
  const coinTypes = domain?.resolver?.coinTypes || []
  const texts = domain?.resolver?.texts || []
  const { chain } = useNetwork()
  const { connector, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const textRecords = useEthersText(currentUser?.username, texts)
  const addrRecords = useEthersText(currentUser?.username, coinTypes)
  const contentRecords = useEthersContenthash(currentUser?.username, coinTypes)
  const address = useEthers(currentUser?.username)

  console.log({username: currentUser?.username, texts, textRecords})
  const l2resolverAddress=currentUser?.resolver?.storageLocation
  const context = currentUser?.resolver?.context || ''
  const node = ethers.utils.namehash(currentUser?.username || '');
  const { data:l2AddrData, error, isError:contractIsError, isLoading:contractIsLoading } = useContractRead({
    address: l2resolverAddress,
    abi: l2abi,
    functionName: 'addr',
    args: [context, node],
    enabled:!!(currentUser?.username),
    chainId: 420
  })
  const isDataSync = l2AddrData === address
  return(
    <div>
      <h3>Record</h3>
      <ul>
        <li>
          ETH Address on Goerli via CCIP-read: {address}
        </li>
        <li>
          ETH Address for {context.slice(0,5)}... on OP: { JSON.stringify(l2AddrData) }
        </li>
        {isDataSync ? (
          <li style={{color:"green"}}>L1 data and l2 are in sync</li>
        ) : (
          <li style={{color:"orange"}}>L1 data and l2 are out of sync</li>
        )}
      </ul>
      <h3>Text Record</h3>
      <ul>
      {
        textRecords.map(({key, val})=> {
          return (<li>
            {key}:{val}
          </li>)
        })
      }
      <h3>Contenthash</h3>
      {contentRecords && (
        <div>
          {contentRecords}
        </div>
      )}
      </ul>
    </div>
  )
}
export default Record;
