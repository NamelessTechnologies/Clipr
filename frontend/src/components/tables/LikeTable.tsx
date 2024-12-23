import { useEffect, useState } from "react";
import LikeModel from "../../types/Like";
import { uri } from "../../App";

function LikeTable() {
  const [data, setData] = useState<LikeModel[]>([]);

  const fetchLikes = async () => {
    try {
      const response = await fetch(uri + "likes/temp");
      const json = await response.json();
      const likes: LikeModel[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      json.forEach((post: any) => {
        const Like: LikeModel = {
          post_id: post.postID,
          user_id: post.userID,
        };
        likes.push(Like);
      });
      setData(likes);
    } catch (error) {
      console.error(error);
      throw new Error("Error getting saves data");
    }
  };

  useEffect(() => {
    fetchLikes();
  }, []);

  return (
    <>
      <hr></hr>
      <h2 className="table_title">Like Table:</h2>
      <table>
        <tr>
          <th>post_id</th>
          <th>user_id</th>
        </tr>

        {data?.map((user) => (
          <tr>
            <td key={user.user_id}>{user.user_id}</td>
            <td key={user.user_id}>{user.post_id}</td>
          </tr>
        ))}
      </table>
    </>
  );
}

export default LikeTable;
