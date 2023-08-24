import React, { useState, useContext } from 'react'
import { ThemeProvider } from 'styled-components'
import { WagmiConfig, configureChains, createConfig, mainnet } from 'wagmi'
import { FieldSet, Dropdown, ThorinGlobalStyles, lightTheme } from '@ensdomains/thorin'
import { CopySVG, EthSVG, WalletSVG, MoonSVG, Select, Card } from '@ensdomains/thorin'
import { Checkbox } from '@ensdomains/thorin'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { publicProvider} from 'wagmi/providers/public'
import { goerli, optimismGoerli, baseGoerli } from 'wagmi/chains'
import { createPublicClient, http } from 'viem'
import Profile from './Profile'
import Balance from './Balance'
import Search from './Search'
import Resolver from './Resolver'
import CurrentUserContext from './Context'
import { ethers } from 'ethers';

const { chains, publicClient, webSocketPublicClient} = configureChains([mainnet, goerli, optimismGoerli, baseGoerli], [publicProvider()])
const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})
const App = () => {
  const [username, setUsername] = useState('')
  const [resolver, setResolver] = useState({})
  const [address, setAddress] = useState(null)
  const [network, setNetwork] = useState(null)
  const [nameOwner, setNameOwner] = useState(null)
  const [isWrapped, setIsWrapped] = useState(false)
  
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://api.thegraph.com/subgraphs/name/ensdomains/ensgoerli"
  });

  return (
    <ApolloProvider client={client}>
    <WagmiConfig config={config}>

    <div className="App"   style={{ width: '80%' }}>
    <ThemeProvider theme={lightTheme}>
      <ThorinGlobalStyles />
      <FieldSet legend="L2 Resolver">
        <CurrentUserContext.Provider value={{
          username, setUsername,
          resolver, setResolver,
          nameOwner, setNameOwner,
          isWrapped, setIsWrapped
        }}>
          <Profile></Profile>
      </CurrentUserContext.Provider>
      </FieldSet>
    </ThemeProvider>
    </div>
    </WagmiConfig>
    </ApolloProvider>
  )
}

export default App;