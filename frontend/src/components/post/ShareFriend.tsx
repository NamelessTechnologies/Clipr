import { useEffect, useState } from "react";
import UserModel from "../../types/User";
import { ShareFriendProfile } from "./ShareFriendProfile";
import { socket } from "../../socket";
import { uri } from "../../App";
import MessageModel from "../../types/Message";

function ShareFriend(props: {
  users: UserModel[];
  url: string;
  media_type: string;
  s3link: string;
  post_id: number;
}) {
  const currentUser = localStorage.getItem("user");
  const userInfo = currentUser ? JSON.parse(currentUser) : {};
  const userID = userInfo["user_id"] as number;
  const userPFP = userInfo["pfp"] as string;
  const userNickname = userInfo["nickname"] as string;

  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const [convoID, setConvoID] = useState<number>();
  const [sent, setSent] = useState<boolean>(false);

  const changeSelected = (user_id: number) => {
    const newArray = [...selected];
    if (selected.includes(user_id)) {
      const newestArray = newArray.filter((id) => id !== user_id);
      setSelected(newestArray);
    } else {
      newArray.push(user_id);
      setSelected(newArray);
    }
  };

  useEffect(() => {
    const postMessage = async () => {
      if (!convoID) {
        return;
      }
      const postMessage = {
        Convo_id: convoID,
        Content: `${props.s3link}π${props.media_type}π${props.post_id}`,
        Datesent: new Date(),
        User_id: userID,
        nickname: userNickname,
      };
      console.log(postMessage);
      try {
        await fetch(`${uri}conversation/message`, {
          body: JSON.stringify(postMessage),
          method: "POST",
          headers: {
            Accept: "application/json, text/plain",
            "Content-Type": "application/json;charset=UTF-8",
          },
        });
      } catch (error) {
        console.error("Error posting message:", error);
      }
      if (message.length > 0) {
        const optionalMessage = {
          Convo_id: convoID,
          Content: message,
          Datesent: new Date(),
          User_id: userID,
          nickname: userNickname,
        };
        try {
          await fetch(`${uri}conversation/message`, {
            body: JSON.stringify(optionalMessage),
            method: "POST",
            headers: {
              Accept: "application/json, text/plain",
              "Content-Type": "application/json;charset=UTF-8",
            },
          });
        } catch (error) {
          console.error("Error posting message:", error);
        }
      }
      setSent(true);
      setMessage("");
    };
    postMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [convoID]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selected.length == 0) {
      return;
    }
    for (const id of selected) {
      const response = await fetch(
        `${uri}conversation/convoid/?user_1=${userID}&user_2=${id}`
      );
      const json = await response.json();
      console.log(json.id);
      if (json.id == -1) {
        const newConvo = {
          user_id: userID,
          user_id_2: id,
        };
        const response = await fetch(uri + "conversation/", {
          body: JSON.stringify(newConvo),
          method: "POST",
          headers: {
            Accept: "application/json, text/plain",
            "Content-Type": "application/json;charset=UTF-8",
          },
        });
        if (response.ok) {
          const json = await response.json();
          setConvoID(json.id);
        }
      } else {
        setConvoID(json.id);
      }
      try {
        const recentMessage = {
          convo_id: json.id,
          content: message,
          datesent: new Date(),
          user_id: userID,
          user_pfp: userPFP,
        } as unknown as MessageModel;
        socket.emit("send-message", recentMessage);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-start w-full overflow-scroll py-2">
        {props.users.map((user) => (
          <div onClick={() => changeSelected(user.user_id)}>
            <ShareFriendProfile
              pfp={user.pfp}
              nickname={user.nickname}
              user_id={user.user_id as unknown as string}
              selected={selected.includes(user.user_id)}
            ></ShareFriendProfile>
          </div>
        ))}
      </div>
      <div className="flex flex-row pt-4">
        <input
          type="text"
          id="first_name"
          // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          className="w-full p-2 rounded-lg bg-transparent border border-gray-400 placeholder:text-gray-300 text-white"
          placeholder="Send with a Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {sent ? (
          <button className="ml-5 text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-small rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-700  dark:focus:ring-blue-800">
            Sent!
          </button>
        ) : (
          <button
            onClick={sendMessage}
            className="ml-5 text-white  hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-small rounded-lg text-sm px-5 py-2.5 text-center dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-blue-800"
          >
            Send
          </button>
        )}
      </div>
    </div>
  );
}

export { ShareFriend };
