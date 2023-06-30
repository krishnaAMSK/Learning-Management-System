import React from 'react'
import '../CSS_Files/Home.css'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      

     <div className='topRight'>
      <Link to="/signup">SignUp</Link> / <Link to="/signin">Signin</Link>
     </div>
     
    </div>
  )
}

export default Home
