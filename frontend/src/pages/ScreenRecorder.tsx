import { useEffect, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

interface mediaRecorder {
  video?: boolean;
  screen?: boolean;
}
const ScreenRecorder = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isCamera, setIsCamera] = useState<boolean>(true);
  const [media, setMedia] = useState<mediaRecorder>({ screen: true });

  const toggle = () => {
    if (isRecording) {
      stopRecording();
      setIsRecording(!isRecording);
    } else {
      startRecording();
      setIsRecording(!isRecording);
    }
  };

  const mediaType = () => {
    setIsCamera(!isCamera);
    if (isCamera) {
      setMedia({ video: true });
    } else {
      setMedia({ screen: true });
    }
  };

  const { startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder(media);

  useEffect(() => {
    if (mediaBlobUrl) {
      localStorage.setItem("heylol", mediaBlobUrl);
      window.dispatchEvent(new Event("heylol"));
    } else {
      localStorage.removeItem("heylol");
    }
  }, [mediaBlobUrl]);

  return (
    <div className="flex flex-col justify-center items-center text-center">
      <video
        id="skibidiToilet"
        height={200}
        width={400}
        src={mediaBlobUrl}
        controls
        autoPlay
        loop
      />
      <div className="flex justify-center items-center text-center">
        {isRecording ? (
          <div
            onClick={toggle}
            className="bg-red-500 hover:bg-amber-600 text-white font-bold py-2 px-4 mt-3 rounded flex-col justify-center items-center align-center"
          >
            Stop Recording
          </div>
        ) : (
          <div className="flex flex-col">
            {isCamera ? (
              <div>
                <label className="block text-white text-lg font-semibold mt-4 mb-2">
                  Current Recording Type: Screen
                </label>
                <div
                  onClick={mediaType}
                  className="bg-amber-700 hover:bg-amber-600 text-white font-bold py-2 px-4 mt-3 rounded flex-col justify-center items-center align-center"
                >
                  Record Camera Instead
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-white text-lg font-semibold mt-4 mb-2">
                  Current Recording Type: Camera
                </label>
                <div
                  onClick={mediaType}
                  className="bg-amber-700 hover:bg-amber-600 text-white font-bold py-2 px-4 mt-3 rounded flex-col justify-center items-center align-center"
                >
                  Record Screen Instead
                </div>
              </div>
            )}
            <div
              onClick={toggle}
              className="bg-green-500 hover:bg-green-300 text-white font-bold py-2 px-4 mt-3 rounded flex-col justify-center items-center align-center"
            >
              Start Recording
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScreenRecorder;
