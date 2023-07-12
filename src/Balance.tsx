import { useAccount, useBalance, useConnect, useDisconnect, useNetwork } from 'wagmi'
// import { getNetwork } from '@wagmi/core'


// import { InjectedConnector } from 'wagmi/connectors/injected'
 
function Balance() {
  const { address} = useAccount()
  const { chain } = useNetwork()
  const { data, isError, isLoading } = useBalance({
    address,
    chainId: chain?.id
  })
  if (isLoading) return <div>Fetching balance…</div>
  if (isError) return <div>Error fetching balance</div>
  return (
    <div>
      Balance: {data?.formatted} {data?.symbol}
    </div>
  )
}
export default Balance;