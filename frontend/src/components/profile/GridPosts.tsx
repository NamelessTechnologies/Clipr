import father from "../../assets/father.jpg";
import lappland from "../../assets/lappland.png";
import feixao from "../../assets/feixiao_pull.png";
import narrow_pic from "../../assets/narrow_pic_test.png";
import example_post from "../../assets/example_post.png";
import example_post_3 from "../../assets/example_post_3.png";
import ProfilePost from "./ProfilePost";


function GridPosts() {

    return (
        <div className="flex flex-col w-1/2 mt-10 mx-auto justify-center">

          <div className="flex justify-center gap-20">
            <span className="text-white text-xl border-b">Posts</span>
            <span className="text-white text-xl">Saved</span>
          </div>

          <hr className="h-px my-4 bg-gray-400 border-0"></hr>

          <div className="grid grid-cols-4 gap-2">
            <ProfilePost post_url={father}/>
            <ProfilePost post_url={lappland}/>
            <ProfilePost post_url={feixao}/>
            <ProfilePost post_url={narrow_pic}/>
            <ProfilePost post_url={example_post}/>
            <ProfilePost post_url={example_post_3}/>
            <ProfilePost post_url={father}/>
            <ProfilePost post_url={father}/>
          </div>
        </div>
      );
}


export default GridPosts;