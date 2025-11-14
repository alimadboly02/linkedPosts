import React, { useState } from 'react'
import PostHeader from './Card/PostHeader';
import Comment from './Comment';
import PostBody from './Card/PostBody';
import PostFooter from './Card/PostFooter';
import { addToast, Button, Input } from '@heroui/react';
import { CreateCommentApi, GetPostCommentApi } from '../services/CommentService';
import { s } from 'framer-motion/client';
import { DeletePostApi } from '../services/DeletePost';
import CreatePost from './CreatePost';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../main';



export default function PostCard({ post ,commentNum ,callBack}) {
  const [comment, setComment] = useState("");
 
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

//  async function CreateComment(e) {
//     setIsLoading(true);
//     e.preventDefault();
 
// const res= await CreateCommentApi(comment,post._id)
// if (res.message) {
//   callBack();
//   addToast({
//     title: "Create Comment",
//     description: res.message,
//     color: "success",
//   })

// }

// setComment("")
// setIsLoading(false);


// }
let {mutate : createComment, isPending}= useMutation({
  mutationKey:['createComment'],
  mutationFn:()=> CreateCommentApi(comment,post._id) ,
  onSuccess:async (data) => {
    setComment("")
    await queryClient.invalidateQueries(['posts'])
    
    addToast({
      title: "Create Comment",
      description: data?.data.message,
      color: "success",
    })

  }

})

 async function GetPostComment() {
  const response= await GetPostCommentApi(post._id)

  console.log("🚀 -----------------------------------------🚀");
  console.log("🚀 ~ GetPostComment ~ response:", response);
  console.log("🚀 -----------------------------------------🚀");

  setComment(response.comments)
}
async function DeletePost() {
  const res= await DeletePostApi(post._id)
   
  if (res.message) {
    
    callBack();
    addToast({
      title: "Delete Post",
      description: res.message,
      color: "success",
    })
  }
  
}
  return (
    <>
    {isUpdate && <> <CreatePost callBack={callBack} isUpdate={isUpdate} setIsUpdate={setIsUpdate} post={post} /> </>}

      <div className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-800 p-4 rounded-xl border w-xl overflow-hidden">
        <div className="flex justify-between">
          <PostHeader isUpdate={isUpdate} setIsUpdate={setIsUpdate} onDelete={DeletePost} photo={post?.user?.photo} name={post?.user?.name} subtitle={post?.user?.name.toLowerCase().replace(" ", "")} userId={post?.user?._id} />

        </div>
        <PostBody body={post?.body} image={post?.image} createdAt={post?.createdAt}  />



        <div className="border-gray-200 dark:border-gray-600 border border-b-0 mt-1" />
       

        <PostFooter length={post?.comments?.length} postId={post?._id} />
        <div  className='flex items-center border-gray-200 dark:border-gray-600 border-t-1 p-3 my-2.5 gap-2'>


           <Input value={comment} onChange={(e) => setComment(e.target.value)} label="comment" type="text" variant="bordered"  />

            <Button onPress={createComment} isLoading={isPending} disabled={comment?.length < 2} type='submit' radius="md" size='lg' color='primary'>create</Button>



        </div>

        {post?.comments?.length > 0 &&
          <div className="border-gray-200 dark:border-gray-600 border border-b-0 mt-3 p-3 -m-4 rounded-t-md">
            {
              post.comments.slice(0, commentNum).map((comment) => (
                <Comment callBack={callBack} key={comment?._id} commentId={comment?._id} commentUserId={comment.commentCreator?._id} createdAt={comment?.createdAt} user={comment?.commentCreator?.name} image={comment?.commentCreator?.photo} comment={comment.content} userId={post?.user?._id} />

              ))
            }

           
          </div>
          }

      </div>




    </>
  )
}
