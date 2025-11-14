import React, { useState } from 'react'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { LogInContext } from '../Context/AuthContext'
export default function ProtectedRoot({children}) {
    // const [isLogin,setIsLogin] = useState(localStorage.getItem("token")!=null)
    const{isLogin}=useContext(LogInContext)

    console.log(isLogin)
return isLogin ? children : <Navigate to={"/login"} />

}
