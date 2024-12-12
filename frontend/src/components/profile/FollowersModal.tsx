// import { useNavigate } from "react-router-dom";
// import { uri } from "../../App";
import React from "react";
import ShouldBeLoggedIn from "../Authenticate";
import { useState, useEffect } from "react";
import UserModel from "../../types/User";
import { useNavigate } from "react-router-dom";
import { uri } from "../../App";

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
        bg-gray-500 bg-opacity-70 ${open ? "visible bg-black/20" : "invisible"}`} 
        onClick={onClose}>
            <div
                className={`bg-gray-500 rounded-lg shadow p-6 transition-all max-w-md w-96 h-96 overflow-y-auto
                ${open ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}
                onClick={(e) => e.stopPropagation()}
                >
                <button 
                className={`absolute top-2 right-2 py-2 px-2 border border-neutral-200 rounded-md 
                text-gray-400 bg-gray-500 bg-opacity-70`}
                onClick={onClose}>
                    x
                </button>
                {/* {children} */}
                <div className="friends-container pt-3">
        <div className="flex flex-col justify-center text-yellow-100 text-center text-5xl italic pr-2">
            Followers
        </div>

        {user?.map((user) => (
            <div 
              onClick={() => {
                goToTheProfile(user.user_id.toString());
              }} 
              className="flex p-4 text-white hover:cursor-pointer space-x-6" 
              key={user.user_id}>
              <div className="circle-small border ">
                <img src={user.pfp} alt="pfp" className="object-cover w-full h-full"/>
              </div>
              <div className="flex flex-col">
                <div className="text-yellow-100 italic text-m pr-2">
                {user.nickname}
                </div>
                <div className="text-yellow-100 italic text-xl pr-2">
                {user.username}
              </div>
            </div>
            </div>

            
        ))}
        </div>
            
            </div>
        </div>
    </div>
    
  );
}

export { FollowersModal }