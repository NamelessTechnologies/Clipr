import { useEffect, useState } from "react";
import ShouldBeLoggedIn from "../components/Authenticate";
import QuerriedProfile from "../components/search/QuerriedProfile";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { uri } from "../App";
import ProfilePost from "../components/profile/ProfilePost";

// type Category = "Users" | "Videos" | "Tags"; Later

interface PartialUserModel {
  user_id: number;
  username: string;
  nickname: string;
  pfp: string;
}

interface PartialPostModel {
  post_Id: number;
  media_Type: string;
  media_Link: string;
}

function Search() {
  ShouldBeLoggedIn(true);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") as string;
  const [users, setUsers] = useState<PartialUserModel[]>([]);
  const [posts, setPosts] = useState<PartialPostModel[]>([]);
  const [foundResults, setFoundResults] = useState<boolean>(false);
  const [foundUsers, setFoundUsers] = useState<boolean>(false);
  const [foundPosts, setFoundPosts] = useState<boolean>(false);

  const [searchMessage, setSearchMessage] = useState("Searching...");
  const [isByUser, setIsByUser] = useState<boolean>(true);

  // const [category, setCategory] = useState<Category>(); Later

  useEffect(() => {
    setFoundResults(false);
    setSearchMessage("Searching...");

    async function fetchData() {
      try {
        const queryString = uri + "searchname/" + query;
        const response = await fetch(queryString);
        const json = (await response.json()) as PartialUserModel[];
        setUsers(json);
        if (json.length > 0) {
          setFoundResults(true);
          setFoundUsers(true);
        }
      } catch (error) {
        console.error(error);
      }
      try {
        const queryString = uri + "post/searchPost/" + query;
        const response = await fetch(queryString);
        const json = (await response.json()) as PartialPostModel[];
        setPosts(json);
        if (json.length > 0) {
          setFoundResults(true);
          setFoundPosts(true);
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (query) {
      fetchData();
    }

    const timer = setTimeout(() => {
      setSearchMessage("No results found for: " + query);
    }, 1000);
    return () => clearTimeout(timer);
  }, [query]);

  const goToTheProfile = (index: string) => {
    navigate(`/Profile?profile_id=${index}`);
  };

  const toUser = () => {
    setIsByUser(true);
  };
  const toPost = () => {
    setIsByUser(false);
  };

  return (
    <>
      {foundResults ? (
        <div className="flex flex-col justify-start w-screen h-screen">
          {isByUser ? (
            <div>
              <div className="flex flex-col text-center text-2xl font-medium text-white pt-3">
                <div className="flex flex-row text-center align-center justify-center">
                  <div onClick={toUser} className="mr-3 cursor-pointer">
                    <u>User</u>
                  </div>
                  <div>|</div>
                  <div className="ml-3 cursor-pointer" onClick={toPost}>
                    Posts
                  </div>
                </div>
                Search Results for: {query}
                <div className="w-5/6 mx-auto mt-4">
                  <div className="grid grid-cols-4 gap-2">
                    {foundUsers &&
                      users.map((result) => (
                        <QuerriedProfile
                          key={result.user_id}
                          onClick={() =>
                            goToTheProfile(result.user_id.toString())
                          }
                          user_id={result.user_id as unknown as string}
                          username={result.username}
                          nickname={result.nickname}
                          pfp={result.pfp}
                        ></QuerriedProfile>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex flex-col text-center text-2xl font-medium text-white pt-3">
                <div className="flex flex-row text-center align-center justify-center">
                  <div onClick={toUser} className="mr-3 cursor-pointer">
                    User
                  </div>
                  <div>|</div>
                  <div className="ml-3 cursor-pointer" onClick={toPost}>
                    <u>Posts</u>
                  </div>
                </div>
                Search Results for: {query}
                <div className="w-1/2 mx-auto mt-4">
                  <div className="grid grid-cols-4 gap-2">
                    {foundPosts &&
                      posts.map((post, index) => (
                        <ProfilePost
                          key={index}
                          post_id={post.post_Id as number}
                          post_url={post.media_Link}
                          media_type={post.media_Type}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center text-2xl font-medium text-white">
          {/* No Results found for: {query} */}
          {searchMessage}
        </div>
      )}
    </>
  );
}

export default Search;
