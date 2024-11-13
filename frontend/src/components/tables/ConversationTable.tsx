import { useEffect, useState } from "react";
import ConversationModel from "../../types/Conversation";

const ConversationTable = () => {
  const [data, setData] = useState<ConversationModel[]>([]);
//   const url = "https://clipr-esa6hpg2cahzfud6.westus3-01.azurewebsites.net/";
    const local = "http://localhost:5001/";

  const fetchData = async () => {
    try {
      const response = await fetch(
        local + "User/convo/all",
      );
      const json = (await response.json()) as ConversationModel[];
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const allConversations: ConversationModel[] = data;

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
