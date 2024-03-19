import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllusers, reset ,blockUser , editUser } from '../../features/adminAuth/adminAuthSlice';
import { FaSearch } from 'react-icons/fa';



function UserList() {

  const dispatch = useDispatch()
  const users = useSelector((state) => state.adminAuth.users)
  const isLoading = useSelector((state) => state.adminAuth.isLoading)
  
  
  const [searchQuery , setSearch ] = useState('')
  const [filterdUsers , setFilterdUsers] = useState([])


  useEffect(() => {
    dispatch(getAllusers())

    return () => {
      dispatch(reset())
    }

  }, [dispatch])


  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilterdUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilterdUsers(filtered);
    }
  }, [searchQuery, users]);
  

  const handleBlock = (userId) => {
    if (window.confirm("Are you sure want to block the user?")) {
      dispatch(blockUser(userId))
    }
  }

  const handleEdit = (userId , name , email) => {
      const newName =  prompt("Enter your New Name :",name);
      const newEmail = prompt("Enter your new Email :",email)

      if (newName === null || newEmail === null) {
        return;
      }
      if (newName && newEmail) {
         dispatch(editUser({userId , name:newName ,email:newEmail }))
      }
  }

  return (
    <div className="user-list">
      <div style={{display:'flex'}}  className='form-group'>
            <input style={{height:'35px'}} className='form-control' placeholder='username/email'  type='text'
      value={searchQuery}
      onChange={(e)=> setSearch(e.target.value)}/>
            <button style={{height:'35px',marginLeft:'10px'}} className='btn-1'> <FaSearch/> Search</button>
        </div>
      
  {filterdUsers && filterdUsers.length > 0 ? (
    <table>
      <thead>
        <tr>
          <th>Sl No</th>
          <th>Photo</th>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {filterdUsers.map((user, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              <img
                src={
                  user?.profileURL
                    ? user.profileURL
                    : "https://avatar.iran.liara.run/public/boy?username=Ash"
                }
                alt="User 2"
              />
            </td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.isBlocked ? "Blocked" : "Unblocked"}</td> 
            <td className="action-buttons">
            <div className="table-button">
            <button onClick={() => handleBlock(user._id)}  className="btn">{user.isBlocked ? "Unblock" : "Block"}</button>
            <button onClick={() => handleEdit (user._id , user.name , user.email) }  className="btn">Edit</button>
            </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>No users available</p>
  )}
  {isLoading && <p>Loading...</p>}
</div>

 
  )
}

export default UserList