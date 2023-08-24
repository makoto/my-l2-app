import { useAccount, useBalance, useConnect, useDisconnect, useNetwork } from 'wagmi'

function Balance(props:any) {
  const { address} = useAccount()
  const { data, isError, isLoading } = useBalance({
    address,
    chainId: props.chainId
  })
  if (isLoading) return <div>Fetching balance…</div>
  if (isError) return <div>Error fetching balance</div>
  if(data){
    const balance = parseFloat(data?.formatted)
    return (
      <div>
        <span>
          Balance: {balance.toFixed(3)} {data.symbol} on chain id {props.chainId}
          {props.chainId === 5 && ('(Goerli)')}
          {props.chainId === 420 && ('(OP Goerli)')}
          {props.chainId === 84531 && ('(Base Goerli)')}
        </span>
        {(balance === 0 && props.chainId === 420) && (
          <span style={{color:"red"}}>(Bridge ETH from <a href="https://app.optimism.io/bridge/deposit" target="_blank">the bridge</a>)</span>
        )}
      </div>  
    )
  }else{
    return(<div></div>)
  }

}
export default Balance;