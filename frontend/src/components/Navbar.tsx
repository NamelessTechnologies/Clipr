import { Link } from "react-router-dom";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { useEffect, useState } from "react";
import UserModel from "../types/User";
import SearchBar from "./SearchBar";

function NavBar() {
  const [foundUser, setFoundUser] = useState<string>();
  const [userProfileURL, setUserProfileURL] = useState<string>("/Profile/");
  const logout = () => {
    if (!foundUser) {
      return;
    }
    localStorage.removeItem("user");
    // window.location.reload();
  };

  useEffect(() => {
    const localStorageUser = localStorage.getItem("user");
    if (localStorageUser) {
      setFoundUser(localStorageUser);
      const parsed = JSON.parse(localStorageUser) as UserModel;
      setUserProfileURL(`/Profile?profile_id=${parsed.user_id}`);
    }
  }, [foundUser]);

  return (
    <>
      {foundUser ? (
        <nav className="bg-navbar text-white py-6 px-6 border-b border-white">
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-300"
            >
              Clipr
            </Link>
            <ul className="flex space-x-4">
              <li>
                <SearchBar></SearchBar>
              </li>
              <li className="pt-3">
                <Link to="/Upload">
                  <HiMiniPencilSquare className="w-8 h-7 rounded-full hover:bg-gray-600" />
                </Link>
              </li>
              <li className="pt-3">
                <Link
                  to="/Tables"
                  className="text-lg hover:bg-gray-600 px-3 py-2 rounded"
                >
                  Tables
                </Link>
              </li>
              <li className="pt-3">
                <Link
                  to="/Friends"
                  className="text-lg hover:bg-gray-600 px-3 py-2 rounded"
                >
                  Friends
                </Link>
              </li>
              <li className="pt-3">
                <Link
                  to={userProfileURL}
                  className="text-lg hover:bg-gray-600 px-3 py-2 rounded"
                >
                  View Profile
                </Link>
              </li>
              <li className="pt-3">
                <button
                  onClick={logout}
                  className="text-lg hover:bg-gray-600 px-3 rounded"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
      ) : (
        <></>
      )}
    </>
  );
}

export { NavBar };
