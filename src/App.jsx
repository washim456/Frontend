import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'

import { LoginPage, SignupPage, DashboardPage, UserPage, PendingRequestPage, InternDashboard, Profile, SummaryPage, NotFound } from './pages'
import { Navbar, Protected, Sidenav } from './components'
import { useDispatch, useSelector } from 'react-redux'
import { apiRequest, getToken } from './utils'
import { BASE_URL } from './CONSTANTS'
import { login } from './store/slices/userSlice'
import { AdminPage, CreateNew, InternPage } from './pages/roles'

import NavbarLayout from "./AppLayout"

import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Protected children={<NavbarLayout />} />} >
          <Route path="/" element={<Protected children={<DashboardPage />} />} />
          <Route path="/interns/:id" element={<Protected children={<InternDashboard />} />} />
          <Route path="/profile" element={<Protected children={<Profile />} />} />
          <Route path="/admin/create" element={<Protected children={<CreateNew />} />} />
          <Route path="/intern/create" element={<Protected children={<CreateNew />} />} />
          <Route path="/summary" element={<Protected children={<SummaryPage />} />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
