import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from './Navbar'

const Home = () => {
  return (
    <div>
        <NavBar/>
           <Link to={"/signup"}>signup</Link>
        <Link to={"/signin"}>Login</Link>
    </div>
  )
}

export default Home