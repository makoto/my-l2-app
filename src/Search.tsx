import { useState, useContext, useEffect } from 'react';
import { useEnsResolver, useContractRead, useAccount, useBalance, useConnect, useDisconnect, useNetwork } from 'wagmi'
import { Input,  Button } from '@ensdomains/thorin'
import { gql, useQuery } from '@apollo/client';
import { utils } from 'ethers'
import CurrentUserContext from './Context'
// import CcipResolver from './CcipResolver.json'
import {abi} from './CcipResolver'
import useEthers from './useEthers';
import { dnsEncode } from "ethers/lib/utils";
const GOERLI_CHAINID = 5
const GET_NAME = gql`
  query GetDomains($name: String!) {
    domains(where:{name:$name}) {
      id
      name
      labelName
      labelhash
      wrappedOwner{
        id
      }
      owner{
        id
      }
    }
  }
`;

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
    console.log('***search error',{e})
  }
  const { data , error, isError:contractIsError, isLoading:contractIsLoading } = useContractRead({
    address: resolverAddress,
    abi,
    functionName: 'metadata',
    args: [ encodedName ],
    enabled:!!encodedName && !!resolverAddress,
    chainId: GOERLI_CHAINID
  })
  useEthers(currentUser?.username)
  const { loading:queryLoading, error:queryError, data:queryData } = useQuery(GET_NAME, {
    variables: { name: currentUser?.username },
    skip:(!currentUser?.username)
  });
  const domain = queryData?.domains?.length > 0 && queryData?.domains[0]
  const extractOwner = (domain:any)=>{
    const id = domain?.wrappedOwner ? domain?.wrappedOwner?.id : domain?.owner?.id
    return id && utils.getAddress(id)
  }
  const nameOwner = extractOwner(domain)
  const isArray = (val: unknown): val is number[] => (
    Array.isArray(val)
  );
  let networkName: any, coinType: any, graphqlUrl: any, storageType: any, encodedData:any
  if (isArray(data)) {
    networkName = data[0]
    coinType = data[1]
    graphqlUrl = data[2]
    storageType = data[3]
    encodedData = data[4]
  }
  useEffect(() => {
    if(resolverAddress){
      currentUser?.setResolver({
        address: resolverAddress,
        networkName,
        coinType,
        graphqlUrl,
        storageType,
        encodedData
      })
    }    
  }, [resolverAddress, networkName]);
  useEffect(() => {
    if(!!nameOwner && !queryLoading){
      currentUser?.setNameOwner(nameOwner)
    }    
  }, [nameOwner]);

  function handleChange(event:any) {
    setName(event.target.value)
  }
  function searchName() {
    currentUser?.setUsername(name)
  }
  function clearName() {
    currentUser?.setResolver({})
    currentUser?.setAddress(null)
    currentUser?.setNameOwner(null)
    currentUser?.setUsername('')
  }

  return (
    <div>
      <Input
        label="Search Name"
        placeholder="vitalik.eth"
        onChange={handleChange}
      />
      <div style={{display:'flex'}}>
        <Button
          onClick={searchName}
          style={{width:'100px'}}
        >Search</Button>
        <Button
          onClick={clearName}
          style={{width:'100px'}}
        >Clear</Button>
      </div>
    </div>
  )
}
export default Search;