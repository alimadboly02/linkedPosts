import { addToast, Button, Spinner, Textarea } from '@heroui/react'
import { p, u } from 'framer-motion/client'
import React, { useState } from 'react'
import { CreatePostApi } from '../services/CreatePostData'
import { useEffect } from 'react'
import { is } from 'zod/locales'
import { UpdatePostApi } from '../services/UpdatePost'


export function AddPhoto() {

    return (
        <svg className="my-3" xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
            <path d="M15 8h.01M12.5 21H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v6.5" /><path d="m3 16l5-5c.928-.893 2.072-.893 3 0l4 4" />
            <path d="m14 14l1-1c.67-.644 1.45-.824 2.182-.54M16 19h6m-3-3v6" /></g></svg>

    )
}
export function CloseBtn() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 48 48">
            <g fill="none" strokeLinejoin="round" strokeWidth={4}><path fill="#2F88FF" stroke="#000" d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" />
                <path stroke="#fff" strokeLinecap="round" d="M29.6567 18.3432L18.343 29.6569" /><path stroke="#fff" strokeLinecap="round" d="M18.3433 18.3432L29.657 29.6569" /></g></svg>

    )
}

export default function CreatePost({ callBack, isUpdate, post, setIsUpdate }) {
    const [isLoading, setIsLoading] = useState(false)
    const [postContent, setPostContent] = useState(post?.body ?? "")
    const [postImage, setPostImage] = useState(null)
    const [urlImage, setUrlImage] = useState(post?.image ?? "")


  
    async function CreatePost(e) {
        e.preventDefault();
        setIsLoading(true)

        const formData = new FormData()
        if (postContent) {
            formData.append("body", postContent);
        }

        if (postImage) {
            formData.append("image", postImage);
        }
        let res;
        if (isUpdate) {
            res = await UpdatePostApi(formData, post._id)
            setIsUpdate(false)
        } else {
            res = await CreatePostApi(formData)
        } if (res.message) {
            console.log(res.message)

            await callBack()

            if (isUpdate) {
                addToast({
                    title: "Update Post",
                    description: res.message + " updated",
                    color: "secondary",
                })
            } else {
                addToast({
                    title: "Create Post",
                    description: res.message,
                    color: "success",
                })
            }
            setUrlImage("")
            setPostContent("")



        }

        setIsLoading(false)
    }
  function handelImg(e) {
        setPostImage(e?.target?.files[0])
        setUrlImage(URL.createObjectURL(e?.target?.files[0]))

        e.target.value = "";
    }
    async function fileMaker() {
        const res = await fetch(urlImage)
        let data = await res.blob()
        let file = new File([data], "image.jpg", { type: "image/jpeg" })
        setPostImage(file)

    }
    useEffect(() => {
        fileMaker()
    }, [])
    return (
        <div className="bg-white relative dark:bg-gray-800 border-gray-200 dark:border-gray-800 p-4 rounded-xl border w-xl overflow-hidden">
            <div className='flex justify-between items-center py-2.5 '>
                {isUpdate ? <h2 className='text-2xl font-bold text-sky-600 cursor-default group'>
                    Update Post
                </h2> : <h2 className='text-2xl font-bold text-sky-600 cursor-default group'>
                    Create Post
                    <sup className='text-2xl group-hover:rotate-45 duration-250'>+</sup>
                </h2>}
                {isUpdate && <div onClick={() => {
                   
                    
                    setIsUpdate(false)
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-gray-600 cursor-pointer">
                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                </div>}


            </div>

            <form onSubmit={CreatePost} >
                <Textarea
                    isClearable
                    className="w-full"
                    defaultValue="here my post  "
                    value={postContent}
                    onChange={(e) => {
                        setPostContent(e.target.value)
                    }}
                    rows={4}
                    label="post content"
                    placeholder="write everything you want ....."
                    variant="bordered"
                    // eslint-disable-next-line no-console
                    onClear={() => {
                        setPostContent('')
                    }}
                />
                {
                    urlImage && <div className='w-full relative'>
                        <span onClick={() => {
                            setUrlImage("")
                        }} className='absolute top-2 right-2 cursor-pointer'>
                            <CloseBtn />

                            
                        </span>
                        <img className='w-full rounded-2xl h-64 object-cover my-2' src={urlImage} alt="" />

                    </div>

                    
                }

                <label>

                    <span className='cursor-pointer hover:text-sky-600  text-gray-600'>
                        <AddPhoto />
                    </span>



                    <input type="file" className='hidden' accept='image/*' onChange={handelImg} />
                </label>
                {isUpdate ? <Button type='submit' size='sm' color="secondary">Update Post</Button> : <Button type='submit' size='sm' color="primary">CreatePost</Button>}



            </form>
            {
                isLoading && <div className='absolute inset-0 flex justify-center items-center bg-white/30 backdrop-blur-sm z-50 '>
                    <Spinner />
                </div>
            }

        </div>
    )
}
