import { FaRegPaperPlane } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import UserModel from "../../types/User";
import { uri } from "../../App";
import { ShareFriend } from "./ShareFriend";
import { RxCross2  } from "react-icons/rx";

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

  const sharedURL = `https://clipr.vercel.app/IsolatedPost/?id=${props.post_id}`;

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
            className="relative px-6 pt-6 pb-8  w-full max-w-2xl max-h-full bg-modalBackground rounded-lg shadow"
            onClick={(e) => e.stopPropagation()} // Prevent closing on modal content click
          >
            {/* Modal content */}
            <div className="bg-modalBackground">
              {/* Modal header */}
              <div className="flex items-center">
                <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Share
                </span>
                <RxCross2 className={`absolute top-3 right-3 rounded-md w-7 h-7 text-white hover:cursor-pointer hover:text-zinc-400`}
                          onClick={toggleModal}/>
              </div>
              <hr className="h-px mt-5 mb-2 bg-gray-400 border-0"></hr>

              {/* Modal body */}
              {/* <div className="p-4 md:p-5 space-y-4"> */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <span className="text-white font-semibold mb-4">Send to Friend</span>
                  <ShareFriend
                    users={users}
                    url={sharedURL}
                    media_type={props.media_type}
                    s3link={props.s3link}
                  ></ShareFriend>
                </div>

                <div className="text-white font-semibold text-center">OR</div>

                {/* send by link box */}
                <div className="flex flex-col">
                  <span className="text-white font-semibold">Send by Link</span>
                  <div className="flex flex-row pt-4">
                    <input
                      type="text"
                      id="first_name"
                      className="w-full p-2 rounded-lg bg-transparent border border-gray-400 placeholder:text-amber-500"
                      placeholder={sharedURL}
                      readOnly
                    />
                    <CopyToClipboard
                      text={sharedURL}
                      onCopy={copiedToClipboard}
                    >
                      {copied ? (
                        <button className="ml-5 text-white focus:ring-4 focus:outline-none font-small rounded-lg text-sm px-5 py-2.5 text-center dark:bg-zinc-700">
                          <div className=" flex flex-row">
                            <svg
                              className="w-3 h-3 text-green-400 me-1.5 mt-1"
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
                        <button className="ml-5 text-white hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-small rounded-lg text-sm px-5 py-2.5 text-center dark:bg-amber-600 dark:hover:bg-amber-400 dark:focus:ring-blue-800">
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
                </div>
              </div>
              {/* <hr className="h-px mt-5 mb-5 bg-gray-400 border-0"></hr> */}
              {/* Modal footer */}
              {/* <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"></div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { ShareIcon };
