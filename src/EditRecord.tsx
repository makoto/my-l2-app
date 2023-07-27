import React, { useState, useContext } from 'react'
import CurrentUserContext from './Context'
import { useEnsResolver, useContractRead, useConnect, useAccount, useNetwork, useContractWrite } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
// import { getNetwork } from '@wagmi/core'
import { abi } from './CcipResolver'
import { Input,  Button, Spinner } from '@ensdomains/thorin'
import { abi as l2abi } from './L2PublicResolver'
import { utils } from 'ethers'
import { getNetwork } from '@wagmi/core'

// import { InjectedConnector } from 'wagmi/connectors/injected'
 
function EditRecord() {
  const { chain } = getNetwork()
  const [input, setInput] = useState('')
  const { address, connector, isConnected } = useAccount()
  const currentUser = useContext(CurrentUserContext);
  const l2resolverAddress='0x39dc8a3a607970fa9f417d284e958d4ca69296c8'
  const context = address || ''
  const cannotEditL2Record = chain?.id !== 420
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: l2resolverAddress,
    abi: l2abi,
    functionName: 'setAddr',
    chainId: 420
  })
  const encodedName = utils.dnsEncode(currentUser?.username || '');
  console.log('***EditRecord', {name:currentUser?.username, encodedName, data, input, isLoading, isSuccess}) 
  return (
    <div>
      <Input
        label="New Address"
        placeholder="0x123"
        onChange={(evt) => setInput(evt.target.value) }
      />
      <Button
        disabled={cannotEditL2Record}
        style={{width:'100px'}}
        onClick={() => write({args:[encodedName, input]})}
      >{isLoading ? (<Spinner></Spinner>): (<div>Update</div>)}</Button>
      {data? (<div>
        <a style={{color:"blue"}}
          target="_blank" href={`https://goerli-optimism.etherscan.io/address/${data.hash}`}>
          {data.hash}
        </a>
      </div>) : '' }
      </div>
  )
}
export default EditRecord;
