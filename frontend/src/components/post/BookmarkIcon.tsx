import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import { useState, useEffect } from "react";
import "../../styles/PostIcons.css";
import { uri } from "../../App";

function BookmarkIcon(props: {
  bookmarked: boolean;
  num_bookmarks: number;
  post_id: number;
  user_id: number;
}) {
  const [bookmarked, setBookmarked] = useState(props.bookmarked);
  const [num_bookmarks, setBookmarks] = useState(props.num_bookmarks);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (props.bookmarked == true) {
      setBookmarked(true);
    } else {
      setBookmarked(false);
    }

    if (props.num_bookmarks > 0) {
      setBookmarks(props.num_bookmarks);
    } else {
      setBookmarks(0);
    }
  }, [props]);

  const formData = new FormData();
  formData.append("user_id", props.user_id.toString());
  formData.append("post_id", props.post_id.toString());

  const updateBookmark = async () => {
    if (bookmarked) {
      setBookmarked(false);
      setBookmarks(num_bookmarks - 1);
      const response = await fetch(uri + "post/unsavePost", {
        body: formData,
        method: "DELETE",
      });
      console.log(response);
    } else {
      setBookmarked(true);
      setBookmarks(num_bookmarks + 1);
      const response2 = await fetch(uri + "post/savePost", {
        body: formData,
        method: "POST",
      });
      console.log(response2);
    }

    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
  };

  return (
    <div className="flex flex-col justify-center">
      <div
        className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-900 cursor-pointer"
        onClick={updateBookmark}
      >
        {bookmarked ? (
          <FaBookmark
            className={`text-yellow-500 text-2xl ${animate ? "enlarge-shrink" : ""}`}
          />
        ) : (
          <FaRegBookmark className={`text-white text-2xl`} />
        )}
      </div>
      <span className="text-white text-center">{num_bookmarks}</span>
    </div>
  );
}

export { BookmarkIcon };
