import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="bg-gray-#3C3C3C text-white py-6 px-6 m-2 rounded-xl border-2 border-white">
      <div className="flex justify-between items-center">
        <Link
          to="/"
          className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-300"
        >
          The Nameless
        </Link>

        <ul className="flex space-x-4">
          <li>
            <Link
              to="/SignUp"
              className="text-lg hover:bg-gray-600 px-3 py-2 rounded"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export { NavBar };
