import ShouldBeLoggedIn from "../components/Authenticate";
import UploadBox from "../components/UploadBox";

function Upload() {
  ShouldBeLoggedIn(true);
  return (
    <div className="flex justify-center w-screen h-screen">
      <UploadBox />
    </div>
  );
}

export default Upload;
