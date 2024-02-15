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
  readOnly
}) {
  const handleSearchImageClick = () => {
    if (onSearchImageClick) {
      onSearchImageClick();
    }
  };

  return (
    <div>
      <div className="input_field_main_div">

        <input
          type="text"
          placeholder={name}
          className="input_filed_style with-icon"
          style={styles}
          readOnly={readOnly}
        />
        <div
          className="icon-container"
          id={`${iconId?iconId:null}`}
          style={{ marginLeft: `${imageMarginLeft}px` }}
        >
          <img
            src={searchImage}
            alt=""
            className="icon"
            style={{ width: imageWidth, height: imageHeight, cursor: "pointer" }}
            onClick={handleSearchImageClick} 
          />
        </div>
      </div>
    </div>
  );
}

export default Search;
