import { useEffect, useState } from "react";
import PostModel from "../types/Post";
import { uri } from "../App";
import { Post } from "../components/Post";
import { CommentBox } from "../components/CommentBox";
import { AltNavBar } from "./AltNavbar";

function IsolatedPostComponent(props: { post_id: string }) {
  const [foundUser, setFoundUser] = useState<string>();

  const currentUser = localStorage.getItem("user");
  const userInfo = currentUser
    ? JSON.parse(currentUser)
    : {
        user_id: 30,
        username: "dnpaxion",
        email: "dpasion@cpp.edu",
        password: "Password123",
        biography: "Looking for some TFT friends to Make!",
        nickname: "The Daniel",
        pfp: "https://wiki.leagueoflegends.com/en-us/images/Duckbill_Pajama_Party_Tier_2.png?1bad5",
      };
  const [post, setPost] = useState<PostModel>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localStorageUser = localStorage.getItem("user");
    if (localStorageUser) {
      setFoundUser(localStorageUser);
    }
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        uri +
          "post/real/getPostInfo/" +
          props.post_id +
          "/" +
          userInfo["user_id"]
      ); // test

      const json = await response.json();

      const posts: PostModel = {
        post_id: json.post_Id,
        user_id: json.user_Id,
        title: json.title,
        content: json.description,
        photo_data: json.media_Link,
        username: json.username,
        user_pfp: json.pfp,
        mediaType: json.media_Type,
        datePosted: json.datePosted,

        liked: json.liked === 1 ? true : false,
        num_likes: json.like_Count,
        bookmarked: json.saved === 1 ? true : false,
        num_bookmarks: json.save_Count,
      };
      setPost(posts);
      // setPost(posts);
      // setLoading(false);
      setLoading(false);
    } catch (error) {
      console.error(error);
      throw new Error("Error getting post data");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [props.post_id]);

  if (loading) {
    return <div> Loading... </div>;
  }

  return (
    <div>
      {foundUser ? (
        <>
          <div className="flex justify-center mt-6 mb-4 -mt-5">
            <Post postData={post} currentUserID={userInfo["user_id"]} />
            <CommentBox
              post_id={props.post_id as unknown as number}
              user_id={userInfo["user_id"]}
              username={userInfo["username"]}
              user_pfp={userInfo["pfp"]}
            />
          </div>
        </>
      ) : (
        <>
          <AltNavBar />
          <div className="flex justify-center mt-6 mb-4">
            <Post
              postData={post}
              currentUserID={userInfo["user_id"]}
              loggedOut={true}
            />
            <CommentBox
              post_id={props.post_id as unknown as number}
              user_id={userInfo["user_id"]}
              username={userInfo["username"]}
              user_pfp={userInfo["pfp"]}
              loggedOut={true}
            />
          </div>
        </>
      )}
    </div>
  );
}
export { IsolatedPostComponent };
