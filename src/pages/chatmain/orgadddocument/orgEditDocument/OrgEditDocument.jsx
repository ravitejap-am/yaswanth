import React from "react";
import Styles from "./OrgEditDocument.module.css";
import profile from "../../../../asset/AmChatSuperAdmin/profile.png";
import GeneralForm from "../../../../components/common/forms/GeneralForm";
import axios from "axios";
import Document from "../../../../components/common/upload/file/Document";
import { useNavigate } from "react-router-dom";
function OrgEditDocument() {
  const navigate = useNavigate();
  const formElements = [
    {
      name: "Document Name",
      label: "Edit Document Name",
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
  ];
  const cancelHandler = (values) => {
    console.log("Form values:", values);
    navigate("/orgdocumentlist");
  };

  const submitHandler = async (values) => {
    try {
      console.log("Submitting form with values:", values);

      if (values.hasOwnProperty("Document File")) {
        const formData = new FormData();
        formData.append("documentName", values["Document Name"]);
        formData.append("documentFile", values["Document File"][0]);

        console.log("FormData:", formData);

        const response = await axios.post(
          "http://54.161.113.196:8080/document",
          formData
        );

        console.log("API Response:", response);

        if (response.status === 200) {
          console.log("Document uploaded successfully!");
        } else {
          console.error("Failed to upload document");
        }
      } else {
        console.error("Document File field is missing in form values");
      }
    } catch (error) {
      console.error("Error uploading document:", error);
    }
  };

  const submitButtonProperty = {
    name: "Update",
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
            <p className={Styles.superAdminProfileName}>Edit Document Name</p>
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
          <GeneralForm {...feedingVariable} />
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default OrgEditDocument;
