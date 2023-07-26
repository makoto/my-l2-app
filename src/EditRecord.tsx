import { useEnsResolver, useContractRead, useConnect, useAccount, useNetwork, useContractWrite } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
// import { getNetwork } from '@wagmi/core'
import { abi } from './CcipResolver'
import { Input,  Button } from '@ensdomains/thorin'

 
// import { InjectedConnector } from 'wagmi/connectors/injected'
 
function EditRecord() {
  // const { data, isLoading, isSuccess, write } = useContractWrite({
  //   address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
  //   abi: wagmigotchiABI,
  //   functionName: 'feed',
  // })
 
  // return (
  //   <div>
  //     <button onClick={() => write()}>Feed</button>
  //     {isLoading && <div>Check Wallet</div>}
  //     {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
  //   </div>
  // )
  return (
    <div>
      <Input
        label="New Address"
        placeholder="0x123"
      />
      <Button
        style={{width:'100px'}}
      >Update</Button>
      </div>

  )
}
export default EditRecord;
