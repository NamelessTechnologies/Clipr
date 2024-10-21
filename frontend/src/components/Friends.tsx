import { useEffect, useState } from "react";
// import PostType from "../types/Post";
import UserModel from "../types/User";

function Friends() {
  // const [post, setPost] = useState<PostType[]>([]);
  const [user, setUser] = useState<UserModel[]>([]);
  // const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  // const url = 'https://clipr-esa6hpg2cahzfud6.westus3-01.azurewebsites.net/';
  const url = "http://localhost:5001/User/friendsof/1";

  // const image = "https://admin.esports.gg/wp-content/uploads/2024/03/robin-honkai-star-rail.jpg-968x544.jpg";

  const fetchUsers = async () => {
    try {
      const response = await fetch(url + ""); // must not be hard coded
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
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="post-container">
      {/* <div key={post ? post.post_id : "ERROR"} className=" p-4 text-white ">
                        <div className="text-2xl font-bold">{post ? post.title : "ERROR"}</div>
                        <div className="text-base">{post ? post.description : "ERROR"}</div>
                        <div className="text-xs">{post ? (typeof post.datePosted === 'string' ? post.datePosted : post.datePosted.toLocaleString()) : "ERROR"}</div>
                    </div> */}
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
