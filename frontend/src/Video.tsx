// import { useEffect, useState } from "react";
// import User from "./types/User";

const Video = (props: { url: string }) => {
  return (
    <video controls width="100%">
      <source src={props.url} type="video/mp4" />
      Sorry, your browser doesn't support embedded videos.
    </video>
  );
};

export default Video;
