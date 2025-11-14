import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { LogInContext } from '../Context/AuthContext'

export default function AuthProtectedRoot({children}) {

    // const [isLogin,setIsLogin] = useState(localStorage.getItem("token")!=null)
    const {isLogin} = useContext(LogInContext)

    console.log(isLogin)
return !isLogin ? children : <Navigate to={"/"} />
}


