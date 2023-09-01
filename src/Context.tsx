import React, { useState, useEffect, createContext } from 'react';
interface ResolverType {
    address?: string
    networkName?: string,
    coinType?: number
    chainId?: number
    graphqlUrl?: any
    storageType?: any
    storageLocation?: any
    context?: any
    parentContext?: any
    nameOwner?: string
    refetch?: () => void
    refetchMetadata?: () => void
}

interface CurrentUserContextType {
    username?: string | null
    resolver?: ResolverType | null
    nameOwner?: string | null
    isWrapped?: boolean | null
    setUsername: (name: string) => void
    setResolver: (address: any) => void
    setNameOwner: (address: any) => void
    setIsWrapped: (isWrapped: boolean) => void
}
  
  
const CurrentUserContext = createContext<CurrentUserContextType | null>(null);
export default CurrentUserContext
  