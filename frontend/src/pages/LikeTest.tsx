import { useEffect, useState } from "react";
import Saved_Temp from "../types/Saved_Temp";

function LikeTest() {

  const [data, setData] = useState<Saved_Temp[]>([]); 
  const url = 'http://localhost:5001/';

  const fetchSaves = async () => {
    try {
        const response = await fetch(url + 'saved/temp');
        const json = await response.json();
        const saves: Saved_Temp[] = [];
        json.forEach((post: any) => {
            const Save: Saved_Temp = {
                post_id: post.postID,
                user_id: post.userID
            };        
            saves.push(Save);
        });
      setData(saves); 
    } catch (error) {
        console.error(error);
        throw new Error("Error getting saves data");
    }
}

  useEffect(() => {
    fetchSaves();
  }, []);

    return (
      <>
      <hr></hr>
      <h2 className="table_title">Save Table:</h2>
        <table>
          <tr>
            <th>post_id</th>
            <th>user_id</th>
          </tr>
  
          {data?.map(user => (
            <tr>
              <td key={user.user_id}>{user.user_id}</td>
              <td key={user.user_id}>{user.post_id}</td>
            </tr>
          ))}
        </table>
      </>
    );
  }
  
export default LikeTest;