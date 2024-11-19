import { useSearchParams } from "react-router-dom";
import shouldBeLoggedIn from "../components/Authenticate";
import ProfileHeader from "../components/profile/ProfileHeader";
import { useEffect, useState } from "react";
import UserModel from "../types/User";
import ProfilePost from "../components/profile/ProfilePost";
import { uri } from "../App";

function Profile() {
  shouldBeLoggedIn(true);
  const [searchParams] = useSearchParams();
  const profile_id = searchParams.get("profile_id") as string;
  const [userData, setUserData] = useState<UserModel>();

  useEffect(() => {
    async function fetchData() {
      try {
        const queryString = uri + "User/" + profile_id;
        const response = await fetch(queryString);
        const json = (await response.json()) as UserModel;
        setUserData(json);
      } catch (error) {
        console.error(error);
      }
    }

    if (profile_id) {
      fetchData();
    }
  }, [profile_id]);

  return (
    <>
      {userData ? (
        <div className="flex justify-center w-screen h-screen">
          <ProfileHeader
            profile_id={profile_id}
            userData={userData}
          ></ProfileHeader>
          <ProfilePost userData={userData}></ProfilePost>
        </div>
      ) : (
        <div>Error: Profile Not Found</div>
      )}
    </>
  );
}

export default Profile;
