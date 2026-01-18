import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import  Home  from './components/Home.jsx'
import  Login  from "./components/Auth/Login.jsx"
import  Signup  from './components/Auth/Signup.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
])


function App() {

  return (
        <RouterProvider router={router}></RouterProvider>
  )
}

export default App
