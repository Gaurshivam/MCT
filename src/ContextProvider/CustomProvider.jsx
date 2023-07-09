import React, { useState } from 'react';
import AuthContext from './Context';

const CustomProvider = ({children}) => {
    const [loggedIn, setLoggedIn] = useState(false);

    const LoginA = () =>{
      setLoggedIn(true)
    }
  
    const LoginB = () =>{
      setLoggedIn(false)
    }
  return (
    <div>
      <AuthContext.Provider value={{loggedIn,LoginA,LoginB}}>
        {children}
      </AuthContext.Provider>
    </div>
  );
}

export default CustomProvider;
