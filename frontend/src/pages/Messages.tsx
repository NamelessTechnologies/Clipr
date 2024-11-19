import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import MessageModel from "../types/Message";
import { MessageBox } from "../components/MessageBox";
import shouldBeLoggedIn from "../components/Authenticate";
import { socket } from "../socket";
import { uri } from "../App";

const Messages: React.FC = () => {
  shouldBeLoggedIn(true);

  const currentUser = localStorage.getItem("user");
  const userInfo = currentUser ? JSON.parse(currentUser) : {};
  const userID = userInfo["user_id"] as number;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageModel[]>([]);

  const location = useLocation();
  const secondUser = location.state;
  const secondUserID = location.state[1];
  const convoID = secondUser[2];
  const [incomingMessage, setIncomingMessage] = useState<MessageModel>();

  const scrollToBottom = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMessage = (message: MessageModel) => {
      setIncomingMessage(message);
    };

    socket.on("recieve-message", handleMessage);

    return () => {
      socket.off("recieve-message", handleMessage);
    };
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `${uri}conversation?User_1=${userID}&User_2=${secondUserID}`
        );
        const json = await response.json();
        const messages: MessageModel[] = json.map((media: MessageModel) => ({
          id: media.id,
          convo_id: media.convo_id,
          content: media.content,
          datesent: media.datesent,
          user_id: media.user_id,
        }));
        setMessages(messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [secondUserID, userID]);

  useEffect(() => {
    if (incomingMessage && incomingMessage.convo_id === convoID) {
      setMessages((prevMessages) => [...prevMessages, incomingMessage]);
    }
  }, [incomingMessage, convoID]);

  useEffect(() => {
    scrollToBottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const postMessage = async () => {
    const newMessage = {
      Convo_id: convoID,
      Content: message,
      Datesent: new Date(),
      User_id: userID,
    };

    try {
      await fetch(`${uri}conversation/message`, {
        body: JSON.stringify(newMessage),
        method: "POST",
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8",
        },
      });
    } catch (error) {
      console.error("Error posting message:", error);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const recentMessage = {
        convo_id: convoID,
        content: message,
        datesent: new Date(),
        user_id: userID,
      } as unknown as MessageModel;
      socket.emit("send-message", recentMessage);
      await postMessage();
      setMessage("");
      setMessages((prevMessages) => [...prevMessages, recentMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <button
        className="fixed bottom-5 right-5 rounded-xl bg-slate-400 p-5"
        onClick={() =>
          scrollToBottom.current?.scrollIntoView({ behavior: "smooth" })
        }
      >
        Jump To Recent
      </button>
      <div className="w-screen p-5 pl-20">
        <h1 className="text-white text-3xl">{secondUser[0]}</h1>
      </div>

      <div className="text-white bg-navbar flex flex-col justify-center w-3/5 h-4/5 px-10 pb-5">
        {messages.map((msg) => (
          <MessageBox
            key={msg.id}
            username={
              msg.user_id === userInfo["user_id"]
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
          />
        </div>
        <div className="bg-blue-100 rounded-md">
          <button
            className="p-2 bg-navbar text-white border-white border-2"
            type="submit"
          >
            Send Message
          </button>
        </div>
      </form>
      <div ref={scrollToBottom}></div>
    </div>
  );
};

export default Messages;
