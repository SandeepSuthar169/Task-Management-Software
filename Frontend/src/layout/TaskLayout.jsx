import React from 'react'
import { Outlet } from "react-router-dom" 
import PageHeader from '../Pages/PageHeader'

function TaskLayout() {
  return (
    <>
        <PageHeader/>
        <Outlet/>
    </>
  )
}

export default TaskLayout