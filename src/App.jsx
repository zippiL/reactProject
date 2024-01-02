import { createContext, useState } from 'react'

import './App.css'
import LoginPage from './components/admin/loginPage'
import BusinessDetails from './components/general/businessDetails'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Admin from './components/admin/admin'
import User from './components/user/user'
import AllService from './components/general/allServices'
import SeeMeetings from './components/admin/seeMeetings'
export const UserContext = createContext(null);
export const AlertContext = createContext(null);

function App() {

  return (
    <>
       <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<LoginPage/>}>
        </Route>
        
        <Route path="/admin" element={<Admin/>}>
          <Route path='service' element={<AllService/>}/>
          <Route path='meeting' element={<SeeMeetings/>}/>
        </Route>

        <Route path="/" element={<User/>}/>
      </Routes>
      </BrowserRouter>  

    </>

  )
}

export default App
