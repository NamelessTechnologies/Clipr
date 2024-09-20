import { useEffect, useState } from "react";
import CommentLikeTemp from "../types/CommentLike_Temp";

function CommentLikeTest() {

  const [data, setData] = useState<CommentLikeTemp[]>([]); 
  const url = 'http://localhost:5001/';

  const fetchCommentLikes = async () => {
    try {
        const response = await fetch(url + 'comment_like/temp');
        const json = await response.json();
        const commentLikes: CommentLikeTemp[] = [];
        json.forEach((comment: any) => {
            const Like: CommentLikeTemp = {
                comment_id: comment.commentID,
                user_id: comment.userID
            };        
            commentLikes.push(Like);
        });
      setData(commentLikes); 
    } catch (error) {
        console.error(error);
        throw new Error("Error getting saves data");
    }
}

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
  
          {data?.map(user => (
            <tr>
              <td key={user.user_id}>{user.comment_id}</td>
              <td key={user.user_id}>{user.user_id}</td>
            </tr>
          ))}
        </table>
      </>
    );
  }
  
export default CommentLikeTest;