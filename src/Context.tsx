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
    address?: string | null
    // twitter: string;
    setUsername: (name: string) => void
    setResolver: (address: any) => void
    setAddress: (address: any) => void
    // handleTwitter: () => void
}
  
  
const CurrentUserContext = createContext<CurrentUserContextType | null>(null);
export default CurrentUserContext
  