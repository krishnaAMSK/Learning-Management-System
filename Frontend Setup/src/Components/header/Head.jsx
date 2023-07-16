import React from 'react'

const Head = () => {
  return (
    <>
      <section className="head">
        <div className="container flexSB">
            <div className="logo">
                <h1>LMS</h1>
                <span>Learning Management System</span>
            </div>

            <div className="social">
                <i className='fab fa-facebook-f icon'></i>
              
        <button className="navbar__button">SignIn</button>
        <button className="navbar__button">SignUp</button>
        
            </div>
        </div>
      </section>
    </>
  )
}

export default Head
