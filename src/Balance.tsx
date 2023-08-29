import { useAccount, useBalance, useConnect, useDisconnect, useNetwork } from 'wagmi'
import { L1_CHAIN_ID, OP_CHAIN_ID, BASE_CHAIN_ID } from './utils'
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
          {props.chainId === L1_CHAIN_ID && ('(Goerli)')}
          {props.chainId === OP_CHAIN_ID && ('(OP Goerli)')}
          {props.chainId === BASE_CHAIN_ID && ('(Base Goerli)')}
        </span>
        {(balance === 0 && props.chainId === OP_CHAIN_ID) && (
          <span style={{color:"red"}}>(Bridge ETH from <a href="https://app.optimism.io/bridge/deposit" target="_blank">the bridge</a>)</span>
        )}
        {(balance === 0 && props.chainId === BASE_CHAIN_ID) && (
          <span style={{color:"red"}}>(Bridge ETH from <a href="https://goerli-bridge.base.org/deposit" target="_blank">the bridge</a>)</span>
        )}
      </div>  
    )
  }else{
    return(<div></div>)
  }

}
export default Balance;