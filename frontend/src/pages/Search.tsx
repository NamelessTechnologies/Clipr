import { useEffect, useState } from "react";
import ShouldBeLoggedIn from "../components/Authenticate";
import QuerriedProfile from "../components/search/QuerriedProfile";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { uri } from "../App";

// type Category = "Users" | "Videos" | "Tags"; Later

interface PartialUserModel {
  user_id: number;
  username: string;
  nickname: string;
  pfp: string;
}
function Search() {
  ShouldBeLoggedIn(true);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") as string;
  const [searchResults, setSearchResults] = useState<PartialUserModel[]>([]);
  const [foundResults, setFoundResults] = useState<boolean>(false);
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
        setSearchResults(json);
        if (json.length > 0) {
          setFoundResults(true);
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

  const toggle = () => {
    setIsByUser(!isByUser);
  };

  return (
    <>
      {foundResults ? (
        <div className="flex flex-col justify-start w-screen h-screen">
          {isByUser ? (
            <div>
              <div
                onClick={toggle}
                className="ml-5  mt-5 text-center w-[10vw] text-white focus:ring-4 focus:outline-none font-small rounded-lg text-sm px-5 py-2.5 text-center dark:bg-amber-700 hover:bg-amber-400 cursor-pointer"
              >
                Filter by Video
              </div>
              <div className="text-center text-2xl font-medium text-white pt-3">
                Search Results for: {query}
              </div>
              {searchResults.map((result) => (
                <QuerriedProfile
                  key={result.user_id}
                  onClick={() => goToTheProfile(result.user_id.toString())}
                  user_id={result.user_id as unknown as string}
                  username={result.username}
                  nickname={result.nickname}
                  pfp={result.pfp}
                ></QuerriedProfile>
              ))}
            </div>
          ) : (
            <div>
              <div
                onClick={toggle}
                className="ml-5  mt-5 text-center w-[10vw] text-white focus:ring-4 focus:outline-none font-small rounded-lg text-sm px-5 py-2.5 text-center dark:bg-amber-700 hover:bg-amber-400 cursor-pointer"
              >
                Filter by Users
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
