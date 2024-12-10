import React, { useEffect, useRef, useState } from "react";
import stelle from "../assets/Profile.png";
import { Link, useNavigate } from "react-router-dom";
import UserModel from "../types/User";
import ShouldBeLoggedIn from "../components/Authenticate";
import { socket } from "../socket";
import { uri, local_uri } from "../App";
import ReactS3Client from "react-aws-s3-typescript";
import { s3Config } from "../components/s3Config";
import { FaPencil } from "react-icons/fa6";

const CreateAccount: React.FC = () => {
  ShouldBeLoggedIn(false);
  const defaultPfp = "https://clipr-bucket.s3.us-east-1.amazonaws.com/default-pfp.jpg";
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [biography, setBiography] = useState("");
  const [biolength,setBioLength] = useState(0);
  const [nickname, setNickname] = useState("");
  var pfp = useRef("");

  const [usernameErrorMsg, setUsernameErrorMsg] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setpasswordErrorMsg] = useState("");

    // DATA FOR PFP UPLOAD
    const [image, setImage] = useState<File | null>(null);
    const [media_type, setMediaType] = useState("");
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files ? e.target.files[0] : null;
      if(file) {
        const temp_type = file?.type;
        const type = temp_type?.split('/')[0];
        setMediaType(type);
        setImage(file);
        if (type == 'image') {
            const previewURL = URL.createObjectURL(file);
            const previewImgElement = document.getElementById("img-preview") as HTMLImageElement;
            previewImgElement.src = previewURL;
        } else {
            alert("Please upload only image files!");
            return;
        }
        
      }
    };
  
    const clickFileInputDIV = () => {
      const fileInput = document.getElementById('fileInput');
      if (fileInput) {
          fileInput.click();
      }
    };

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

    if (password != password2) {
        setpasswordErrorMsg(
            "Passwords don't match!"
        );
        valid = false;
    }

    if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
      setpasswordErrorMsg(
        "Must be at least 8 characters long, contain 1 uppercase letter, and 1 digit"
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
    var fileLocation = ""; // if no upload, use default pfp

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
            console.log("Attempting to upload " + image.name + " of type " + image.type);
            var fileName = image.name;
            fileName = fileName.substring(0,fileName.lastIndexOf(".")); // remove the file extension (it will be added by endpoint)
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
    } else {
        pfp.current = defaultPfp;
    }

    const newUser = {
      Username: username,
      Email: email,
      Password: password,
      Biography: biography,
      Nickname: nickname,
      Pfp: pfp.current,
    };
    try {
      const response = await fetch(`${local_uri}user/`, {
        body: JSON.stringify(newUser),
        method: "POST",
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8",
        },
      });
      if (response.status === 200) {
        alert("Success!");
        resetErrorMessages();
        try {
          const queryString = `${uri}email/` + email;
          const response = await fetch(queryString);
          const json = (await response.json()) as UserModel;
          localStorage.setItem("user", JSON.stringify(json));
          window.dispatchEvent(new Event("storage"));
        } catch (error) {
          console.error(error);
        }
        socket.connect();
        navigate("../");
      } else {
        alert(`${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  useEffect (() => {
    setBioLength(biography.length);
  }, [biography]);

  return (
    <div className="flex flex-row justify-center pt-2">
      <form
        onSubmit={createAccount}
        className="bg-navbar rounded px-20 pt-5 pb-5 mt-10 mb-4 items-center border border-x-gray-300 max-w-md"
      >

        <div className = 'flex justify-center items-center'>
            <div className='relative z-0'>
                <img 
                    src={stelle} 
                    className="w-30 h-30 mx-auto rounded-full"></img>                
            </div>
        </div>

        <div className="w-full text-white text-center text-4xl mb-6">
          Welcome to Clipr
        </div>
        <div className="w-full text-amber-500 text-center text-2xl mb-6">
          Create Account
        </div>

        <label className="block text-white text-sm font-semibold mt-12 mb-2">
            Upload your profile picture here! 
        </label>

        <div className = 'flex justify-center '>
            <div className='relative z-0'
                onClick={clickFileInputDIV}>
                <img 
                    id='img-preview'
                    src={defaultPfp} 
                    className="w-28 h-28 mx-auto rounded-full"></img>
                <input
                    id='fileInput'
                    type='file'
                    accept="image/*"
                    onChange={handleFileChange}
                    className='hidden'></input>
                <div className="absolute inset-y-0 left-20 top-16 flex justify-right text-right z-10"
                    >
                    <FaPencil className='text-gray-700 w-10 h-10 opacity-90'></FaPencil>
                </div>
            </div>
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
            className="mb-2 border-2 w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-neutral-200"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            required
            placeholder="Create a password"
          />

          <label className="block text-white text-sm font-semibold mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            className="border-2 w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-neutral-200"
            value={password2}
            onChange={(e) => onPassword2Change(e.target.value)}
            required
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

        <div className="mb-4">
          <label className="block text-white text-sm font-semibold mb-2">
            Biography
          </label>
          <textarea 
            className="border w-full py-2 px-3 text-black  leading-tight focus:outline-none focus:shadow-outline bg-neutral-200"
            value={biography}
            onChange={(e) => {setBiography(e.target.value);
                console.log(biography.length);
            }}
            maxLength={100}
            required
            placeholder="Type your bio here!"
          ></textarea>
          <span className='block text-white text-xs text-right'>{biolength} / 100</span>
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

        <div className="flex justify-center mt-5">
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded "
          >
            Submit
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <span className="text-white text-sm">Already a member?</span>
          <Link to="/Login" className="text-amber-500 text-sm ml-1">
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
};

export { CreateAccount };
