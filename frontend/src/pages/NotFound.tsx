import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-yellow-200 italic text-9xl mt-5">404</h1>
      <h2 className="text-yellow-200 italic text-9xl">Not found</h2>
      <h3 className="text-yellow-200 italic text-9xl">˙◠˙</h3>
      <p className="text-yellow-200 italic text-2xl">
        Looks like you the page you wanted doesn't exist. Lets get you back
      </p>
      <Link
        to="Clipr/"
        className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
