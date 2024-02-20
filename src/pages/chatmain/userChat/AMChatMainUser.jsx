import React, { createRef, useEffect, useState } from "react";
import { Card } from "antd";
import Styles from "./AmchatMainUser.module.css";
import circle1 from "../../../asset/AmChatSuperAdmin/Group23.png";
import profile from "../../../asset/AmChatSuperAdmin/profile.png";
import Logo from "../../../asset/Vector.png";
import Group2290 from "../../../asset/Group2290.png";
import Search from "../../../components/common/search/Search";
import { Link, useNavigate } from "react-router-dom";
import AMChatHeader from "../../AMChatAdmin/AMChatHeader/AMChatHeader";
import { useMessageState } from "../../../hooks/useapp-message";
import * as constants from "../../../constants/Constant";
import { useSelector } from "react-redux";
import { setUser, selectUser } from "../../../store/authSlice";
import NotifyMessage from "../../../components/common/toastMessages/NotifyMessage";

const AmchatMainUser = () => {
  const formRef = createRef();
  let {
    buttonLoading,
    setButtonLoading,
    isReset,
    setIsReset,
    showNotifyMessage,
    hideNotifyMessage,
  } = useMessageState();
  const navigate = useNavigate();
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [responseData, setResponseData] = useState("");
  const [searchInput, setSearchInput] = useState(""); // State to hold search input value

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
  const userId = decodedToken ? decodedToken.userId : null;

  const [userData, setUserData] = useState(null);
  const [userStatus, setUserStatus] = useState("active");
  const [error, setError] = useState(null);
  const [organisationName, setOrganisationName] = useState("");
  const [amChatUserStatus, setamChatUserStatus] = useState("");
  useEffect(() => {
    fetchUserProfile();
    const fetchTotalDocuments = async () => {
      try {
        const response = await fetch(
          `${constants.BASE_DOC_API_URL}/getAllDocs/${organisationId}`,
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

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(
        `${constants.BASE_API_URL}/user/${userId}/getUserProfile`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user profile.");
      }

      const userData = await response.json();
      const { firstName, lastName } = userData.data.user;
      setFirstName(firstName);
      localStorage.setItem("UserSectionfirstName", firstName);
      localStorage.setItem("UserSectionlastName", lastName);

      setUserData(userData?.data?.user);
      setOrganisationName(userData?.data?.organisation?.name);
      setamChatUserStatus(userData?.data?.user.active);

      setUserStatus(userData.data.user.active ? "Active" : "Inactive");
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setError("Failed to fetch user profile.");
    }
  };

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
    if (totalDocuments !== 0 && responseData) {
      navigate("/chat");
    } else {
      showNotifyMessage("Please enter something in the search box first.");
    }
  };

  const handleSearch = async () => {
    if (totalDocuments === 0) {
      showNotifyMessage(
        "No documents uploaded by org admin. Please reach out to them."
      );
    } else {
      try {
        const response = await fetch(
          `${constants.BASE_API_URL}${constants.DUMMY_CHAT_ENDPOINT}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();
        setResponseData(responseData.data);
        console.log(responseData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  // Function to set search input with clicked content
  const handleContentClick = (content) => {
    setSearchInput(content); // Set search input value to the selected content
    handleSearch(); // Trigger search functionality
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
                <p
                  key={index}
                  className="Card_message_example"
                  onClick={() => handleContentClick(content)} // Handle content click
                >
                  {content}
                </p>
              ))}
            </div>
          </div>

          <div className={Styles.AIChatInputBox}>
            <div onClick={handleSearch}>
              <Search
                name={"Ask anything.."}
                style={searchStyles}
                searchImage={Group2290}
                onSearchImageClick={handleSearchImageClick}
                readOnly={totalDocuments === 0}
                value={searchInput} // Bind value to search input
                onChange={(e) => setSearchInput(e.target.value)} // Handle input change
              />
            </div>
            <NotifyMessage />
          </div>
          {/* <SearchUIAIChat /> */}
        </Card>
      </div>
    </div>
  );
};

export default AmchatMainUser;
