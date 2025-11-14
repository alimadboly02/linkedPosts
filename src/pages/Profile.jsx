
import { useEffect, useState } from 'react';
import { LogInContext } from '../Context/AuthContext'
import React, { useContext } from 'react'
import { UpdateUserPhotoApi } from '../services/UpdateUserPhoto';
import { addToast, Input } from '@heroui/react';
import { GetUserDataApi, userPostsApi } from '../services/GetUserData';
import { useMutation, useQuery } from '@tanstack/react-query';
import PostCard from '../components/PostCard';
import LoadingPosts from '../components/LoadingPosts';
import errorImg from '../assets/errorIcon.png'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { useForm } from 'react-hook-form';
import { de } from 'zod/locales';
import { changePasswordApi } from '../services/changePassword';


export const MailIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const LockIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M12.0011 17.3498C12.9013 17.3498 13.6311 16.6201 13.6311 15.7198C13.6311 14.8196 12.9013 14.0898 12.0011 14.0898C11.1009 14.0898 10.3711 14.8196 10.3711 15.7198C10.3711 16.6201 11.1009 17.3498 12.0011 17.3498Z"
        fill="currentColor"
      />
      <path
        d="M18.28 9.53V8.28C18.28 5.58 17.63 2 12 2C6.37 2 5.72 5.58 5.72 8.28V9.53C2.92 9.88 2 11.3 2 14.79V16.65C2 20.75 3.25 22 7.35 22H16.65C20.75 22 22 20.75 22 16.65V14.79C22 11.3 21.08 9.88 18.28 9.53ZM12 18.74C10.33 18.74 8.98 17.38 8.98 15.72C8.98 14.05 10.34 12.7 12 12.7C13.66 12.7 15.02 14.06 15.02 15.72C15.02 17.39 13.67 18.74 12 18.74ZM7.35 9.44C7.27 9.44 7.2 9.44 7.12 9.44V8.28C7.12 5.35 7.95 3.4 12 3.4C16.05 3.4 16.88 5.35 16.88 8.28V9.45C16.8 9.45 16.73 9.45 16.65 9.45H7.35V9.44Z"
        fill="currentColor"
      />
    </svg>
  );
};
export function AddPhoto() {
  
    return(
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-blue-600">
  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
</svg>
    )
  }

