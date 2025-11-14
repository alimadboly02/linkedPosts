import {User} from "@heroui/react";
import { useContext } from "react";
import AuthContext, { LogInContext } from "../Context/AuthContext";

export default function UserCard() {
 const {userInfo} = useContext(LogInContext);


  return (
    <User
      avatarProps={{
        src: userInfo?.user.photo,
      }}
      description={userInfo?.user.email}
      name= {userInfo?.user.name}
    />
  );
}