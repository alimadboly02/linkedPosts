import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <>
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <Outlet/>
    </div>
    
    
    
    </>
  )
}
