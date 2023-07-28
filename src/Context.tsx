import React, { useState, useEffect, createContext } from 'react';
interface ResolverType {
    address?: string
    networkName?: string,
    coinType?: any
    graphqlUrl?: any
    storageType?: any
    encodedData?: any
    nameOwner?: string
}

interface CurrentUserContextType {
    username?: string | null
    resolver?: ResolverType | null
    address?: string | null
    nameOwner?: string | null
    setUsername: (name: string) => void
    setResolver: (address: any) => void
    setAddress: (address: any) => void
    setNameOwner: (address: any) => void
}
  
  
const CurrentUserContext = createContext<CurrentUserContextType | null>(null);
export default CurrentUserContext
  