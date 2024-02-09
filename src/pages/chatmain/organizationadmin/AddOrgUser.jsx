import React from "react";
import Styles from "./OrgAdminChatSidebar.module.css";
import Tooltip from "./Tooltip";
import profile from "../../../asset/AmChatSuperAdmin/profile.png";
import GeneralForm from "../../../components/common/forms/GeneralForm";
import photograph from "../../../asset/photograph.png";
import { selectUser } from "../../../store/authSlice";
import axios from "axios";
import { useSelector } from "react-redux";
import NotifyMessage from "../../../components/common/toastMessages/NotifyMessage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddOrgUser() {
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const jwt = user.userToken;
  const handleProfileImageUpload = () => {
    console.log("Upload profile image logic goes here");
  };

  const handlePhotographImageUpload = () => {
    console.log("Upload photograph image logic goes here");
  };

  const formElements = [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      style: {
        width: "405px",
        borderRadius: "40px",
        border: "1px solid var(--Brand-700, #4338CA)",
        backgroundColor: "transparent",
      },
      rules: [{ required: true, message: "Please enter your name" }],
      labelName: false,
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      style: {
        width: "405px",
        borderRadius: "40px",
        border: "1px solid var(--Brand-700, #4338CA)",
        backgroundColor: "transparent",
      },
      rules: [{ required: true, message: "Please enter your name" }],
      labelName: false,
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      rules: [
        { required: true, message: "Please input your email" },
        { type: "email", message: "Invalid email format" },
      ],
      style: {
        width: "405px",
        borderRadius: "40px",
        border: "1px solid var(--Brand-700, #4338CA)",
        backgroundColor: "transparent",
      },
      labelName: false,
    },
  ];

  const submitHandler = async (values) => {
    try {
      const response = await fetch(
        "http://54.161.113.196:8080/organisation/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // console.log("API Response:", data);
      switch (data.code) {
        case "SIGNUP-S-001":
          toast.success(data.message);
          break;
        case "SIGNUP-ARR-004":
          toast.warn(data.message);
          break;
        case "SIGNUP-IE-005":
          toast.error(data.message);
          break;
        case "SIGNUP-IO-007":
          toast.error(data.message);
          break;
        default:
          toast.info("Unknown response code");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const cancelHandler = (values) => {
    navigate("/orguserlist");
  };

  const submitButtonProperty = {
    name: "Submit",
    color: "#ffffff",
    backgroundColor: "var(--Brand-500, #6366F1)",
    width: "150px",
    height: "50px",
    borderRadius: "28px",
    marginTop: "10px",
  };

  const cancelButtonProperty = {
    name: "Cancel",
    color: "black",
    backgroundColor: "#fff",
    width: "150px",
    height: "50px",
    borderRadius: "28px",
    marginTop: "10px",
  };

  const feedingVariable = {
    isCancel: true,
    cancelHandler: cancelHandler,
    isSubmit: true,
    submitHandler: submitHandler,
    submitButtonProperty: submitButtonProperty,
    cancelButtonProperty: cancelButtonProperty,
    formElements: formElements,
    formType: "normal",
    forgorPasswordHandler: () => {
      console.log("forgot Password....");
    },
    grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
  };

  return (
    <div className={Styles.superAdminMainCardDivStyle}>
      <div className={Styles.superAdminMiddleParentDiv}>
        <div className={Styles.superAdminProfileCardStyle}>
          <div>
            <p className={Styles.superAdminProfileName}>Add User</p>
          </div>
          <div
            className={Styles.superAdminProfileImgNameStyle}
            style={{ display: "flex", alignItems: "center" }}
          >
            <img src={profile} alt="" className={Styles.AdminProfileStyle} />
            <span className={Styles.SuperAdminProfileStyle}>Lian Vendiar</span>
          </div>
        </div>

        <div className={Styles.addOrganizationAdminSecondDiv}>
          <div className={Styles.imageUploadSection}>
            <Tooltip
              text="Click here to upload image"
              onClick={handlePhotographImageUpload}
            >
              <img
                className={Styles.photographImage}
                src={photograph}
                alt="pic"
              />
            </Tooltip>
          </div>
          <GeneralForm {...feedingVariable} />
        </div>
        <NotifyMessage />
      </div>
    </div>
  );
}

export default AddOrgUser;
