import React, { useContext, useState } from 'react';
import './Login.css'
import AuthContext from '../../ContextProvider/Context';

const Login = () => {
  const {LoginA} = useContext(AuthContext)
  const [datauser, setDatauser] = useState({
    username:"",
    password:""
  });


  const handleLogin = () => {
    if((datauser.username === "shivam" && datauser.password === "shivam@123") || 
    (datauser.username === "admin" && datauser.password === "admin@123")){
      LoginA()
    }else{
      alert("Enter Proper Credentials")
    }
  };


    return (
      <div className='Login'>
        <h2>Login Your Food Dish App</h2>
          <div className='Name'>
          <label >Username:</label>
          <input type="text" id="username" required onChange={(e)=>{
            setDatauser({
              ...datauser,
              username:e.target.value
            })}} />
          </div>
          <br />
          <div className='Password'>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" required onChange={(e)=>{
            setDatauser({
              ...datauser,
              password:e.target.value
            })}} />
          </div>
          <br />
          <div className='btn'>
          <button onClick={handleLogin}>Login/SignIn</button>
          </div>
        
      </div>
    );
  }

export default Login;
