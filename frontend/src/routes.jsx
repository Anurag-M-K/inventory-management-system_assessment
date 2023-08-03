import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignupForm from './pages/Signup';
import LoginForm from './pages/LoginForm';
import Dashboard from './components/Dashboard';
import PrivateRoutes from './utils/PrivateRoutes'
import Home from './pages/Home';

function routes() {
  return (
    <BrowserRouter>
    <Routes>

            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<Home />} />
            <Route exact  path="/dashboard" element={<PrivateRoutes> <Dashboard /></PrivateRoutes>} />

    </Routes>

    </BrowserRouter>
  )
}

export default routes