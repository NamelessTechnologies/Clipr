import React, { useState } from "react";
import ReactS3Client from "react-aws-s3-typescript";
import { s3Config } from "./s3Config";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            onFileUpload(file);
        }
    };



    const handleUploadClick = async () => {
        if (selectedFile) {
            alert(`File "${selectedFile.name}" is ready for upload!`);
            // Upload logic
            const s3 = new ReactS3Client(s3Config);

            try {
                console.log("Attempting to upload " + selectedFile.name + " of type " + selectedFile.type);
                var fileName = selectedFile.name;
                fileName = fileName.substring(0,fileName.lastIndexOf(".")); // remove the file extension (it will be added by endpoint)
                const res = await s3.uploadFile(selectedFile, fileName);
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
                console.log(parsed.location);
                
            } catch (exception) {
                console.log(exception);
                /* handle the exception */
            }
        } else {
            alert("Please select a file first.");
        }
    };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".mp4" // Allow only MP4 files
        className = 'text-white'
      />
      <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 mt-3 rounded" onClick={handleUploadClick}>Upload</button>
      {selectedFile && <p className='text-white'>Selected file: {selectedFile.name}</p>}
    </div>
  );
};

export default FileUpload;
