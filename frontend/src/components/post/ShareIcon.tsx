import { FaRegPaperPlane } from "react-icons/fa6";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

function ShareIcon(props: { post_id: number }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const copiedToClipboard = () => {
    alert("Copied to clipboard");
  };

  const sharedURL = `http://localhost:5173/IsolatedPost/?id=${props.post_id}`;

  return (
    <div>
      <div className="flex flex-col justify-center">
        <div
          className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-900 mb-auto cursor-pointer"
          onClick={toggleModal}
        >
          <FaRegPaperPlane className="text-white font-bold text-2xl" />
        </div>
        <span className="text-white text-center">Share</span>
      </div>

      {/* Main modal */}
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
                  Share
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
              <div className="p-4 md:p-5 space-y-4">
                <h2>
                  Share by link:{" "}
                  <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {sharedURL}
                  </span>
                </h2>
                <CopyToClipboard text={sharedURL} onCopy={copiedToClipboard}>
                  <button className="text-white text-gray-200 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-small rounded-lg text-sm px-5 py-2.5 text-center dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-blue-800">
                    Copy to Clipboard
                  </button>
                </CopyToClipboard>
              </div>
              {/* Modal footer */}
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { ShareIcon };
