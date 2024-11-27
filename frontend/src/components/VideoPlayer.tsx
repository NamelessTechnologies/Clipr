import ReactPlayer from 'react-player';
import React, { useRef, useEffect } from "react";


const VideoPlayer = () => {
    const playerRef = useRef(null); 

    return (
        <div>
        <h2>Video Player</h2>
        <ReactPlayer
            url="https://www.youtube.com/watch?v=lsRpSsFb4hg"
            controls={false}
            width="800px"
            height="450px"
            loop={true}
            light={true}
            playing={true}
            ref={playerRef}
        />
        </div>
    );
};



export { VideoPlayer }