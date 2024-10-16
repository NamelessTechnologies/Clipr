import { useEffect, useState } from "react";
import Message from "./types/Message";

const Message_Table = () => {
  const [data, setData] = useState<Message[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://clipr-esa6hpg2cahzfud6.westus3-01.azurewebsites.net/User/msg/all",
      );
      const json = (await response.json()) as Message[];
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const allMessages: Message[] = data;

  return (
    <>
      <hr></hr>
      <h2 className="table_title">Message Table:</h2>
      <table>
        <tr>
          <th>id</th>
          <th>convo_id</th>
          <th>content</th>
          <th>datesent</th>
          <th>user_id</th>
        </tr>

        {/* Loops through allUsers, returning a row for each user */}
        {allMessages?.map((message) => (
          <tr>
            <td>{message.id}</td>
            <td>{message.convo_id}</td>
            <td>{message.content}</td>
            <td>{message.datesent.toString()}</td>
            <td>{message.user_id}</td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default Message_Table;
