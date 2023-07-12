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
  // const { address, connector, isConnected } = useAccount()
  // const { connect } = useConnect({
  //   connector: new InjectedConnector(),
  // })
  // const { disconnect } = useDisconnect()
  // const { chain, chains } = getNetwork()


  // if (isConnected){
  //   console.log({connector, chain, chains})
     
  //   return (
  //       <div>
  //         Connected to {address}
  //         <button onClick={() => disconnect()}>Disconnect</button>
  //       </div>
  //     )  
  // }
  // return (
  //   <div>
  //     <button onClick={() => connect({
  //           chainId: 5,
  //           connector: new InjectedConnector(),
  //     })}>Connect Goerli</button>
  //     <button onClick={() => connect({
  //           chainId: 1,
  //           connector: new InjectedConnector(),
  //     })}>Connect Mainnet</button>
  //   </div>
  // )
}
export default Balance;