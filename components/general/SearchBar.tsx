interface searchBarProps {
  text?: number;
  setSearchText: React.Dispatch<
    React.SetStateAction<{
      text: string;
      isSearching: boolean;
    }>
  >;
}
const SearchBar = (props: searchBarProps) => {
  function debounce<Params extends any[]>(
    func: (...args: Params) => any,
    timeout: number
  ): (...args: Params) => void {
    let timer: NodeJS.Timeout;
    return (...args: Params) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, timeout);
    };
  }

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setSearchText((perv) => ({ ...perv, isSearching: true }));
    debounce(() => {
      props.setSearchText(() => ({
        isSearching: false,
        text: event.target.value,
      }));
    }, 1000)();
  };

  return (
    <>
      <div className="relative mt-5">
        <input
          type="text"
          id="password"
          className="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="Search..."
          onChange={onSearchChange}
        />
        <button className="block w-7 h-7 text-center text-xl leading-0 absolute top-2 right-2 text-gray-400 focus:outline-none hover:text-gray-900 transition-colors">
          <svg
            className="svg-icon search-icon"
            aria-labelledby="title desc"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 19.9 19.7"
          >
            <title id="title">Search Icon</title>
            <desc id="desc">A magnifying glass icon.</desc>
            <g className="search-path" fill="none" stroke="#848F91">
              <path strokeLinecap="square" d="M18.5 18.3l-5.4-5.4" />
              <circle cx="8" cy="8" r="7" />
            </g>
          </svg>
        </button>
      </div>
    </>
  );
};

export default SearchBar;
