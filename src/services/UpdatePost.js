import axios from "axios"

export async function UpdatePostApi( FormData ,id) {
  try{
      const {data} = await axios.put("https://linked-posts.routemisr.com/posts/"+id, FormData ,{
    headers: {
        token: localStorage.getItem("token")

      }
  })
  
  return data

  }catch(err){
    console.log(err)
    return err

    
  }
}