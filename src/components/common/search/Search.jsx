// components/common/search/Search.js
import React from "react";
import "./Search.css";
import sendImage from "../../../asset/Group2290.png";

function Search({ name, searchImage, styles }) {
  return (
    <div>
      <div className="input_field_main_div">
        <input
          type="text"
          placeholder={name}
          className="input_filed_style with-icon"
          style={styles}
        />
        <div className="icon-container">
          <img src={searchImage} alt="" className="icon" />
        </div>
      </div>
    </div>
  );
}

export default Search;
