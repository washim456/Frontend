import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'

import { LoginPage, SignupPage, DashboardPage, UserPage, PendingRequestPage } from './pages'
import { Navbar, Protected } from './components'
import { useDispatch, useSelector } from 'react-redux'
import { apiRequest, getToken } from './utils'
import { BASE_URL } from './CONSTANTS'
import { login } from './store/slices/userSlice'

function App() {

  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const setUser = async () => {
    try{
      const data = await apiRequest(`${BASE_URL}/users/token`)
      dispatch(login(data))
      let back = location.state?.from?.pathname || "/";
      navigate(back)
    }catch{
      dispatch(login(null))
    }
  }

  useEffect(() =>{
    // if !user && token
    // get user and set on store
    if(!user && getToken()){
      setUser()
    }

    console.log("no user")
    if(!user){
      navigate("/login")
    }

  }, [])


  console.log("user", user)

  // const token = getToken()
  // useEffect(() => {

  //   async function getUser(){
  //     const user = await apiRequest(`${BASE_URL}/users/token`)
  //     dispatch(login(user))
  //   }

  //   if(!user && token){
  //     getUser()
  //   }
  // }, [])

  return (
    <>

      <Navbar />
      <Routes>
        <Route path="/" element={<Protected children={<DashboardPage />} />} />
        <Route path="/pending" element={<Protected children={<PendingRequestPage />} />} />
        <Route path="/users/:userId" element={<UserPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Signup" element={<SignupPage />} />
        <Route path="*" element={"not found"} />
      </Routes>

    </>
  )
}

export default App