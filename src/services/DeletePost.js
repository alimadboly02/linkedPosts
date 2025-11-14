import axios from "axios";

export async function DeletePostApi(postId) {
    try{
        const {data}= await axios.delete("https://linked-posts.routemisr.com/posts/"+postId,
        {
            headers: {
                token: localStorage.getItem("token")
              }
        })
        return data
    }catch(error){
        console.log(error)
        return error
    }
    
}