import React from "react";
import righticon from "../../asset/primiumrighticon.png";

const Plans = () => {
  return (
    <div className="plans-main" style={{ width: "96%" }}>
      <div className="active-plan">
        <p>Your active plan </p>
        <h2>Premium</h2>
        <p>
          <img className="right-icon" src={righticon} alt="" /> Max 2 users.
        </p>
        <p>
          <img className="right-icon" src={righticon} alt="" />
          Max 5 Documents.
        </p>
        <p>
          <img className="right-icon" src={righticon} alt="" />
          Upload size 2 MB.
        </p>
        <p>
          <img className="right-icon" src={righticon} alt="" />
          Max 10 chats free
        </p>
        <div className="note-p-text">
          <p>Note: Your plan is due on 3rd Feb, 2024</p>
        </div>
      </div>
    </div>
  );
};

export default Plans;
