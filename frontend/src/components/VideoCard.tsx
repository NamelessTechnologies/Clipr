import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';

interface VideoCardProps {
    url: string;
    isActive: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({ url, isActive }) => {
    const videoRef = useRef(null);

    return (
        <div>
        <h2>Video Player</h2>
            <ReactPlayer
                url={url}
                controls={false}
                width="800px"
                height="450px"
                loop={true}
                light={true}
                playing={isActive}
                muted={true}
                ref={videoRef}
            />
        </div>
    )
}

