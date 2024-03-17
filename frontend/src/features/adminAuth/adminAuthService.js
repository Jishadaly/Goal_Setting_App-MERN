import axios  from "axios";
const API_URL = '/api/admin/'

// login admin

export const adminLogin =  async(adminData) =>{
  const response = await axios.post(API_URL+'adminLogin',adminData)
  console.log(response.data);
  if (response.data) {
    localStorage.setItem('admin',JSON.stringify(response.data))
  }

  return response.data
}

export const adminLogout =()=>{
  localStorage.removeItem('admin')
}



export const getAlluser = async(token)=>{
  const config = {
    headers:{
      Athorization:`Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL+ 'getUserData',config)
  console.log("authservice : ",response.data)

  return response.data
}




const  adminAuthService = {
  adminLogin , adminLogout , getAlluser
}

export default  adminAuthService