import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignupForm from './components/Signup'
import LoginForm from './components/LoginForm'

function routes() {
  return (
    <BrowserRouter>
    <Routes>

            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
    </Routes>

    </BrowserRouter>
  )
}

export default routes