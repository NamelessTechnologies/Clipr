import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import "../../styles/PostIcons.css";

function CommentLikeIcon(props: { liked: boolean; num_likes: number }) {
  const [liked, setLiked] = useState(props.liked);
  const [num_likes, setLikes] = useState(props.num_likes);
  const [animate, setAnimate] = useState(false);

  const updateLike = () => {
    if (liked) {
      setLiked(false);
      setLikes(num_likes - 1);
    } else {
      setLiked(true);
      setLikes(num_likes + 1);
    }

    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
  };

  return (
    <div className="flex flex-col items-center mt-7">
      {liked ? (
        <FaHeart
          className={`text-red-500 text-base mt-0.5 cursor-pointer ${animate ? "enlarge-shrink" : ""}`}
          onClick={updateLike}
        />
      ) : (
        <FaRegHeart
          className="text-white text-base mt-0.5 cursor-pointer"
          onClick={updateLike}
        />
      )}

      {liked ? (
        <span className="text-red-500 text-sm text-center">{num_likes}</span>
      ) : (
        <span className="text-white text-sm text-center">{num_likes}</span>
      )}
    </div>
  );
}

export { CommentLikeIcon };
