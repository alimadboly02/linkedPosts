import React, { useContext, useState } from 'react';
import { LogInContext } from '../../Context/AuthContext';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@heroui/react";
export const MassageLogo = () => {
  return (
<svg className="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
  <path fillRule="evenodd" d="M4 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1v2a1 1 0 0 0 1.707.707L9.414 13H15a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4Z" clipRule="evenodd" />
  <path fillRule="evenodd" d="M8.023 17.215c.033-.03.066-.062.098-.094L10.243 15H15a3 3 0 0 0 3-3V8h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1v2a1 1 0 0 1-1.707.707L14.586 18H9a1 1 0 0 1-.977-.785Z" clipRule="evenodd" />
</svg>

  );
};
export default function PostHeader({photo,name,subtitle ,userId,onDelete,isUpdate,setIsUpdate}) {
const {userInfo} = useContext(LogInContext);

  return <>
 
    <div className="flex items-center">
          <img className="h-11 w-11 rounded-full" src={photo} />
  
          <div className="ml-1.5 text-sm leading-tight">
            <span className="text-black dark:text-white font-bold block ">{name}</span>
            <span className="text-gray-500 dark:text-gray-400 font-normal block">@{subtitle}</span>

          </div>
        </div>
        { userId == userInfo?.user._id &&
      <div>
    <Dropdown>
      <DropdownTrigger>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 cursor-pointer text-gray-500 outline-0 hover:text-gray-800">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
    </svg>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem onClick={()=>{setIsUpdate(!isUpdate)}} key="edit">Edit post</DropdownItem>
        <DropdownItem onClick={onDelete} key="delete" className="text-danger" color="danger">
          Delete post
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
            </div>
}
   

   
  </>
}
