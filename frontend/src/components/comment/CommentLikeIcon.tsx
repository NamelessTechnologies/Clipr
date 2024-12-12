import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import "../../styles/PostIcons.css";
import { uri } from "../../App";

function CommentLikeIcon(props: {
  liked: boolean;
  num_likes: number;
  current_user_id: number;
  comment_id: number;
}) {
  const [liked, setLiked] = useState(props.liked);
  const [num_likes, setLikes] = useState(props.num_likes);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (props.liked == true) {
      setLiked(true);
    } else {
      setLiked(false);
    }

    if (props.num_likes > 0) {
      setLikes(props.num_likes);
    } else {
      setLikes(0);
    }
  }, [props]);

  const formData = new FormData();
  formData.append("user_id", props.current_user_id.toString());
  formData.append("comment_id", props.comment_id.toString());

  const updateLike = async () => {
    if (liked) {
      setLiked(false);
      setLikes(num_likes - 1);
      await fetch(uri + "post/unlikeComment", {
        body: formData,
        method: "DELETE",
      });
    } else {
      setLiked(true);
      setLikes(num_likes + 1);
      await fetch(uri + "post/likeComment", {
        body: formData,
        method: "POST",
      });
    }

    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
  };

  return (
    <div className="flex flex-col items-center mt-7">
      {liked ? (
        <FaHeart
          className={`text-red-500 text-base mt-0.5 cursor-pointer ${
            animate ? "enlarge-shrink" : ""
          }`}
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
