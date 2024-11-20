import { io } from "socket.io-client";

// const URL = `http://localhost:1738`;
const URL = `https://cliprwebsocket.onrender.com/:1738`;


const currentUser = localStorage.getItem("user");
let userID;
if (currentUser) {
  const userInfo = JSON.parse(currentUser);
  userID = userInfo["user_id"] as number;
}

export const socket = io(URL, {
  query: {
    userId: userID,
  },
});
