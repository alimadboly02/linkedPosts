import React, { useContext, useState } from 'react';
import {Navbar as HNavbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@heroui/react";
import { Links, NavLink } from 'react-router-dom';
import { LogInContext } from '../Context/AuthContext';
import UserCard from './User';


export const MassageLogo = () => {
  return (
<svg className="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
  <path fillRule="evenodd" d="M4 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1v2a1 1 0 0 0 1.707.707L9.414 13H15a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4Z" clipRule="evenodd" />
  <path fillRule="evenodd" d="M8.023 17.215c.033-.03.066-.062.098-.094L10.243 15H15a3 3 0 0 0 3-3V8h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1v2a1 1 0 0 1-1.707.707L14.586 18H9a1 1 0 0 1-.977-.785Z" clipRule="evenodd" />
</svg>

  );
};

const Navbar = () => {
    // const [isLogIn, setIsLogIn] = useState(localStorage.getItem("token"!=null))
    const {isLogin,setIsLogin} = useContext(LogInContext)

    const handleLogOut = () => {
        localStorage.removeItem("token")
        setIsLogin(null)
    }


    return (
        <>
    <HNavbar>

      <NavbarBrand>
        <MassageLogo/>
        <NavLink  to="/">
         <p className="font-bold text-xl text-blue-500 cursor-pointer">
           LinkedPosts
          </p>
        </NavLink>
      </NavbarBrand>
     
      <NavbarContent justify="end">
        {!isLogin ?  <>
            <NavbarItem className="flex">
              <NavLink className="w-20 py-2 rounded-2xl text-indigo-500 hover:text-indigo-600  hover:bg-indigo-200 text-center" to="/login">LogIn</NavLink>
    
            </NavbarItem >
            <NavbarItem className="flex"  >
    
              <NavLink className="bg-indigo-400 w-20 py-2 rounded-2xl text-amber-50 hover:bg-indigo-500  text-center" to="/register">SignUp</NavLink>
    
            </NavbarItem>
        </>:
        <>
        <NavbarItem className="flex"  >
          <NavLink to="/profile/45445454">
            <UserCard/>
          </NavLink>
        </NavbarItem>
        <NavbarItem className="flex"  >

          <NavLink onClick={handleLogOut} className="bg-red-400 w-20 py-2 rounded-2xl text-amber-50 hover:bg-red-500  text-center" to="/login">LogOut</NavLink>


        </NavbarItem>
        </> }
      
        

      </NavbarContent>
    </HNavbar>


        </>
    );
}

export default Navbar;