export default  function Profile() {
  const {userInfo} = useContext(LogInContext);
const [img, setImg] = useState(null);
const [urlImg, setUrlImg] = useState("");
const [info, setInfo] = useState("");
const [data, setData] = useState({})


function updateImg (e) {
  setImg(e.target.files[0])
   setUrlImg(URL.createObjectURL(e.target.files[0]))
  e.target.value="";
}

 useEffect(() => {
  if(!img) return;
  const formData = new FormData();
  formData.append("photo", img);
  UpdateUserPhotoApi(formData).then((data) => {
    setInfo(data);
      addToast({
              title: "update photo",
              description: data.message + " updated",
              color: "success",
            })
    setImg(null);
     })
     .catch((error) => {
       console.error("Error updating user photo:", error);
     });
   
    }, [img])

    useEffect(() => {
      setUrlImg(userInfo?.user.photo);
      
    }, [userInfo?.user.photo]);
     const { data : posts, isLoading, error, refetch ,isError} = useQuery({
  queryKey: ["userPosts"],
  queryFn: () => userPostsApi(userInfo?.user._id),
  select: (data) => data?.data?.posts,
  onSuccess: (data) => {
    console.log("User posts fetched successfully:", data);
  },
  onError: (error) => {
    console.error("Error fetching user posts:", error);
  },
});

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
  const{handleSubmit,register,formState:{errors}}=useForm(
{
  defaultValues: {
    password: "",
    newPassword: "",
  }
}  )
function onSubmit(data) {
  console.log(data.password);
  setData(data);
  // changePasswordMutation.mutate(data);
}
const {mutate} = useMutation({
  mutationKey: ["changePassword"],
  mutationFn: () => changePasswordApi(data.password,data.newPassword),
  onSuccess: (data) => {
    console.log(data);
     addToast({
              title: "Change Password",
              description: "Password changed successfully",
              color: "success",
            })
  },
  onError: (error) => {
    console.error("Error changing password:", error);
     addToast({
              title: "Change Password",
              description: "Password changed failed",
              color: "danger",
            })
  },
 })

  return (
    <>
    <div className="bg-gray-50 dark:bg-black p-10 flex items-center justify-center flex-col gap-3.5">
     
    <div className="w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
  <div className='relative w-fit mx-auto'>
    <img className="w-32 h-32 rounded-full mx-auto p-1  outline-3 object-cover  outline-blue-500 relative" src={urlImg} alt="Profile picture" />
    <div className="absolute bottom-0 right-2 bg-white p-1 rounded-full">
      <label htmlFor="profile-pic" className="text-center text-gray-600 mt-1 cursor-pointer"> <AddPhoto/></label>
      <input onChange={updateImg}  type="file" id="profile-pic" className="hidden" />
    </div>
  </div>
  <h2 className="text-center text-2xl font-semibold mt-3">{userInfo?.user.name}</h2>
  
  <div className="mt-5">
    <h3 className="text-2xl font-semibold text-blue-500 capitalize">information</h3>
    <p className="text-gray-600 mt-2"><span className="font-bold text-blue-500">Email :</span> <span>{userInfo?.user.email}</span></p>
    <p className="text-gray-600 mt-2"><span className="font-bold text-blue-500">Date of Birth :</span> <span>{userInfo?.user.dateOfBirth?.split("T",1).join()}</span></p>
    <p className="text-gray-600 mt-2"><span className="font-bold text-blue-500">Created At :</span> <span>{userInfo?.user.createdAt.split("T",1).join()}</span></p>
    <p className="text-gray-600 mt-2"><span className="font-bold text-blue-500">Gender :</span> <span>{userInfo?.user.gender}</span></p>
    <p className="text-gray-600 mt-2"><span className="font-bold text-blue-500">Created At :</span> <span>{userInfo?.user.createdAt ? userInfo.user.createdAt.split("T",1).join() : ""}</span></p>
  </div>





  
      
      <Button variant="solid" color="primary" onPress={onOpen} className='mt-5 w-full'>
        change password
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">change password</ModalHeader>
              <form className='flex flex-col gap-3 p-5' onSubmit={handleSubmit(onSubmit)}>
                  <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
                  }
                  label="Password"
                  isInvalid={Boolean(errors.password)}
                  errorMessage={errors.password?.message}
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                  {...register("password",{required:"password is required",minLength:{value:8,message:"password must be at least 8 characters"}})}
                />
                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
                  }
                  label="New Password"
                  isInvalid={Boolean(errors.newPassword)}
                  errorMessage={errors.newPassword?.message}
                  placeholder="Enter your new password"
                  type="password"
                  variant="bordered"
                  {...register("newPassword",{required:"new password is required",minLength:{value:8,message:"new password must be at least 8 characters"}})} 
                />
                 <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button type='submit' color="primary" disabled={Boolean(errors.password) || Boolean(errors.newPassword) } onPress={()=>mutate(data)} className='ml-3'>
                  change password
                </Button>
              </ModalFooter>
              </form>
             
            </>
          )}
        </ModalContent>
      </Modal>
    
</div>





<h2 className="text-3xl font-semibold text-blue-500 capitalize flex justify-center items-center">latest posts <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

</h2>
{isLoading ? <LoadingPosts /> : isError ? <div className='flex-col  justify-center items-center '>
        <img className='w-full h-72' src={errorImg} alt="" />
        <h1 className='text-center text-red-700 text-2xl'>Error: {error.message}</h1>
      </div> :
        posts?.map((post) => {


          return <PostCard post={post} commentNum={1} callBack={refetch} key={post.id} />




        })}


      

    </div>
    
    
    
    
    </>
  )
}
