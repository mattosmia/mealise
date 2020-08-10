import React from 'react';
import PageContext from '../../helpers/pageContext';
import UserContext from '../../helpers/userContext';

export default function AppProvider({ user, setUser, isLoading, setIsLoading, children }) {
  return (
    <PageContext.Provider
      value={{
        isLoading,
        setIsLoading
      }}>
      <UserContext.Provider
        value={{
          user,
          setUser
      }}>
        { children }
      </UserContext.Provider>
    </PageContext.Provider>
  )
}