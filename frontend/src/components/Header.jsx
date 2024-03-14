import React, { useState } from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { UseSelector, useDispatch, useSelector } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth)
  console.log(user);

  const onLogout =()=>{
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <div>
      <header className='header'>
        <div className="logo">
          <Link to='/'> goalSetter </Link>
        </div>
        <ul>
          
        { user ? (
        <ul>
        <li>

        <Link to='/profile'>
                  <FaUser /> Profile
                </Link>
             
            </li>
            <li>

            <button className='btn' onClick={onLogout}>
            <FaSignOutAlt /> logout
            </button>
         
        </li></ul>

            ) : (<>
              <li>
                <Link to='/login'>
                  <FaSignInAlt /> login
                </Link>
              </li>

              <li>
                <Link to='/register'>
                  <FaUser /> register
                </Link>
              </li>
            </>)}
          


        </ul>
      </header>
    </div>
  )
}

export default Header
