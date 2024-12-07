import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import "../../styles/PostIcons.css"

function LikeIcon(props: { liked: boolean, num_likes: number }) {

    const [liked, setLiked] = useState(props.liked);
    const num_likes = props.num_likes;
    const [animate, setAnimate] = useState(false);

    const updateLike = () => {
        if (liked) {
            setLiked(false);
        } else {
            setLiked(true);
        }

        setAnimate(true);
        setTimeout(() => setAnimate(false), 300);
    }

    return (
        <div className="flex flex-col justify-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-like_button_bg cursor-pointer " onClick={updateLike}>

                {liked ? (
                    // <FaHeart className="text-red-500 text-3xl mt-0.5" />
                    <FaHeart className={`text-red-500 text-3xl mt-0.5 ${animate ? "enlarge-shrink" : ""}`} />
                ) : (
                    <FaRegHeart className="text-red-500 text-3xl mt-0.5" />
                )}

            </div>
            <span className="text-white text-center">{num_likes}</span>
        </div>

    )
}

export { LikeIcon };