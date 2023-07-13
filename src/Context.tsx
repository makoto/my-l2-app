import React, { useState, useEffect, createContext } from 'react';
// interface CurrentUserContextType {
//   username: string;
// }
interface CurrentUserContextType {
    username: string;
    // resolver: string;
    // twitter: string;
    setUsername: (name:string) => void
    // handleResolver: () => void
    // handleTwitter: () => void
}
  
  
const CurrentUserContext = createContext<CurrentUserContextType | null>(null);
export default CurrentUserContext
  