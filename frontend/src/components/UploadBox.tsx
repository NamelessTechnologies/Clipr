import React, { useEffect, useState } from "react";
// import { uri, local_uri } from "../App";
import { local_uri } from "../App";

// import User from '../types/User';
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
    console.log("This runs");
    setPost({ ...post, content: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("This runs");
    const file = e.target.files ? e.target.files[0] : null;
    if(file) {
      const temp_type = file?.type;
      const type = temp_type?.split('/')[0];
      setMediaType(type);
      setImage(file);
    }
  };

  const createPost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("LETS DO THIS")

    // check if image provided
    // if (!image) {
    //   alert("Please upload an image.");
    //   return;
    // }

    const uid = userInfo["user_id"];

    const formData = new FormData();
    formData.append("user_id", uid);
    formData.append("title", title);
    formData.append("description", post.content);
    formData.append("media_type", media_type);

    try {
      const response = await fetch(local_uri + "post/realpost", {
        body: formData,
        method: "POST"
      });
      if (response.status === 200) {
        alert("Success!");
      } else {
        alert(`${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }

    setTitle("");
    setPost({ content: "" });
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    fileInput.value = '';
  };

  return (
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
      {/* <h1 className="text-white">UID: {userInfo["user_id"]}</h1> */}
    </div>
  );
};

export default CreatePost;
