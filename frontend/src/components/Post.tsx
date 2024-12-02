import { useEffect, useState } from "react";
import PostModel from "../types/Post";
import { uri, local_uri } from "../App";
import { PostBox } from "./PostBox";

function Post() {
  const [post, setPost] = useState<PostModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);



  const fetchPosts = async () => {
    try {
      // const response = await fetch(uri + "TEMP_post/"); // must not be hard coded
      const response = await fetch(local_uri + "post/skibidi/all"); // test

      const json = await response.json();

      const posts: PostModel[] = [];
      json.forEach((post: any) => {
        const NewPost: PostModel = {
          user_id: post.userID,
          title: post.title,
          content: post.content,
          photo_data: post.photoData,
          username: post.username,
          user_pfp: post.pfp_Url
        };
        posts.push(NewPost);
      });

      setPost(posts);
      setLoading(false);
    } catch (error) {
      console.error(error);
      throw new Error("Error getting post data");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex-col justify-center">
      {post?.map((post) => (
        <PostBox postData={post}/>
      ))}
    </div>
  );
}
export { Post };
