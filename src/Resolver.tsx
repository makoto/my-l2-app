import React, { useState, useContext } from 'react'
import CurrentUserContext from './Context'
import { Input,  Button, Field, Dropdown } from '@ensdomains/thorin'
import Record from './Record'
import { useAccount, useBalance, useConnect, useDisconnect } from 'wagmi'
import { getNetwork } from '@wagmi/core'
import { InjectedConnector } from 'wagmi/connectors/injected'

const Resolver = () => {
    const currentUser = useContext(CurrentUserContext);
    const { connect } = useConnect({
      connector: new InjectedConnector(),
    })
    const { address, connector, isConnected } = useAccount()
    const { disconnect } = useDisconnect()
    const { chain, chains } = getNetwork()
    console.log({chain, chains})
    if(currentUser?.resolver){
      return (
        <div>
          <div style={{ marginBottom: '1em' }}>The current resolver is {currentUser?.resolver}.</div>
          <Dropdown
            align="left"
            items={[
              {
                label: 'Goerli Resolver',
                onClick: () => {
                  connect({
                    chainId: 5,
                    connector: new InjectedConnector(),
                  })
                },  
                color: 'text'
              },
              {
                label: 'Op Goerli Resolver',
                onClick: () => {
                  connect({
                    chainId: 420,
                    connector: new InjectedConnector(),
                  })
                },  
                color: 'red'
              },
            ]}
            label="Select Resolver"
          />




          <Record></Record>
        </div>
      );
    }else{
      return(<></>)
    }
  };
  export default Resolver