import React, { createContext, useState } from 'react'

export  const AuthContext = createContext()
export default function AuthProvider({children}) {
    
    
    const [searchv, setSearchv] = useState()

  return (
      <AuthContext.Provider value={{setSearchv , searchv}}>
        {children}
      </AuthContext.Provider>
  )
}
