import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllusers, reset } from '../../features/adminAuth/adminAuthSlice';


function UserList() {

  const dispatch = useDispatch()
  const users = useSelector((state) => state.adminAuth.users)
  const isLoading = useSelector((state) => state.adminAuth.isLoading)
  console.log(isLoading);
  console.log("usersss", users);

  useEffect(() => {
    dispatch(getAllusers())

    return () => {
      dispatch(reset())
    }

  }, [dispatch])

  return (
    <div className="user-list">
      {isLoading && <p>Loading...</p>}



      {

       users && users.length > 0 ? (
        
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
            {users.map((user, index) => (

              <tr key={index}>
                <td>{index+1} </td>
                <td>
                  <img src={user ?.profileURL ? user.profileURL :  "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg" } 
                  alt="User 2" />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>Inactive</td>
                <td className="action-buttons">
                  <div className="table-button">
                    <button className="btn">Unblock</button>
                    <button className="btn-1">Edit</button>
                  </div>
                </td>
              </tr>
            ))}
     </tbody>
        </table>
  ) : (
    <p>No users available</p>
  )
}
       
</div>
 
  )
}

export default UserList
