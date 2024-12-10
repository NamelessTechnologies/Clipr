import { useEffect, useRef, useState } from "react";
import { MdPhoto } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import placeholder from "../../assets/placeholder.png";

function ProfilePost(props: { post_url: string; media_type: string }) {
  const [valid, setValid] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const mouseHovering = () => {
    videoRef.current?.play();
  };

  const mouseLeaving = () => {
    if (videoRef.current != null) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // this validates the URL for either the image or video
  const validateURL = (url: string, type: string) => {
    return new Promise<boolean>((resolve) => {
      if (type == "image") {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      } else if (type == "video") {
        const video = document.createElement("video");
        video.onload = () => resolve(true);
        video.onerror = () => resolve(false);
        video.src = url;
      } else {
        resolve(false);
      }
    });
  };

  useEffect(() => {
    validateURL(props.post_url, props.media_type).then((result) => {
      setValid(result);
    });
  }, [props]);

  return (
    <>
      {props.media_type == "image" ? (
        <div className="relative">
          {valid ? (
            <>
              <MdPhoto className="absolute z-10 w-6 h-6 right-2 top-2 text-gray-100 drop-shadow-xl shadow-black opacity-90" />
              <img
                src={props.post_url}
                className="w-60 h-72 rounded-lg object-cover"
              ></img>
            </>
          ) : (
            <img
              src={placeholder}
              className="w-60 h-72 rounded-lg object-cover"
            ></img>
          )}
        </div>
      ) : (
        <div className="relative">
          {valid ? (
            <>
              <FaPlay className="absolute z-10 w-4 h-4 right-3 top-3 text-gray-100 drop-shadow-xl shadow-black opacity-90" />
              <video
                src={props.post_url}
                id="video-tag"
                className="w-60 h-72 rounded-lg object-cover"
                ref={videoRef}
                muted={true}
                onMouseEnter={mouseHovering}
                onMouseLeave={mouseLeaving}
                loop
                disablePictureInPicture
              ></video>
            </>
          ) : (
            <img
              src={placeholder}
              className="w-60 h-72 rounded-lg object-cover"
            ></img>
          )}
        </div>
      )}
    </>
  );
}

export default ProfilePost;
