

import { useParams, Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const GET_ACCOUNT = gql`
  query GetAccount($address: String!) {
    account(id:$address){
      id
      contexts{
        name
        resolvedAddress
        context
      }
      delegated{
        name
      }
    }  
  }
`;
const baseClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://api.studio.thegraph.com/query/1397/ens-base-subgraph-makototest1/version/latest'
})

const opClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://api.thegraph.com/subgraphs/name/makoto/ens-l2-subgraph-makototest1'
})

const List = (props:any) => {
  const contexts = props?.queryData?.account?.contexts?.filter((d:any) => { return d.name !== 'eth'}) || []
  const delegations = props?.queryData?.account?.delegated?.filter((d:any) => { return d.name !== 'eth'}) || []
  const hasContexts = contexts.length > 0
  const hasDelegated = delegations.length > 0
  return(
    <div>
    {
      hasContexts && (
        <div>
        <h5>{contexts.length} domains under the context found on {props.title}</h5>
        <ul>
          {
            contexts.map((domain:any)=>{
              return (<li><Link to={`/name/${domain.name}`}>{domain.name}</Link></li>)
            })
          }
        </ul>
        </div>
      )
    }
    {
      hasDelegated && (
        <div>
        <h5>{delegations.length} domains delegated found on {props.title}</h5>
        <ul>
          {
            delegations.map((domain:any)=>{
              return (<li>{domain.name}</li>)
            })
          }
        </ul>
        </div>
      )
    }
    </div>
  )
}

function User() {
  const { address:userAddress } = useParams()  
  const { data:baseData } = useQuery(GET_ACCOUNT, {
    client: baseClient,
    variables: { address:userAddress?.toLocaleLowerCase() }
  });
  const { data:opData } = useQuery(GET_ACCOUNT, {
    client: opClient,
    variables: { address:userAddress?.toLocaleLowerCase() }
  });

  return (
    <div>
      <h3>{userAddress}</h3>
      <List queryData={baseData} title={'Base'} ></List>
      <List queryData={opData} title={'Optimism'} ></List>
    </div>
  )
}  
export default User
