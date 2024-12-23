// import { useNavigate } from "react-router-dom";
// import { uri } from "../../App";
import React from "react";
import ShouldBeLoggedIn from "../Authenticate";
import { useState, useEffect } from "react";
import UserModel from "../../types/User";
import { useNavigate } from "react-router-dom";
import { uri } from "../../App";
import { RxCross2  } from "react-icons/rx";

interface propTypes {
  open: boolean;
  onClose: () => void;
  profile_id: string;
  // children: React.ReactNode;
};

const FollowersModal: React.FC<propTypes> = (props: { open: boolean, onClose: ()=>void, profile_id: string }) => {
//   console.log(open, onClose, profile_id);

  ShouldBeLoggedIn(true);
  const open = props.open;
  const onClose = props.onClose;

  const [user, setUser] = useState<UserModel[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);

  const [userInfo, setUserInfo] = useState<UserModel>();
  const [, setUID] = useState<number>();
  const navigate = useNavigate();
  const profileID = props.profile_id;

  // const [followersCount, setFollowersCount] = useState<number>(0);

  // This effect loads the user from localStorage
  useEffect(() => {
    const localStorageUser = localStorage.getItem("user");
    if (localStorageUser) {
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

  const fetchUsers = async () => {
    setUser([]);
    try {
      const url = uri + "User/followers/";
      const response = await fetch(url + profileID); // must not be hard coded
      const json = await response.json();

      if (!Array.isArray(json) || json.length === 0) {
        // Handle empty or invalid response
        console.warn("No users found in the response.");
      
        // setLoading(false);
        return;
      }

      const users: UserModel[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      json.forEach((user: any) => {
        const newUser: UserModel = {
          user_id: user.user_id,
          username: user.username,
          email: user.email,
          password: user.password,
          biography: user.biography,
          nickname: user.nickname,
          pfp: user.pfp,
        };
        users.push(newUser);
      });

      // setFollowersCount(users.length)
      setUser(users);
      // setLoading(false);
    } catch (error) {
      console.error(error);
      throw new Error("Error getting post data");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [props]);


  const goToTheProfile = (index: string) => {
    navigate(`/Profile?profile_id=${index}`);
    onClose();
  };

//   const handleCloseModal = () => {
//     props.onModalEvent();
//   }

  // if (loading) {
  //   return <div className="text-yellow-100 italic text-m pr-2 text-s">Loading...</div>;
  // }

  return (
    <div>
        <div 
        className={`fixed inset-0 z-50 top-0 left-0 w-full h-full flex items-center justify-center 
        bg-black bg-opacity-50 ${open ? "visible" : "invisible"}`} 
        onClick={onClose}>
            <div
                className={`bg-modalBackground rounded-lg shadow p-6 transition-all max-w-md w-96 h-96 overflow-y-auto
                ${open ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}
                onClick={(e) => e.stopPropagation()}
                >
                <RxCross2 className={`absolute top-2 right-2 rounded-md w-7 h-7 text-white hover:cursor-pointer hover:text-zinc-400`}
                          onClick={onClose}/>

                <div className="text-white text-center text-3xl">
                    Followers
                </div>
                <hr className="h-px my-2 bg-gray-400 border-0"></hr>

                {user?.map((user) => (
                    <div 
                      className="flex p-4 text-white" 
                      key={user.user_id}>

                      <img src={user.pfp} alt="pfp" className="object-cover w-16 h-16 rounded-full hover:cursor-pointer" onClick={() => { goToTheProfile(user.user_id.toString()); }} />
                      <div className="flex flex-col ml-6 my-auto hover:cursor-pointer" onClick={() => { goToTheProfile(user.user_id.toString()); }}>
                        <div className="text-white text-xl">
                        {user.username}
                        </div>
                        <div className="text-yellow-100 text-sm italic">
                        {user.nickname}
                        </div>
                      </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    
  );
}

export { FollowersModal }