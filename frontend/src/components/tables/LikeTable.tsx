import { useEffect, useState } from "react";
import Like from "../../types/Like";

function LikeTable() {
  const [data, setData] = useState<Like[]>([]);
  const url = "https://clipr-esa6hpg2cahzfud6.westus3-01.azurewebsites.net/";

  const fetchLikes = async () => {
    try {
      const response = await fetch(url + "likes/temp");
      const json = await response.json();
      const likes: Like[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      json.forEach((post: any) => {
        const Like: Like = {
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
