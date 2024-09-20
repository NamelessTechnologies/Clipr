// import { useState } from "react";
// import User from "./types/User";

// const Video = () => {
//   const [src, setSrc] = useState("");

//   const handleChange = async () => {
//     try {
//         const response = await fetch('http://localhost:5001/TestData/user');
//         const json = await response.json() as User;
//         console.log("setting URL to " + json.firstName);
//         setSrc(json.firstName);
//       } catch (error) {
//         console.error(error);
//         }
//   };

//   return (
//     <>
//       <video src={src} controls width="100%">
//         Sorry, your browser doesn't support embedded videos.
//       </video>
//       <button onClick={handleChange}>
//           Fetch Data
//         </button>
//     </>
//   );
// };

// export default Video;