import { useEffect, useState } from "react";
import Conversation from "../../types/Conversation";

const ConversationTable = () => {
  const [data, setData] = useState<Conversation[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://clipr-esa6hpg2cahzfud6.westus3-01.azurewebsites.net/User/convo/all"
      );
      const json = (await response.json()) as Conversation[];
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const allConversations: Conversation[] = data;

  return (
    <>
      <hr></hr>
      <h2 className="table_title">Conversation Table:</h2>
      <table>
        <tr>
          <th>id</th>
          <th>user_id</th>
          <th>user_id_2</th>
        </tr>

        {/* Loops through allUsers, returning a row for each user */}
        {allConversations?.map((conversation) => (
          <tr>
            <td>{conversation.id}</td>
            <td>{conversation.user_id}</td>
            <td>{conversation.user_id_2}</td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default ConversationTable;
