// import FriendsModel from "../types/User";
import ShouldBeLoggedIn from "../Authenticate";
import { useEffect, useState } from "react";
import UserModel from "../../types/User";
import { useNavigate } from "react-router-dom";

function FriendsBox(props: {
    user_id: number;
    username: string;
    nickname: string;
    pfp: string;
}) {
    ShouldBeLoggedIn(true);
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState<UserModel>();
    const [uid, setUID] = useState<number>();

    useEffect(() => {
        const localStorageUser = localStorage.getItem("user");
        if (localStorageUser) {
          const parsedUser = JSON.parse(localStorageUser);
          setUserInfo(parsedUser as UserModel);
        }
      }, []);

    useEffect(() => {
    if (userInfo && userInfo.user_id) {
        setUID(userInfo.user_id);
    }
    }, [userInfo]);


    const goToTheProfile = (index: string) => {
        navigate(`/Profile?profile_id=${index}`);
      };

    return (
        <div onClick={goToTheProfile} className="flex justify-center mt-6 mb-4 border text-white">
            
        </div>
    )
}

export { FriendsBox }