import React from "react";
import Styles from "../../AMChatAdmin/AddOrganizationAdmin/AddOrganizationAdmin.module.css";
import profile from "../../../asset/AmChatSuperAdmin/profile.png";
import GeneralForm from "../../../components/common/forms/GeneralForm";

function AddOrgUser() {
  const formElements = [
    {
      name: "User Name",
      label: "User Name",
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
      name: "Email",
      label: "User Email",
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

  const submitHandler = (values) => {
    console.log("Form values:", values);
  };

  const cancelHandler = (values) => {
    console.log("Form values:", values);
  };

  const submitButtonProperty = {
    name: "Submit",
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
          {/* <button ></button> */}
        </div>

        <GeneralForm {...feedingVariable} />
      </div>
    </div>
  </div>
  )
}

export default AddOrgUser