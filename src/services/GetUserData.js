import axios from "axios";

export async  function GetUserDataApi() {
    try{
        const res = await axios.get("https://linked-posts.routemisr.com/users/profile-data",{
            headers: {
                // "Authorization": `Bearer ${localStorage.getItem("token")}`,
                token: localStorage.getItem("token")
            }
        });
      
        return res.data;

    }catch(err){
        console.log(err);
    }
    
}
export function userPostsApi(id) {
    return axios.get(`https://linked-posts.routemisr.com/users/${id}/posts?limit=2`, {
        headers: {
            token: localStorage.getItem("token")
        }
    });
    
}