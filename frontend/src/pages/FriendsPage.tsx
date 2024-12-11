// import { Sidebar } from "../components/Sidebar";
// import { Friends } from "../components/Friends";
// import logo from "../assets/hsr_logo.png";
// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import UserModel from "../types/User";

function FriendsPage() {
  const [foundUser, setFoundUser] = useState<string>();
  const [userInfo, setUserInfo] = useState<UserModel>();
  const [uid, setUID] = useState<number>();
  console.log(foundUser, uid);
  // const [friendsCount, setFriendsCount] = useState<number>(0);

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

  // const handleFriendCount = useCallback((data: number) => {
  //   setFriendsCount(data);
  //   console.log(friendsCount);
  // }, []);

  return (
    <>
      <div className="flex justify-center mt-6 mb-4">
        {/* <div className="fixed top-0 left-0 h-screen z-10">
            <Sidebar />
          </div> */}
        
        <br></br>
        
        {/* <Friends onSendFriendCount={handleFriendCount}/> */}
      </div>
    </>
  );
}

export default FriendsPage;
