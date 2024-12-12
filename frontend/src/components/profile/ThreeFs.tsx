
import { useState, useEffect } from "react";
import { ThreeFsModal } from "./ThreeFsModal";
import { Friends } from "../Friends";
import { Followers } from "../Followers";
import { Following } from "../Following";
import ShouldBeLoggedIn from "../Authenticate";
import { uri } from "../../App";

function ThreeFs(props: {profile_id: string}) {

  ShouldBeLoggedIn(true);

  // const [user, setUser] = useState<UserModel[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);

  // const [userInfo, setUserInfo] = useState<UserModel>();
  // const [uid, setUID] = useState<number>();

  const [followersOpen, setFollowersOpen] = useState<boolean>(false);
  const [followingOpen, setFollowingOpen] = useState<boolean>(false);
  const [friendsOpen, setFriendsOpen] = useState<boolean>(false);
  const [followerCount, setFollowerCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);
  const [friendCount, setFriendCount] = useState<number>(0);
  const profileID = props.profile_id;

  const [isModalVisible, setIsModalVisible] = useState(false);


  useEffect(() => {
      fetchFollowCount();
  }, [props]);

  const fetchFollowCount = async () => {
      const response = await fetch(
          uri + "User/followCounts/" + profileID,
      );
      const json = await response.json();

      const parsedFollowCounts: number[] = json;

      setFollowerCount(parsedFollowCounts[0]);
      setFollowingCount(parsedFollowCounts[1]);
      setFriendCount(parsedFollowCounts[2]);
  }

  const handleCloseModal = () => {
    setIsModalVisible(false);
    console.log("After handleCloseModal: " + isModalVisible);
  };

  // const handleShowModal = () => {
  //   setIsModalVisible(true);
  //   console.log("After handleShowModal: " + isModalVisible);
  // };

  return (

      <div className="flex justify-center gap-5 mt-3">
            <div className="Followers-box">
              <div className="text-white text-base hover:cursor-pointer" onClick={() => setFollowersOpen(true)}> 
                <span className="font-bold">{followerCount + " "}</span>
                Followers
                <ThreeFsModal open={followersOpen} onClose={() => setFollowersOpen(false)}>
                  <div>
                    {/* <Followers onSendFollowersCount={handleFollowerCount}/> */}
                    <Followers profile_id={profileID} onModalEvent={handleCloseModal}/>
                  </div>
                </ThreeFsModal>
              </div>
            </div>
            <div className="Following-box">
              <div className="text-white text-base hover:cursor-pointer" onClick={() => setFollowingOpen(true)}>
                <span className="font-bold">{followingCount + " "}</span>
                Following
                <ThreeFsModal open={followingOpen} onClose={() => setFollowingOpen(false)}>
                  <div>
                    {/* <Following onSendFollowingCount={handleFollowingCount}/> */}
                    <Following profile_id={profileID}/>
                  </div>
                </ThreeFsModal>
              </div>
            </div>
            <div className="Friends-box">
              <div className="text-white text-base hover:cursor-pointer" onClick={() => setFriendsOpen(true)}>
                <span className="font-bold">{friendCount + " "}</span>
                Friends
                <ThreeFsModal open={friendsOpen} onClose={() => setFriendsOpen(false)}>
                  <div>
                    {/* <Friends onSendFriendCount={handleFriendCount}/> */}
                    <Friends profile_id={profileID}/>
                  </div>
                </ThreeFsModal>
              </div>
            </div>
          </div>
  )
};

export { ThreeFs }
