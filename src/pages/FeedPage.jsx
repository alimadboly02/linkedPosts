import { Button } from '@heroui/react'
import React, { use, useEffect } from 'react'
import PostCard from '../components/PostCard'
import GetPostsData from '../services/GetPostsData'
import { useState } from 'react'
import LoadingPosts from '../components/LoadingPosts'
import CreatePost from '../components/CreatePost'
import { useQuery } from '@tanstack/react-query'
import { is } from 'zod/locales'
import errorImg from '../assets/errorIcon.png'

export default function FeedPage() {
  // const [postsData, setPostsData] = useState([])
  //  async function reviewPostsData() {
  //   const data = await GetPostsData()

  // setPostsData(data.posts)

  // }
  //   useEffect(() => {
  //  reviewPostsData()

  //   }, [])
  const { data: posts, isLoading, isFetching, isError, error, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: GetPostsData,
    select: (data) => {
      return data?.data.posts
    },
    retry: 1,
    // retryOnMount:false,
    retryDelay: 5_000,

    // refetchOnMount:false,
    // refetchOnWindowFocus:false,
    // refetchOnReconnect:false,
    // gcTime:50000,
    staleTime: 10_000,
    cacheTime: 30_000,
    refetchInterval: 30_000,

  })
  

  return (<>
    {/* <h1>{isLoading?'loading':'not loading'}</h1>
  <h1>{isFetching?'fetching':'not fetching'}</h1>
  <h1>{isError?'error':'not error'}</h1> */}
    <div className="bg-gray-50 dark:bg-black p-10 flex items-center justify-center flex-col gap-3.5">
      <CreatePost callBack={refetch} />


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
