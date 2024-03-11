import React, { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'

function Login() {
  const [formData, setFormData] = useState({
   
    email:'',
    password:'',
   
  })

  const { email , password } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <section>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p > Sign In and explore </p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>

          

          <div className="form-group">
          <input
             type="text"
             className="form-control"
             id='email'
             name='email'
             placeholder='enter your email'
             onChange={onChange}
             value={email}

            />
          </div>

          <div className="form-group">
          <input
             type="text"
             className="form-control"
             id='password'
             name='password'
             placeholder='enter your password'
             onChange={onChange}
             value={password}

            />
          </div>

          

          <div className="from-group">
            <button type="submit" className='btn btn-block'> Sing In</button>
          </div>
          
        </form>
      </section>
    </>
  )
}

export default Login
