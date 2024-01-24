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
}) {
  return (
    <div>
      <div className="input_field_main_div">
        <input
          type="text"
          placeholder={name}
          className="input_filed_style with-icon"
          style={styles}
        />
        <div
          className="icon-container"
          style={{ marginLeft: `${imageMarginLeft}px` }}
        >
          <img
            src={searchImage}
            alt=""
            className="icon"
            style={{ width: imageWidth, height: imageHeight }}
          />
        </div>
      </div>
    </div>
  );
}

export default Search;
