import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GetPostData from '../services/GetPostData';
import PostCard from '../components/PostCard';
import { CircularProgress } from '@heroui/react';
import LoadingPosts from '../components/LoadingPosts';



export default function PostDetails() {
  const {postId} = useParams()
  const [post, setPost] = useState({});

 async function getPostData() {
    const {post} = await GetPostData(postId);
    setPost(post); 

    console.log("🚀 ------------------------------🚀");
    console.log("🚀 ~ getPostData ~ post:", post);
    console.log("🚀 ------------------------------🚀");

 }
 useEffect(() => {
  getPostData();
 }, [])

  return <>
<div className="bg-gray-50 dark:bg-black p-10 flex items-center justify-center ">
  {
    post.body ? <PostCard post={post} commentNum={post?.comments?.length} key={postId} callBack={getPostData} />
    :<LoadingPosts/>
  }




  </div>
    </>
    
  
}
