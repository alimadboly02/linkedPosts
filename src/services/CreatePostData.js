import axios from "axios"

export async function CreatePostApi( FormData ) {
  try{
      const {data} = await axios.post("https://linked-posts.routemisr.com/posts", FormData ,{
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


//  axios.post("https://linked-posts.routemisr.com/posts",postForm,{
//     headers: {
//         token: localStorage.getItem("token")
//       }
//  }).then(({data}) => {
//     console.log(data)
//     return data
 
//  }).catch(err=>{
//     console.log(err)
//  })

