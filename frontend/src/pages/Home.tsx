// import { Sidebar } from "../components/Sidebar";
import { PostBox } from "../components/PostBox";
import logo from "../assets/hsr_logo.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import UserModel from "../types/User";
import Switch from "@mui/material/Switch";
import { IoMoonOutline } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";
import { uri } from "../App";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { FaArrowAltCircleUp } from "react-icons/fa";

function Home() {
  const [foundUser, setFoundUser] = useState<string>();
  const [transparentUp, setTransparentUp] = useState<boolean>(true);
  const [transparentDown, setTransparentDown] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserModel>();
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [allPosts, setAllPosts] = useState<number[]>();
  const [currentPostIndex, setCurrentPostIndex] = useState<number>();
  const [loading, setLoading] = useState(true);

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

    const fetchPosts = async () => {
      const url = uri + "post/real/getPostArray";
      const response = await fetch(url);
      const json = await response.json();
      setAllPosts(json["postArray"]);
      setCurrentPostIndex(0);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // This effect updates the UID once `userInfo` is set
  useEffect(() => {
    if (userInfo && userInfo.user_id) {
      setUID(userInfo.user_id);
    }
  }, [userInfo]);

  const turnOnDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleDown = () => {
    if (currentPostIndex == allPosts!.length - 1) {
      setTransparentDown(true);
    }
    if (currentPostIndex! + 1 != allPosts!.length) {
      setCurrentPostIndex(currentPostIndex! + 1);
      setTransparentUp(false);
    }
  };

  const handleUp = () => {
    if (currentPostIndex == allPosts!.length - 1) {
      setCurrentPostIndex(currentPostIndex! - 1);
      setTransparentDown(false);
    }

    if (currentPostIndex == 1) {
      setCurrentPostIndex(currentPostIndex! - 1);
      setTransparentUp(true);
    } else if (currentPostIndex != 0) {
      setCurrentPostIndex(currentPostIndex! - 1);
    }
  };

  if (loading) {
    return <div> Loading... </div>;
  }

  return (
    <>
      {foundUser ? (
        <div>
          {darkMode && <div className="fixed bg-black inset-0 z-10"></div>}

          {transparentUp ? (
            <FaArrowAltCircleUp
              onClick={handleUp}
              className="fixed left-48 top-1/3 text-white w-12 h-12 hidden cursor-pointer z-10"
            >
              {" "}
              click to go down{" "}
            </FaArrowAltCircleUp>
          ) : (
            <FaArrowAltCircleUp
              onClick={handleUp}
              className="fixed left-48 top-1/3 text-white w-12 h-12 cursor-pointer hover:text-zinc-300 z-10"
            >
              {" "}
              click to go down{" "}
            </FaArrowAltCircleUp>
          )}

          {transparentDown ? (
            <FaArrowAltCircleDown
              onClick={handleDown}
              className="fixed left-48 top-2/4 text-white w-12 h-12 hidden cursor-pointer z-10"
            >
              {" "}
              click to go down{" "}
            </FaArrowAltCircleDown>
          ) : (
            <FaArrowAltCircleDown
              onClick={handleDown}
              className="fixed left-48 top-2/4 text-white w-12 h-12 cursor-pointer hover:text-zinc-300 z-10"
            >
              {" "}
              click to go down{" "}
            </FaArrowAltCircleDown>
          )}

          <PostBox postID={allPosts![currentPostIndex!]!} />

          <div className="fixed bottom-5 right-5 z-20 flex items-center">
            {darkMode ? (
              <IoMoon className="text-[#d78d35]" />
            ) : (
              <IoMoonOutline className="text-white" />
            )}

            <Switch
              checked={darkMode}
              onChange={turnOnDarkMode}
              color="warning"
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": { color: "#d78d35" },
              }}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-center">
          <img src={logo} alt="The Nameless Logo" className="pt-6 mt-20 mr-6" />
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-yellow-200 italic text-9xl mb-8">Clipr</h1>
            <h2 className="text-yellow-100 italic text-2xl">
              Doomscrolling has never been better...
            </h2>
            <Link
              to="./Login"
              className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-base px-5 py-2.5 text-center me-2 mb-2 mt-12"
            >
              Login
            </Link>
            <Link
              to="./Signup"
              className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-base px-5 py-2.5 text-center me-2 mb-2 mt-2"
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
