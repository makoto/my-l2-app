import React, { useState, useContext } from 'react'
import { ThemeProvider } from 'styled-components'
import { WagmiConfig, configureChains, createConfig, mainnet } from 'wagmi'
import { FieldSet, Heading, Typography, ThorinGlobalStyles, lightTheme, darkTheme } from '@ensdomains/thorin'
import { publicProvider} from 'wagmi/providers/public'
import { goerli, optimismGoerli } from 'wagmi/chains'
import { createPublicClient, http } from 'viem'
import Profile from './Profile'
import Balance from './Balance'
import Search from './Search'
import Resolver from './Resolver'
import CurrentUserContext from './Context'
const { chains, publicClient, webSocketPublicClient} = configureChains([mainnet, goerli, optimismGoerli], [publicProvider()])
const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})
const MyUser = () => {
  const currentUser = useContext(CurrentUserContext);
  if(currentUser?.username){
    return <p>The current user is {currentUser?.username}.</p>;
  }else{
    return(<></>)
  }
};

const App = () => {
  const [username, setUsername] = useState('')
  const [resolver, setResolver] = useState(null)
  return (
    <WagmiConfig config={config}>

    <div className="App"   style={{ width: '80%' }}>
    <ThemeProvider theme={lightTheme}>
      <ThorinGlobalStyles />
      <FieldSet legend="L2 Resolver">
      <Profile></Profile>
      <Balance></Balance>
        <CurrentUserContext.Provider value={{
          username, setUsername,
          resolver, setResolver
        }}>
          <Search />
          <MyUser />
          <Resolver />
          
      </CurrentUserContext.Provider>
    
      </FieldSet>
    </ThemeProvider>
    </div>
    </WagmiConfig>
  )
}

export default App;