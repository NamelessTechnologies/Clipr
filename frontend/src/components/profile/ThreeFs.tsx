import React, { useState } from "react";
import { ThreeFsModal } from "./ThreeFsModal";
import { Friends } from "../Friends";

function ThreeFs() {

  const [followersOpen, setFollowersOpen] = useState<boolean>(false);
  const [followingOpen, setFollowingOpen] = useState<boolean>(false);
  const [friendsOpen, setFriendsOpen] = useState<boolean>(false);

  const tempFollowing = 234;
  const tempFollowers = 27;
  const tempFriends = 420;
  return (

      <div className="flex justify-center gap-5 mt-3">
            <div className="Followers-box">
              <div className="text-white text-base hover:cursor-pointer" onClick={() => setFollowersOpen(true)}> 
                <span className="font-bold">{tempFollowers + " "}</span>
                Followers
                <ThreeFsModal open={followersOpen} onClose={() => setFollowersOpen(false)}>
                  Followers SKIBIDI
                  <div>
                    
                  </div>
                </ThreeFsModal>
              </div>
            </div>
            <div className="Following-box">
              <div className="text-white text-base hover:cursor-pointer" onClick={() => setFollowingOpen(true)}>
                <span className="font-bold">{tempFollowing + " "}</span>
                Following
                <ThreeFsModal open={followingOpen} onClose={() => setFollowingOpen(false)}>
                  Following SKIBIDI
                  <div>

                  </div>
                </ThreeFsModal>
              </div>
            </div>
            <div className="Friends-box">
              <div className="text-white text-base hover:cursor-pointer" onClick={() => setFriendsOpen(true)}>
                <span className="font-bold">{tempFriends + " "}</span>
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