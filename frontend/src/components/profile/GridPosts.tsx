import ProfilePost from "./ProfilePost";
import { uri } from "../../App";
import ProfilePostModel from "../../types/ProfilePost";
import { useEffect, useState } from "react";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import { BsGrid } from "react-icons/bs";
import { BsGridFill } from "react-icons/bs";

function GridPosts(props: { profile_id: string }) {
  const [displayBookmarks, setDisplayBookmarks] = useState(false);
  const [posts, setPosts] = useState<ProfilePostModel[]>([]);
  const [bookmarks, setBookMarks] = useState<ProfilePostModel[]>([]);

  useEffect(() => {
    // reset posts
    setBookMarks([]);
    setPosts([]);

    // set to bookmarks when going to profile
    setDisplayBookmarks(false);
    fetchPosts();
    fetchBookmarks();
  }, [props]);

  const fetchPosts = async () => {
    const response = await fetch(
      uri + "post/profile/" + props.profile_id,
    );
    const json = await response.json();

    const profilePosts: ProfilePostModel[] = [];
    json.forEach((post: any) => {
      const profilePost: ProfilePostModel = {
        post_id: post.post_Id,
        mediaType: post.media_Type,
        mediaLink: post.media_Link,
      };
      profilePosts.push(profilePost);
    });
    setPosts(profilePosts);
  };

  const fetchBookmarks = async () => {
    const response = await fetch(
      uri + "post/bookmark/" + props.profile_id,
    );
    const json = await response.json();

    const bookmarkPosts: ProfilePostModel[] = [];
    json.forEach((post: any) => {
      const profilePost: ProfilePostModel = {
        post_id: post.post_Id,
        mediaType: post.media_Type,
        mediaLink: post.media_Link,
      };
      bookmarkPosts.push(profilePost);
    });
    setBookMarks(bookmarkPosts);
    // setDisplayBookmarks(true);
  };

  // to switch between user's posts and saved posts
  const switchTabs = () => {
    if (displayBookmarks) {
      setDisplayBookmarks(false);
    } else {
      setDisplayBookmarks(true);
      fetchBookmarks();
    }
  };

  return (
    <div className="flex flex-col w-1/2 mt-10 mx-auto justify-center">
      {/* posts and saves button */}
      <div className="flex justify-center gap-20">
        {/* user's posts tab */}
        <div className="flex items-center cursor-pointer" onClick={() => {if (displayBookmarks) { switchTabs(); } }} >
          {displayBookmarks ? (
            <BsGrid className="w-4 h-4 mr-1 text-white" />
          ) : (
            <BsGridFill className="w-4 h-4 mr-1 text-white" />
          )}
          <span className={`text-white text-xl cursor-pointer ${!displayBookmarks && "border-b font-bold"}`}>
            Posts
          </span>
        </div>

        {/* user's saves tab */}
        <div className="flex items-center cursor-pointer" onClick={() => {if (!displayBookmarks) { switchTabs(); } }}>
          {displayBookmarks ? (
            <IoBookmark className="w-4 h-4 mr-1 text-white" />
          ) : (
            <IoBookmarkOutline className="w-4 h-4 mr-1 text-white" />
          )}
          <span className={`text-white text-xl cursor-pointer ${displayBookmarks && "border-b font-bold"}`}>
            Saved
          </span>
        </div>
      </div>

      <hr className="h-px my-4 bg-gray-400 border-0"></hr>

      {/* grid display to show user's posts or saves */}
      <div className="grid grid-cols-4 gap-2">
        {displayBookmarks ? (
          <>
            {bookmarks.map((post, index) => (
              <ProfilePost
                key={index}
                post_id={post.post_id}
                post_url={post.mediaLink}
                media_type={post.mediaType}
              />
            ))}
          </>
        ) : (
          <>
            {posts.map((post, index) => (
              <ProfilePost
                key={index}
                post_id={post.post_id}
                post_url={post.mediaLink}
                media_type={post.mediaType}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default GridPosts;
