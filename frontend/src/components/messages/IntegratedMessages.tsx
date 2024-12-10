import React, { useEffect, useState, useRef } from "react";
import MessageModel from "../../types/Message";
import { MessageBox } from "./MessageBox";
import { socket } from "../../socket";
import { uri } from "../../App";
import { useNavigate } from "react-router-dom";

function IntegratedMessages(props: {
  convo_id: string;
  nickname: string;
  user_id: string;
}) {
  const currentUser = localStorage.getItem("user");
  const userInfo = currentUser ? JSON.parse(currentUser) : {};
  const userID = userInfo["user_id"] as number;
  const userPFP = userInfo["pfp"] as string;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageModel[]>([]);

  const secondUser = props.nickname;
  const secondUserID = props.user_id;
  const [secondUserPFP, setSecondUserPFP] = useState("");
  const convoID = props.convo_id;
  const [incomingMessage, setIncomingMessage] = useState<MessageModel>();

  const scrollToBottom = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const goToTheProfile = (index: string) => {
    navigate(`/Profile?profile_id=${index}`);
  };

  //Recieving Messages with Sockets
  useEffect(() => {
    const handleMessage = (message: MessageModel) => {
      setIncomingMessage(message);
    };

    socket.on("recieve-message", handleMessage);

    return () => {
      socket.off("recieve-message", handleMessage);
    };
  }, []);

  // this useEffect contains two functions which fetches the other user's pfp and all messages between the current and other user
  useEffect(() => {
    console.log("FETCHING MESSAGES");

    // get and set second user's PFP
    const recipientPFP = async () => {
      try {
        const response = await fetch(`${uri}user/${secondUserID}`);
        const json = await response.json();
        setSecondUserPFP(json["pfp"]);
      } catch (error) {
        console.error("Error second user's pfp:", error);
      }
    };
    recipientPFP();

    // get and set all messages from convo
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `${uri}conversation?User_1=${userID}&User_2=${secondUserID}`,
        );
        const json = await response.json();
        const messages: MessageModel[] = json.map((media: MessageModel) => ({
          id: media.id,
          convo_id: media.convo_id,
          content: media.content,
          datesent: media.datesent,
          user_id: media.user_id,
          user_pfp: media.user_pfp,
        }));
        setMessages(messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [secondUserID, userID]);

  useEffect(() => {
    if (incomingMessage && incomingMessage.convo_id.toString() === convoID) {
      setMessages((prevMessages) => [...prevMessages, incomingMessage]);
    }
  }, [incomingMessage, convoID]);

  // automatically scrolls to bottom of message box to go to most recent message
  useEffect(() => {
    scrollToBottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // posts message to backend
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
        user_pfp: userPFP,
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
      {/* MESSAGE CONTAINER */}
      <div className="flex flex-col w-[60vw] h-[85vh] mt-4 justify-center bg-navbar rounded-xl">
        {/* recipients name on top */}
        <div
          className="flex w-full p-4 border-b"
          onClick={() => {
            goToTheProfile(props.user_id);
          }}
        >
          <img
            src={
              secondUserPFP ||
              "https://bigskyastrology.com/wp-content/uploads/2013/09/heisenberg-1.jpg"
            }
            className="w-11 h-11 rounded-full mr-3"
          ></img>
          <h1 className="text-white text-xl my-auto">{secondUser}</h1>
        </div>

        {/* messages */}
        <div
          className="flex flex-col text-white w-full px-5 pb-5 overflow-auto"
          style={{ height: "72vh", maxHeight: "72vh" }}
        >
          {messages.map((msg) => (
            <MessageBox
              key={msg.id}
              username={
                msg.user_id === userInfo["user_id"]
                  ? userInfo["username"]
                  : secondUser
              }
              content={msg.content}
              user_pfp={msg.user_pfp}
              sender={msg.user_id === userInfo["user_id"] ? true : false}
            />
          ))}
          <div ref={scrollToBottom}></div>
        </div>

        {/* text box to send your message */}
        <form className="flex justify-center p-4" onSubmit={sendMessage}>
          <div className="flex flex-col justify-center w-full mr-3">
            <input
              className="p-2 rounded-xl bg-transparent border text-white"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Send Message..."
            />
          </div>

          <button className="bg-navbar text-white text-base" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default IntegratedMessages;
