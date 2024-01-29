import React from "react";
import Styles from "./SearchUIAIChat.module.css";
import { Card } from "antd";
// import Styles from "./SuperAdminAMChatCard.module.css";
import profile from "../../../asset/AmChatSuperAdmin/profile.png";
import Group2290 from "../../../asset/Group2290.png";
import Search from "../../../components/common/search/Search";
// import { Link, useNavigate } from "react-router-dom";

function SearchUIAIChat() {
  //   const navigate = useNavigate();
  const searchStyles = {
    width: "96%",
    height: "70px",
    borderRadius: "35px",
    border: "1px solid #94a3b8",
    color: "#94a3b8",
    paddingLeft: "30px",
  };
  //   const handleSearchImageClick = () => {
  //     navigate("/chat");
  //   };
  return (
    <div className={Styles.superAdminMainCardDivStyle}>
      <div className={Styles.superAdminMiddleParentDiv}>
        <div className={Styles.superAdminProfileCardStyle}>
          <div>
            <p className={Styles.superAdminProfileName}>Welcome, Lian</p>
          </div>
          <div
            className={Styles.superAdminProfileImgNameStyle}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img src={profile} alt="" className={Styles.AdminProfileStyle} />
            <span className={Styles.SuperAdminProfileStyle}>Lian Vendiar</span>
          </div>
        </div>

        <Card className={Styles.superAdminCardStyles}>
          <div className={Styles.AIChatInputBox}>
            <Search
              name={"Ask anything.."}
              style={searchStyles}
              searchImage={Group2290}
              //   onSearchImageClick={handleSearchImageClick}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default SearchUIAIChat;
