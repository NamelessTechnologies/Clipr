import { useState } from "react";
import { ThreeFsModal } from "./ThreeFsModal";
import { Friends } from "../Friends";
import { Followers } from "../Followers";
import { Following } from "../Following";

function ThreeFs() {

  const [followersOpen, setFollowersOpen] = useState<boolean>(false);
  const [followingOpen, setFollowingOpen] = useState<boolean>(false);
  const [friendsOpen, setFriendsOpen] = useState<boolean>(false);


  // const [followerCount, setFollowerCount] = useState<number>(0);
  // const [followingCount, setFollowingCount] = useState<number>(0);
  // const [friendsCount, setFriendsCount] = useState<number>(0);

  const tempFollowing = 234;
  const tempFollowers = 27;

  // const handleFriendsCount = useCallback((data: number) => {
  //   setFriendsCount(data);
  // }, []);
  return (

      <div className="flex justify-center gap-5 mt-3">
            <div className="Followers-box">
              <div className="text-white text-base hover:cursor-pointer" onClick={() => setFollowersOpen(true)}> 
                <span className="font-bold">{tempFollowers + " "}</span>
                Followers
                <ThreeFsModal open={followersOpen} onClose={() => setFollowersOpen(false)}>
                  <div>
                    <Followers />
                  </div>
                </ThreeFsModal>
              </div>
            </div>
            <div className="Following-box">
              <div className="text-white text-base hover:cursor-pointer" onClick={() => setFollowingOpen(true)}>
                <span className="font-bold">{tempFollowing + " "}</span>
                Following
                <ThreeFsModal open={followingOpen} onClose={() => setFollowingOpen(false)}>
                  <div>
                    <Following />
                  </div>
                </ThreeFsModal>
              </div>
            </div>
            <div className="Friends-box">
              <div className="text-white text-base hover:cursor-pointer" onClick={() => setFriendsOpen(true)}>
                <span className="font-bold">{0 + " "}</span>
                Friends
                <ThreeFsModal open={friendsOpen} onClose={() => setFriendsOpen(false)}>
                  <div>
                    <Friends />
                  </div>
                </ThreeFsModal>
              </div>
            </div>
          </div>
  )
};

export { ThreeFs }