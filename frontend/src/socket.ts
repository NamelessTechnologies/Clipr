import { io } from "socket.io-client";

// const URL =
//   process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

const URL =
  process.env.NODE_ENV === "production"
    ? undefined
    : "https://clipr-kih8.vercel.app";

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
