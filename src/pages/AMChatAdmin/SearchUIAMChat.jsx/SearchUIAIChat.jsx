import React, { useEffect, useState } from "react";
import Styles from "./SearchUIAIChat.module.css";
import { Card } from "antd";
import profile from "../../../asset/AmChatSuperAdmin/profile.png";
import Group2290 from "../../../asset/Group2290.png";
import Search from "../../../components/common/search/Search";
import AMChatHeader from "../AMChatHeader/AMChatHeader";

function SearchUIAIChat({ responseData }) {
  const [firstName, setFirstName] = useState("");
  useEffect(() => {
    const storedFirstName = localStorage.getItem("UserSectionfirstName");
    setFirstName(storedFirstName || "");
  }, []);
  const searchStyles = {
    width: "96%",
    height: "70px",
    borderRadius: "35px",
    border: "1px solid #94a3b8",
    color: "#94a3b8",
    paddingLeft: "30px",
  };

  return (
    <div className={Styles.superAdminMainCardDivStyle}>
      <div className={Styles.superAdminMiddleParentDiv}>
        <AMChatHeader
          componentName={`Welcome ${firstName || ""}`}
          name={firstName || ""}
          profileImageSrc={profile}
          customStyle={{
            containerStyle: {
              display: "flex",
              borderRadius: "8px",
            },
            imageStyle: {
              width: "50%",
              height: "70%",
            },
            textStyle: {
              color: "blue",
              fontWeight: "bold",
            },
          }}
        />

        <Card className={Styles.superAdminCardStyles}>
          <div className={Styles.AIChatInputBox}>
            <Search
              name={"Ask anything.."}
              style={searchStyles}
              searchImage={Group2290}
            />
            <p>{responseData}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default SearchUIAIChat;
