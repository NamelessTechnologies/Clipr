import { useEffect, useState } from "react";
import Comment from "../types/Comment";

function CommTest() {

  const [data, setData] = useState<Comment[]>([]); 
  const url = 'http://localhost:5001/';

  const fetchPosts = async () => {
    try {
        const response = await fetch(url + 'comment/');
        const json = await response.json();
        const comments: Comment[] = [];
        json.forEach((comment: any) => {
            const NewPost: Comment = {
                id: comment.ID,
                parent_id: comment.parentID,
                user_id: comment.userID,
                post_id: comment.postID,
                message: comment.message
            };        
            comments.push(NewPost);
        });
      setData(comments); 
    } catch (error) {
        console.error(error);
        throw new Error("Error getting post data");
    }
}

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
            <th>user_id</th>
            <th>server_id</th>
            <th>message</th>
          </tr>
  
          {data?.map(user => (
            <tr>
              <td key={user.user_id}>{user.id}</td>
              <td key={user.user_id}>{user.user_id}</td>
              <td key={user.user_id}>{user.server_id}</td>
              <td key={user.user_id}>{user.message}</td>
            </tr>
          ))}
        </table>
      </>
    );
  }
  
export default CommentTest;