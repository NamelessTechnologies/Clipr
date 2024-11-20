import { io } from "socket.io-client";

// const URL = `http://localhost:3000`;
const URL = `https://cliprwebsocket.onrender.com`;

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
