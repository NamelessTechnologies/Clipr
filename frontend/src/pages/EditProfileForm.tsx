import React, { useEffect, useRef, useState } from "react";
import UserModel from "../types/User";
import ShouldBeLoggedIn from "../components/Authenticate";
import { uri, local_uri } from "../App";
import ReactS3Client from "react-aws-s3-typescript";
import { s3Config } from "../components/s3Config";
import { FaPencil } from "react-icons/fa6";

const EditProfileForm: React.FC = () => {
  ShouldBeLoggedIn(true);
  const [currentUser] = useState(localStorage.getItem("user") || "");
  const userInfo = JSON.parse(currentUser);
  const [username, setUsername] = useState(userInfo["username"]);
  const [email, setEmail] = useState(userInfo["email"]);
  // const [password, setPassword] = useState(userInfo["password"]);
  // const [password2, setPassword2] = useState(userInfo["password"]);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [biography, setBiography] = useState(userInfo["biography"]);
  const [biolength, setBioLength] = useState(0);
  const [nickname, setNickname] = useState(userInfo["nickname"]);
  var pfp = useRef(userInfo["pfp"]);
  const [usernameErrorMsg, setUsernameErrorMsg] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setpasswordErrorMsg] = useState("");

  // DATA FOR PFP UPLOAD
  const [image, setImage] = useState<File | null>(null);
  const [media_type, setMediaType] = useState("");
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const temp_type = file?.type;
      const type = temp_type?.split("/")[0];
      setMediaType(type);
      setImage(file);
      if (type == "image") {
        const previewURL = URL.createObjectURL(file);
        const previewImgElement = document.getElementById(
          "img-preview",
        ) as HTMLImageElement;
        previewImgElement.src = previewURL;
      } else {
        alert("Please upload only image files!");
        return;
      }
    }
  };

  const clickFileInputDIV = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  // VALIDATION CHECKS
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

    if ((password.length != 0) || (password2.length != 0)) {

      if (password != password2) {
        setpasswordErrorMsg("Passwords don't match!");
        valid = false;
      }

      if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
        setpasswordErrorMsg(
          "Must be at least 8 characters long, contain 1 uppercase letter, and 1 digit",
        );
        valid = false;
      }
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

  const onPassword2Change = (passwordText: string) => {
    setPassword2(passwordText);
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
    var fileLocation = "";

    // VALIDATE INPUT
    if (!validate()) {
      alert("Error with account details");
      return;
    }

    // ATTEMPT PHOTO UPLOAD
    if (image) {
      // VALIDATE FILE
      if (media_type != "image") {
        alert("Please upload file of type image!");
        return;
      }

      // UPLOAD TO S3
      const s3 = new ReactS3Client(s3Config);
      try {
        console.log(
          "Attempting to upload " + image.name + " of type " + image.type,
        );
        var fileName = image.name;
        fileName = fileName.substring(0, fileName.lastIndexOf(".")); // remove the file extension (it will be added by endpoint)
        const res = await s3.uploadFile(image, fileName);
        /*
         * {
         *   Response: {
         *     bucket: "bucket-name",
         *     key: "directory-name/filename-to-be-uploaded",
         *     location: "https:/your-aws-s3-bucket-url/directory-name/filename-to-be-uploaded"
         *   }
         * }
         */
        console.log(res);
        var res_json = JSON.stringify(res);
        var parsed = JSON.parse(res_json);
        // console.log("parsed.location: " + parsed.location);
        fileLocation = parsed.location;
        pfp.current = fileLocation;
        // console.log("fileLocation: " + fileLocation);
      } catch (exception) {
        console.log(exception);
      }
    }

    console.log("PFP before posting: " + pfp);

    // POST ACCT TO DB
    const newUser = {
      User_id: userInfo["user_id"],
      Username: username,
      Email: email,
      Password: password,
      Biography: biography,
      Nickname: nickname,
      Pfp: pfp.current,
    };
    try {
      const response = await fetch(local_uri + "user/", {
        body: JSON.stringify(newUser),
        method: "PUT",
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8",
        },
      });
      if (response.status === 200) {
        resetErrorMessages();
        try {
          const queryString = uri + "email/" + email;
          const response = await fetch(queryString);
          const json = (await response.json()) as UserModel;
          localStorage.setItem("user", JSON.stringify(json));
          window.dispatchEvent(new Event("storage"));
        } catch (error) {
          console.error(error);
        }
        alert("Success!");
        location.reload();
      } else {
        alert(`${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  if (!userInfo) {
    return <div className="text-white">Loading...</div>;
  }

  useEffect(() => {
    setBioLength(biography.length);
  }, [biography]);

  return (
    <div className=" bg-neutral-900 flex flex-row justify-center pt-2">
      <form
        onSubmit={createAccount}
        className="bg-neutral-900 rounded px-20 pt-5 pb-5 items-center w-11/12 max-h-[88vh]"
      >
        <div className="w-full text-amber-500 text-center text-3xl mb-6">
          Edit Profile
        </div>

        <div className="flex justify-center ">
          <div className="relative z-0" onClick={clickFileInputDIV}>
            <img
              id="img-preview"
              src={pfp.current}
              className="w-24 h-24 mx-auto rounded-full"
            ></img>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            ></input>
            <div className="absolute inset-y-0 left-[4.5rem] top-16 flex justify-right text-right z-10">
              <FaPencil className="text-gray-500 w-8 h-8 opacity-90"></FaPencil>
            </div>
          </div>
        </div>

        <div className="h-10"> </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-semibold mb-2">
            Username
          </label>
          <input
            type="text"
            className="border-gray-800 rounded-sm w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-zinc-800"
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
            className="border-gray-800 rounded-sm w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-zinc-800"
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
            className="mb-2 border-gray-800 rounded-sm w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-zinc-800"
            // value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            // required
            placeholder="Create a password"
          />

          <label className="block text-white text-sm font-semibold mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            className="border-gray-800 rounded-sm w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-zinc-800 placeholder-gray-600"
            // value={password2}
            onChange={(e) => onPassword2Change(e.target.value)}
            // required
            placeholder="Confirm your password"
          />
          <span
            className={`block text-red-600 text-xs font-semibold ml-auto ${
              passwordErrorMsg ? "visible" : "invisible"
            }`}
          >
            {passwordErrorMsg}
          </span>
        </div>

        <div className="mb-1">
          <label className="block text-white text-sm font-semibold mb-2">
            Biography
          </label>
          <textarea
            className="border-gray-800 rounded-sm w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-zinc-800 placeholder-gray-600"
            value={biography}
            onChange={(e) => {
              setBiography(e.target.value);
            }}
            maxLength={100}
            required
            placeholder="Type your bio here!"
          ></textarea>
          <span className="block text-white text-xs text-right">
            {biolength} / 100
          </span>
        </div>
        <div className="mb-8">
          <label className="block text-white text-sm font-semibold mb-2">
            Nickname
          </label>
          <input
            type="text"
            className="border-gray-800 rounded-sm w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-zinc-800"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
            placeholder="Nickname"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded"
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
