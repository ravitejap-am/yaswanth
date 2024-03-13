// components/common/search/Search.js
import React from "react";
import "./Search.css";

function Search({
  name,
  searchImage,
  styles,
  imageWidth,
  imageHeight,
  imageMarginLeft,
  onSearchImageClick,
  iconId,
  placeholders,
  readOnly,
  searchValue = "",
  handleChangeSearch = () => {},
}) {
  const handleSearchImageClick = () => {
    if (onSearchImageClick) {
      onSearchImageClick();
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder={name}
        className="input_filed_style with-icon"
        style={styles}
        // readOnly={readOnly}
        value={searchValue}
        onChange={handleChangeSearch}
      />
    </div>
  );
}

export default Search;
