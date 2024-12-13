import PostModel from "../types/Post";
import { LikeIcon } from "./post/LikeIcon";
import { BookmarkIcon } from "./post/BookmarkIcon";
import { ShareIcon } from "./post/ShareIcon";
// import lappland from "../assets/lappland.png";
import { useState } from "react";
import { Link } from "react-router-dom";
// import feixiao from "../assets/feixiao_pull.png";
// import narrow_pic from "../assets/narrow_pic_test.png";
// import father from "../assets/father.jpg"
import { useNavigate } from "react-router-dom";

function Post(props: {
  postData: PostModel;
  currentUserID: number;
  loggedOut?: boolean;
}) {
  const [showMore, setShowMore] = useState(false);

  const postUser = props.postData.username;
  const postUserPFP = props.postData.user_pfp;
  const title = props.postData.title;
  const description = props.postData.content ?? "";
  const photo_data = props.postData.photo_data;
  const postUserID = props.postData.user_id;
  const publish_date_str = props.postData.datePosted ?? ""; // datePosted returned from endpoint is a string, not date. so have to convert it to date obj again
  const publish_date = new Date(publish_date_str).toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // console.log("HELOOOOOOOOOOOOOOOOOOOOOOOOOOO");
  // console.log(props.postData.user_id);

  const liked = props.postData.liked ?? false;
  const num_likes = props.postData.num_likes ?? 0;
  const bookmarked = props.postData.bookmarked ?? false;
  const num_bookmarks = props.postData.num_bookmarks ?? 0;
  const media_type = props.postData.mediaType ?? "";

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const hopOnPause = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();
  const goToTheProfile = (postUserID: string) => {
    navigate(`/Profile?profile_id=${postUserID}`);
  };

  return (
    <div className="flex-col w-1/2 h-3/5 mr-7 pb-4 rounded-xl">
      {photo_data && (
        <div className="w-auto bg-neutral-900 rounded-xl">
          {media_type == "image" && (
            <img
              src={photo_data}
              className="mb-4 h-auto mx-auto rounded-xl"
              style={{ minHeight: "65vh", maxHeight: "65vh" }}
            ></img>
          )}
          {media_type == "video" && (
            <video
              src={photo_data}
              controls
              autoPlay={true}
              loop
              className="mb-4 h-auto mx-auto rounded-xl"
              style={{ minHeight: "65vh", maxHeight: "65vh" }}
            ></video>
          )}
        </div>
        // <img
        //     src={`data:image/jpeg;base64,${photo_data}`}
        //     alt={ title }
        //     className="my-4 h-auto mx-auto"
        // />
      )}

      <div className="flex">
        {/* pfp + title */}
        <div className="flex">
          <img
            src={postUserPFP}
            className="w-14 h-14 rounded-full mr-4 shrink-0"
          ></img>
          <div className="w-full text-white text-2xl mt-3 ">{title}</div>
        </div>

        {/* like, bookmark, share box */}
        {props.loggedOut ? (
          <div
            className="flex ml-auto space-x-5 mr-2 cursor-pointer"
            onClick={hopOnPause}
          >
            <div
              className="flex ml-auto space-x-5 mr-2"
              style={{ pointerEvents: "none" }}
            >
              <LikeIcon
                liked={liked}
                num_likes={num_likes}
                post_id={props.postData.post_id!}
                user_id={props.currentUserID!}
              />
              <BookmarkIcon
                bookmarked={bookmarked}
                num_bookmarks={num_bookmarks}
                post_id={props.postData.post_id!}
                user_id={props.currentUserID!}
              />
              {photo_data && (
                <ShareIcon
                  s3link={photo_data}
                  media_type={media_type}
                  post_id={props.postData.post_id!}
                />
              )}
            </div>
            {isOpen && (
              <div
                className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
                onClick={hopOnPause}
              >
                <div
                  className="relative p-4 w-full max-w-2xl max-h-full bg-navbar rounded-lg shadow "
                  onClick={(e) => e.stopPropagation()} // Prevent closing on modal content click
                >
                  {/* Modal content */}
                  <div className="bg-navbar">
                    {/* Modal header */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        You must have an account to interact
                      </h3>
                      <button
                        onClick={hopOnPause}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>

                    {/* Modal body */}
                    <div className="flex-col justify-center p-4 md:p-5 space-y-4 text-center">
                      <div className="flex justify-center items-center">
                        <img src="https://media.tenor.com/iUzeap9JwVIAAAAj/surprised-firefly.gif"></img>
                      </div>
                      <h2>
                        <b>Login or Create Account to get Started</b>
                      </h2>
                      <button className="ml-5 text-white text-gray-200 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-small rounded-lg text-sm px-5 py-2.5 text-center dark:bg-amber-600 dark:hover:bg-amber-400 dark:focus:ring-blue-800">
                        <div className="flex flex-row">
                          <Link to="/Login" className="rounded">
                            Login
                          </Link>
                        </div>
                      </button>
                      <button className="ml-5 text-white text-gray-200 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-small rounded-lg text-sm px-5 py-2.5 text-center dark:bg-amber-600 dark:hover:bg-amber-400 dark:focus:ring-blue-800">
                        <div className="flex flex-row">
                          <Link to="/SignUp" className="rounded">
                            Create Account
                          </Link>
                        </div>
                      </button>
                    </div>
                    {/* Modal footer */}
                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex ml-auto space-x-5 mr-2">
            <LikeIcon
              liked={liked}
              num_likes={num_likes}
              post_id={props.postData.post_id!}
              user_id={props.currentUserID!}
            />
            <BookmarkIcon
              bookmarked={bookmarked}
              num_bookmarks={num_bookmarks}
              post_id={props.postData.post_id!}
              user_id={props.currentUserID!}
            />
            {photo_data && (
              <ShareIcon
                s3link={photo_data}
                media_type={media_type}
                post_id={props.postData.post_id!}
              />
            )}
          </div>
        )}
      </div>

      {props.loggedOut ? (
        <div className="text-amber-500 text-lg">{postUser}</div>
      ) : (
        <button className="text-amber-500 text-lg pointer-events-auto:hover" 
          onClick={() => {goToTheProfile(postUserID?.toString()!);
        }}>{postUser}</button>
      )}

      {/* post description */}
      <div className="flex flex-col text-white mt-1 bg-neutral-900 rounded-xl p-2">
        <span className="text-white text-sm font-bold">{publish_date}</span>

        {showMore == false ? description.substring(0, 130) : description}

        {description.length > 120 && (
          <button
            onClick={() => setShowMore(!showMore)}
            className="text-sm text-neutral-300 mt-1 mr-auto"
          >
            {showMore ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
    </div>
  );
}

export { Post };
