import React from "react";
import Styles from "./AddOrganizationAdmin.module.css";
import profile from "../../../asset/AmChatSuperAdmin/profile.png";
import GeneralForm from "../../../components/common/forms/GeneralForm";
function AddOrganizationAdmin() {
  const formElements = [
    {
      name: "Organization Name",
      label: "Organization Name",
      type: "text",
      style: {
        width: "445px",
        borderRadius: "40px",
        border: "1px solid var(--Brand-700, #4338CA)",
        backgroundColor: "transparent",
      },
      rules: [{ required: true, message: "Please enter your name" }],
      labelName: false,
    },
    {
      name: "Address",
      label: "Address",
      type: "text",
      style: {
        width: "445px",
        borderRadius: "40px",
        border: "1px solid var(--Brand-700, #4338CA)",
        backgroundColor: "transparent",
      },
      labelName: false,
      rules: [
        { required: true, message: "Please enter your email" },
        { type: "email", message: "Please enter a valid email address" },
      ],
    },

    {
      name: "Contact Person",
      label: "Contact Person",
      type: "text",
      style: {
        width: "445px",
        borderRadius: "40px",
        border: "1px solid var(--Brand-700, #4338CA)",
        backgroundColor: "transparent",
      },
      labelName: false,
      rules: [
        { required: true, message: "Please enter your email" },
        { type: "email", message: "Please enter a valid email address" },
      ],
    },
    {
      name: "plan",
      label: "Select Plan",
      type: "select",
      style: {
        width: "470px",
        height: "48px",
        borderRadius: "40px",
        border: "1px solid var(--Brand-700, #4338CA)",
        backgroundColor: "transparent",
        marginBottom: "13px",
      },
      className: "transparent-dropdown",
      labelName: false,
      options: [
        { value: "basic", label: "Basic Plan" },
        { value: "premium", label: "Premium Plan" },
        { value: "pro", label: "Pro Plan" },
      ],
      rules: [{ required: true, message: "Please select a plan" }],
    },
    {
      name: "Select Status",
      label: "Select Status",
      type: "select",
      style: {
        width: "470px",
        height: "48px",
        borderRadius: "40px",
        border: "1px solid var(--Brand-700, #4338CA)",
        backgroundColor: "transparent",
        marginBottom: "13px",
      },
      className: "transparent-dropdown",
      labelName: false,
      options: [
        { value: "basic", label: "Basic Plan" },
        { value: "premium", label: "Premium Plan" },
        { value: "pro", label: "Pro Plan" },
      ],
      rules: [{ required: true, message: "Please select a plan" }],
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
    width: "520px",
    height: "50px",
    borderRadius: "28px",
  };

  const cancelButtonProperty = {
    name: "Cancel",
    color: "#ffffff",
    backgroundColor: "var(--Brand-500, #6366F1)",
    width: "520px",
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
            <p className={Styles.superAdminProfileName}>Add Organization</p>
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
        </div>
      </div>
    </div>
  );
}

export default AddOrganizationAdmin;
