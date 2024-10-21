import { useState } from "react";
import shouldBeLoggedIn from "../components/Authenticate";
import QuerriedProfile from "../components/search/QuerriedProfile";

type Category = "Users" | "Videos" | "Tags";

function Search() {
  shouldBeLoggedIn(true);

  const [category, setCategory] = useState<Category>();

  return (
    <>
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
    </>
  );
}

export default Search;
