// import { Sidebar } from "../components/Sidebar";
import { Friends } from "../components/Friends";
// import logo from "../assets/hsr_logo.png";
// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import UserModel from "../types/User";
import ShouldBeLoggedIn from "../components/Authenticate";

function FriendsPage() {
  ShouldBeLoggedIn(true);
  const [foundUser, setFoundUser] = useState<string>();
  const [userInfo, setUserInfo] = useState<UserModel>();
  const [uid, setUID] = useState<number>();

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
      <div className="flex justify-center mt-6 mb-4">
        {/* <div className="fixed top-0 left-0 h-screen z-10">
            <Sidebar />
          </div> */}

        <br></br>

        <Friends />
      </div>
    </>
  );
}

export default FriendsPage;
