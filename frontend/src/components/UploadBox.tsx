import React, { useEffect, useState } from "react";
import { uri } from "../App";
import ReactS3Client from "react-aws-s3-typescript";
import { s3Config } from "./s3Config";
import { LoadingSpinner } from "./LoadingSpinner";
// import User from '../types/User';
// import AWS from "aws-sdk";
// import AWS from 'aws-sdk/global';
// import AWS from "aws-sdk";
// import AWS from 'aws-sdk/global';

interface PostContent {
  content: string;
}

const CreatePost: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [media_type, setMediaType] = useState("text");
  const [post, setPost] = useState<PostContent>({ content: "" });

  const [isLoading,setIsLoading] = useState(false);
    
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("user") || "",
  );
  let userInfo = JSON.parse(currentUser);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleStorageChange = (event: any) => {
      if (event.key == "storage") {
        setCurrentUser(localStorage.getItem("user") || "");
        userInfo = JSON.parse(currentUser);
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // console.log("This runs");
    setPost({ ...post, content: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("This runs");
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const temp_type = file?.type;
      const type = temp_type?.split("/")[0];
      setMediaType(type);
      setImage(file);
    }
  };

  const createPost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("LETS DO THIS");

    const uid = userInfo["user_id"];
    let postID = 0;

    const formData = new FormData();
    formData.append("user_id", uid);
    formData.append("title", title);
    formData.append("description", post.content);
    formData.append("media_type", media_type);

    try {
      const response = await fetch(uri + "post/realpost", {
        body: formData,
        method: "POST",
      });
      const data = await response.json();
      postID = data["post_id"];
      // if (response.status === 200) {
      //   alert("Success!");
      // } else {
      //   alert(`${response.status}: ${response.statusText}`);
      // }
    } catch (error) {
      alert(error);
      console.error(error);
    }

    if (media_type != "text") {
      var fileLocation = "";

      // check if image provided
      if (image) {
          // alert(`File "${image.name}" is ready for upload!`);
          // Upload logic
          const s3 = new ReactS3Client(s3Config);
          setIsLoading(!isLoading);
          
          try {
              console.log("Attempting to upload " + image.name + " of type " + image.type);
              var fileName = image.name;
              fileName = fileName.substring(0,fileName.lastIndexOf(".")); // remove the file extension (it will be added by endpoint)
              const res = await s3.uploadFile(image, fileName);
              /*
              * {
              *   Response: {
              *     bucket: "bucket-name",
              *     key: "directory-name/filename-to-be-uploaded",
              *     location: "https:/your-aws-s3-bucket-url/directory-name/filename-to-be-uploaded"
              *   }
              * }
              */
              console.log(res);
              var res_json = JSON.stringify(res);
              var parsed = JSON.parse(res_json);
              console.log("parsed.location: " + parsed.location);
              fileLocation = parsed.location;
              console.log("fileLocation: " + fileLocation);

              
              const formData2 = new FormData();
              formData2.append("post_id", postID.toString());
              formData2.append("url", fileLocation);
              const response2 = await fetch(uri + "media/postMedia", {
                body: formData2,
                method: "POST"
              });
              if (response2.status === 200) {
                alert("Success!");
              } else {
                alert(`${response2.status}: ${response2.statusText}`);
              }          
            } catch (exception) {
              console.log(exception);
              /* handle the exception */
            }
            setIsLoading(false);
      } else {
        alert("Please select a file first.");
        return;
      }
    }
    setTitle("");
    setPost({ content: "" });
    setImage(null);
    setMediaType("text");
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    fileInput.value = "";
  };

  return (
    <>
        <div>
            {isLoading && <LoadingSpinner />}
        </div>

        <div className="flex-col w-1/3 h-4/6 mt-14 px-10 bg-navbar border border-x-gray-300">
        <div className="w-full text-white text-center text-3xl mt-6 mb-6">
            Create New Post
        </div>
        <form onSubmit={createPost} className=" rounded items-center">
            <div>
            <label className="block text-white text-lg font-semibold mb-2">
                Upload Photo
            </label>
            <input
                id='fileInput'
                required
                type="file"
                accept="image/*, video/*"
                onChange={handleFileChange}
                className="text-white"></input>
            <label className="block text-white text-lg font-semibold mb-2">
                Title
            </label>
            <input
                type="text"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full py-2 px-3 text-white bg-navbar border border-white focus:outline-none focus:border-amber-500"
            />
            <span className="text-white text-sm float-right">
                {title.length} / 100
            </span>

            <label className="block text-white text-lg font-semibold mt-6 mb-2">
                Content:
            </label>
            <textarea
                id="content"
                value={post.content}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full h-2/3 py-2 px-3 text-white bg-navbar border border-white focus:outline-none focus:border-amber-500"
                placeholder="Share your thoughts!"
            />
            <span className="text-white text-sm float-right">
                {post.content.length} / 500
            </span>
            </div>
            <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 mt-3 rounded"
            >
            Post
            </button>
        </form>
        </div>
    </>
  );
};

export default CreatePost;
