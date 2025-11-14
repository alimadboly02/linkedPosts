import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom'
import FeedPage from './pages/FeedPage'
import PostDetails from './pages/PostDetails'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFoundPage from './pages/NotFoundPage'
import AuthLayout from './Layout/AuthLayout'
import MainLayout from './Layout/MainLayout'
import ProtectedRoot from './components/ProtectedRoot'
import AuthProtectedRoot from './components/AuthProtectedRoot'


const router = createBrowserRouter([
  { path: '', element: <MainLayout />, children: [
    { index: true, element: <ProtectedRoot> <FeedPage /> </ProtectedRoot>},
    { path: 'post-details/:postId', element: <ProtectedRoot> <PostDetails /> </ProtectedRoot> },
    { path: 'profile/:userId', element: <ProtectedRoot> <Profile /> </ProtectedRoot> },
    { path: '*', element: <NotFoundPage /> },
  ] },
  { path: "", element: <AuthLayout />, children: [
    { path: 'login', element:< AuthProtectedRoot> <Login /> </AuthProtectedRoot>  },
    { path: 'register', element:  <AuthProtectedRoot> <Register /> </AuthProtectedRoot> },
  ] },
  
])

function App() {


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
