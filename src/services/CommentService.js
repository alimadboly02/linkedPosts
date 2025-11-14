import axios from "axios";

export function CreateCommentApi( commentContent , postId ) {

   return axios.post("https://linked-posts.routemisr.com/comments",
        {
            content :commentContent,
            post :postId
        }
        ,{
      headers: {
        token: localStorage.getItem("token")
      }
    })
  
}
export async function DeleteCommentApi(commentId) {
  try {
    const {data}= await axios.delete(`https://linked-posts.routemisr.com/comments/${commentId}`,
    {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    console.log(data)
    return data

  } catch (error) {
    console.log(error)
  }
}
export async function GetPostCommentApi (postId) {
  try {
    const {data}= await axios.get('https://linked-posts.routemisr.com/posts/'+postId+'/comments',
    {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    console.log(data)
    return data

  } catch (error) {
    console.log(error)
  }
}
export async function UpdateCommentApi( commentContent , commentId ) {

  try {
    const {data}= await axios.put("https://linked-posts.routemisr.com/comments/"+commentId,
        {
            content :commentContent,
        }
        ,{
      headers: {
        token: localStorage.getItem("token")
      }
    })
    console.log(data)
    return data

  } catch (error) {
    console.log(error)
  }
}
