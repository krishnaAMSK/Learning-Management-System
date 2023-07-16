import React from 'react'
import "./Footer.css"

const Footer = () => {
  return (
    <>
      <section className='newletter'>
        <div className='container flexSB'>
            <div className="left row">
                <h1>Newsletter-Stay tune and get the latedt update</h1>
                <spap>far far away,behind the word mountains</spap>
            </div>
            <div className="right row">
                <input type="text"  placeholder='Enter email address' />
                <i className="fa fa-paper-plane"></i>
            </div>
        </div>
      </section>
      <footer>
        <div className="container padding">
            <div className="box logo">
                <h1>LMS</h1>
                <span>learning management system</span>
            </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
