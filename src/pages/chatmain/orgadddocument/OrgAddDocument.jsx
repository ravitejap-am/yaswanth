import React, { useState } from "react";
import Styles from "./OrgAddDocumentSidebar.module.css";
import profile from "../../../asset/AmChatSuperAdmin/profile.png";
import GeneralForm from "../../../components/common/forms/GeneralForm";
import Document from "../../../components/common/upload/file/Document";
import { selectUser } from "../../../store/authSlice";
import axios from "axios";
import { useSelector } from "react-redux";

function OrgAddDocument() {
  const [file, setFile] = useState(null);

  const user = useSelector(selectUser);
  const jwt = user.userToken;

  const submitHandler = async (values) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", values["Document Name"]);

      const response = await axios.post(
        "http://54.161.113.196:8080/document",
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error occurred:", error);
      // Add your error handling logic here
    }
  };

  const cancelHandler = (values) => {
    console.log("Form values:", values);
  };

  const documentProps = {
    setFile: setFile,
    numberOfImage: 1,
    fileType: "application/pdf", // Assuming PDF is the required file type
    fileSize: 10,
    name: "Document File",
  };

  const submitButtonProperty = {
    name: "Add",
    color: "#ffffff",
    backgroundColor: "var(--Brand-500, #6366F1)",
    width: "150px",
    height: "50px",
    borderRadius: "28px",
  };

  const cancelButtonProperty = {
    name: "Cancel",
    color: "black",
    backgroundColor: "#fff",
    width: "150px",
    height: "50px",
    borderRadius: "28px",
  };

  const feedingVariable = {
    isCancel: true,
    cancelHandler: cancelHandler,
    isSubmit: true,
    submitHandler: submitHandler,
    submitButtonProperty: submitButtonProperty,
    cancelButtonProperty: cancelButtonProperty,
    formElements: [
      {
        name: "Document Name",
        label: "Document Name",
        type: "text",
        style: {
          width: "405px",
          borderRadius: "40px",
          border: "1px solid var(--Brand-700, #4338CA)",
          backgroundColor: "transparent",
          marginBottom: "20px",
        },
        rules: [{ required: true, message: "Please enter your Document Name" }],
        labelName: false,
      },
    ],
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
            <p className={Styles.superAdminProfileName}>Add Document</p>
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
          <div style={{ marginLeft: "20px" }}>
            <Document {...documentProps} />
          </div>
          <GeneralForm {...feedingVariable} />
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default OrgAddDocument;
