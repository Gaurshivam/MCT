import React from 'react';
import './User.css'

const User = ({first}) => {

  const addDishesToCard = (item) =>{
    //logic to add product details inside the addToCard property of json-server
    fetch("http://localhost:5001/addtocard",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(item),
    })
    .then((res)=>res.json())
      .then(()=>{
        alert("Food Added in your favourite dish")
      })
  }
  return (
    <div className='UserMain'>
      {
        first.map((item,i)=>{
           return(
            <div key={i} className='UserCard'>
                <img src={item.image} alt="DishPhoto" style={{borderRadius:"10px"}} width={300} height={200}  />
                <h2>{item.dishName}</h2>
                <button className='userbtn' onClick={()=>{addDishesToCard(item)}}>Add to Favirote Dish</button>
            </div>
           )
        })
      }
    </div>
  );
}

export default User;