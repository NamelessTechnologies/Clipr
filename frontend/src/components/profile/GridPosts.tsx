import father from "../../assets/father.jpg";
import lappland from "../../assets/lappland.png";
import feixao from "../../assets/feixiao_pull.png";
import narrow_pic from "../../assets/narrow_pic_test.png";
import example_post from "../../assets/example_post.png";
import example_post_3 from "../../assets/example_post_3.png";
import ProfilePost from "./ProfilePost";
import test_video from "../../assets/test_video.mp4";
import { uri, local_uri } from "../../App";
import ProfilePostModel from "../../types/ProfilePost";
import { useEffect, useState } from "react";


function GridPosts(props: {profile_id: string}) {

  const [displayBookmarks, setDisplayBookmarks] = useState(false);
  const [posts, setPosts] = useState<ProfilePostModel[]>([]);
  const [bookmarks, setBookMarks] = useState<ProfilePostModel[]>([]);

  useEffect(() => {
    fetchPosts();
  }, [props])

  const fetchPosts = async() => {
    const response = await fetch(local_uri + "post/profile/" + props.profile_id);
    const json = await response.json();
    
    const profilePosts: ProfilePostModel[] = [];
    json.forEach((post: any) => {
        const profilePost: ProfilePostModel = {
          post_id: post.post_Id,
          mediaType: post.media_Type,
          mediaLink: post.media_Link
        };
        profilePosts.push(profilePost);
    });
    setPosts(profilePosts);
  }

  const fetchBookmarks = async() => {
    const response = await fetch(local_uri + "post/bookmark/" + props.profile_id);
    const json = await response.json();
    
    const bookmarkPosts: ProfilePostModel[] = [];
    json.forEach((post: any) => {
        const profilePost: ProfilePostModel = {
          post_id: post.post_Id,
          mediaType: post.media_Type,
          mediaLink: post.media_Link
        };
        bookmarkPosts.push(profilePost);
    });
    setBookMarks(bookmarkPosts);
    setDisplayBookmarks(true);
  }

  const switchTabs = () => {
    if (displayBookmarks) {
      setDisplayBookmarks(false);
    } else {
      setDisplayBookmarks(true);
      fetchBookmarks(); 
    }
  }

  return (
      <div className="flex flex-col w-1/2 mt-10 mx-auto justify-center">

        <div className="flex justify-center gap-20">
          <span className={`text-white text-xl cursor-pointer ${!displayBookmarks && 'border-b font-bold'}`} onClick={switchTabs}>Posts</span>
          <span className={`text-white text-xl cursor-pointer ${displayBookmarks && 'border-b font-bold'}`} onClick={switchTabs}>Saved</span>
        </div>

        <hr className="h-px my-4 bg-gray-400 border-0"></hr>

        <div className="grid grid-cols-4 gap-2">

        {displayBookmarks ? (
                <>  
                  {bookmarks.map((post, index) => (
                      <ProfilePost key={index} post_url={post.mediaLink} media_type={post.mediaType} />
                    ))}
                </>
            ) : (
                <>
                  {posts.map((post, index) => (
                      <ProfilePost key={index} post_url={post.mediaLink} media_type={post.mediaType} />
                    ))}
                </>
            )}

          {/* {posts.map((post, index) => (
              <ProfilePost key={index} post_url={post.mediaLink} media_type={post.mediaType} />
            ))} */}
        </div>
      </div>
    );
}


export default GridPosts;