import { useState, useContext, useEffect } from 'react';
import { useEnsResolver, useContractRead, useAccount, useBalance, useConnect, useDisconnect, useNetwork } from 'wagmi'
import { Input,  Button } from '@ensdomains/thorin'
import CurrentUserContext from './Context'
// import CcipResolver from './CcipResolver.json'
import {abi} from './CcipResolver'
import useEthers from './useEthers';
import { dnsEncode } from "ethers/lib/utils";
// > require('ethers').utils.dnsEncode('alice123.eth')

// const abi = CcipResolver.abi

const GOERLI_CHAINID = 5
function Search() {

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const { data:resolverAddress, isError, isLoading } = useEnsResolver({
    name: currentUser?.username,
    enabled:!!currentUser?.username,
    chainId: GOERLI_CHAINID
  })
  let encodedName
  try{
    encodedName = dnsEncode(name)
  }catch(e){
    console.log('***search1',{e})
  }
  console.log('***search2', {name, encodedName, abi, resolverAddress})
  const { data , error, isError:contractIsError, isLoading:contractIsLoading } = useContractRead({
    address: resolverAddress,
    abi:["function metadata(bytes)"],
    functionName: 'metadata',
    args: [ encodedName ],
    enabled:!!encodedName && !!resolverAddress,
    chainId: GOERLI_CHAINID
  })
  useEthers(currentUser?.username)
  

  const isArray = (val: unknown): val is number[] => (
    Array.isArray(val)
  );
  console.log('***metadata', {data})
  let networkName: any
  if (isArray(data)) {
    networkName = data[0]
    // const isBigInt = data[1] === typeof "bigint"
    console.log('***metadata2', data[1])
  }
  useEffect(() => {
    if(resolverAddress){
      currentUser?.setResolver({
        name: networkName || 'Goerli',
        address: resolverAddress,
      })
    }    
  }, [resolverAddress, networkName]);

  function handleChange(event:any) {
    setName(event.target.value)
  }
  function searchName() {
    currentUser?.setUsername(name)
  }
  console.log({networkName})
  return (
    <div>
      <Input
        label="Search Name"
        placeholder="vitalik.eth"
        onChange={handleChange}
      />
      <Button
        onClick={searchName}
        style={{width:'100px'}}
      >Search</Button>
    </div>
  )
}
export default Search;