import shouldBeLoggedIn from "../Authenticate";

function ProfileHeader(props: { profile_id: string }) {
  shouldBeLoggedIn(true);
  const id = props.profile_id;
  return <div className="flex justify-center w-screen h-screen">{id}</div>;
}

export default ProfileHeader;
