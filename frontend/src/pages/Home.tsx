// import { Sidebar } from "../components/Sidebar";
import { PostBox } from "../components/PostBox";
import logo from "../assets/hsr_logo.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import UserModel from "../types/User";
import Switch from '@mui/material/Switch';
import { IoMoonOutline } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";


function Home() {
  const [foundUser, setFoundUser] = useState<string>();
  const [userInfo, setUserInfo] = useState<UserModel>();
  const [darkMode, setDarkMode] = useState<boolean>(false);
  // const [uid, setUID] = useState<number>();
  const [, setUID] = useState<number>();

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

  const turnOnDarkMode = () => {
    setDarkMode(!darkMode);
  }

  return (
    <>
      {foundUser ? (
        <div>
          {darkMode && (
            <div className="fixed bg-black inset-0 z-10"></div>
          )}
          <PostBox />

          <div className="fixed bottom-5 right-5 z-20 flex items-center">
            {darkMode ? (<IoMoon className="text-[#d78d35]"/>) : (<IoMoonOutline className="text-white"/>)}

            <Switch checked={darkMode} onChange={turnOnDarkMode} color="warning"  sx={{'& .MuiSwitch-switchBase.Mui-checked': {color: '#d78d35'}}}/>
          </div>
            
        </div>
      ) : (
        <div className="flex flex-row items-center justify-center">
          <img src={logo} alt="The Nameless Logo" className="pt-6 mt-6 " />
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-yellow-200 italic text-8xl">Clipr</h1>
            <h2 className="text-yellow-100 italic text-2xl">
              Doomscrolling has never been better...
            </h2>
            <Link
              to="./Login"
              className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-6"
            >
              Login
            </Link>
            <Link
              to="./Signup"
              className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2"
            >
              Signup
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export { Home };
