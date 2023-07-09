import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Card.css'

const Card = () => {
    const [dish, setdish] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5001/addtocard"
        ).then((res) => {
            console.log(res.data)
            setdish(res.data)
        })
    }, [])

    const RemoveDishFromFavourite = (id) => {
        fetch(`http://localhost:5001/addtocard/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then(() => {
                alert("Remove dish from Favourite");
                axios.get("http://localhost:5001/addtocard"
                ).then((res) => {
                    console.log(res.data)
                    setdish(res.data)
                })
            })
    }

    // const RemoveDishFromFavourite = (id) =>{
    //     fetch(`http://localhost:5001/addtocard/${id}`)
    // }
    return (
        <div style={{ textAlign: "center" }}>
            <h2> Your Favourite Dishes</h2>
            <div >
                {
                    dish.map((food) => {
                        return (
                            <div className='DishCard'>
                                <div className='FoodLeft'>
                                    <img className='DishImage' src={food.image} alt="DishPhoto" />
                                </div>
                                <div className='FoodRight'>
                                    <h2>{food.dishName}</h2>
                                    <p>{food.description}</p>
                                    <button onClick={()=>{RemoveDishFromFavourite(food.id)}}>Remove</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Card;
