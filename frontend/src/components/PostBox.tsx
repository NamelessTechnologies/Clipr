import { useEffect, useState } from "react";
import PostModel from "../types/Post";
import { uri } from "../App";
import { Post } from "./Post";
import { CommentBox } from "./CommentBox";

function PostBox(props: { postID: number }) {
  const currentUser = localStorage.getItem("user");
  const userInfo = currentUser ? JSON.parse(currentUser) : {};
  // console.log("CURRENT USER -=--------------------------------------");
  // console.log(userInfo['user_id']);
  const [post, setPost] = useState<PostModel>({});
  const [loading, setLoading] = useState(true);

  // const [loading, setLoading] = useState<boolean>(true);
  console.log(props.postID + "postbox.tsx");
  console.log(userInfo["user_id"]);
  const fetchPosts = async () => {
    try {
      const response = await fetch(
        uri +
          "post/real/getPostInfo/" +
          props.postID +
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
    console.log("under");
    console.log(post);
  }, [props.postID]);

  // const TempPost: PostModel = post;

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (loading) {
    return <div> Loading... </div>;
  }

  return (
    <div className="flex justify-center mt-6 mb-4">
      <Post postData={post} currentUserID={userInfo["user_id"]} />
      <CommentBox
        post_id={props.postID}
        user_id={userInfo["user_id"]}
        username={userInfo["username"]}
        user_pfp={userInfo["pfp"]}
      />
    </div>
  );
}
export { PostBox };
