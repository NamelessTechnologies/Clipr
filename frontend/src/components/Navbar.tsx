import { Link } from "react-router-dom";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { useEffect, useState } from "react";

function NavBar() {
  const [foundUser, setFoundUser] = useState<string>();
  const logout = () => {
    if (!foundUser) {
      return;
    }
    localStorage.removeItem("user");
    window.location.reload();
  };

  useEffect(() => {
    const localStorageUser = localStorage.getItem("user");
    if (localStorageUser) {
      setFoundUser(localStorageUser);
    }
  }, [foundUser]);

  return (
    <>
      {foundUser ? (
        <nav className="bg-navbar text-white py-6 px-6 border-b border-white">
          <div className="flex justify-between items-center">
            <Link
              to="Clipr/"
              className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-300"
            >
              The Nameless
            </Link>

            <ul className="flex space-x-4">
              <li>
                <Link to="Clipr/Upload">
                  <HiMiniPencilSquare className="w-8 h-7 rounded-full hover:bg-gray-600" />
                </Link>
              </li>
              <li>
                <Link
                  to="Clipr/Tables"
                  className="text-lg hover:bg-gray-600 px-3 py-2 rounded"
                >
                  Tables
                </Link>
              </li>
              <li>
                <Link
                  to="Clipr/SetReceiver"
                  className="text-lg hover:bg-gray-600 px-3 py-2 rounded"
                >
                  Messages
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-lg hover:bg-gray-600 px-3 py-2 rounded"
                >
                  View Profile
                </Link>
              </li>
              <li>
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
