import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import GeneralForm from "../../components/common/forms/GeneralForm";
import editprofilepic from "../../asset/editprofilepic.png";
import { Spin } from "antd";
import { useMessageState } from "../../hooks/useapp-message";
import { setUser, selectUser } from "../../store/authSlice";
import { useSelector } from "react-redux";
import * as constants from "../../constants/Constant";

const PersonalInformation = ({ setFileSysytem, validateEmail }) => {
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
  const userId = decodedToken ? decodedToken.userId : null;

  const [userData, setUserData] = useState(null);
  const [userStatus, setUserStatus] = useState("active");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchUserProfile();
    } else {
      setError("User ID is missing or invalid.");
    }
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(
        `${constants.BASE_API_URL}/user/${userId}/getUserProfile`, // Use userId variable here
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
      // Update state with fetched data
      setUserData(userData.data.user);
      setUserStatus(userData.data.user.active ? "active" : "inactive");
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setError("Failed to fetch user profile.");
    }
  };

  // Check if userData is defined before accessing its properties
  const orgName =
    userData && userData.organisation ? userData.organisation.name : "";

  const formElements = [
    {
      label: "First Name",
      type: "text",
      name: "firstName",
      initialValue: userData ? userData.firstName : "",
      rules: [
        { required: true, message: "Please input your First Name" },
        { type: "name", message: "Invalid First Name" },
      ],
      style: { width: "400px", height: "40px", marginLeft: "20px" },
    },
    {
      label: "Last Name",
      type: "text",
      name: "lastName",
      initialValue: userData ? userData.lastName : "",
      rules: [
        { required: true, message: "Please input your Last Name" },
        { type: "name", message: "Invalid Last Name" },
      ],
      style: { width: "400px", height: "40px", marginLeft: "20px" },
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      initialValue: userData ? userData.email : "",
      rules: [
        { required: true, message: "Please enter your email" },
        { type: "email", message: "Invalid Email" },
      ],
      style: {
        width: "400px",
        height: "40px",
        marginLeft: "20px",
        backgroundColor: "#CBD5E1",
      },
    },
    {
      label: "Organization Name",
      type: "text",
      name: "orgName",
      initialValue: orgName,
      rules: [
        { required: true, message: "Please input your Organization Name" },
        { type: "name", message: "Invalid Organization Name" },
      ],
      style: {
        width: "400px",
        height: "40px",
        backgroundColor: "#CBD5E1",
        marginLeft: "20px",
      },
    },
    {
      name: "User Status",
      label: "Status",
      type: "select",
      options: [
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
      ],
      initialValue: userStatus, // Assuming userStatus holds the initial value
      style: {
        width: "423px",
        height: "50px",
        marginLeft: "20px",
        borderRadius: "30px",
        paddingLeft: "10px",
        cursor: "pointer",
        marginTop: "8px",
      },
      labelName: false,
      rules: [{ required: true, message: "Please select Country" }],
    },
  ];

  const submitButtonProperty = {
    name: "Submit",
    color: "white",
    backgroundColor: "#6366F1",
    type: "primary",
    width: "150px",
    height: "50px",
    borderRadius: "34px",
    marginLeft: "19px",
    marginTop: "1.5rem",
  };

  const feedingVariable = {
    isCancel: false,
    cancelHandler: () => {
      console.log("Canceling....");
    },
    isSubmit: true,
    submitHandler: () => {
      console.log("Submitting PersonalInformation form....");
    },
    submitButtonProperty: submitButtonProperty,
    formElements: formElements,
    formType: "normal",
    validateEmail: validateEmail,
    setFileSysytem: setFileSysytem,
    grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
  };

  return (
    <div className="personal-contentcard">
      <div className="user-profile-content">
        <div className="user-profile-img">
          <img className="edit-profilepic" src={editprofilepic} alt="" />
        </div>
        <div className="user-profle-name">
          <h2>
            {userData ? `${userData.firstName} ${userData.lastName}` : ""}
          </h2>
          <div className="personalinfo-user-Status">
            <p>{userStatus}</p>
          </div>
        </div>
      </div>
      <GeneralForm {...feedingVariable} />
    </div>
  );
};

export default PersonalInformation;
