import { useEffect, useState } from "react";
import UserModel from "../../types/User";
import { uri } from "../../App";

const UserTable = () => {
  const [data, setData] = useState<UserModel[]>([]); // Fetched data will be an array of json

  const fetchData = async () => {
    try {
      const response = await fetch(`${uri}User/all`);
      const json = (await response.json()) as UserModel[];
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const allUsers: UserModel[] = data; // Asserts that allUsers will be a User[] object from data

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
          <th>pfp</th>
        </tr>

        {/* Loops through allUsers, returning a row for each user */}
        {allUsers?.map((user) => (
          <tr>
            <td>{user.user_id}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.password}</td>
            <td>{user.biography}</td>
            <td>{user.nickname}</td>
            <td>{user.pfp}</td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default UserTable;
