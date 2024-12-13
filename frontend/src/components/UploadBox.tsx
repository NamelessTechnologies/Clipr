import React, { useEffect, useState } from "react";
import { uri } from "../App";
import ReactS3Client from "react-aws-s3-typescript";
import { s3Config } from "./s3Config";
import { LoadingSpinner } from "./LoadingSpinner";
import ScreenRecorder from "../pages/ScreenRecorder";
import { Link } from "react-router-dom";
// import User from '../types/User';
// import AWS from "aws-sdk";
// import AWS from 'aws-sdk/global';
// import AWS from "aws-sdk";
// import AWS from 'aws-sdk/global';

interface PostContent {
  content: string;
}

const CreatePost: React.FC = () => {
  const [isRecording, setRecording] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [media_type, setMediaType] = useState("text");
  const [post, setPost] = useState<PostContent>({ content: "" });
  const [fileName, setFileName] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [postIdentification, setPostIdentification] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("user") || ""
  );

  let userInfo = JSON.parse(currentUser);

  window.addEventListener("heylol", async () => {
    const blob = localStorage.getItem("heylol");
    if (blob) {
      const response = await fetch(blob);
      const newBlob = await response.blob();
      const newName = generateRandomString(20);
      // Create a File from the Blob
      const file = new File([newBlob], newName, { type: newBlob.type });
      setImage(file);
      setMediaType("video");
    }
  });

  function generateRandomString(length: number) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  const toggle = () => {
    setImage(null);
    setRecording(!isRecording);
    setFileName("");
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleStorageChange = (event: any) => {
      if (event.key == "storage") {
        setCurrentUser(localStorage.getItem("user") || "");
        userInfo = JSON.parse(currentUser);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    localStorage.removeItem("heylol");

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPost({ ...post, content: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const temp_type = file?.type;
      const type = temp_type?.split("/")[0];
      setMediaType(type);
      setImage(file);
    }
  };

  useEffect(() => {
    if (image) {
      setFileName(image.name);
      console.log(image.name);
    }
  }, [image]);

  const createPost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(image);
    if (!fileName) {
      alert("must upload file first");
      return;
    }

    const uid = userInfo["user_id"];
    let postID = 0;

    if (media_type != "text") {
      let fileLocation = "";

      // check if image provided
      if (image) {
        // alert(`File "${image.name}" is ready for upload!`);
        // Upload logic
        const s3 = new ReactS3Client(s3Config);
        setIsLoading(!isLoading);
        try {
          let fileName = image.name;
          fileName = fileName.substring(0, fileName.lastIndexOf(".")); // remove the file extension (it will be added by endpoint)
          const res = await s3.uploadFile(image, fileName);
          console.log(res);
          const res_json = JSON.stringify(res);
          const parsed = JSON.parse(res_json);
          console.log("parsed.location: " + parsed.location);
          fileLocation = parsed.location;
          console.log("fileLocation: " + fileLocation);
          /*
           * {
           *   Response: {
           *     bucket: "bucket-name",
           *     key: "directory-name/filename-to-be-uploaded",
           *     location: "https:/your-aws-s3-bucket-url/directory-name/filename-to-be-uploaded"
           *   }
           * }
           */

          const formData = new FormData();
          formData.append("user_id", uid);
          formData.append("title", title);
          formData.append("description", post.content);
          formData.append("media_type", media_type);

          const response = await fetch(uri + "post/realpost", {
            body: formData,
            method: "POST",
          });
          const data = await response.json();
          postID = data["post_id"];
          setPostIdentification(
            "https://clipr.vercel.app/IsolatedPost/?id=" + postID
          );

          const formData2 = new FormData();
          formData2.append("post_id", postID.toString());
          formData2.append("url", fileLocation);
          const response2 = await fetch(uri + "media/postMedia", {
            body: formData2,
            method: "POST",
          });
          console.log(response2);

          // if (response.status === 200) {
          //   alert("Success!");
          // } else {
          //   alert(`${response.status}: ${response.statusText}`);
          // }

          if (response2.status === 200) {
            setIsOpen(true);
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
    setFileName("");
    setTitle("");
    setPost({ content: "" });
    setImage(null);
    setMediaType("text");
    const fileInput = document.getElementById(
      "dropzone-file"
    ) as HTMLInputElement;
    fileInput.value = "";
  };

  return (
    <>
      <div>{isLoading && <LoadingSpinner />}</div>

      <div className="flex-col w-1/3 h-fit mt-14 px-10 bg-navbar border border-x-gray-300">
        <div className="w-full text-white text-center text-3xl mt-6 mb-3">
          Create New Post
        </div>
        <form
          noValidate
          onSubmit={createPost}
          className=" rounded items-center"
        >
          <div>
            {isRecording ? (
              <div>
                <div className="flex justify-center items-center al">
                  <ScreenRecorder></ScreenRecorder>
                </div>
                <div className="text-center mt-3 mb-3 text-gray-100">
                  --------------------or--------------------
                </div>
                <div className="flex justify-center items-center">
                  <button
                    onClick={toggle}
                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 mt-3 rounded flex-col justify-center items-center align-center"
                  >
                    Import Media
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="mb-2 text-sm text-gray-300 dark:text-gray-400">
                        Video Formats are accepted
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      required
                      accept="image/*, video/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="text-white">{fileName}</div>
                <label className="block text-white text-lg font-semibold mt-4 mb-2">
                  Upload File
                </label>
                <div className="text-center mt-3 mb-3 text-gray-100">
                  --------------------or--------------------
                </div>
                <div className="flex justify-center items-center">
                  <div
                    onClick={toggle}
                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 mt-3 rounded flex-col justify-center items-center align-center"
                  >
                    Record Media
                  </div>
                </div>
              </div>
            )}

            <label className="block text-white text-lg font-semibold mt-2 mb-2">
              Title
            </label>
            <input
              maxLength={100}
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
              maxLength={500}
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
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 mt-3 rounded mb-5"
          >
            Post
          </button>
        </form>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
          onClick={toggleModal}
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
                  Post Succsfully Created!
                </h3>
                <button
                  onClick={toggleModal}
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
                  <img src="https://media.tenor.com/LhMdKThmz8EAAAAj/hsr-honkai.gif"></img>
                </div>
                <button className="ml-5 text-white text-gray-200 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-small rounded-lg text-sm px-5 py-2.5 text-center dark:bg-amber-600 dark:hover:bg-amber-400 dark:focus:ring-blue-800">
                  <div className="flex flex-row">
                    <Link to={postIdentification} className="rounded">
                      Go To Post
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
    </>
  );
};

export default CreatePost;
