import React, { useState, useContext } from 'react'
import CurrentUserContext from './Context'
import { Input,  Button, Field, Dropdown } from '@ensdomains/thorin'
import Record from './Record'
import { useAccount, useSwitchNetwork, useConnect, useDisconnect } from 'wagmi'
import { getNetwork } from '@wagmi/core'
import { InjectedConnector } from 'wagmi/connectors/injected'

const Resolver = () => {
    const currentUser = useContext(CurrentUserContext);
    const { connect } = useConnect({
      connector: new InjectedConnector(),
    })
    const { address, connector, isConnected } = useAccount()
    const { disconnect } = useDisconnect()
    const { chains, error, isLoading, pendingChainId, switchNetwork, isSuccess } =
    useSwitchNetwork()
    const { chain } = getNetwork()
  
    console.log({chain, chains, currentUser})
    if(currentUser?.resolver?.address){
      return (
        <div>
          <div style={{ marginBottom: '1em' }}>
            The current resolver is {currentUser?.resolver.address} on {currentUser?.resolver.name}
          </div>
          <Record></Record>

          <Dropdown
            align="left"
            items={[
              {
                label: 'Goerli',
                onClick: () => {
                  console.log('***Clicked')
                  if(isConnected){
                    switchNetwork?.(5)
                  }else{
                    connect({
                      chainId: 5,
                      connector: new InjectedConnector(),
                    })  
                  }
                },  
                color: 'text'
              },
              {
                label: 'Op Goerli',
                onClick: () => {
                  if(isConnected){
                    switchNetwork?.(420)
                  }else{
                    connect({
                      chainId: 420,
                      connector: new InjectedConnector(),
                    })  
                  }
                },  
                color: 'red'
              },
            ]}
            label="Switch Network"
          />
        </div>
      );
    }else{
      return(<></>)
    }
  };
  export default Resolver