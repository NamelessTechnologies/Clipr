import { useEffect, useState } from "react";
import MessageModel from "../../types/Message";

const MessageTable = () => {
  const [data, setData] = useState<MessageModel[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://clipr-esa6hpg2cahzfud6.westus3-01.azurewebsites.net/User/msg/all",
      );
      const json = (await response.json()) as MessageModel[];
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const allMessages: MessageModel[] = data;

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

export default MessageTable;
