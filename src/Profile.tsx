
import React, { useState, useContext } from 'react'
import { useAccount, useSwitchNetwork, useConnect, useDisconnect } from 'wagmi'
import { getNetwork } from '@wagmi/core'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Card,  Button, Tag } from '@ensdomains/thorin'
import Balance from './Balance'
import Search from './Search'
import Resolver from './Resolver'
import CurrentUserContext from './Context'

function Profile() {
  const { address, connector, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
  const { chain } = getNetwork()
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
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button style={{width: "150px"}} onClick={() => disconnect()}>Disconnect</Button>
            <div>
              Connected on
              <Tag style={{ display: 'inline'  }} colorStyle={getColor(chain?.name)} >{chain?.name}</Tag>
              as {address} 
            </div>
          </div>
          <div>
            <Balance chainId={5} ></Balance>
            <Balance chainId={420} ></Balance>
            <Balance chainId={84531} ></Balance>
            <Search />
            <Resolver />
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
