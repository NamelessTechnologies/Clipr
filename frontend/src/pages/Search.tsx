import { useEffect, useState } from "react";
import shouldBeLoggedIn from "../components/Authenticate";
import QuerriedProfile from "../components/search/QuerriedProfile";
import { useSearchParams } from "react-router-dom";

// type Category = "Users" | "Videos" | "Tags"; Later

interface PartialUserModel {
  user_id: number;
  username: string;
  nickname: string;
}
function Search() {
  shouldBeLoggedIn(true);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") as string;
  const [searchResults, setSearchResults] = useState<PartialUserModel[]>([]);
  const [foundResults, setFoundResults] = useState<boolean>(false);
  // const [category, setCategory] = useState<Category>(); Later

  useEffect(() => {
    async function fetchData() {
      try {
        const queryString = "http://localhost:5001/searchname/" + query;
        const response = await fetch(queryString);
        const json = (await response.json()) as PartialUserModel[];
        setSearchResults(json);
        if (json.length > 0) {
          setFoundResults(true);
          console.log(json);
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (query) {
      fetchData();
    }
  }, [query]);

  const goToTheProfile = (index: string) => {
    window.location.href = `/Clipr/Profile?profile_id=${index}`;
  };

  return (
    <>
      {foundResults ? (
        <div className="flex flex-col justify-start w-screen h-screen">
          <div className="text-center text-2xl font-medium text-white pt-3">
            Search Results for: {query}
          </div>
          {searchResults.map((result) => (
            <QuerriedProfile
              onClick={() => goToTheProfile(result.user_id.toString())}
              user_id={result.user_id as unknown as string}
              username={result.username}
              nickname={result.nickname}
            ></QuerriedProfile>
          ))}
        </div>
      ) : (
        <div className="text-center text-2xl font-medium text-white">
          No Results found for: {query}
        </div>
      )}
    </>
  );
}

export default Search;
