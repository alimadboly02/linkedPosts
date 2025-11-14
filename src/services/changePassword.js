import axios from "axios";

export function changePasswordApi(password,newPassword) {
    return axios.patch("https://linked-posts.routemisr.com/users/change-password",{
        password: password,
        newPassword: newPassword
    }, {
        headers: {
            token: localStorage.getItem("token")
        }
    });
    
}