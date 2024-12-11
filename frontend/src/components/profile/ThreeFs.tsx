import { useState, useCallback } from "react";
import { ThreeFsModal } from "./ThreeFsModal";
import { Friends } from "../Friends";
import { Followers } from "../Followers";
import { Following } from "../Following";
import ShouldBeLoggedIn from "../Authenticate";

function ThreeFs() {

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


  // This effect loads the user from localStorage
  // useEffect(() => {
  //   const localStorageUser = localStorage.getItem("user");
  //   if (localStorageUser) {
  //     const parsedUser = JSON.parse(localStorageUser);
  //     setUserInfo(parsedUser as UserModel);
  //   }
  // }, []);

  // This effect updates the UID once `userInfo` is set
  // useEffect(() => {
  //   if (userInfo && userInfo.user_id) {
  //     setUID(userInfo.user_id);
  //   }
  // }, [userInfo]);

  // const fetchFollowCount = async (fquery: string) => {
  //   try {
  //     const url = local_uri + "User/" + fquery +"/";
  //     const response = await fetch(url + uid);
  //     const json = await response.json();

  //     if (!Array.isArray(json) || json.length === 0) {
  //       // Handle empty or invalid response
  //       console.warn("No users found in the response.");
      
  //       setLoading(false);
  //       return;
  //     }

  //     const users: UserModel[] = [];
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     json.forEach((user: any) => {
  //       const newUser: UserModel = {
  //         user_id: user.user_id,
  //         username: user.username,
  //         email: user.email,
  //         password: user.password,
  //         biography: user.biography,
  //         nickname: user.nickname,
  //         pfp: user.pfp,
  //       };
  //       users.push(newUser);
  //     });
  //     // if (fquery === "followersof") {
  //     //   setFollowerCount(users.length);
  //     // }
  //     // else if (fquery === "followingsof") {
  //     //   setFollowingCount(users.length);
  //     // }
  //     // else if (fquery === "friendsof") {
  //     //   setFriendsCount(users.length);
  //     // }
  //     setLoading(false);
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error("Error getting count");
  //   }
  // };

  // useEffect(() => {
  //   fetchFollowCount("followersof");
  //   fetchFollowCount("followingsof");
  //   fetchFollowCount("friendsof");
  // }, [followerCount, followingCount, friendsCount]);

  
  // const tempFollowing = 234;

  const handleFollowerCount = useCallback((data: number) => {
    setFollowerCount(data);
  }, []);

  const handleFollowingCount = useCallback((data: number) => {
    setFollowingCount(data);
  }, []);

  const handleFriendCount = useCallback((data: number) => {
    setFriendCount(data);
  }, []);
  return (

      <div className="flex justify-center gap-5 mt-3">
            <div className="Followers-box">
              <div className="text-white text-base hover:cursor-pointer" onClick={() => setFollowersOpen(true)}> 
                <span className="font-bold">{followerCount + " "}</span>
                Followers
                <ThreeFsModal open={followersOpen} onClose={() => setFollowersOpen(false)}>
                  <div>
                    <Followers onSendFollowerCount={handleFollowerCount}/>
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
                    <Following onSendFollowingCount={handleFollowingCount}/>
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
                    <Friends onSendFriendCount={handleFriendCount}/>
                  </div>
                </ThreeFsModal>
              </div>
            </div>
          </div>
  )
};

export { ThreeFs }