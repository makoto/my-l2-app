import { useAccount, useBalance, useConnect, useDisconnect, useNetwork } from 'wagmi'
// import { getNetwork } from '@wagmi/core'


// import { InjectedConnector } from 'wagmi/connectors/injected'
 
function Balance(props:any) {
  console.log('***Balance', props.chainId)
  const { address} = useAccount()
  const { data, isError, isLoading } = useBalance({
    address,
    chainId: props.chainId
  })
  if (isLoading) return <div>Fetching balance…</div>
  if (isError) return <div>Error fetching balance</div>
  return (
    <div>
      Balance: {data?.formatted} {data?.symbol} on chain id {props.chainId}
    </div>
  )
}
export default Balance;