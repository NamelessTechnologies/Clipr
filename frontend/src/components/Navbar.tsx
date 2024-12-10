import { Link, useNavigate } from "react-router-dom";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { useEffect, useState } from "react";
import UserModel from "../types/User";
import SearchBar from "./SearchBar";
import { socket } from "../socket";

function NavBar() {
  const navigate = useNavigate();

  const [foundUser, setFoundUser] = useState<string | undefined>();
  const [userProfileURL, setUserProfileURL] = useState<string>("/Profile/");

  useEffect(() => {
    const localStorageUser = localStorage.getItem("user");
    if (localStorageUser) {
      setFoundUser(localStorageUser);
    }

    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      setFoundUser(updatedUser ?? undefined);
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (foundUser) {
      const parsed = JSON.parse(foundUser) as UserModel;
      setUserProfileURL(`/Profile?profile_id=${parsed.user_id}`);
    }
  }, [foundUser]);

  const logout = () => {
    localStorage.removeItem("user"); // Remove user from localStorage
    setFoundUser(undefined); // Clear the state to trigger re-render
    socket.disconnect(); // Disconnect socket
    navigate("/LogOut");
  };

  return (
    <>
      {foundUser ? (
        <nav className="bg-navbar text-white py-4 px-6 border-b border-white">
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-300"
            >
              Clipr
            </Link>
            <ul className="flex space-x-4">
              <li>
                <SearchBar data-testid="search-bar"></SearchBar>
              </li>
              <li className="pt-3">
                <Link to="/Upload" data-testid="upload-link">
                  <HiMiniPencilSquare className="w-8 h-7 rounded-full hover:bg-gray-600" />
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
                  to="/Inbox"
                  className="text-lg hover:bg-gray-600 px-3 py-2 rounded"
                >
                  Messages
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
      ) : null}
    </>
  );
}

export { NavBar };
