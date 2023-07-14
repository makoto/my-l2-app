import { useAccount, useSwitchNetwork, useConnect, useDisconnect } from 'wagmi'
import { getNetwork } from '@wagmi/core'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Input,  Button, Tag } from '@ensdomains/thorin'

function Profile() {
  const { address, connector, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
  const { chain, chains } = getNetwork()
  
  const { isSuccess } = useSwitchNetwork()
  console.log('Profile', {connector, chain, isConnected, isSuccess})

  function getColor(name?:string){
    if(name?.match(/Optimism/)){
      return 'redSecondary'
    }else{
      return 'greenSecondary'
    }
  }

  if (isConnected){
    return (
        <div>
          <div style={{ marginBottom: '1em' }}>
            <Tag colorStyle={getColor(chain?.name)} >{chain?.name}</Tag>
            Connected as {address}
          </div>
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
