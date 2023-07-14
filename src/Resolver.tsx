import React, { useState, useContext } from 'react'
import CurrentUserContext from './Context'
import { Input,  Button, Field, Dropdown } from '@ensdomains/thorin'
import Record from './Record'
import { useAccount, useSwitchNetwork, useConnect, useDisconnect } from 'wagmi'
import { getNetwork } from '@wagmi/core'
import { InjectedConnector } from 'wagmi/connectors/injected'
import Select from 'react-select'

const options = [
  { value: 5, label: 'Goerli' },
  { value: 420, label: 'Op Goerli' }
]

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
  
    console.log({chain, chains})
    if(currentUser?.resolver){
      return (
        <div>
          <div style={{ marginBottom: '1em' }}>The current resolver is {currentUser?.resolver}.</div>
          <Select placeholder="Select Resolver"  options={options} onChange={(e) => {
            console.log({e})
            if(isConnected){
              switchNetwork?.(e?.value)
            }else{
              connect({
                chainId: e?.value,
                connector: new InjectedConnector(),
              })  
            }
          }} />
          {/* <Dropdown
            align="left"
            items={[
              {
                label: 'Goerli Resolver',
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
                label: 'Op Goerli Resolver',
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
            label="Select Resolver"
          /> */}




          <Record></Record>
        </div>
      );
    }else{
      return(<></>)
    }
  };
  export default Resolver