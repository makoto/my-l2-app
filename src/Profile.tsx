import { useAccount, useBalance, useConnect, useDisconnect } from 'wagmi'
import { getNetwork } from '@wagmi/core'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Input,  Button, Field } from '@ensdomains/thorin'

function Profile() {
  const { address, connector, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
  const { chain, chains } = getNetwork()
  if (isConnected){
    console.log({connector, chain, chains})     
    return (
        <div>
          <div style={{ marginBottom: '1em' }}>Connected to {chain?.name} as {address}</div>
          <div>
            <Button style={{width: "150px"}} onClick={() => disconnect()}>Disconnect</Button>
          </div>
        </div>
      )  
  }
  return (
    <div>
      <Button style={{width: "150px"}} onClick={() => connect({
            chainId: 5,
            connector: new InjectedConnector(),
      })}>Connect</Button>
    </div>
  )
}
export default Profile;
