import { useState } from "react";
import ProfilePreview from "../components/messages/ProfilePreview";
import ShouldBeLoggedIn from "../components/Authenticate";
import IntegratedMessages from "../components/messages/IntegratedMessages";

interface ProfilePreview {
  user_id: string;
  nickname: string;
  pfp: string;
  lastMessage: string;
  convo_id: string;
}
function Inbox() {
  ShouldBeLoggedIn(true);
  const [selected, setSelected] = useState<string>("1");
  const [selectedConvoID, setSelectedConvoID] = useState<string>("15");
  const [selectedNickname, setSelectedNickName] = useState<string>("LebronBon");

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

  const preview: ProfilePreview[] = [
    {
      user_id: "1",
      nickname: "LebronBon",
      pfp: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png",
      lastMessage: "LEBRON JAMES",
      convo_id: "15",
    },
    {
      user_id: "2",
      nickname: "Hawk Tuah",
      pfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_9Y6_Qo2SDisnzLkdm3YyVMuoCcwOoIc3VQ&s",
      lastMessage: "Spit on That Thang!!",
      convo_id: "21",
    },
  ];

  return (
    <div className="flex flex-row items-center justify-center">
      {/* Message List */}
      <div className="flex flex-col w-1/4 h-[85vh] mt-4 justify-start bg-navbar rounded-xl overflow-scroll no-scrollbar">
        {/* Header */}
        <div className="flex w-full p-4 border-b">
          <h1 className="text-white text-xl my-auto">Messages</h1>
        </div>
        {/* List Of DMS */}
        {preview.map((preview) => (
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
  );
}

export default Inbox;
