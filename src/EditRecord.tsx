import { useState, useContext } from 'react'
import CurrentUserContext from './Context'
import { useContractWrite } from 'wagmi'
import { Dropdown, Input,  Button, Spinner } from '@ensdomains/thorin'
import { abi as l2abi } from './L2PublicResolver'
import { utils } from 'ethers'
import { getNetwork } from '@wagmi/core'
import { decode, encode } from "@ensdomains/content-hash";
import { convertEVMChainIdToCoinType, getChainInfo } from './utils'
function EditRecord(props:any) {

  const { chain } = getNetwork()
  const [inputType, setInputType] = useState('ETH')
  const [inputTypeChainId, setInputTypeChainId] = useState('')
  const [coinType, setCoinType] = useState('')
  const [inputEth, setInputEth] = useState('')
  const [inputKey, setInputKey] = useState('')
  const [inputVal, setInputVal] = useState('')
  const [inputContenthash, setInputContenthash] = useState('')
  
  const currentUser = useContext(CurrentUserContext);
  const l2resolverAddress=currentUser?.resolver?.storageLocation
  const CHAIN_INFO = getChainInfo(currentUser?.resolver?.chainId || 0)
  const l2ExplorerUrl = CHAIN_INFO?.blockExplorerUrls[0]
  const cannotEditL2Record = chain?.id !== currentUser?.resolver?.chainId
  const { data:ethData, isLoading:ethIsLoading, isSuccess:ethIsSuccess, write:writeAddr } = useContractWrite({
    address: l2resolverAddress,
    abi: l2abi,
    functionName: `setAddr` + (!!props.parentContext && 'For'),
    chainId: currentUser?.resolver?.chainId
  })
  const { data:textData, isLoading:textIsLoading, isSuccess:textIsSuccess, write:writeText } = useContractWrite({
    address: l2resolverAddress,
    abi: l2abi,
    functionName: 'setText' + (!!props.parentContext && 'For'),
    chainId: currentUser?.resolver?.chainId
  })
  const { data:contenthashData, isLoading:contenthashIsLoading, isSuccess:contenthashIsSuccess, write:writeContenthash } = useContractWrite({
    address: l2resolverAddress,
    abi: l2abi,
    functionName: 'setContenthash' + (!!props.parentContext && 'For'),
    chainId: currentUser?.resolver?.chainId
  })

  const encodedName = utils.dnsEncode(currentUser?.username || '');
  const argPrefix = [props.parentContext,...[encodedName]]
  let encodedContenthash:string = ''
  try{
    encodedContenthash = encode("ipfs", inputContenthash)
  }catch(e){
    console.log({e})
  }
  return (
    <div>
      Select ETH or
      <a href="https://chainlist.org" target="_blank" >ChainID</a> for EVM chains
      {/* , */}
      {/* or <a href="https://github.com/satoshilabs/slips/blob/master/slip-0044.md" target="_blank" >
        Coin type
      </a> for non EVM chains */}
      {cannotEditL2Record ? (<Button disabled={true} style={{width:'200px'}} >Address Type</Button>) : (
              <Dropdown
              align="left"
              items={[
                {
                  label: 'ETH',
                  onClick: () => {
                    setCoinType('60')
                    setInputType('ETH')
                  },
                  color: 'text'
                },
                {
                  label: 'ChainID',
                  onClick: () => {
                    setCoinType('')
                    setInputType('ChainID')
                  },
                },
              ]}
              label="Address Type"
            />      
      )}
      {
        inputType === 'CoinType' && (
          <Input
            width="112"
            label='CoinType'
            placeholder=""
            onChange={(evt) => setCoinType(evt.target.value) }
          />  
        )        
      }
      {
        inputType === 'ChainID' && (
          <Input
            width="112"
            label='ChainID'
            placeholder=""
            onChange={(evt) => {
              setInputTypeChainId(evt.target.value)
              const val = convertEVMChainIdToCoinType(parseInt(evt.target.value))
              setCoinType(val + '')
            } }
          />  
        )        
      }
      {inputType !== 'ETH' && (
        <div>
          {inputType === 'ChainID' && (
            <div>ChainID:{inputTypeChainId}</div>
          )}
          Coin type: {coinType}
        </div>
      )}
      <Input
        width="112"
        label="New Address"
        placeholder="0x123"
        onChange={(evt) => setInputEth(evt.target.value) }
      />
      <Button
        disabled={cannotEditL2Record || !inputEth}
        style={{width:'100px'}}
        onClick={() => {
          const args = [...argPrefix, ...[coinType, inputEth]]
          writeAddr({args})
        }}
      >{ethIsLoading ? (<Spinner></Spinner>): (<div>Update</div>)}</Button>
      {ethData? (<div>
        <a style={{color:"blue"}}
          target="_blank" href={`${l2ExplorerUrl}/tx/${ethData.hash}`}>
          {ethData.hash}
        </a>
      </div>) : '' }

      <div style={{display:"flex"}}>
        <Input
          width="144"
          label="New IPFS Contenthash"
          placeholder="bafybeibj6lixxzqtsb45ysdjnupvqkufgdvzqbnvmhw2kf7cfkesy7r7d4"
          onChange={(evt) => setInputContenthash(evt.target.value) }
        />
      </div>
      {encodedContenthash && (<div>encoded:{encodedContenthash}
</div>)}
      <Button
        disabled={cannotEditL2Record || encodedContenthash === '' }
        style={{width:'100px'}}
        onClick={() => {
          const args = [...argPrefix, ...[encodedContenthash]]
          writeContenthash({args})
        }}
      >{contenthashIsLoading ? (<Spinner></Spinner>): (<div>Update</div>)}</Button>
      {contenthashData? (<div>
        <a style={{color:"blue"}}
          target="_blank" href={`${l2ExplorerUrl}/tx/${contenthashData.hash}`}>
          {contenthashData.hash}
        </a>
      </div>) : '' }

      <div style={{display:"flex"}}>
        <Input
          width="48"
          label="New Key"
          placeholder="com.twitter"
          onChange={(evt) => setInputKey(evt.target.value) }
        />
        <Input
          width="72"
          label="New Value"
          placeholder="@jack"
          onChange={(evt) => setInputVal(evt.target.value) }
        />
      </div>
      <Button
        disabled={cannotEditL2Record || !inputKey || !inputVal}
        style={{width:'100px'}}
        onClick={() => {
          const args = [...argPrefix, ...[inputKey, inputVal]]
          writeText({args})
        }}
      >{textIsLoading ? (<Spinner></Spinner>): (<div>Update</div>)}</Button>
      {textData? (<div>
        <a style={{color:"blue"}}
          target="_blank" href={`${l2ExplorerUrl}/tx/${textData.hash}`}>
          {textData.hash}
        </a>
      </div>) : '' }
    </div>
  )
}
export default EditRecord;
