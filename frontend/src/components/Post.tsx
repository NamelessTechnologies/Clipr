import { useEffect, useState } from "react";
// import PostType from "../types/Post";
import PostModel from "../types/Post";

function Post() {
  // const [post, setPost] = useState<PostType[]>([]);
  const [post, setPost] = useState<PostModel[]>([]);
  // const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const local = "http://localhost:5001/";
//   const url = "https://clipr-esa6hpg2cahzfud6.westus3-01.azurewebsites.net/";

  // const image = "https://admin.esports.gg/wp-content/uploads/2024/03/robin-honkai-star-rail.jpg-968x544.jpg";

  const fetchPosts = async () => {
    try {
      const response = await fetch(local + "TEMP_post/"); // must not be hard coded
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
    <div className="post-container">
      {/* <div key={post ? post.post_id : "ERROR"} className=" p-4 text-white ">
                        <div className="text-2xl font-bold">{post ? post.title : "ERROR"}</div>
                        <div className="text-base">{post ? post.description : "ERROR"}</div>
                        <div className="text-xs">{post ? (typeof post.datePosted === 'string' ? post.datePosted : post.datePosted.toLocaleString()) : "ERROR"}</div>
                    </div> */}
      {post?.map((post) => (
        <div className=" p-4 text-white " key={post.user_id}>
          <div className="text-sm">User ID: {post.user_id}</div>
          <div className="text-2xl font-bold">{post.title}</div>
          <p className="text-base">{post.content}</p>
        </div>
      ))}
    </div>
  );
}
export { Post };
