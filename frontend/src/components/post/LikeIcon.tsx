import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import "../../styles/PostIcons.css";
import { uri } from "../../App";

function LikeIcon(props: {
  liked: boolean;
  num_likes: number;
  post_id: number;
  user_id: number;
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

  // const [post_id, setPostID] = useState(props.post_id);
  // const [user_id, setUserIID] = useState(props.user_id);

  // const temp_user_id = props.user_id.toString();
  // const temp_post_id = props.post_id.toString();

  const formData = new FormData();
  formData.append("user_id", props.user_id.toString());
  formData.append("post_id", props.post_id.toString());

  const updateLike = async () => {
    if (liked) {
      setLiked(false);
      setLikes(num_likes - 1);
      const response = await fetch(uri + "post/unlikePost", {
        body: formData,
        method: "DELETE",
      });
    } else {
      setLiked(true);
      setLikes(num_likes + 1);
      const response2 = await fetch(uri + "post/likePost", {
        body: formData,
        method: "POST",
      });
    }

    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
  };

  return (
    <div className="flex flex-col justify-center">
      <div
        className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-900 cursor-pointer"
        onClick={updateLike}
      >
        {liked ? (
          <FaHeart
            className={`text-red-500 text-3xl mt-0.5 ${
              animate ? "enlarge-shrink" : ""
            }`}
          />
        ) : (
          <FaRegHeart className="text-red-500 text-3xl mt-0.5" />
        )}
      </div>
      <span className="text-white text-center">{num_likes}</span>
    </div>
  );
}

export { LikeIcon };
