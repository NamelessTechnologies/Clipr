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

  const [posts, setPosts] = useState<ProfilePostModel[]>([]);

  const fetchPosts = async() => {
    console.log("fetching posts : " + local_uri + "post/profile/" + props.profile_id);
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

  useEffect(() => {
    fetchPosts();
  }, [props])

  return (
      <div className="flex flex-col w-1/2 mt-10 mx-auto justify-center">

        <div className="flex justify-center gap-20">
          <span className="text-white text-xl border-b">Posts</span>
          <span className="text-white text-xl">Saved</span>
        </div>

        <hr className="h-px my-4 bg-gray-400 border-0"></hr>

        <div className="grid grid-cols-4 gap-2">

          {posts.map((post, index) => (
              <ProfilePost key={index} post_url={post.mediaLink} media_type={post.mediaType} />
            ))}


          {/* <ProfilePost post_url={father} media_type="image"/>
          <ProfilePost post_url={lappland} media_type="image"/>
          <ProfilePost post_url={feixao} media_type="image"/>
          <ProfilePost post_url={narrow_pic} media_type="image"/>
          <ProfilePost post_url={example_post} media_type="image"/>
          <ProfilePost post_url={example_post_3} media_type="image"/>
          <ProfilePost post_url={test_video} media_type="video"/>
          <ProfilePost post_url={father}media_type="image"/> */}

          {/* <img src={father} className="w-60 h-72 rounded-xl object-cover"></img>
          <img src={lappland} className="w-60 h-72 rounded-xl object-cover"></img>
          <img src={feixao} className="w-60 h-72 rounded-xl object-cover"></img>
          <img src={narrow_pic} className="w-60 h-72 rounded-xl"></img>
          <img src={example_post} className="w-60 h-72 rounded-xl"></img>
          <img src={example_post_3} className="w-60 h-72 rounded-xl"></img>
          <img src={father} className="w-60 h-72 rounded-xl"></img>
          <img src={father} className="w-60 h-72 rounded-xl"></img> */}
        </div>
      </div>
    );
}


export default GridPosts;