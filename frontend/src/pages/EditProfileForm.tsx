import React, { useState } from "react";
import stelle from "../assets/Profile.png";
import { Link, useNavigate } from "react-router-dom";
import UserModel from "../types/User";
import shouldBeLoggedIn from "../components/Authenticate";

const hosted_link = "https://clipr-esa6hpg2cahzfud6.westus3-01.azurewebsites.net/";
const local_link = "http://localhost:5001/";

const EditProfileForm: React.FC = () => {
  shouldBeLoggedIn(true);
  const [currentUser] = useState(localStorage.getItem("user") || "");
  const userInfo = JSON.parse(currentUser);
  const [username, setUsername] = useState(userInfo['username']);
  const [email, setEmail] = useState(userInfo['email']);
  const [password, setPassword] = useState(userInfo['password']);
  const [biography, setBiography] = useState(userInfo['biography']);
  const [nickname, setNickname] = useState(userInfo['nickname']);
  const [pfp, setPfp] = useState(userInfo['pfp']);

  const [usernameErrorMsg, setUsernameErrorMsg] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setpasswordErrorMsg] = useState("");

  const navigate = useNavigate();

  const validate = () => {
    let valid = true;

    if (username.length < 3) {
      setUsernameErrorMsg("Must be at least 3 characters long");
      valid = false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailErrorMsg("Must be a valid email address");
      valid = false;
    }
    if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
      setpasswordErrorMsg(
        "Must be at least 8 characters long, contain 1 uppercase letter, and 1 digit",
      );
      valid = false;
    }
    return valid;
  };

  const onUsernameChange = (usernameText: string) => {
    setUsername(usernameText);
    setUsernameErrorMsg("");
  };

  const onEmailChange = (emailText: string) => {
    setEmail(emailText);
    setEmailErrorMsg("");
  };

  const onPasswordChange = (passwordText: string) => {
    setPassword(passwordText);
    setpasswordErrorMsg("");
  };

  const resetErrorMessages = () => {
    setUsernameErrorMsg("");
    setEmailErrorMsg("");
    setpasswordErrorMsg("");
  };

  const createAccount = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetErrorMessages();

    if (!validate()) {
      console.log("Error with user inputs for account creation");
      alert("Error with account details");
      return;
    }

    const newUser = {
      User_id: userInfo['user_id'],
      Username: username,
      Email: email,
      Password: password,
      Biography: biography,
      Nickname: nickname,
      Pfp: pfp,
    };
    try {
        console.log(JSON.stringify(newUser));
      const response = await fetch(
        local_link+"user/",
        {
          body: JSON.stringify(newUser),
          method: "PUT",
          headers: {
            Accept: "application/json, text/plain",
            "Content-Type": "application/json;charset=UTF-8",
          },
        },
      );
      console.log(response);
      if (response.status === 200) {
        alert("Success!");
        resetErrorMessages();
        try {
          const queryString =
            hosted_link+ "email/" +
            email;
          const response = await fetch(queryString);
          const json = (await response.json()) as UserModel;
          localStorage.setItem("user", JSON.stringify(json));
          window.dispatchEvent(new Event("storage"));
          console.log("done.");
        } catch (error) {
          console.log(error);
        }
        // navigate("./Clipr/");
        window.location.reload();
      } else {
        alert(`${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  return (
    <div className="flex flex-row justify-center pt-2">
      <form
        onSubmit={createAccount}
        className="bg-navbar rounded px-20 pt-5 pb-5 mt-10 mb-4 items-center border border-x-gray-300 max-w-md"
      >
        <img src={stelle} className="w-28 h-28 mx-auto"></img>
        <div className="w-full text-amber-500 text-center text-4xl mb-6">
          Edit {userInfo['username']}'s Profile
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-semibold mb-2">
            Username
          </label>
          <input
            type="text"
            className="border w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-neutral-200"
            value={username}
            onChange={(e) => onUsernameChange(e.target.value)}
            required
            placeholder="Username"
          />
          <span
            className={`block text-red-600 text-xs font-semibold ml-auto ${
              usernameErrorMsg ? "visible" : "invisible"
            }`}
          >
            {usernameErrorMsg}
          </span>
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            className="border w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-neutral-200"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            required
            placeholder="Email"
          />
          <span
            className={`block text-red-600 text-xs font-semibold ml-auto ${
              emailErrorMsg ? "visible" : "invisible"
            }`}
          >
            {emailErrorMsg}
          </span>
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            className="border-2 w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-neutral-200"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            required
            placeholder="Create a password"
          />
          <span
            className={`block text-red-600 text-xs font-semibold ml-auto  max-w-max break-words whitespace-normal ${
              passwordErrorMsg ? "visible" : "invisible"
            }`}
          >
            {passwordErrorMsg}
          </span>
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-semibold mb-2">
            Biography
          </label>
          <input
            type="text"
            className="border w-full py-2 px-3 text-black  leading-tight focus:outline-none focus:shadow-outline bg-neutral-200"
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            required
            placeholder="Temp"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-semibold mb-2">
            Nickname
          </label>
          <input
            type="text"
            className="border w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-neutral-200"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
            placeholder="Nickname"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-semibold mb-2">
            Profile Pic
          </label>
          <input
            type="text"
            className="border w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-neutral-200"
            value={pfp}
            onChange={(e) => setPfp(e.target.value)}
            required
            placeholder="Insert Image URL..."
          />
        </div>

        <div className="flex justify-center mt-5">
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded "
          >
            Submit
          </button>
        </div>

        {/* <div className="flex justify-center mt-4">
          <span className="text-white text-sm">Already a member?</span>
          <Link to="/Clipr/LogIn" className="text-amber-500 text-sm ml-1">
            Log in
          </Link>
        </div> */}
      </form>
    </div>
  );
};

export default EditProfileForm;
