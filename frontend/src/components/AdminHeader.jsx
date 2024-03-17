import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adminLogout ,reset} from '../features/adminAuth/adminAuthSlice'


const AdminHeader = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch() 

  const onLogout = ()=> {
    dispatch(adminLogout())
    dispatch(reset())
    navigate('/admin/login')
  }

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
            onClick={onLogout}
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
