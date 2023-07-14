import React, { useState, useEffect, createContext } from 'react';
// interface CurrentUserContextType {
//   username: string;
// }
interface ResolverType {
    name?: string,
    address?: string
}

interface CurrentUserContextType {
    username?: string | null
    resolver?: ResolverType | null
    // network: string | null
    // twitter: string;
    setUsername: (name: string) => void
    setResolver: (address: any) => void
    // setNetwork: (network: any) => void 
    // handleTwitter: () => void
}
  
  
const CurrentUserContext = createContext<CurrentUserContextType | null>(null);
export default CurrentUserContext
  