import React, { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'

function Register() {
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    password2:'',
  })

  const { name , email , password , password2} = formData

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
          <FaUser /> register
        </h1>
        <p > create an account </p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
          <input
             type="text"
             className="form-control"
             id='name'
             name='name'
             placeholder='enter your name'
             value={name}
             onChange={onChange}
             
            />
          </div>

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

          <div className="form-group">
          <input
             type="text"
             className="form-control"
             id='password2'
             name='password2'
             placeholder='Confirm  password'
             onChange={onChange}
             value={password2}

            />
          </div>

          <div className="from-group">
            <button type="submit" className='btn btn-block'> Submit</button>
          </div>
          
        </form>
      </section>
    </>
  )
}

export default Register
