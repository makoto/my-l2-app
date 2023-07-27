import { useState, useContext } from 'react'
import EditRecord from './EditRecord'
import { useEnsAddress, useEnsResolver, useContractRead, useConnect, useAccount, useNetwork, usePublicClient } from 'wagmi'
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
  // Using ethers.js
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
  console.log('**record:username', currentUser?.username)
  const node = ethers.utils.namehash(currentUser?.username || '');
  console.log('***Record0', {l2abi,context, node, enabled:!!(currentUser?.username), chainId: chain?.id})
  const { data:l2AddrData, error, isError:contractIsError, isLoading:contractIsLoading } = useContractRead({
    address: l2resolverAddress,
    abi: l2abi,
    // functionName: 'addr(bytes,bytes32)',
    functionName: 'addr',
    args: [context, node, 60],
    enabled:!!(currentUser?.username),
    chainId: 420
  })
  console.log('***Record1', {l2AddrData, contractIsError, contractIsLoading, error, addressData})
  // const L2PublicResolver = L2PublicResolverFactory.attach(l2ResolverAddress);
  // const context = ethers.utils.arrayify('0xDBBC2C0FE2A1D0FB4056B35A22E543BEB715E7FC')
  // const node = ethers.utils.namehash(ENS_NAME);
  // console.log({context, node})
  // const result = await L2PublicResolver.callStatic.text(context, node,"com.twitter");
  // console.log({result});
  // const result2 = await L2PublicResolver.callStatic['addr(bytes,bytes32)'](context, node);
  // console.log({result2});


  console.log({addressData})
  if(addressData){
    return(<div style={{ marginTop: '1em' }}>
      CCIP Address:{addressData}
    </div>)
  }
  console.log('***Record111', {resolverName:currentUser?.resolver?.name, chainName:chain?.name })
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
