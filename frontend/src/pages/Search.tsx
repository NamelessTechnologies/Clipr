import shouldBeLoggedIn from "../components/Authenticate";

function Search() {
  shouldBeLoggedIn(true);
  
  return <div className="flex justify-center w-screen h-screen"></div>;
}

export default Search;
