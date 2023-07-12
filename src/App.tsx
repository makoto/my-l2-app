import React from 'react';
import logo from './logo.svg';
import './App.css';
import { WagmiConfig, configureChains, createConfig, mainnet } from 'wagmi'
import { publicProvider} from 'wagmi/providers/public'
import { goerli} from 'wagmi/chains'
import { createPublicClient, http } from 'viem'
import Profile from './Profile'
import Balance from './Balance'

const { chains, publicClient, webSocketPublicClient} = configureChains([mainnet, goerli], [publicProvider()])

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <WagmiConfig config={config}>
          <Profile />
          <Balance />
        </WagmiConfig>
      </header>
    </div>
  );
}

export default App;