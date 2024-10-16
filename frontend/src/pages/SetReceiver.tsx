import React, { useState } from "react";
import User from "../types/User";
import Conversation from "../types/Conversation";
import { useNavigate } from "react-router-dom";

const SetReceiver: React.FC = () => {
  const [receiver, setReceiver] = useState("");
  const [currentUser] = useState(localStorage.getItem("user") || "");
  const userInfo = JSON.parse(currentUser);
  const navigate = useNavigate();
  const url = "https://clipr-esa6hpg2cahzfud6.westus3-01.azurewebsites.net/";
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const queryString = url + "username/" + receiver;
    const response = await fetch(queryString);
    const json = (await response.json()) as User;

    const queryString2 =
      url +
      "conversation/convoid?User_1=" +
      userInfo["user_id"] +
      "&User_2=" +
      json.user_id;
    const response2 = await fetch(queryString2);
    const json2 = (await response2.json()) as Conversation;
    let convoid = json2.id;
    const receiverid = json.user_id;

    if (convoid == -1) {
      // post new convo
      console.log("Making new convo...");
      try {
        const newConvo = {
          user_id: userInfo["user_id"],
          user_id_2: receiverid,
        };
        const response = await fetch(url + "conversation/", {
          body: JSON.stringify(newConvo),
          method: "POST",
          headers: {
            Accept: "application/json, text/plain",
            "Content-Type": "application/json;charset=UTF-8",
          },
        });

        if (response.ok) {
          console.log("Success!");
          const json = await response.json();
          console.log("obtained id: " + json.id);
          convoid = parseInt(json.id);
        } else {
          console.log(`${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        console.log(error);
        console.error(error);
      }
    } else {
      convoid = json2.id;
    }

    navigate("/Clipr/Messages", { state: [receiver, receiverid, convoid] });
  };

  return (
    <>
      <div className="flex flex-row justify-center text-white p-10">
        <div className="flex justify-center flex-col mx-5">
          <form
            className="bg-navbar items-center pt-5 px-10 pb-10 rounded-md shadow-lg border border-white"
            onSubmit={handleSubmit}
          >
            <div className="flex justify-center flex-col mx-5">
              <label className="">Username:</label>
              <input
                className="p-2 text-black mb-6 rounded-md"
                required
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
              ></input>
              <button type="submit">Go to Messages Page</button>
            </div>
          </form>
          {/* <h1 className='text-white'>{receiver}</h1> */}
        </div>
      </div>
    </>
  );
};

export default SetReceiver;
