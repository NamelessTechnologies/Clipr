import shouldBeLoggedIn from "../Authenticate";
import "../../styles/ProfileHeader.css";
import UserModel from "../../types/User";
import { FaCrown } from "react-icons/fa6";
import { useEffect, useState } from "react";

type status = "Friends" | "Following" | "Follow Back" | "Follow" | "Error";

function ProfileHeader(props: { profile_id: string; userData: UserModel }) {
  shouldBeLoggedIn(true);
  const id = props.profile_id;
  const [lookingAtOwnProfile, setLookingAtOwnProfile] =
    useState<boolean>(false);
  const [status, setStatus] = useState<status>("Error");

  //Checking if the user is looking at their own profile
  useEffect(() => {
    async function fetchData() {
      try {
        const queryString =
          "https://clipr-esa6hpg2cahzfud6.westus3-01.azurewebsites.net/get/" +
          id;
        const response = await fetch(queryString);
        const json = (await response.json()) as UserModel;
        console.log(json);
      } catch (error) {
        console.error(error);
      }
    }

    const getUser = localStorage.getItem("user");
    if (getUser) {
      const parsedUser = JSON.parse(getUser) as UserModel;

      // Move the profile-checking logic here
      const currentUserID = parsedUser.user_id.toString();
      console.log(currentUserID, id);
      if (currentUserID === id) {
        setLookingAtOwnProfile(true);
      } else {
        setLookingAtOwnProfile(false);
      }
    }
  }, [id]);

  const TripleFs = () => {
    return (
      <div className="flex flex-row">
        <div className="text-yellow-100 italic text-1xl pr-2">
          Followers: 69
        </div>
        <div className="text-yellow-100 italic text-1xl pr-2">
          Following: 1738
        </div>
        <div className="text-yellow-100 italic text-1xl pr-2">Friends: 420</div>
      </div>
    );
  };

  return (
    <div className="flex justify-center w-screen h-screen">
      {lookingAtOwnProfile ? (
        <div className="flex flex-row">
          <div className="pt-3">
            <div className="circle-big">
              <img
                src="https://ih1.redbubble.net/image.5503365970.2431/flat,750x,075,f-pad,750x1000,f8f8f8.u1.jpg"
                alt="you are my sunshine"
              ></img>
            </div>
          </div>
          <div className="flex flex-col pl-5">
            <div className="flex flex-row pt-20">
              <div className="text-yellow-100 italic text-5xl pr-2">
                <b>{props.userData.username}</b> -
              </div>
              <div className="text-yellow-100 italic text-3xl pr-2 pt-2">
                <i>{props.userData.nickname}</i>
              </div>
              <FaCrown className="text-yellow-600" />
            </div>
            <div className="flex flex-row pt-2 pb-2">
              <button className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2">
                Edit Profile
              </button>
              <button className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2">
                Settings
              </button>
            </div>
            <TripleFs></TripleFs>
          </div>
        </div>
      ) : (
        <div className="flex flex-row">
          <div className="pt-3">
            <div className="circle-big">
              <img
                src="https://ih1.redbubble.net/image.5503365970.2431/flat,750x,075,f-pad,750x1000,f8f8f8.u1.jpg"
                alt="you are my sunshine"
              ></img>
            </div>
          </div>
          <div className="flex flex-col pl-5">
            <div className="flex flex-row pt-20">
              <div className="text-yellow-100 italic text-5xl pr-2">
                <b>{props.userData.username}</b> -
              </div>
              <div className="text-yellow-100 italic text-3xl pr-2 pt-2">
                <i>{props.userData.nickname}</i>
              </div>
            </div>
            <div className="flex flex-row pt-2 pb-2">
              <button className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2">
                {status}
              </button>
            </div>
            <TripleFs></TripleFs>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileHeader;
