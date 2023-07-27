import { useState, useContext } from 'react'
import EditRecord from './EditRecord'
import { useEnsAddress, useContractRead, useConnect, useAccount, useNetwork, usePublicClient } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { PublicClient, Transport } from "viem";
import { useEnsText } from './useEnsText'
import { getNetwork } from '@wagmi/core'
import { abi } from './CcipResolver'
import { abi as l2abi } from './L2PublicResolver'
import CurrentUserContext from './Context'
import { Button } from '@ensdomains/thorin'
import {ethers} from 'ethers'

 
// import { InjectedConnector } from 'wagmi/connectors/injected'


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
  const context = '0xDBBC2C0FE2A1D0FB4056B35A22E543BEB715E7FC'
  const node = ethers.utils.namehash(currentUser?.username || '');
  const { data:l2AddrData, error, isError:contractIsError, isLoading:contractIsLoading } = useContractRead({
    address: l2resolverAddress,
    abi: l2abi,
    functionName: 'addr',
    args: [context, node],
    enabled:!!(currentUser?.username),
    chainId: 420
  })
  return(
    <div>
      <ul>
        <li>
          ETH Address via CCIP-read: {currentUser?.address}
        </li>
        <li>
          ETH Address for {context.slice(0,5)}... on OP: { JSON.stringify(l2AddrData) }
        </li>
      </ul>
      <EditRecord></EditRecord>
    </div>
  )
}
export default Record;
