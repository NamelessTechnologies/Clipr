import { uri } from "./App";
import Post from "./types/Post";

export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await fetch(uri + "post/");
    const json = await response.json();
    const posts: Post[] = [];
    json.forEach((post: any) => {
      const NewPost: Post = {
        post_id: post.postID,
        user_id: post.userID,
        title: post.title,
        description: post.description,
        datePosted: post.datePosted,
        mediaType: post.mediaType,
      };
      posts.push(NewPost);
    });
    return posts;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting post data");
  }
};
