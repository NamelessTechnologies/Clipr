import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import "../../styles/PostIcons.css"

function LikeIcon(props: { liked: boolean, num_likes: number }) {

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
    }

    return (
        <div className="flex flex-col justify-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-900 cursor-pointer" onClick={updateLike}>

                {liked ? (
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