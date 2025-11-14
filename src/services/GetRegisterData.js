import axios from "axios";

 export async function getRegisterData(userData) {

    try{
 let {data} = await axios.post("https://linked-posts.routemisr.com/users/signup", userData)
    console.log(data);
    return data;


    }
    catch(error){
        
        return error.response.data;
    }
    finally{
        console.log("finally");
    }

    

    
}
export async function getLoginData(userData) {
    try{
 let {data} = await axios.post("https://linked-posts.routemisr.com/users/signin", userData)
    console.log(data);
    return data;
    }
    catch(error){
        
        return error.response.data;
    }
    finally{
        console.log("finally");
    }
}

