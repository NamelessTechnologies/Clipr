// import { useEffect, useState } from "react";
import PostModel from "../types/Post";
// import {  local_uri } from "../App";
import { Post } from "./Post";
import { CommentBox } from "./CommentBox";

function PostBox() {
  // TEMPORARILY COMMENTING THE BELOW OUT

  // const [post, setPost] = useState<PostModel[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);


  // const fetchPosts = async () => {
  //   try {
  //     // const response = await fetch(uri + "TEMP_post/"); // must not be hard coded
  //     const response = await fetch(local_uri + "post/skibidi/all"); // test

  //     const json = await response.json();

  //     const posts: PostModel[] = [];
  //     json.forEach((post: any) => {
  //       const NewPost: PostModel = {
  //         user_id: post.userID,
  //         title: post.title,
  //         content: post.content,
  //         photo_data: post.photoData,
  //         username: post.username,
  //         user_pfp: post.pfp_Url,

  //         liked: false,
  //         num_likes: 23,
  //         bookmarked: false,
  //         num_bookmarks: 69
  //       };
  //       posts.push(NewPost);
  //     });

  //     // setPost(posts);
  //     // setLoading(false);
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error("Error getting post data");
  //   }
  // };

  // useEffect(() => {
  //   fetchPosts();
  // }, []);

  const TempPost: PostModel = {
    user_id: 1,
    title: "LAPPLAND IS SO CUTEEEEEEEEEE",
    content: "thank you arknights for bringing light into my life again with this lappalter event",
    photo_data: "skibidi",
    username: "chillwafflez",
    user_pfp: "https://i.pinimg.com/originals/6f/bd/2e/6fbd2e62dddb28723603aace97f9ac67.jpg",

    liked: false,
    num_likes: 23,
    bookmarked: false,
    num_bookmarks: 69
  }

  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  return (
    <div className="flex justify-center mt-6 mb-4">
    {/* <div className="flex justify-center h-full w-full border border-r-purple-500"> */}
      {/* {post?.map((post) => (
        <PostBox postData={post}/>
      ))} */}
      <Post postData={TempPost}/>
      <CommentBox />
    </div>
  );
}
export { PostBox };
