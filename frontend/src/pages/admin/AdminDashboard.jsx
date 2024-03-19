import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserList from '../../components/admin/UserList';



function AdminDashboard() {
  
  const {admin} = useSelector((state)=> state.adminAuth)
  const navigate = useNavigate()

  useEffect(()=>{
    
    if (!admin) {
      navigate('/admin/login')
    }
  },[admin , navigate])


  
  return (
    <>
<div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card bg-light shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Welcome, {admin && admin.name}</h2>
              {/* <h3 className="card-title">Admin Details</h3>
              <p className="card-text">Name: { admin && admin.name}</p>*/}
               <p className="card-text"> { admin&& admin.email}</p>
               <div className="text-center">
            <button className="btn" onClick={()=> navigate('/admin/adduser')}>Add User</button>
          </div>
            </div>
            {/* <div className="card-footer text-center">
              <button className="btn btn-primary me-2" onClick={handleUserListClick}>User List</button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
    <UserList/>
    </>
  );

  
}

export default AdminDashboard
