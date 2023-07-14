import { useState, useContext, useEffect } from 'react';
import { useEnsResolver, useContractRead, useAccount, useBalance, useConnect, useDisconnect, useNetwork } from 'wagmi'
import { Input,  Button } from '@ensdomains/thorin'
import CurrentUserContext from './Context'
import CcipResolver from './CcipResolver.json'
const abi = CcipResolver.abi
const GOERLI_CHAINID = 5
function Search() {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const { data:resolverAddress, isError, isLoading } = useEnsResolver({
    name: currentUser?.username,
    enabled:!!currentUser?.username,
    chainId: GOERLI_CHAINID
  })
  const { data , error, isError:contractIsError, isLoading:contractIsLoading } = useContractRead({
    address: resolverAddress,
    abi,
    functionName: 'metadata',
    enabled:!!resolverAddress,
    chainId: GOERLI_CHAINID
  })
  const isArray = (val: unknown): val is number[] => (
    Array.isArray(val)
  );
  let networkName: any
  if (isArray(data)) {
    networkName = data[0]
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