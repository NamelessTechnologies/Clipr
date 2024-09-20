import { useState } from "react";
import User from "./types/User";

const User_Table = () => {
  const [data, setData] = useState<User>();

  const handleChange = async () => {
    try {
        const response = await fetch('http://localhost:5001/User/1');
        const json = await response.json() as User;
        setData(json);
        
      } catch (error) {
        console.error(error);
        }
  };

  return (
    <>
      <table>
        <tr>
          <th>user_id</th>
          <th>username</th>
          <th>email</th>
          <th>password</th>
          <th>biography</th>
          <th>nickname</th>
        </tr>
        
        <tr>
          <td>{data?.user_id}</td>
          <td>{data?.username}</td>
          <td>{data?.email}</td>
          <td>{data?.password}</td>
          <td>{data?.biography}</td>
          <td>{data?.nickname}</td>
        </tr>
      </table>

      <button onClick={handleChange}>
          Fetch Data
      </button>
    </>
  );
};

export default User_Table;