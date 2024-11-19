import { useEffect, useState } from "react";
import CommentLikeModel from "../../types/CommentLike";
import { uri } from "../../App";

function CommentLikeTable() {
  const [data, setData] = useState<CommentLikeModel[]>([]);

  const fetchCommentLikes = async () => {
    try {
      const response = await fetch(uri + "comment_like/temp");
      const json = await response.json();
      const commentLikes: CommentLikeModel[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      json.forEach((comment: any) => {
        const Like: CommentLikeModel = {
          comment_id: comment.commentID,
          user_id: comment.userID,
        };
        commentLikes.push(Like);
      });
      setData(commentLikes);
    } catch (error) {
      console.error(error);
      throw new Error("Error getting saves data");
    }
  };

  useEffect(() => {
    fetchCommentLikes();
  }, []);

  return (
    <>
      <hr></hr>
      <h2 className="table_title">Comment Like Table:</h2>
      <table>
        <tr>
          <th>comment_id</th>
          <th>user_id</th>
        </tr>

        {data?.map((user) => (
          <tr>
            <td key={user.user_id}>{user.comment_id}</td>
            <td key={user.user_id}>{user.user_id}</td>
          </tr>
        ))}
      </table>
    </>
  );
}

export default CommentLikeTable;
