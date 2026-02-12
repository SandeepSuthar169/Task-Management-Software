import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Loader } from "lucide-react"
import { Toaster } from 'react-hot-toast'
import Home from './Pages/Home.jsx'
import Login from "./Auth/Login.jsx"
import Signup from './Auth/Signup.jsx'
import { useAuthStore } from './store/useAuthStore.js'
import Layout from './layout/Layout.jsx'
import TodoApp from './Pages/TodoPage.jsx'
import TasksPage from './Pages/TaskPage.jsx'
import TaskLayout from './layout/TaskLayout.jsx'




function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }

  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path='/task' element={<TaskLayout/>}>
              <Route path='/todos' element={<TodoApp/>}/>
        </Route>

        <Route 
          path='login' 
          element={!authUser ? <Login /> : <Navigate to='/' />} 
        />
        <Route 
          path='signup' 
          element={!authUser ? <Signup /> : <Navigate to='/' />} 
        />
        <Route path='tasks' element={<TasksPage/>}/>

       
      </Routes>
    </>
  )
}

export default App