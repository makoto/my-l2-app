import { useState, useContext } from 'react';
import { useAccount, useBalance, useConnect, useDisconnect, useNetwork } from 'wagmi'
import { Input,  Button } from '@ensdomains/thorin'
import CurrentUserContext from './Context'
// import { getNetwork } from '@wagmi/core'

function Search() {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  function handleChange(event:any) {
    setName(event.target.value)
  }
  function searchName() {
    currentUser?.setUsername(name)
  }

  return (
    <div>
      <Input
        label="Search Name"
        placeholder="vitalik.eth"
        onChange={handleChange}
      />
      <Button
        onClick={searchName}
      >Search</Button>
    </div>
  )
}
export default Search;