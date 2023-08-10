import { useState, useContext } from 'react'
import CurrentUserContext from './Context'
import { useContractWrite } from 'wagmi'
import { Dropdown, Input,  Button, Spinner } from '@ensdomains/thorin'
import { abi as l2abi } from './L2PublicResolver'
import { utils } from 'ethers'
import { getNetwork } from '@wagmi/core'
import { decode, encode } from "@ensdomains/content-hash";

export const SLIP44_MSB = 0x80000000
export const convertEVMChainIdToCoinType = (chainId: number) =>{
  if( chainId >= SLIP44_MSB ){
    throw Error(`chainId ${chainId} must be less than ${SLIP44_MSB}`)
  }
  return  (SLIP44_MSB | chainId) >>> 0
}

function EditRecord() {
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
  const cannotEditL2Record = chain?.id !== 420
  const { data:ethData, isLoading:ethIsLoading, isSuccess:ethIsSuccess, write:writeAddr } = useContractWrite({
    address: l2resolverAddress,
    abi: l2abi,
    functionName: 'setAddr',
    chainId: 420
  })
  const { data:textData, isLoading:textIsLoading, isSuccess:textIsSuccess, write:writeText } = useContractWrite({
    address: l2resolverAddress,
    abi: l2abi,
    functionName: 'setText',
    chainId: 420
  })
  const { data:contenthashData, isLoading:contenthashIsLoading, isSuccess:contenthashIsSuccess, write:writeContenthash } = useContractWrite({
    address: l2resolverAddress,
    abi: l2abi,
    functionName: 'setContenthash',
    chainId: 420
  })

  const encodedName = utils.dnsEncode(currentUser?.username || '');
  // const encodedContenthash = encode(encodedName)
  // console.log({inputContenthash, encodedContenthash})
  return (
    <div>
      Select ETH, 
      <a href="https://chainlist.org" target="_blank" >ChainID</a> for EVM chains,
      or <a href="https://github.com/satoshilabs/slips/blob/master/slip-0044.md" target="_blank" >
        Coin type
      </a> for non EVM chains
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
                  label: 'CoinType',
                  onClick: () => {
                    setCoinType('')
                    setInputType('CoinType')
                  },
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
        disabled={cannotEditL2Record}
        style={{width:'100px'}}
        onClick={() => {
          console.log({encodedName, coinType, inputEth})
          writeAddr({args:[encodedName, coinType, inputEth]})
        }}
      >{ethIsLoading ? (<Spinner></Spinner>): (<div>Update</div>)}</Button>
      {ethData? (<div>
        <a style={{color:"blue"}}
          target="_blank" href={`https://goerli-optimism.etherscan.io/tx/${ethData.hash}`}>
          {ethData.hash}
        </a>
      </div>) : '' }

      <div style={{display:"flex"}}>
        <Input
          width="72"
          label="New Contenthash"
          placeholder=""
          onChange={(evt) => setInputContenthash(evt.target.value) }
        />
      </div>
      <Button
        disabled={cannotEditL2Record}
        style={{width:'100px'}}
        onClick={() => writeContenthash({args:[encodedName, inputContenthash]})}
      >{contenthashIsLoading ? (<Spinner></Spinner>): (<div>Update</div>)}</Button>
      {contenthashData? (<div>
        <a style={{color:"blue"}}
          target="_blank" href={`https://goerli-optimism.etherscan.io/tx/${contenthashData.hash}`}>
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
        disabled={cannotEditL2Record}
        style={{width:'100px'}}
        onClick={() => writeText({args:[encodedName, inputKey, inputVal]})}
      >{textIsLoading ? (<Spinner></Spinner>): (<div>Update</div>)}</Button>
      {textData? (<div>
        <a style={{color:"blue"}}
          target="_blank" href={`https://goerli-optimism.etherscan.io/tx/${textData.hash}`}>
          {textData.hash}
        </a>
      </div>) : '' }
    </div>
  )
}
export default EditRecord;
