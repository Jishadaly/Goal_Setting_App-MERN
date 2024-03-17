
import React, { useEffect, useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useDispatch , useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {adminLogin,reset} from '../../features/adminAuth/adminAuthSlice'


function AdminLogin() {
  const [formData , setFormData] = useState({
     email : '',
     password : '',
  })
  
  const { email , password } = formData
  console.log(email,password);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { admin  , isError , isSuccess  , message } = useSelector (
    (state) => state.adminAuth)

    useEffect(()=>{
      if (isError) {
        toast.error(message ,"errorr")
      }
      if (isSuccess || admin) {
        navigate('/admin')
      }
      dispatch(reset())
    },[admin  , isError , isSuccess  , message , dispatch,navigate ])
    
 const onChange = (e) =>{
  setFormData((prevState)=> ({
    ...prevState,
    [e.target.name] : e.target.value
  }))
 } 
 

 const onSubmit =(e)=>{
  e.preventDefault()
    const userData = {
      email,
      password
    } 

    dispatch(adminLogin(userData))
    navigate('/admin')

 }

 console.log(formData);

  return (
    <>
      <section>
        <h1>
          <FaSignInAlt /> Admin Login
        </h1>
        <p > Sign In and explore </p>
      </section>

      <section className="form">
        <form 
        onSubmit={onSubmit}
        >

          

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

export default AdminLogin
