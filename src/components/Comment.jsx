import React, { useContext, useState } from 'react'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, addToast, CircularProgress} from "@heroui/react";
import userImg from '../assets/avatar.png'
import { LogInContext } from '../Context/AuthContext';
import { DeleteCommentApi, UpdateCommentApi } from '../services/CommentService';
export default function Comment({user ,createdAt,image,comment,commentUserId,userId,commentId ,callBack}) {
  const [loading, setLoading] = useState(false)
  const [update, setUpdate] = useState(false)
  const [commentText, setCommentText] = useState(comment)
const {userInfo} = useContext(LogInContext)
async function DeleteComment() {
  setLoading(true)
  try {
    const data = await DeleteCommentApi(commentId)
    console.log(data)
    if(data.message) {

     callBack()
      
       addToast({
              title: "Delete Comment",
              description: data.message,
              color: "success",
            })
            
    }
setLoading(false)
  } catch (error) {
    console.log(error)
  }
} 
function editComment(e) {
  e.preventDefault()
console.log(commentText)
  setUpdate(false)
  updateComment()

}
async function updateComment() {
    const data = await UpdateCommentApi(commentText,commentId)
  if(data.message) {
    callBack()
    addToast({
              title: "Update Comment",
              description: data.message,
              color: "secondary",
            })
  }
  
}

  return (
    <>
    <div>
      {update && 
      <form onSubmit={editComment} className='flex items-center gap-2 border border-gray-300 rounded-md p-2'>
        <input onChange={(e)=>{setCommentText(e.target.value)}} value={commentText}  type="text" className="w-full p-2 border border-gray-300 rounded-md" />
        <Button type='submit' color='secondary'>Update</Button>
      </form>}
    </div>
   
        <div className="flex items-center space-x-2 w-full ">
      <div className="flex flex-shrink-0 self-start cursor-pointer">
        <img onError={(e)=>{e.target.src=userImg}} src={image}  className="h-8 w-8 object-fill rounded-full border-1 border-gray-200" />

      </div>
      <div className="flex items-center justify-center space-x-2 p-1">
        <div className="block ">
          <div className="bg-gray-200 min-w-[200px] rounded-xl px-2.5 pb-2 ">

            <div className='flex justify-between items-center'>
                <div className="font-medium ">
              <p className="text-sm me-4">
                <span>{user}</span>
              </p>
            </div>
            { userId === userInfo?.user?._id && userId== commentUserId && <div>
              {loading ? <CircularProgress aria-label="Loading..." size="sm" />:
              <Dropdown>
         <DropdownTrigger>
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 cursor-pointer text-gray-500 outline-0 hover:text-gray-800">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
      </svg>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem onClick={()=>{setUpdate(true)}} key="edit">Edit comment</DropdownItem>
          <DropdownItem onClick={DeleteComment} key="delete" className="text-danger" color="danger">
            Delete comment
          </DropdownItem>
        </DropdownMenu>
    </Dropdown>}
    
            </div>

            }
           
    
            </div>
            
            
            <div className="text-medium">
             {comment}

            </div>
          </div>
          <div className="flex justify-start items-center text-xs w-full">
            <div className="font-semibold text-gray-700 px-2 flex items-center justify-center space-x-1">
              <small className='font-semibold text-gray-500'>{createdAt.split(".",1).join().replace('T'," . ")}</small>

            </div>
          </div>
        </div>
      </div>
      
    </div>
   

    </>
  )
}
