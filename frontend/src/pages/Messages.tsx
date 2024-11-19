import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import MessageModel from "../types/Message";
import { MessageBox } from "../components/MessageBox";
import shouldBeLoggedIn from "../components/Authenticate";
import { socket } from "../socket";
import { uri } from "../App";

const Messages: React.FC = () => {
  shouldBeLoggedIn(true);

  const [currentUser] = useState(localStorage.getItem("user") || "");
  const userInfo = JSON.parse(currentUser);
  const userID = userInfo["user_id"] as number;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageModel[]>([]);

  const location = useLocation();
  const secondUser = location.state;
  const secondUserID = location.state[1];

  const convoID = secondUser[2];
  const [incomingMessage, setIncomingMessage] = useState<MessageModel>();

  const scrollToBottom = useRef<HTMLDivElement | null>(null);

  socket.on("recieve-message", (message: MessageModel) => {
    setIncomingMessage(message);
  });

  //Querying All Messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          uri + `conversation?User_1=${userID}&User_2=${secondUserID}`
        );
        const json = await response.json();
        const messages: MessageModel[] = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        json.forEach((media: any) => {
          const NewMessage: MessageModel = {
            id: media.id,
            convo_id: media.convo_id,
            content: media.content,
            datesent: media.datesent,
            user_id: media.user_id,
          };
          messages.push(NewMessage);
        });
        setMessages(messages);
      } catch (error) {
        console.error(error);
        throw new Error("Error getting messages for convo");
      }
    };
    fetchMessages();
  }, [secondUserID, userID]);

  //On Message Recieved via Websocket
  useEffect(() => {
    if (!incomingMessage) {
      return;
    }
    if (incomingMessage?.convo_id === convoID) {
      const newArray = messages;
      newArray.push(incomingMessage);
      setMessages(newArray);
    }
  }, [incomingMessage]);

  // saves message sent by current user in database
  const postMessage = async () => {
    const newMessage = {
      Convo_id: secondUser[2],
      Content: message,
      Datesent: new Date(),
      User_id: userID,
    };

    try {
      await fetch(uri + "conversation/message", {
        body: JSON.stringify(newMessage),
        method: "POST",
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8",
        },
      });
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  //Full Lifecycle of sending message to both websocket and server + updating the front end on message sent
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const recentMessage = {
        convo_id: secondUser[2],
        content: message,
        datesent: new Date(),
        user_id: userID,
      } as unknown as MessageModel;
      socket.emit("send-message", recentMessage);
      await postMessage();
      setMessage("");

      //Dynamically loading the new data
      const newArray = messages;
      newArray.push(recentMessage);
      setMessages(newArray);
    } catch (error) {
      console.error("Error in executing functions:", error);
    }
  };

  const goDown = () => {
    scrollToBottom.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <button
        className="fixed bottom-5 right-5 rounded-xl bg-slate-400 p-5"
        onClick={goDown}
      >
        Jump To Recent
      </button>
      <div className="w-screen p-5 pl-20">
        <h1 className="text-white text-3xl">{secondUser[0]}</h1>
        {/* <h1 className="text-white text-3xl">{"convoid " + second_user[2]}</h1>                 */}
      </div>

      <div className=" text-white bg-navbar flex flex-col justify-center w-3/5 h-4/5 px-10 pb-5">
        {messages.map((msg) => (
          <MessageBox
            username={
              msg.user_id == userInfo["user_id"]
                ? userInfo["username"]
                : secondUser[0]
            }
            content={msg.content}
          />
        ))}
      </div>

      <form
        className="flex justify-center w-screen pb-10"
        onSubmit={sendMessage}
      >
        <div className="flex flex-col justify-center w-1/3 pr-5">
          <input
            className="p-2 rounded-xl"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></input>
        </div>
        <div className="bg-blue-100 rounded-md">
          <button
            className="p-2 bg-navbar text-white border-white border-2"
            type="submit"
          >
            {" "}
            Send Message{" "}
          </button>
        </div>
      </form>
      <div ref={scrollToBottom}></div>
    </div>
  );
};

export default Messages;
