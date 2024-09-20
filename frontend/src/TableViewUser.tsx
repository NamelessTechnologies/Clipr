import { useEffect, useState } from "react";
import User from "./types/User";

const User_Table = () => {
  const [data, setData] = useState<User[]>([]); // Fetched data will be an array of json

  // const handleChange = async () => {
  //   try {
  //       const response = await fetch('http://localhost:5001/User/1');
  //       const json = await response.json() as User;
  //       setData(json);
        
  //     } catch (error) {
  //       console.error(error);
  //       }
  // };

  const fetchData = async() => {
    try {
      const response = await fetch('http://localhost:5001/User/all');
      const json = await response.json() as User[];
      setData(json); 
    } 
    catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  const allUsers: User[] = data; // Asserts that allUsers will be a User[] object from data

  return (
    <>
    <hr></hr>
    <h2 className="table_title">User Table:</h2>
      <table>
        <tr>
          <th>user_id</th>
          <th>username</th>
          <th>email</th>
          <th>password</th>
          <th>biography</th>
          <th>nickname</th>
        </tr>

        {/* Loops through allUsers, returning a row for each user */}
        {allUsers?.map(user => (
          <tr>
            <td key={user.user_id}>{user.user_id}</td>
            <td key={user.user_id}>{user.username}</td>
            <td key={user.user_id}>{user.email}</td>
            <td key={user.user_id}>{user.password}</td>
            <td key={user.user_id}>{user.biography}</td>
            <td key={user.user_id}>{user.nickname}</td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default User_Table;