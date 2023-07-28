import { useState, useContext } from 'react'
import CurrentUserContext from './Context'
import { useAccount, useContractWrite } from 'wagmi'
import { Input,  Button, Spinner } from '@ensdomains/thorin'
import { abi as l2abi } from './L2PublicResolver'
import { utils } from 'ethers'
import { getNetwork } from '@wagmi/core'
 
function EditRecord() {
  const { chain } = getNetwork()
  const [input, setInput] = useState('')
  const currentUser = useContext(CurrentUserContext);
  const l2resolverAddress='0x39dc8a3a607970fa9f417d284e958d4ca69296c8'
  const cannotEditL2Record = chain?.id !== 420
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: l2resolverAddress,
    abi: l2abi,
    functionName: 'setAddr',
    chainId: 420
  })
  const encodedName = utils.dnsEncode(currentUser?.username || '');
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
          target="_blank" href={`https://goerli-optimism.etherscan.io/tx/${data.hash}`}>
          {data.hash}
        </a>
      </div>) : '' }
      </div>
  )
}
export default EditRecord;
