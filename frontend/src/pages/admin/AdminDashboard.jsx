import axios from 'axios';
import React, { useEffect } from 'react'



function AdminDashboard() {
  
  useEffect(()=>{
   const fetchData = async() =>{
     try {
        const response = await axios.get(`/api/admin/userData`)
        console.log(response.data);
     } catch (error) {
      console.log(error);
     }
   }
   fetchData()
  },[])
   // Dummy admin data (replace with actual data)
   const adminData = {
    name: 'Admin',
    email: 'admin@example.com'
  };

  const handleUserListClick = () => {
    // Handle user list button click
  };

  
  return (
<div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card bg-light shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Welcome, Admin</h2>
              <h3 className="card-title">Admin Details</h3>
              <p className="card-text">Name: {adminData.name}</p>
              <p className="card-text">Email: {adminData.email}</p>
            </div>
            <div className="card-footer text-center">
              <button className="btn btn-primary me-2" onClick={handleUserListClick}>User List</button>
              {/* <button className="btn btn-danger" onClick={handleLogoutClick}>Logout</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard
