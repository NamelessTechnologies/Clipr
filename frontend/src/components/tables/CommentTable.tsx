import { useEffect, useState } from "react";
import CommentModel from "../../types/Comment";

function CommentTable() {
  const [data, setData] = useState<CommentModel[]>([]);
  const url = "https://clipr-esa6hpg2cahzfud6.westus3-01.azurewebsites.net/";

  const fetchPosts = async () => {
    try {
      const response = await fetch(url + "comment/");
      const json = await response.json();
      const comments: CommentModel[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      json.forEach((comment: any) => {
        const NewPost: CommentModel = {
          id: comment.id,
          parent_id: comment.parentID ? comment.parentID : "null",
          post_id: comment.postID,
          user_id: comment.userID,
          content: comment.content,
        };
        comments.push(NewPost);
      });
      setData(comments);
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
      <h2 className="table_title">Comment Table:</h2>
      <table>
        <tr>
          <th>id</th>
          <th>parent_id</th>
          <th>post_id</th>
          <th>user_id</th>
          <th>content</th>
        </tr>

        {data?.map((user) => (
          <tr>
            <td key={user.user_id}>{user.id}</td>
            <td key={user.user_id}>{user.parent_id}</td>
            <td key={user.user_id}>{user.post_id}</td>
            <td key={user.user_id}>{user.user_id}</td>
            <td key={user.user_id}>{user.content}</td>
          </tr>
        ))}
      </table>
    </>
  );
}

export default CommentTable;
