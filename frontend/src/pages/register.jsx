import React, { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { useSelector , useDispatch } from 'react-redux'
import { useNavigate   } from 'react-router-dom'
import { toast } from 'react-toastify' 
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

      if (isError && message) {
        toast.error(message,"error")
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
    e.preventDefault()
     // Form validation
        if (!name || !email || !password || !password2) {
            toast.error('All fields are required');
            return;
        }

        if (!isValidEmail(email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return;
        }

        
    if (password !== password2) {
      toast.error('password do not match ')
    }else{
      const userData = {
        name,
        email,
        password
      }
      try {
        dispatch(register(userData))
        navigate('/')
        toast.success('registration  successful!');
      } catch (error) {
        toast.error(error.message);

      }

    }
  }
  const isValidEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

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
