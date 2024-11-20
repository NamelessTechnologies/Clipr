import ShouldBeLoggedIn from "../Authenticate";
import "../../styles/ProfileHeader.css";
import UserModel from "../../types/User";
import { FaCrown } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConversationModel from "../../types/Conversation";
import { uri } from "../../App";

type status = "Friends" | "Following" | "Follow Back" | "Follow" | "Error";

function ProfileHeader(props: { profile_id: string; userData: UserModel }) {
  ShouldBeLoggedIn(true);

  const profileID = props.profile_id;
  const [userID, setUserID] = useState<string>();
  const [lookingAtOwnProfile, setLookingAtOwnProfile] =
    useState<boolean>(false);
  const navigate = useNavigate();

  const [userFollowingProfile, setUserFollwingProfile] = useState<boolean>();
  const [profileFollowingUser, setProfileFollwingUser] = useState<boolean>();
  const [status, setStatus] = useState<status>("Error");

  // FOR NAVIGATING TO MESSAGES PAGE
  const [currentUser] = useState(localStorage.getItem("user") || "");
  const userInfo = JSON.parse(currentUser);

  useEffect(() => {
    const getUser = localStorage.getItem("user");
    if (getUser) {
      const parsedUser = JSON.parse(getUser) as UserModel;

      const currentUserID = parsedUser.user_id.toString();
      setUserID(currentUserID);
      if (currentUserID === profileID) {
        setLookingAtOwnProfile(true);
      } else {
        setLookingAtOwnProfile(false);
      }
    }
  }, [profileID]);

  useEffect(() => {
    async function fetchData() {
      try {
        let queryString = `${uri}User/checkfollow?User_1=${userID}&User_2=${profileID}`;
        let response = await fetch(queryString);
        let json = await response.json();
        if (json.user_1 == -1) {
          setUserFollwingProfile(false);
        } else {
          setUserFollwingProfile(true);
        }
        queryString = `${uri}User/checkfollow?User_1=${profileID}&User_2=${userID}`;
        response = await fetch(queryString);
        json = await response.json();
        if (json.user_1 == -1) {
          setProfileFollwingUser(false);
        } else {
          setProfileFollwingUser(true);
        }

        if (profileFollowingUser && userFollowingProfile) {
          setStatus("Friends");
        } else if (profileFollowingUser && !userFollowingProfile) {
          setStatus("Follow Back");
        } else if (!profileFollowingUser && userFollowingProfile) {
          setStatus("Following");
        } else if (!profileFollowingUser && !userFollowingProfile) {
          setStatus("Follow");
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [profileFollowingUser, profileID, userFollowingProfile, userID]);

  // const TripleFs = () => {
  //   return (
  //     <div className="flex flex-row">
  //       <div className="text-yellow-100 italic text-1xl pr-2">
  //         Followers: 69
  //       </div>
  //       <div className="text-yellow-100 italic text-1xl pr-2">
  //         Following: 1738
  //       </div>
  //       <div className="text-yellow-100 italic text-1xl pr-2">Friends: 420</div>
  //     </div>
  //   );
  // };
  const clickButton = async () => {
    if (status === "Friends") {
      // unfollow profileID
      setStatus("Follow Back");
      const queryString = `${uri}user/following?User_1=${userID}&User_2=${profileID}`;
      try {
        await fetch(queryString, {
          method: "DELETE",
          headers: {
            Accept: "application/json, text/plain",
            "Content-Type": "application/json;charset=UTF-8",
          },
        });
      } catch (error) {
        alert(error);
        console.error(error);
      }
    } else if (status === "Follow") {
      // follow profileID
      setStatus("Following");
      const followBody = {
        User_1: userID,
        User_2: profileID,
      };
      const queryString = `${uri}User/followuser`;
      try {
        await fetch(queryString, {
          body: JSON.stringify(followBody),
          method: "POST",
          headers: {
            Accept: "application/json, text/plain",
            "Content-Type": "application/json;charset=UTF-8",
          },
        });
      } catch (error) {
        alert(error);
        console.error(error);
      }
    } else if (status === "Follow Back") {
      // follow profileID
      setStatus("Friends");
      const followBody = {
        User_1: userID,
        User_2: profileID,
      };
      const queryString = `${uri}User/followuser`;
      try {
        await fetch(queryString, {
          body: JSON.stringify(followBody),
          method: "POST",
          headers: {
            Accept: "application/json, text/plain",
            "Content-Type": "application/json;charset=UTF-8",
          },
        });
      } catch (error) {
        alert(error);
        console.error(error);
      }
    } else if (status === "Following") {
      // unfollow profileID
      setStatus("Follow");
      const queryString = `${uri}user/following?User_1=${userID}&User_2=${profileID}`;
      try {
        await fetch(queryString, {
          method: "DELETE",
          headers: {
            Accept: "application/json, text/plain",
            "Content-Type": "application/json;charset=UTF-8",
          },
        });
      } catch (error) {
        alert(error);
        console.error(error);
      }
    }
  };

  const NavigateToMessagePage = async () => {
    const queryString = uri + "username/" + props.userData.username;
    const response = await fetch(queryString);
    const json = (await response.json()) as UserModel;
    const queryString2 =
      uri +
      "conversation/convoid?User_1=" +
      userInfo["user_id"] +
      "&User_2=" +
      json.user_id;
    const response2 = await fetch(queryString2);
    const json2 = (await response2.json()) as ConversationModel;
    let convoid = json2.id;

    if (convoid == -1) {
      // post new convo
      try {
        const newConvo = {
          user_id: userID,
          user_id_2: profileID,
        };
        const response = await fetch(uri + "conversation/", {
          body: JSON.stringify(newConvo),
          method: "POST",
          headers: {
            Accept: "application/json, text/plain",
            "Content-Type": "application/json;charset=UTF-8",
          },
        });

        if (response.ok) {
          const json = await response.json();
          convoid = parseInt(json.id);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      convoid = json2.id;
    }

    navigate("/Messages", {
      state: [props.userData.username, profileID, convoid],
    });
  }; // end NavigateToMessagePage

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
            {/* <TripleFs></TripleFs> */}
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
              <button
                onClick={clickButton}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2"
              >
                {status}
              </button>

              <button
                className="text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2"
                onClick={NavigateToMessagePage}
              >
                Message
              </button>
            </div>
            {/* <TripleFs></TripleFs> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileHeader;
