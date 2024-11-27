import { useEffect, useState } from "react";
import UserModel from "../types/User";
import YouTube from 'react-youtube';

function TempVideoHome() {
  const [foundUser, setFoundUser] = useState<string>();
  const [userInfo, setUserInfo] = useState<UserModel>();
  const [uid, setUID] = useState<number>();

  console.log(foundUser);
  console.log(uid);

  // This effect loads the user from localStorage
  useEffect(() => {
    const localStorageUser = localStorage.getItem("user");
    if (localStorageUser) {
      setFoundUser(localStorageUser);
      const parsedUser = JSON.parse(localStorageUser);
      setUserInfo(parsedUser as UserModel);
    }
  }, []);

  // This effect updates the UID once `userInfo` is set
  useEffect(() => {
    if (userInfo && userInfo.user_id) {
      setUID(userInfo.user_id);
    }
  }, [userInfo]);

  return (
    <>
        <YouTube videoId="hyd8vfuQta0"/>
    </>
  );
}

export default TempVideoHome;
