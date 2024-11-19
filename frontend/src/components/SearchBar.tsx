import { useNavigate } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();
  function goToSearchPage(): void {
    const input = (document.getElementById("search") as HTMLInputElement).value;
    if (input) {
      navigate(`/Search?q=${input}`);
    }
  }

  return (
    <div className="w-[400px]">
      <label
        htmlFor="search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="search"
          className="w-full p-4 ps-10 text-sm text-gray-100 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 bg-zinc-800"
          placeholder="Search"
          required
        />
        <button
          onClick={goToSearchPage}
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-yellow-600 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
