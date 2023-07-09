import React, { useContext } from 'react';
import {  Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login'
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home';
import AuthContext from './ContextProvider/Context';
import Card from './Components/Card/Card';

const App = () => {
  const {loggedIn}  = useContext(AuthContext);

  return (
  <div className='App'>
     {loggedIn ? <Navbar   /> : null}
    <Routes>
    {loggedIn ? (<Route path='/'  element={<Home />} />):(<Route path='/'  element={<Login />} />)}
    {loggedIn ? (<Route path='/add' element={<Card />}/>) : (<Route path='/'  element={<Login />} />)}
    </Routes>
  </div>
  );
};

export default App;
