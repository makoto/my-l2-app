
import React, { useState, useContext } from 'react'
import { useAccount, useSwitchNetwork, useConnect, useDisconnect } from 'wagmi'
import { getNetwork } from '@wagmi/core'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Card,  Button, Tag } from '@ensdomains/thorin'
import Balance from './Balance'
import Search from './Search'
import Resolver from './Resolver'
import CurrentUserContext from './Context'
import { L1_CHAIN_ID, OP_CHAIN_ID, BASE_CHAIN_ID } from './utils'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
function Profile() {
  const { name } = useParams()
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
              as <Link to={`/user/${address}`}>{address}</Link>
            </div>
          </div>
          <div>
            <Balance chainId={ L1_CHAIN_ID } ></Balance>
            <Balance chainId={ OP_CHAIN_ID } ></Balance>
            <Balance chainId={ BASE_CHAIN_ID } ></Balance>
            <Search name={name} />
            <Resolver />
          </div>
        </div>
      )  
  }
  return (
    <div>
      <Button style={{width: "150px"}} onClick={() => connect({
            chainId: L1_CHAIN_ID,
            connector: new InjectedConnector(),
      })}>Connect</Button>
    </div>
  )
}
export default Profile;
