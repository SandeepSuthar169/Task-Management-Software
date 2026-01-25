import { useState } from 'react'
import { 
  createBrowserRouter, 
  RouterProvider,
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import  Home  from './components/Home.jsx'
import  Login  from "./components/Auth/Login.jsx"
import  Register  from './components/Auth/Register.jsx'

import React from 'react'

function App() {
  let authUser = null


  return (
   <div className='flex flex-col items-center justify-center'>
    
    <Routes>
      <Route path='/' element={authUser ? <Home/> : <Navigate to={"/login"}/>} />
      <Route path='login' element={!authUser ?   <Login/> : <Navigate to={'/'}/>} />
      <Route path='signup'  element={!authUser ?   <Register/> : <Navigate to={'/'}/>} />
    </Routes>
   
   </div>
  )
}

export default App























// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Home />
//   },
//   {
//     path: '/login',
//     element: <Login />
//   },
//   {
//     path: '/signup',
//     element: <Signup />
//   },
// ])


// function App() {

//   return (
//         <RouterProvider router={router}></RouterProvider>
//   )
// }

// export default App
