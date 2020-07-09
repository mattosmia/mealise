import React, { useState } from 'react';
import PageContext from '../../helpers/pageContext';
import UserContext from '../../helpers/userContext';

export default function AppProvider({ user, isLoading, setIsLoading, children }) {
  return (
    <PageContext.Provider
      value={{
        isLoading,
        setIsLoading
      }}>
      <UserContext.Provider value={user}>
        { children }
      </UserContext.Provider>
    </PageContext.Provider>
  )
}