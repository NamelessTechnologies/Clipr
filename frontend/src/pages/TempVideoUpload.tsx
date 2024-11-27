import shouldBeLoggedIn from "../components/Authenticate";
import TestVideo from "../assets/yay.mp4";
import React, { useState } from "react";

function TempVideoUpload() {
  shouldBeLoggedIn(true);
  const [file, setFile] = useState<File | null>(null);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if(selectedFile) {
      setFile(selectedFile);
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(!file) {
      alert("No file added");
      return;
    }

    const formData = new FormData();
    formData.append("PhotoData", file);
    formData.append("UserID", 1);
    formData.append("Title", "temp_title");
    formData.append("Content", "temp_content");

    try {

      const response = await fetch(
        "http://localhost:5001/post/tempVideo",
        {
          body: formData,
          method: "POST",
          // headers: {
          //   Accept: "application/json, text/plain",
          //   "Content-Type": "application/json;charset=UTF-8",
          // },
        },
      );
      console.log(response);
      if (response.status === 200) {
        alert("Success!");
      } else {
        alert(`${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }
    // console.log(response);
    // console.log(formData);

    const tempURL = URL.createObjectURL(file);
    setVideoURL(tempURL);
    console.log(tempURL);
  }

  return (
    <>
      <div className="flex bg-blue-100">
        <form onSubmit={handleSubmit}>
          <input type='file' id='file' onChange={handleFileChange}></input>
          <button type='submit'>Submit</button>
        </form>
      </div>
      <video controls src={videoURL}></video>
    </>
  );
}

export default TempVideoUpload;
