import UserMessageModel from "../types/UserMessage";

const MessageBox = ({ username, content }: UserMessageModel) => {
  return (
    <div>
      <div className="bg-navbar border-amber-500 border-b-2 pb-2 pt-4 ">
        <h1 className="text-xl mb-4">{username}</h1>
        <p className="pl-7">{content}</p>
      </div>
    </div>
  );
};

export default MessageBox;
