import React, { createContext, useEffect, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(()=>{
    // onauthstatechange
    // setTimeout(() => {
      setIsAuthenticated(false)
    // }, 3000);
  }, [])

  const login = (email, password) => {
    try{
      // setUser(userData);
    }catch(e){

    }
  };

  const register = (email, password) => {
    try {
      // setUser(userData);
    } catch(e) {

    }
  };

  const logout = () => {
    try {
      setUser(null);
    } catch(e) {

    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the AuthContext for use in other components
export const useAuth = () => {
  const value = useContext(AuthContext);

  if(!value){
    throw new Error('useAuth must be wrapped inside authcontextprovider')
  }
  return value;
};
