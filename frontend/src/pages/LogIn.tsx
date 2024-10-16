import React, { useState } from "react";
import User from "../types/User";
import { Link, useNavigate } from "react-router-dom";

const LogIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const[data, setData] = useState<User>(); // Fetched data will be an array of json
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const attemptLogIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const queryString =
        "https://clipr-esa6hpg2cahzfud6.westus3-01.azurewebsites.net/email/" +
        email;
      const response = await fetch(queryString);
      const json = (await response.json()) as User;

      if (json?.password == password) {
        setMessage("Correct Password!");
        try {
          localStorage.setItem("user", JSON.stringify(json));
          window.dispatchEvent(new Event("storage"));
          console.log("done.");
        } catch (error) {
          console.log(error);
        }
        navigate("../Clipr/");
        window.location.reload();
      } else {
        setMessage("Incorrect Password");
      }
    } catch (error) {
      console.log(error);
      setMessage("Invalid email, please make an account!");
    }
  };

  return (
    <div className="flex justify-center text-white p-10">
      <form
        onSubmit={attemptLogIn}
        className="bg-navbar items-center pt-5 px-10 pb-10 rounded-md shadow-lg border border-white"
      >
        <div className="px-5 pt-2 pb-3">
          <h1 className="text-4xl">Log In To Account</h1>
        </div>
        {message ? (
          <span className="text-red-700 pb-5">***{message}</span>
        ) : (
          <></>
        )}
        <div className="flex justify-center flex-col mx-5">
          <label className="">Email:</label>
          <input
            className="p-2 text-black mb-6 rounded-md"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label className="">Password:</label>
          <input
            className="p-2 text-black mb-10 rounded-md"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>

        <div className="flex flex-col text-center justify-center">
          <button
            className="bg-hsr_gold hover:bg-amber-600 rounded-md pl-5 pr-5 pt-2 pb-2 justify-center"
            type="submit"
          >
            Log In
          </button>
          <div className="flex justify-center mt-4">
            <span className="text-white text-sm">New to Clipr? </span>
            <Link to="/Clipr/SignUp" className="text-amber-500 text-sm ml-1">
              Sign Up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
