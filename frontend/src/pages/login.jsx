import React, { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'

import { useSelector , useDispatch } from 'react-redux'
import { useNavigate   } from 'react-router-dom'
import { toast } from 'react' 
import { login , reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
  const [formData, setFormData] = useState({
   
    email:'',
    password:'',
   
  })

  const { email , password } = formData

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

  const onSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    
    try {
      await dispatch(login(userData)).unwrap();
      navigate('/');
    } catch (error) {
      if (error && error.message) {
        console.log("erororr///",error.message);
        toast.error(error.message);
      } else {
        // If error object or 'message' property is missing, show a generic error message
        toast.error('An error occurred. Please try again later.');
      }
    }
  };
  

  if (isLoading) {
    return <Spinner/>
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
