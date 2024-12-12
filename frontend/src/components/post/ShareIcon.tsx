import { FaRegPaperPlane } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import UserModel from "../../types/User";
import { uri } from "../../App";
import { ShareFriend } from "./ShareFriend";

function ShareIcon(props: {
  post_id: number;
  media_type: string;
  s3link: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [users, setUsers] = useState<UserModel[]>([]);

  const [userInfo, setUserInfo] = useState<UserModel>();
  const [uid, setUID] = useState<number>();

  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setCopied(false);
    }
  };

  const copiedToClipboard = () => {
    setCopied(true);
  };

  // This effect loads the user from localStorage
  useEffect(() => {
    const localStorageUser = localStorage.getItem("user");
    if (localStorageUser) {
      const parsedUser = JSON.parse(localStorageUser);
      setUserInfo(parsedUser as UserModel);
    }
  }, []);

  // This effect updates the UID once `userInfo` is set
  useEffect(() => {
    if (userInfo && userInfo.user_id) {
      setUID(userInfo.user_id);
    }
  }, [userInfo]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const url = uri + "User/friendsof/";
        const response = await fetch(url + uid); // must not be hard coded
        const json = await response.json();

        const users: UserModel[] = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        json.forEach((user: any) => {
          const newUser: UserModel = {
            user_id: user.user_id,
            username: user.username,
            email: user.email,
            password: user.password,
            biography: user.biography,
            nickname: user.nickname,
            pfp: user.pfp,
          };
          users.push(newUser);
        });

        setUsers(users);
      } catch (error) {
        console.error(error);
        throw new Error("Error getting post data");
      }
    };
    fetchUsers();
  }, [uid]);

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
                  <b>Send to Friend</b>
                </h2>
                <ShareFriend
                  users={users}
                  url={sharedURL}
                  media_type={props.media_type}
                  s3link={props.s3link}
                ></ShareFriend>
                <div className="text-gray-100 text-center">
                  -----------------------------OR------------------------------
                </div>
                <h2 className="flex flex-col">
                  <b>Send by Link</b>
                  <div className="flex flex-row pt-4">
                    <input
                      type="text"
                      id="first_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={sharedURL}
                      readOnly
                    />
                    <CopyToClipboard
                      text={sharedURL}
                      onCopy={copiedToClipboard}
                    >
                      {copied ? (
                        <button className="ml-5 text-white text-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-small rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-700  dark:focus:ring-blue-800">
                          <div className=" flex flex-row">
                            <svg
                              className="w-3 h-3 text-blue-700 dark:text-blue-500 me-1.5 mt-1"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 16 12"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M1 5.917 5.724 10.5 15 1.5"
                              />
                            </svg>
                            <span>Copied</span>
                          </div>
                        </button>
                      ) : (
                        <button className="ml-5 text-white text-gray-200 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-small rounded-lg text-sm px-5 py-2.5 text-center dark:bg-amber-600 dark:hover:bg-amber-400 dark:focus:ring-blue-800">
                          <div className="flex flex-row">
                            <svg
                              className="w-3 h-5 me-1.5 mr-2"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 18 20"
                            >
                              <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                            </svg>
                            <span>Copy</span>
                          </div>
                        </button>
                      )}
                    </CopyToClipboard>
                  </div>
                </h2>
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
