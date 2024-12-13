import { Link } from "react-router-dom";

function AltNavBar() {
  return (
    <>
      <nav className="bg-navbar text-white py-4 px-6 border-b border-white w-[100vw]">
        <div className="flex justify-between items-center">
          <a
            href="/"
            className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-300"
          >
            Clipr
          </a>
          <ul className="flex space-x-4">
            <li className="pt-2 ">
              <Link
                to="/Login"
                className="text-lg hover:bg-gray-600 px-3 py-2 rounded"
              >
                Login
              </Link>
            </li>
            <li className="pt-2">
              <Link
                to="/SignUp"
                className="text-lg hover:bg-gray-600 px-3 py-2 rounded"
              >
                Create Account
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export { AltNavBar };
