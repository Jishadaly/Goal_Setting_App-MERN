import axios from "axios";
const API_URL = '/api/admin/'

// login admin

export const adminLogin = async (adminData) => {
  const response = await axios.post(API_URL + 'adminLogin', adminData)
  console.log(response.data);
  if (response.data) {
    localStorage.setItem('admin', JSON.stringify(response.data))
  }

  return response.data
}

export const adminLogout = () => {
  localStorage.removeItem('admin')
}



export const getAlluser = async (token) => {
  const config = {
    headers: {
      Athorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL + 'getUserData', config)
  console.log("authservice : ", response.data)

  return response.data
}

export const blockUser = async (token, userId) => {
  const config = {
    headers: {
      Athorization: `bearer ${token}`
    }
  }
  const response = await axios.post(API_URL + 'userBlock', { userId }, config)
  console.log("//////////////", response.data);
  return response.data

}

export const editUser = async (token, userId, name, email) => {
  const config = {
    headers: {
      Athorization: `bearer ${token}`
    }
  }
  return await axios.put(API_URL + 'editUser', { userId, name, email }, config)

}

export const createUser = async (token, userData) => {
  const config = {
    headers: {
      Athorization: `bearer ${token}`
    }
  }
  return await axios.post(API_URL + 'addUser', userData, config);

}


const adminAuthService = {
  adminLogin, adminLogout, getAlluser, blockUser, editUser ,createUser
}

export default adminAuthService