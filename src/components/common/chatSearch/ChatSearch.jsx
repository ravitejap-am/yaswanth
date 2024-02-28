// components/common/search/Search.js
import React from "react";
import "./ChatSearch.css";

function ChatSearch({
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
  chat,
  setChat,
}) {
  const handleSearchImageClick = () => {
    if (onSearchImageClick) {
      onSearchImageClick();
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = document.querySelector(".search_input");
    const textAreaCont = document.querySelector(".input_filed_search_style");
    // console.log("textarea------>", textarea);
    // console.log("textAreaCont------>", textAreaCont);
    textarea.style.height = "auto";
    textAreaCont.style.height = "auto";
    console.log("height--->", textarea.scrollHeight);
    let areaHeight = textarea.scrollHeight < 65 ? 65 : textarea.scrollHeight;
    let textAreaContentHeight =
      textAreaCont.scrollHeight < 65 ? 65 : textAreaCont.scrollHeight;
    textarea.style.height = textarea.scrollHeight + "px";
    textAreaCont.style.height = textAreaCont.scrollHeight + "px";
  };

  return (
    <div className="input_field_main_cont">
      <div className="input_filed_search_style">
        <textarea
          type="text"
          placeholder={name}
          className="search_input"
          readOnly={readOnly}
          value={chat}
          onChange={(e) => {
            setChat(e.target.value);
            adjustTextareaHeight();
          }}
        />
      </div>
      <div
        // className="chat_icon-container"
        id={`${iconId ? iconId : null}`}
        style={{marginRight: "10px"}}
        // style={{ marginLeft: `${imageMarginLeft}px` }}
      >
        <img
          src={searchImage}
          alt=""
          className="send_icon"
          style={{ width: 50, height: 50, cursor: "pointer" }}
          onClick={handleSearchImageClick}
        />
      </div>
    </div>
  );
}

export default ChatSearch;
