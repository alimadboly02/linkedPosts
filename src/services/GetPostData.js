import axios from "axios"

export default async function GetPostData(postId) {
  try {
    const response = await axios.get("https://linked-posts.routemisr.com/posts/" + postId,{

      headers: {
        token: localStorage.getItem("token")
      }
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}