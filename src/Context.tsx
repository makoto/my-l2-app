import React, { useState, useEffect, createContext } from 'react';
// interface CurrentUserContextType {
//   username: string;
// }
interface ResolverType {
    address?: string
    networkName?: string,
    coinType?: any
    graphqlUrl?: any
    storageType?: any
    encodedData?: any
}

interface CurrentUserContextType {
    username?: string | null
    resolver?: ResolverType | null
    address?: string | null
    // twitter: string;
    setUsername: (name: string) => void
    setResolver: (address: any) => void
    setAddress: (address: any) => void
    // handleTwitter: () => void
}
  
  
const CurrentUserContext = createContext<CurrentUserContextType | null>(null);
export default CurrentUserContext
  