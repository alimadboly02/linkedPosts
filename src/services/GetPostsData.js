import axios from "axios"

// export default async function GetPostsData() {
//   try {
//     const response = await axios.get("https://linked-posts.routemisr.com/posts",{
//       headers: {
//         token: localStorage.getItem("token")
//       },
//       params: {
//         limit: 10,
//         sort:'-createdAt'
      
//       }
//     })
//     return response.data
//   } catch (error) {
//     console.log(error)
//   }
// }


export default function GetPostsData() {
return  axios.get(`https://linked-posts.routemisr.com/posts`,{
      headers: {
        token: localStorage.getItem("token")
      },
      params: {
        limit: 10,
        sort:'-createdAt',
        page: 1
      }
    })
   



  }
