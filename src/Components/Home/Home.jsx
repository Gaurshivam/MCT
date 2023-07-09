import React, { useEffect, useState } from 'react';
import axios from 'axios'
import User from '../User/User';
import './Home.css'

const Home = () => {
  const [first, setfirst] = useState([])

  useEffect(()=>{
    axios.get("http://localhost:5001/posts"
    ).then((res)=>{
          console.log(res.data)
          setfirst(res.data)
    })
  },[])
  return (
    <div style={{textAlign:"center",width:"100vw"}}>
    <div className='MainImageApp'>
    <h2 className='HomeH1'>Choose Your favourite Dishes</h2>
    <p className='HomeP'>"Discover the flavors of delight"</p>
       <img src='https://images.pexels.com/photos/9016734/pexels-photo-9016734.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
       width='100%' height={350} alt='LandingPhoto'  />
      </div>
      <User first={first}/>
    </div>
  );
}

export default Home;
