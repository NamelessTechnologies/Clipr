import { useEffect, useState } from "react";
import shouldBeLoggedIn from "./Authenticate";
import UserModel from "../types/User";

function Friends() {
  shouldBeLoggedIn(true);

  const [user, setUser] = useState<UserModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const hosted = "https://clipr-esa6hpg2cahzfud6.westus3-01.azurewebsites.net/";
//   const local_url = "http://localhost:5001/"

  const [userInfo, setUserInfo] = useState<UserModel>();
  const [uid, setUID] = useState<number>();

  // This effect loads the user from localStorage
  useEffect(() => {
    const localStorageUser = localStorage.getItem("user");
    if (localStorageUser) {
      const parsedUser = JSON.parse(localStorageUser);
      setUserInfo(parsedUser as UserModel);
    }
  }, []);

  // This effect updates the UID once `userInfo` is set
  useEffect(() => {
    if (userInfo && userInfo.user_id) {
      setUID(userInfo.user_id);
    }
  }, [userInfo]);

 
  const fetchUsers = async () => {
    try {
      const url = hosted + "User/friendsof/";
      const response = await fetch(url + uid); // must not be hard coded
      const json = await response.json();

      const users: UserModel[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      json.forEach((user: any) => {
        const newUser: UserModel = {
          user_id: user.user_id,
          username: user.username,
          email: user.email,
          password: user.password,
          biography: user.biography,
          nickname: user.nickname,
          pfp: user.pfp
        };
        users.push(newUser);
      });

      setUser(users);
      setLoading(false);
    } catch (error) {
      console.error(error);
      throw new Error("Error getting post data");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [uid]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="post-container">
      {user?.map((user) => (
        <div className=" p-4 text-white " key={user.user_id}>
          <div className="text-sm">User ID: {user.user_id}</div>
          <div className="text-2  xl font-bold">{user.username}</div>
        </div>
      ))}
    </div>
  );
}
export { Friends };
