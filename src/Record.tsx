import { useState, useContext } from 'react'

import { useContractWrite, useContractRead, useConnect, useAccount, useNetwork, usePublicClient } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { PublicClient, Transport } from "viem";
import { useEnsText } from './useEnsText'
import { getNetwork } from '@wagmi/core'
import { abi } from './CcipResolver'
import { abi as l2abi } from './L2PublicResolver'
import CurrentUserContext from './Context'
import { Button } from '@ensdomains/thorin'
import {ethers} from 'ethers'
 
function Record() {
  const currentUser = useContext(CurrentUserContext);
  const { chain } = useNetwork()
  const { address, connector, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  console.log({
    username:currentUser?.username,
    resolverName:currentUser?.resolver?.networkName,
    IsResolverName:currentUser?.resolver?.networkName
  })

  const l2resolverAddress='0x39dc8a3a607970fa9f417d284e958d4ca69296c8'
  const context = currentUser?.nameOwner || ''
  const node = ethers.utils.namehash(currentUser?.username || '');
  const { data:l2AddrData, error, isError:contractIsError, isLoading:contractIsLoading } = useContractRead({
    address: l2resolverAddress,
    abi: l2abi,
    functionName: 'addr',
    args: [context, node],
    enabled:!!(currentUser?.username),
    chainId: 420
  })
  const isDataSync = l2AddrData === currentUser?.address
  return(
    <div>
      <h3>Record</h3>
      <ul>
        <li>
          ETH Address on Goerli via CCIP-read: {currentUser?.address}
        </li>
        <li>
          ETH Address for {context.slice(0,5)}... on OP: { JSON.stringify(l2AddrData) }
        </li>
        {isDataSync ? (
          <li style={{color:"green"}}>L1 data and l2 is in sync</li>
        ) : (
          <li style={{color:"orange"}}>L1 data and l2 is out of sync</li>
        )}
      </ul>
    </div>
  )
}
export default Record;
