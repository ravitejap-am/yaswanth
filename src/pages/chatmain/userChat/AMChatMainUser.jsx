import React, { useEffect, useState } from "react";
import { Card } from "antd";
import Styles from "./AmchatMainUser.module.css";
import circle1 from "../../../asset/AmChatSuperAdmin/Group23.png";
import profile from "../../../asset/AmChatSuperAdmin/profile.png";
import Logo from "../../../asset/Vector.png";
import Group2290 from "../../../asset/Group2290.png";
import Search from "../../../components/common/search/Search";
import { Link, useNavigate } from "react-router-dom";
import AMChatHeader from "../../AMChatAdmin/AMChatHeader/AMChatHeader";
import * as constants from "../../../constants/Constant";
import { useSelector } from "react-redux";
import { setUser, selectUser } from "../../../store/authSlice";

const style = {
  py: 0,
  width: "100%",
  maxWidth: 360,
  borderRadius: 2,
  border: "1px solid",
  borderColor: "divider",
  backgroundColor: "background.paper",
};

const AmchatMainUser = () => {
  const navigate = useNavigate();
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [firstName, setFirstName] = useState("");
  const user = useSelector(selectUser);
  const jwt = user.userToken;
  const decodeJWT = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((char) => {
            return "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return null;
    }
  };
  const decodedToken = decodeJWT(jwt);
  const organisationId = decodedToken ? decodedToken.userId : null;

  useEffect(() => {
    // Retrieve firstName from localStorage
    const storedFirstName = localStorage.getItem("firstName");
    setFirstName(storedFirstName);
  }, []);
  useEffect(() => {
    const fetchTotalDocuments = async () => {
      try {
        const response = await fetch(
          `${constants.BASE_API_URL}/document/getAllDocs/${organisationId}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch documents");
        }
        const data = await response.json();
        setTotalDocuments(data.totalElements);
        console.log(data, "data in AM Chat Main User");
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    if (organisationId) {
      fetchTotalDocuments();
    }
  }, [organisationId, jwt]);

  const contentArray = [
    "Could you help me with the maternity policy of my organization?",
    "Can you tell me about GDPR compliance.  Which I should follow in my organization?",
    "Can you explain me the Pythagoras theorem based on. ",
    "Can you tell me what's wrong in my lab reports? ",
    "Can you explain me the quantum mechanics? ",
  ];

  const searchStyles = {
    width: "96%",
    height: "70px",
    borderRadius: "35px",
    border: "1px solid #94a3b8",
    color: "#94a3b8",
    paddingLeft: "30px",
  };

  const handleSearchImageClick = () => {
    navigate("/chat");
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

        <div className={Styles.superAdminMiddleChildDiv}>
          <div
            className={Styles.superAdminMiddleCardStyle}
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <div style={{ display: "flex" }}>
              <div className={Styles.superAdminMiddleCardCircle1Style}>
                <img src={circle1} alt="" />
              </div>
              <div className={Styles.titlePriceStyle}>
                <p className={Styles.titleStyle}>Documents Uploaded</p>
                <p className={Styles.priceStyle}>{totalDocuments}</p>
              </div>
            </div>
          </div>
        </div>

        <Card className={Styles.superAdminCardStyles}>
          <div className={Styles.AMChatMainCardTitleDiv}>
            <div className={Styles.SuperAdminAmChatStyle}>
              <div className={Styles.appHeading}>
                <div className={Styles.appLogo}>
                  <span className={Styles.amChatTitle}>AM-Chat</span>
                  <span>
                    <img src={Logo} alt="" className={Styles.appName} />
                  </span>
                </div>
              </div>
            </div>
            <div className={Styles.superAdminAMChatMiddleDiv}>
              <div className={Styles.AMChatFirstTitle}>
                <p>Hello, I’m AM-Chat</p>
              </div>
              <div className={Styles.AMChatSecondTitle}>
                <p>How can I help you today?</p>
              </div>
            </div>
          </div>

          <div className="Example_main_div">
            <div className="Card_message_example_main">
              {contentArray.map((content, index) => (
                <p key={index} className="Card_message_example">
                  {content}
                </p>
              ))}
            </div>
          </div>

          <div className={Styles.AIChatInputBox}>
            <Link to="/chat">
              <Search
                name={"Ask anything.."}
                style={searchStyles}
                searchImage={Group2290}
                onSearchImageClick={handleSearchImageClick}
                readOnly={false}
              />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AmchatMainUser;
