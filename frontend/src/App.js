import {BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard';
import AdminLogin from './pages/admin/login';
import Login from './pages/login';
import Register from './pages/register';
import Header from './components/Header';
import AdminHeader from './components/AdminHeader'
	
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css'
import Profile from './pages/Profile';
import AdminDashboard from './pages/admin/AdminDashboard';
import Userlist from './pages/admin/userList';
import AddUser from './components/admin/AddUser';


function App() {
    return (
      <>

        <Router>
      <div className="container">
          <Routes>
            
            <Route path='/admin/*' element={<AdminHeader/>}/>
            <Route path='*' element={<Header/>}/>
          </Routes>

          <Routes>

          <Route path='/' element={< Dashboard />} />
          <Route path='/login' element={< Login />} />
          <Route path='/register' element={< Register />} />
          <Route path='/profile' element={< Profile />} />

          </Routes>
          
          <Routes>
          
                {/* Add admin route */}


                <Route path='/admin/login' element={<AdminLogin/>} />
              <Route path='/admin' element={<AdminDashboard />}/>
              <Route path='/admin/userList' element={<Userlist/>}/>
              <Route path='/admin/adduser' element={<AddUser/>} />

              

          </Routes>
      </div>
        </Router>
        <ToastContainer/>
    </>
  );
}

export default App;