import { useEnsResolver, useContractRead, useConnect, useAccount, useNetwork, useContractWrite } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
// import { getNetwork } from '@wagmi/core'
import CcipResolver from './CcipResolver.json'
const abi = CcipResolver.abi
 
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
  <div>hi</div>
}
export default EditRecord;
