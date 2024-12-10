import { useSearchParams } from "react-router-dom";
import ShouldBeLoggedIn from "../components/Authenticate";
import ProfileHeader from "../components/profile/ProfileHeader";
import { useEffect, useState } from "react";
import UserModel from "../types/User";
import GridPosts from "../components/profile/GridPosts";
import { uri } from "../App";

function Profile() {
  ShouldBeLoggedIn(true);
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
        <div className="flex flex-col justify-center">
          <ProfileHeader
            profile_id={profile_id}
            userData={userData}
          ></ProfileHeader>
          <GridPosts profile_id={profile_id} />
        </div>
      ) : (
        <div>Error: Profile Not Found</div>
      )}
    </>
  );
}

export default Profile;
