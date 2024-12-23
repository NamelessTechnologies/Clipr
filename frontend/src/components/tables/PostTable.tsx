import { useEffect, useState } from "react";
import PostModel from "../../types/Post";
import { uri } from "../../App";

function PostTable() {
  const [data, setData] = useState<PostModel[]>([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(uri + "post/");
      const json = await response.json();
      const posts: PostModel[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      json.forEach((post: any) => {
        const NewPost: PostModel = {
          post_id: post.postID,
          user_id: post.userID,
          title: post.title,
          description: post.description,
          datePosted: post.datePosted,
          mediaType: post.mediaType,
        };
        posts.push(NewPost);
      });
      setData(posts);
    } catch (error) {
      console.error(error);
      throw new Error("Error getting post data");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <hr></hr>
      <h2 className="table_title">Post Table:</h2>
      <table>
        <tr>
          <th>post_id</th>
          <th>user_id</th>
          <th>title</th>
          <th>description</th>
          <th>datePosted</th>
          <th>mediaType</th>
        </tr>

        {data?.map((user) => (
          <tr>
            <td key={user.user_id}>{user.user_id}</td>
            <td key={user.user_id}>{user.post_id}</td>
            <td key={user.user_id}>{user.title}</td>
            <td key={user.user_id}>{user.description}</td>
            {/* <td key={user.user_id}>{user.datePosted.toString()}</td> */}
            <td key={user.user_id}>{user.mediaType}</td>
          </tr>
        ))}
      </table>
    </>
  );
}

export default PostTable;
