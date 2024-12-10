import { useEffect, useState } from "react";
import ProfilePreview from "../components/messages/ProfilePreview";
import ShouldBeLoggedIn from "../components/Authenticate";
import IntegratedMessages from "../components/messages/IntegratedMessages";
import { uri } from "../App";
import { socket } from "../socket";

interface ProfilePreview {
  user_id: string;
  nickname: string;
  pfp: string;
  lastMessage: string;
  convo_id: string;
  latestDate: Date;
}
function Inbox() {
  ShouldBeLoggedIn(true);
  const currentUser = localStorage.getItem("user");
  const userInfo = currentUser ? JSON.parse(currentUser) : {};
  const userID = userInfo["user_id"] as number;

  const [selected, setSelected] = useState<string>();
  const [selectedConvoID, setSelectedConvoID] = useState<string>("15");
  const [selectedNickname, setSelectedNickName] = useState<string>("LebronBon");

  const [conversation, setConversation] = useState<ProfilePreview[]>([]);

  const changeSelected = (
    user_id: string,
    nickname: string,
    convo_id: string
  ) => {
    setSelected(user_id);
    setSelectedNickName(nickname);
    setSelectedConvoID(convo_id);
  };

  useEffect(() => {
    const fetchConvos = async () => {
      try {
        const response = await fetch(
          `${uri}conversation/getConvoPageInfo/${userID}`
        );
        const json = await response.json();

        const skibidi: ProfilePreview[] = json.map((convo: any) => ({
          user_id: convo.other_User_Id,
          nickname: convo.other_User_Nickname,
          pfp: convo.other_User_Pfp,
          lastMessage: convo.latest_Message,
          latestDate: convo.latest_Message_Date,
          convo_id: convo.conversation_Id,
        }));

        setConversation(skibidi);

        // Safely set the selected values only if data exists
        if (skibidi.length > 0) {
          setSelected(skibidi[0].user_id);
          setSelectedNickName(skibidi[0].nickname);
          setSelectedConvoID(skibidi[0].convo_id);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConvos();

    // Socket listener with cleanup
    socket.on("recieve-message", fetchConvos);
    return () => {
      socket.off("recieve-message", fetchConvos);
    };
  }, [userID]); // Add userID as a dependency

  useEffect(() => {
    console.log(
      "Selected:",
      selected,
      "ConvoID:",
      selectedConvoID,
      "Nickname:",
      selectedNickname
    );
  }, [selected, selectedConvoID, selectedNickname]);

  return (
    <>
      {selected ? (
        <div className="flex flex-row items-center justify-center">
          {/* Message List */}
          <div className="flex flex-col w-1/4 h-[85vh] mt-4 justify-start bg-navbar rounded-xl overflow-scroll no-scrollbar">
            {/* Header */}
            <div className="flex w-full p-4 border-b">
              <h1 className="text-white text-xl my-auto">Messages</h1>
            </div>
            {/* List Of DMS */}
            {conversation.map((preview) => (
              <div
                onClick={() =>
                  changeSelected(
                    preview.user_id,
                    preview.nickname,
                    preview.convo_id
                  )
                }
              >
                <ProfilePreview
                  selected={selected.toString() == preview.user_id}
                  user_id={preview.user_id}
                  nickname={preview.nickname}
                  pfp={preview.pfp}
                  lastMessage={preview.lastMessage}
                  date={preview.latestDate}
                ></ProfilePreview>
              </div>
            ))}
          </div>
          {/* TODO Integrate */}
          <div className="ml-2">
            <IntegratedMessages
              user_id={selected}
              nickname={selectedNickname}
              convo_id={selectedConvoID}
            ></IntegratedMessages>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default Inbox;
