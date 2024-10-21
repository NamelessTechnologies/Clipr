import shouldBeLoggedIn from "../components/Authenticate";
import QuerriedProfile from "../components/QuerriedProfile";

function Search() {
  shouldBeLoggedIn(true);

  return (
    <div className="flex flex-col justify-start w-screen h-screen">
      <QuerriedProfile></QuerriedProfile>
      <QuerriedProfile></QuerriedProfile>
      <QuerriedProfile></QuerriedProfile>
      <QuerriedProfile></QuerriedProfile>
      <QuerriedProfile></QuerriedProfile>
      <QuerriedProfile></QuerriedProfile>
      <QuerriedProfile></QuerriedProfile>
      <QuerriedProfile></QuerriedProfile>
      <QuerriedProfile></QuerriedProfile>
      <QuerriedProfile></QuerriedProfile>
      <QuerriedProfile></QuerriedProfile>
      <QuerriedProfile></QuerriedProfile>
      <QuerriedProfile></QuerriedProfile>
      <QuerriedProfile></QuerriedProfile>
      <QuerriedProfile></QuerriedProfile>
      <QuerriedProfile></QuerriedProfile>
      <QuerriedProfile></QuerriedProfile>
      <QuerriedProfile></QuerriedProfile>
    </div>
  );
}

export default Search;
