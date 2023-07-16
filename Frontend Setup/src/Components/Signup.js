import React from 'react'
import '../CSS_Files/Signup.css'
import { Link } from 'react-router-dom'
const Signup = () => {
  return (
      <div class="box">
            <p class="para">Sign Up</p>
            <form action=" " class="form1">
                <input type="text" placeholder="Username" class="signin-username"/>
                <br></br>
                <input type="email" placeholder="Email" class="signin-email"/>
                <br></br>
                <input type="text" placeholder="Password" class="signin-password"/>
                <br></br><br></br><br></br>
                <input type="submit" value="Submit" class="submit"/>
                <div class="hello">If you already have an account, click here <Link to="/signin">Sign In</Link></div>
            </form>
        </div>
  )
}

export default Signup
