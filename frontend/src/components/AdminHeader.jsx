import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'


const AdminHeader = () => {
  return (
    <div>
      <header className='header'>
        <div className="logo">
          {/* <Link to='/'>  */}
          goalSetter
           {/* </Link> */}
          
        </div>
        <ul>
          
        {/* { user ?
         ( */}
        <ul>
        <li>

        {/* <Link to='/profile'> */}
                  <FaUser /> Profile
                {/* </Link> */}
             
            </li>
            <li>

            <button className='btn' 
            // onClick={onLogout}
            >
            <FaSignOutAlt /> logout
            </button>
         
        </li></ul>

            {/* // ) : ( */}
            <>
              

             
            </>
            {/* )} */}
          


        </ul>
      </header>
    </div>
  )
}

export default AdminHeader
