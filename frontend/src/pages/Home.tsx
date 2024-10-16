import { Sidebar } from "../components/Sidebar";
import { Post } from "../components/Post";
import logo from "../assets/hsr_logo.png";
import { Link } from "react-router-dom";

function Home() {
  const foundUser = localStorage.getItem("user");
  let userInfo;
  let uid;

  if (foundUser) {
    userInfo = JSON.parse(foundUser);
    uid = userInfo["user_id"];
    console.log(uid);
  }

  return (
    <>
      {foundUser ? (
        <div className="flex">
          <Sidebar />
          <Post />
          <div className="flex-1 p-5">
            <h1 className="text-white">The Nameless</h1>
            <h1 className="text-white">
              {uid ? "ID " + uid + " currently logged in!" : ""}
            </h1>
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-center">
          <img src={logo} alt="The Nameless Logo" className="pt-6 mt-6" />
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-yellow-200 italic text-8xl">The Nameless</h1>
            <h2 className="text-yellow-100 italic text-2xl">
              Doomscrolling has never been better...
            </h2>
            <Link
              to="/Login"
              className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-6"
            >
              Login
            </Link>
            <Link
              to="/Signup"
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

export default Home;
