import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import { useState } from "react";
import "../../styles/PostIcons.css"

function BookmarkIcon(props: { bookmarked: boolean, num_bookmarks: number }) {

    const [bookmarked, setBookmarked] = useState(props.bookmarked);
    const [animate, setAnimate] = useState(false);

    const updateBookmark = () => {
        if (bookmarked) {
            setBookmarked(false);
        } else {
            setBookmarked(true);
        }
        setAnimate(true);
        setTimeout(() => setAnimate(false), 300);
    }

    return (
        <div className="flex flex-col justify-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-900 cursor-pointer" onClick={updateBookmark}>

                {bookmarked ? (
                    <FaBookmark className={`text-yellow-500 text-2xl ${animate ? "enlarge-shrink" : ""}`}/>
                ) : (
                    <FaRegBookmark className={`text-white text-2xl`} />
                )}
                
            </div>
            <span className="text-white text-center">13.3k</span>
        </div>

    )
}

export { BookmarkIcon };