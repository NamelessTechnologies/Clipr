import shouldBeLoggedIn from "../components/Authenticate";
import ProfileHeader from "../components/profile/ProfileHeader";

function Profile() {
  shouldBeLoggedIn(true);

  return (
    <div className="flex justify-center w-screen h-screen">
      <ProfileHeader profile_id={"69"}></ProfileHeader>
    </div>
  );
}

export default Profile;
