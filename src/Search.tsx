import { useState, useContext, useEffect } from 'react';
import { useEnsResolver, useContractRead, useAccount, useBalance, useConnect, useDisconnect, useNetwork } from 'wagmi'
import { Input,  Button } from '@ensdomains/thorin'
import { gql, useQuery } from '@apollo/client';
import { utils } from 'ethers'
import CurrentUserContext from './Context'
import {abi} from './CcipResolver'
import { dnsEncode } from "ethers/lib/utils";
import { L1_CHAIN_ID, convertCoinTypeToEVMChainId } from './utils'
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

function Search(props:any) {

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(props.name || '');
  console.log({currentUser})
  const { data:resolverAddress, isError, isLoading, refetch } = useEnsResolver({
    name: currentUser?.username,
    enabled:!!currentUser?.username,
    chainId: L1_CHAIN_ID
  })
  let encodedName
  try{
    encodedName = dnsEncode(currentUser?.username || '')
  }catch(e){
    console.log('***search error',{e})
  }
  const { data , error, isError:contractIsError, isLoading:contractIsLoading, refetch:refetchMetadata } = useContractRead({
    address: resolverAddress,
    abi,
    functionName: 'metadata',
    args: [ encodedName ],
    enabled:!!encodedName && !!resolverAddress,
    chainId: L1_CHAIN_ID
  })
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
  const isWrapped = !!domain?.wrappedOwner
  const isArray = (val: unknown): val is number[] => (
    Array.isArray(val)
  );
  let networkName: any, coinType: any, graphqlUrl: any
  let storageType: any, storageLocation: any, context:any
  if (isArray(data)) {
    networkName = data[0]
    coinType = Number(data[1])
    graphqlUrl = data[2]
    storageType = data[3]
    storageLocation = data[4]
    context = data[5]
  }
  useEffect(() => {
    if(resolverAddress){
      console.log('***convertCoinTypeToEVMChainId2', coinType)
      currentUser?.setResolver({
        address: resolverAddress,
        networkName,
        coinType,
        chainId:convertCoinTypeToEVMChainId(coinType),
        graphqlUrl,
        storageType,
        storageLocation,
        context,
        refetch,
        refetchMetadata
      })
    }    
  }, [resolverAddress, networkName]);
  useEffect(() => {
    if(!!nameOwner && !queryLoading){
      currentUser?.setNameOwner(nameOwner)
      currentUser?.setIsWrapped(isWrapped)
    }    
  }, [nameOwner]);

  function handleChange(event:any) {
    setName(event.target.value)
  }
  function searchName() {
    console.log({name})
    currentUser?.setUsername(name)
    refetch()

  }
  function clearName() {
    currentUser?.setResolver({})
    currentUser?.setNameOwner(null)
    currentUser?.setUsername('')
  }

  return (
    <div>
      <Input
        label="Search Name"
        placeholder="alice123.eth"
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