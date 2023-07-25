import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import authContext from './components/store/AuthContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
   
useEffect(()=>{
  const storedUserloggedInInformation=localStorage.getItem('isLoggedIn')
  if(storedUserloggedInInformation==='1')
  {
    setIsLoggedIn('true')
  }
},[])
  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "1")
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
   
      <authContext.Provider value={{isLoggedIn: isLoggedIn, onLogout: logoutHandler}}>
      <MainHeader onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
      </authContext.Provider>
    
  );
}

export default App;
