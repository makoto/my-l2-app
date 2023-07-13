import React, { useState, useContext } from 'react'
import { ThemeProvider } from 'styled-components'
import { Heading, Typography, ThorinGlobalStyles, lightTheme } from '@ensdomains/thorin'
import Search from './Search'
import CurrentUserContext from './Context'

const MyComponent = () => {
  const currentUser = useContext(CurrentUserContext);

  return <p>The current user is {currentUser?.username}.</p>;
};

const App = () => {
  const [username, setUsername] = useState('')
  return (
    <ThemeProvider theme={lightTheme}>
      <ThorinGlobalStyles />
      <Heading>L2 Resolver</Heading>
      <Typography>The quick brown foxsss…</Typography>

      <CurrentUserContext.Provider value={{username, setUsername}}>
        <MyComponent />
        <Search />
      </CurrentUserContext.Provider>
    </ThemeProvider>
  )
}

export default App;