import React, { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { useSelector , useDispatch } from 'react-redux'
import { useNavigate   } from 'react-router-dom'
import { toast } from 'react' 
import { register , reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
 
function Register() {
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    password2:'',
  })
  
  const { name , email , password , password2} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user , isLoading , isError , isSuccess  , message } = useSelector (
    (state) => state.auth)

    useEffect(()=>{

      if (isError) {
        toast.error(message,"kjnk")
      }
      if(isSuccess || user){
        navigate('/')
      }
      dispatch(reset())
    },[user , isError , isSuccess , message , navigate , dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (password !== password2) {
      toast.error('password do not match ')
    }else{
      const userData = {
        name,
        email,
        password
      }
      dispatch(register(userData))
      navigate('/')
    }
  }

  if (isLoading) {
    return <Spinner/>
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
