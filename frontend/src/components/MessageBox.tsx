import UserMessageModel from "../types/UserMessage";

const MessageBox = ({ content, user_pfp, sender }: UserMessageModel) => {

  return (
    <div>
      { sender ? (
        <div className="flex py-4 justify-end">
          <div className="py-2 px-4 max-w-[28rem] break-words rounded-xl bg-amber-500">{content}</div>
          <img
              src={user_pfp}
              className="w-8 h-8 rounded-full ml-3">
          </img>
        </div>
      ) : (
        <div className="flex py-4">
          <img
              src={user_pfp}
              className="w-8 h-8 rounded-full mr-3">
          </img>
          <div className="py-2 px-4 max-w-[28rem] break-words rounded-xl bg-zinc-800">{content}</div>
        </div>
      )}
    </div>
  );
};

export { MessageBox };
