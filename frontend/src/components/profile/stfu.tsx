import ShouldBeLoggedIn from "../Authenticate";
// import "../../styles/ProfileHeader.css";
import UserModel from "../../types/User";
// import { FaCrown } from "react-icons/fa6";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ConversationModel from "../../types/Conversation";
import PostModel from "../../types/Post";
import { uri } from "../../App";

function ProfilePost(props: { userData: UserModel }) {
  ShouldBeLoggedIn(true);

  const [post, setPost] = useState<PostModel[]>();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const userID = props.userData.user_id;
        const response = await fetch(uri + `TEMP_post/user_id/${userID}`);
        const json = await response.json();

        const posts: PostModel[] = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        json.forEach((post: any) => {
          const NewPost: PostModel = {
            user_id: post.userID,
            title: post.title,
            content: post.content,
          };
          posts.push(NewPost);
        });

        setPost(posts);
      } catch (error) {
        console.error(error);
        throw new Error("Error getting post data");
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="post-container">
      {post?.map((post) => (
        <div className=" p-4 text-white " key={post.user_id}>
          <div className="text-2xl font-bold">{post.title}</div>
          <p className="text-base">{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default ProfilePost;
