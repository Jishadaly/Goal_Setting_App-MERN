import React from 'react'
import {FaSignInAlt , FaSignOutAlt , FaUser} from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
      <header className='header'>
      <div className="logo">
        <Link to= '/'> goalSetter </Link>
      </div>
      <ul>
        <li>
          <Link to='/login'>
            <FaSignInAlt/> login
          </Link>
        </li>

        <li>
          <Link to='/register'>
            <FaUser/> register
          </Link>
        </li>

      </ul>
      </header>
    </div>
  )
}

export default Header
