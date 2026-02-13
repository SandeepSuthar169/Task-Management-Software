import React from 'react'
import { Outlet } from "react-router-dom" 
import PageHeader from '../Pages/TaskPage/PageHeader.jsx'

function TaskLayout() {
  return (
    <>
        <PageHeader/>
        <Outlet/>
    </>
  )
}

export default TaskLayout