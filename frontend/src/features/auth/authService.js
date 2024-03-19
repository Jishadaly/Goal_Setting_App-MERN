import axios from 'axios'
const API_URL = '/api/users/'

//register user
 const register = async (userData) =>{
  const response = await axios.post(API_URL,userData)
  if (response.data) {
    localStorage.setItem('user',JSON.stringify(response.data))
  }

  return response.data
}



//login user
const login =async (userData) =>{
  const response = await axios.post(API_URL + 'login',userData)
  if (response.data) {
    console.log(response.data);
    localStorage.setItem('user',JSON.stringify(response.data)) 
  }
  return response.data
}



const profileUpload = async (token,imgUrl) =>{
 const config = {
  headers: {
    Authorization:`Bearer ${token}`
  }
 }

 const currentUser = JSON.parse(localStorage.getItem('user'))
 const response = await axios.post(API_URL + 'profile/upload', {imgUrl , currentUser} ,config)

 const localUser = localStorage.getItem('user')
 

 if (localUser) {
  const user = JSON.parse(localUser)
  user.profileUrl = response.data.profileURL;
  localStorage.setItem('user',JSON.stringify(user))
 }
 return response.data;

}


const logout = ()=> {
  localStorage.removeItem('user');
}


const authService = {
  register ,logout ,login,profileUpload
}
export default authService 