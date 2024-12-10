import { useEffect, useState } from "react";
import ProfilePreview from "../components/messages/ProfilePreview";
import ShouldBeLoggedIn from "../components/Authenticate";
import IntegratedMessages from "../components/messages/IntegratedMessages";
import { local_uri, uri } from "../App";

interface ProfilePreview {
  user_id: string;
  nickname: string;
  pfp: string;
  lastMessage: string;
  convo_id: string;
  latestDate?: Date;
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
    console.log(selected, selectedConvoID, selectedNickname);
  };

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

  useEffect(() => {
    const fetchConvos = async () => {
      try {
        const response = await fetch(
          `${local_uri}conversation/getConvoPageInfo/${userID}`
        );
        const json = await response.json();
        const skibidi: ProfilePreview[] = json.map((convo: any) => ({
          user_id: convo.current_User_Id,
          nickname: convo.other_User_Nickname,
          pfp: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png",
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
  }, [userID]);

  console.log(conversation);

  // const preview: ProfilePreview[] = [
  //   {
  //     user_id: "1",
  //     nickname: "LebronBon",
  //     pfp: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png",
  //     lastMessage: "LEBRON JAMES",
  //     convo_id: "15",
  //   },
  //   {
  //     user_id: "2",
  //     nickname: "Hawk Tuah",
  //     pfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_9Y6_Qo2SDisnzLkdm3YyVMuoCcwOoIc3VQ&s",
  //     lastMessage: "Spit on That Thang!!",
  //     convo_id: "21",
  //   },
  // ];

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
                ></ProfilePreview>
              </div>
            ))}
          </div>
          {/* TODO Integrate */}
          <div>
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
