import React, { createContext, useEffect, useState } from 'react'
import { get } from 'react-hook-form'
import { GetUserDataApi } from '../services/GetUserData'
export { LogInContext }

const LogInContext = createContext()
export default function AuthContext({ children }) {
const [isLogin,setIsLogin] = useState(localStorage.getItem("token")!=null)
const [userInfo, setUserInfo] = useState(null)
function getUserData (params) {
  GetUserDataApi().then((res) => {
    setUserInfo(res)
  })
  
}
useEffect(() => {
  if (isLogin) {
    getUserData()
  }
},[isLogin])

  return <LogInContext.Provider value={{isLogin,setIsLogin,userInfo}}>

{children}
  </LogInContext.Provider>
}
