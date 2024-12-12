import ShouldBeLoggedIn from "../Authenticate";
import "../../styles/ProfileHeader.css";
import UserModel from "../../types/User";
import { FaCrown } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConversationModel from "../../types/Conversation";
import { local_uri, uri } from "../../App";
import EditProfileModal from "./EditProfileModal";
import { FollowersModal } from "./FollowersModal";
import { FollowingModal } from "./FollowingModal";
import { FriendsModal } from "./FriendsModal";

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

  const [followersOpen, setFollowersOpen] = useState<boolean>(false);
  const [followingOpen, setFollowingOpen] = useState<boolean>(false);
  const [friendsOpen, setFriendsOpen] = useState<boolean>(false);
  const [followerCount, setFollowerCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);
  const [friendCount, setFriendCount] = useState<number>(0);

   // FOR SHOWING EDIT PROFILE MODAL
   const [isModalVisible, setIsModalVisible] = useState(false);
   const handleShowModal = () => {
     setIsModalVisible(true);
    //  console.log("After handleShowModal: "+isModalVisible);
   };
   const handleCloseModal = () => {
     setIsModalVisible(false);
    //  console.log("After handleCloseModal: "+isModalVisible);
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
        setPFP(parsedUser.pfp);
      } else {
        setLookingAtOwnProfile(false);
        setPFP(props.userData.pfp);
      }
    }
  }, [props]);

  useEffect(() => {
    async function fetchData() {
      // console.log("From fetchData: lookingat me = "+lookingAtOwnProfile);
      if (!lookingAtOwnProfile) {
        if (userID) {
          // console.log("looking at other person's profile!");
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
  }, [profileFollowingUser, profileID, userFollowingProfile, userID, props]); // added props here so that when some1 follows u, and u check their pfp it shows "Follow Back" instead of "Error"

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
      let newFollowCount = followerCount;
      let newFriendCount = friendCount;
      setFollowerCount(newFollowCount -= 1);
      setFriendCount(newFriendCount -= 1);
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
      let newNumber = followerCount;
      setFollowerCount(newNumber += 1);
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
      let newFollowCount = followerCount;
      let newFriendCount = friendCount;
      setFollowerCount(newFollowCount += 1);
      setFriendCount(newFriendCount += 1);
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
      let newFollowCount = followerCount;
      setFollowerCount(newFollowCount -= 1);
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

  useEffect(() => {
        fetchFollowCount();
    }, [props, profileFollowingUser, userFollowingProfile]);
  
    const fetchFollowCount = async () => {
        const response = await fetch(
            local_uri + "User/followCounts/" + profileID,
        );
        const json = await response.json();
  
        const parsedFollowCounts: number[] = json;
  
        setFollowerCount(parsedFollowCounts[0]);
        setFollowingCount(parsedFollowCounts[1]);
        setFriendCount(parsedFollowCounts[2]);
    }

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
            <div className="flex mt-10 p-2 ">
              <span className="text-yellow-100 italic text-4xl pr-2">
                {props.userData.username} -
              </span>
              <span className="text-white italic text-3xl pr-2 mt-auto">
                {props.userData.nickname}
              </span>
              <FaCrown className="text-yellow-600" />
            </div>

            {/* buttons */}
            <div className="flex pt-2 pb-2 pl-3">
              <button
                onClick={handleShowModal}
                className="text-white bg-red-500 hover:bg-red-800 focus:outline-none font-medium rounded-md text-sm px-4 py-2"
              >
                Edit Profile
              </button>
            </div>

            <div className="flex justify-center gap-5 mt-3">
            <div className="Followers-box">
              <div className="text-white text-base hover:cursor-pointer text-lg" onClick={() => setFollowersOpen(true)}> 
                <span className="font-bold">{followerCount + " "}</span>
                Followers
                <FollowersModal open={followersOpen} onClose={() => setFollowersOpen(false)} profile_id={profileID}/>
              </div>
            </div>
            <div className="Following-box">
              <div className="text-white text-base hover:cursor-pointer text-lg" onClick={() => setFollowingOpen(true)}>
                <span className="font-bold">{followingCount + " "}</span>
                Following
                <FollowingModal open={followingOpen} onClose={() => setFollowingOpen(false)} profile_id={profileID}/>
              </div>
            </div>
            <div className="Friends-box">
              <div className="text-white text-base hover:cursor-pointer text-lg" onClick={() => setFriendsOpen(true)}>
                <span className="font-bold">{friendCount + " "}</span>
                Friends
                <FriendsModal open={friendsOpen} onClose={() => setFriendsOpen(false)} profile_id={profileID}/>
              </div>
            </div>
          </div>

          <div className="flex text-white text-base pt-5">
            {props.userData.biography}
          </div>

            {isModalVisible && <EditProfileModal onClose={handleCloseModal} />}
          </div>
        </div>
      ) : (
        <div className="flex flex-row">
              <img
                onError={failedPFP}
                src={
                  PFP ? PFP : "https://i.ytimg.com/vi/0XM809ENceM/hqdefault.jpg"
                }
                className="w-56 h-56 rounded-full mr-5"
              />

          {/* below div contains name, buttons, followers, following, etc. */}
          <div className="flex flex-col">
            {/* username + nickname + crown*/}
            <div className="flex mt-10 p-2">
              <span className="text-yellow-100 italic text-4xl pr-2">
                {props.userData.username} -
              </span>
              <span className="text-white italic text-3xl pr-2 mt-auto">
                {props.userData.nickname}
              </span>
            </div>

            {/* buttons */}
            <div className="flex pt-2 pb-2 pl-3 gap-4">
              <button
                onClick={clickButton}
                className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2">
                {status}
              </button>

              <button
                className="text-white bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2"
                onClick={NavigateToMessagePage}>
                Message
              </button>
            </div>

            <div className="flex justify-center gap-5 mt-3">
            <div className="Followers-box">
              <div className="text-white text-base hover:cursor-pointer text-lg" onClick={() => setFollowersOpen(true)}> 
                <span className="font-bold">{followerCount + " "}</span>
                Followers
                <FollowersModal open={followersOpen} onClose={() => setFollowersOpen(false)} profile_id={profileID}/>
              </div>
            </div>
            <div className="Following-box">
              <div className="text-white text-base hover:cursor-pointer text-lg" onClick={() => setFollowingOpen(true)}>
                <span className="font-bold">{followingCount + " "}</span>
                Following
                <FollowingModal open={followingOpen} onClose={() => setFollowingOpen(false)} profile_id={profileID}/>
              </div>
            </div>
            <div className="Friends-box">
              <div className="text-white text-base hover:cursor-pointer text-lg" onClick={() => setFriendsOpen(true)}>
                <span className="font-bold">{friendCount + " "}</span>
                Friends
                <FriendsModal open={friendsOpen} onClose={() => setFriendsOpen(false)} profile_id={profileID}/>
              </div>
            </div>
          </div>
          
          <div className="flex text-white text-base pt-5">
            {props.userData.biography}
          </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileHeader;
