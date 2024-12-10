import { useRef } from "react";
import { MdPhoto } from "react-icons/md";
import { FaPlay } from "react-icons/fa";

function ProfilePost(props: {post_url: string, media_type: string}) {

    const videoRef = useRef<HTMLVideoElement>(null);

    const mouseHovering = () => {
        videoRef.current?.play();
    }

    const mouseLeaving = () => {
        videoRef.current?.pause();
    }


    return (
        <>
            {props.media_type == "image" ? (
                <div className="relative">  
                    <MdPhoto className="absolute z-10 w-6 h-6 right-2 top-2 text-gray-100 drop-shadow-xl shadow-black opacity-90"/>
                    <img src={props.post_url} className="w-60 h-72 rounded-lg object-cover"></img>
                </div>
                // <img src={props.post_url} className="w-60 h-72 rounded-xl object-cover"></img>
            ) : (
                <div className="relative">
                    <FaPlay className="absolute z-10 w-4 h-4 right-3 top-3 text-gray-100 drop-shadow-xl shadow-black opacity-90"/>
                    <video src={props.post_url} id="video-tag" className="w-60 h-72 rounded-lg object-cover" 
                        ref={videoRef} muted={true} onMouseEnter={mouseHovering} onMouseLeave={mouseLeaving} loop disablePictureInPicture></video>
                </div>
                // <video src={props.post_url} id="video-tag" className="w-60 h-72 rounded-xl object-cover" 
                //         ref={videoRef} muted={true} onMouseEnter={mouseHovering} onMouseLeave={mouseLeaving} loop></video>
            )}
        
        </>
      );
}


export default ProfilePost;