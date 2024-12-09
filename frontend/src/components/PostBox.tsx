import { useEffect, useState } from "react";
import PostModel from "../types/Post";
import {  local_uri } from "../App";
import { Post } from "./Post";
import { CommentBox } from "./CommentBox";

function PostBox(props: { postID: number }) {
  const [post, setPost] = useState<PostModel>({});
  // const [loading, setLoading] = useState<boolean>(true);
  console.log(props.postID + "postbox.tsx");
  const fetchPosts = async () => {
    try {
      const response = await fetch(local_uri + "post/real/getPostInfo/" + props.postID); // test
      
      const json = await response.json();

      const posts: PostModel = {
        post_id: json.post_id,
        user_id: json.user_Id,
        title: json.title,
        content: json.description,
        photo_data: json.media_Link,
        username: json.username,
        user_pfp: json.pfp,

        liked: false, // need to fix
        num_likes: json.like_Count,
        bookmarked: false, // need to fix
        num_bookmarks: json.save_Count
      };

      setPost(posts);
      // setPost(posts);
      // setLoading(false);
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
  return (
    <div className="flex justify-center mt-6 mb-4">
      {props.postID}
      <Post postData={post}/>
      <CommentBox />
    </div>
  );
}
export { PostBox };
