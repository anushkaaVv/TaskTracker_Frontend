import React from 'react'
import { useEffect } from 'react'
import myimagecopy from "../images/myimage copy.png"
const Home = () => {

  useEffect(() =>{
    document.title = "Task Tracker||Home";

}, [])

  return (
    <div className="home">
    <h1 className="homeHeading" > what's your plan for the day?</h1>
   
    
    <img src={myimagecopy} alt='homeImage' className='image'></img>
    <p className="paragraph" >Get ready to track your task</p>
     
     </div>
  )
}

export default Home