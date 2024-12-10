import { useRef } from "react";

function ProfilePost(props: {post_url: string, media_type: string}) {

    const videoRef = useRef<HTMLVideoElement>(null);

    const mouseHovering = () => {
        console.log("MOUSE IS HOVERING OVER VIDEO");
        videoRef.current?.play();
    }

    const mouseLeaving = () => {
        console.log("MOUSE LEFT VIDEO");
        videoRef.current?.pause();
    }


    return (
        <>
            {props.media_type == "image" ? (
                <img src={props.post_url} className="w-60 h-72 rounded-xl object-cover"></img>
            ) : (
                <video src={props.post_url} id="video-tag" className="w-60 h-72 rounded-xl object-cover" 
                        ref={videoRef} muted={true} onMouseEnter={mouseHovering} onMouseLeave={mouseLeaving} loop></video>
            )}
        
        </>
      );
}


export default ProfilePost;