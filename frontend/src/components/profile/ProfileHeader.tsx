import ShouldBeLoggedIn from "../Authenticate";
import "../../styles/ProfileHeader.css";
import UserModel from "../../types/User";
import { FaCrown } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConversationModel from "../../types/Conversation";
import { uri } from "../../App";
import EditProfileModal from "./EditProfileModal";

type status = "Friends" | "Following" | "Follow Back" | "Follow" | "Error";

function ProfileHeader(props: { profile_id: string; userData: UserModel }) {
  ShouldBeLoggedIn(true);

  const profileID = props.profile_id;
  const [PFP, setPFP] = useState<string>(props.userData.pfp);
  const [userID, setUserID] = useState<string>();
  const [lookingAtOwnProfile, setLookingAtOwnProfile] =
    useState<boolean>(false);
  const navigate = useNavigate();

  const [userFollowingProfile, setUserFollwingProfile] = useState<boolean>();
  const [profileFollowingUser, setProfileFollwingUser] = useState<boolean>();
  const [status, setStatus] = useState<status>("Error");

  // FOR SHOWING EDIT PROFILE MODAL
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleShowModal = () => {
    setIsModalVisible(true);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

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
      if (!lookingAtOwnProfile) {
        if (userID) {
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
      }
    }
    fetchData();
  }, [profileFollowingUser, profileID, userFollowingProfile, userID]);

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

  const failedPFP = () => {
    setPFP("https://i.ytimg.com/vi/0XM809ENceM/hqdefault.jpg");
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

  const tempFollowing = 234;
  const tempFollowers = 27;
  const tempFriends = 420;

  return (
    <div className="flex justify-center w-full mt-4">
      {lookingAtOwnProfile ? (
        <div className="flex flex-row">
          <img
            onError={failedPFP}
            src={PFP ? PFP : "https://i.ytimg.com/vi/0XM809ENceM/hqdefault.jpg"}
            className="w-56 h-56 rounded-full mr-5"
          />

          {/* below div contains name, buttons, followers, following, etc. */}
          <div className="flex flex-col">
            {/* username + nickname + crown*/}
            <div className="flex mt-10 p-2 justify-center ">
              <span className="text-yellow-100 italic text-4xl pr-2">
                {props.userData.username} -
              </span>
              <span className="text-white italic text-3xl pr-2 mt-auto">
                {props.userData.nickname}
              </span>
              <FaCrown className="text-yellow-600" />
            </div>

            {/* buttons */}
            <div className="flex pt-2 pb-2 justify-center gap-5">
              <button
                onClick={handleShowModal}
                className="text-white bg-red-500 hover:bg-red-800 focus:outline-none font-medium rounded-md text-sm px-4 py-2"
              >
                Edit Profile
              </button>
              <button className="text-white bg-yellow-600 hover:bg-amber-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2">
                Settings
              </button>
            </div>

            {/* following, followers, etc. */}
            <div className="flex justify-center gap-5 mt-3">
              <div className="text-white text-base">
                <span className="font-bold">{tempFollowers + " "}</span>
                Followers
              </div>
              <div className="text-white text-base">
                <span className="font-bold">{tempFollowing + " "}</span>
                Following
              </div>
              <div className="text-white text-base">
                <span className="font-bold">{tempFriends + " "}</span>
                Friends
              </div>
            </div>
            {isModalVisible && <EditProfileModal onClose={handleCloseModal} />}
          </div>
        </div>
      ) : (
        <div className="flex flex-row">
          <div className="pt-3">
            <div className="circle-big">
              <img
                onError={failedPFP}
                src={
                  PFP ? PFP : "https://i.ytimg.com/vi/0XM809ENceM/hqdefault.jpg"
                }
              />
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
            <TripleFs></TripleFs>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileHeader;
