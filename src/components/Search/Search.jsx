import React from "react";

const Search = ({ searchText, setSearchText }) => {
  return (
    <div className="search">
      <div>
        <span className="text-lg text-gray-200 mr-3">
          <i className="fa fa-search"></i>
        </span>

        <input
          type="text"
          placeholder="Search through thousands of movies"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
