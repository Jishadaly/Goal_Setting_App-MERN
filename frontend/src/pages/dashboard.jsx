import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate()
  const {user} = useSelector((state)=> state.auth)
  console.log(user);

  useEffect(()=>{
    
    if (!user) {
      navigate('/login')
    }
  },[user , navigate])
  
  return (
    <div>
       <section className="heading">
        <h1> Dashboard</h1>
        <p>Welcome {user && user.name}</p>
      </section>
    </div>
  )
}

export default Dashboard
