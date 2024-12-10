import ProfilePreview from "../components/messages/ProfilePreview";

function Inbox() {
  return (
    <div className="flex flex-row items-center justify-center">
      {/* Message List */}
      <div className="flex flex-col w-1/4 mt-4 justify-center bg-navbar rounded-xl">
        {/* Header */}
        <div className="flex w-full p-4 border-b">
          <h1 className="text-white text-xl my-auto">Messages</h1>
        </div>
        {/* List Of DMS */}
        <div className="overflow-scroll">
          <ProfilePreview
            user_id="1"
            nickname="hawkTuah"
            pfp="https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png"
            lastMessage="Hey lol"
          ></ProfilePreview>
          <ProfilePreview
            user_id="2"
            nickname="Spit On That Humengous, Gigantic Thang"
            pfp="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_9Y6_Qo2SDisnzLkdm3YyVMuoCcwOoIc3VQ&s"
            lastMessage="Talk Tuah!"
          ></ProfilePreview>
        </div>
      </div>
      {/* TODO Integrate */}
      <div>Messages Later</div>
    </div>
  );
}

export default Inbox;
