import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import MessageModel from "../types/Message";
import MessageBox from "../components/MessageBox";
import shouldBeLoggedIn from "../components/Authenticate";
import { socket } from "../types/socket.tsx";

const Messages: React.FC = () => {
  shouldBeLoggedIn(true);
  const url = "https://clipr-esa6hpg2cahzfud6.westus3-01.azurewebsites.net/";

  const [currentUser] = useState(localStorage.getItem("user") || "");
  const userInfo = JSON.parse(currentUser);
  const [message, setMessage] = useState("");
  const [convoMessages, setMessages] = useState<MessageModel[]>([]);
  const location = useLocation();
  const second_user = location.state;

  const scrollToBottom = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  // console.log(userInfo['user_id']);
  // console.log("second user: " + second_user[1])

  // gets all messages for current conversation
  const fetchMessages = async () => {
    try {
      const response = await fetch(
        url +
          `conversation?User_1=${userInfo["user_id"]}&User_2=${second_user[1]}`,
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

  // saves message sent by current user in database
  const postMessage = async () => {
    const newMessage = {
      Convo_id: second_user[2],
      Content: message,
      Datesent: new Date(),
      User_id: JSON.parse(currentUser)["user_id"],
    };

    try {
      const response = await fetch(url + "conversation/message", {
        body: JSON.stringify(newMessage),
        method: "POST",
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8",
        },
      });
      console.log(response);
      if (response.status === 200) {
        console.log("message posted to database!");
      } else {
        console.log("message not posted to database");
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  // waits for postMessage() to complete before calling fetchMessages() function
  const messagePipeline = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postMessage();
      await fetchMessages();
    } catch (error) {
      console.error("Error in executing functions:", error);
    }
  };

  convoMessages.forEach((msg: MessageModel) => {
    console.log(msg.content);
  });

  const refreshPage = () => {
    window.location.reload();
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
        <h1 className="text-white text-3xl">{second_user[0]}</h1>
        {/* <h1 className="text-white text-3xl">{"convoid " + second_user[2]}</h1>                 */}
      </div>

      <div className=" text-white bg-navbar flex flex-col justify-center w-3/5 h-4/5 px-10 pb-5">
        {convoMessages.map((msg) => (
          <MessageBox
            username={
              msg.user_id == userInfo["user_id"]
                ? userInfo["username"]
                : second_user[0]
            }
            content={msg.content}
          />
        ))}
      </div>

      <button className="mr-10 text-blue-300 pt-2" onClick={refreshPage}>
        Refresh
      </button>

      <form
        className="flex justify-center w-screen pb-10"
        onSubmit={messagePipeline}
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
