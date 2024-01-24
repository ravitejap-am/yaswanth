import React from "react";
import { Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import Styles from "./AddOrganizationAdmin.module.css";
import profile from "../../../asset/AmChatSuperAdmin/profile.png";
import GeneralForm from "../../../components/common/forms/GeneralForm";
import MainTabNavigationAddOrg from "./AddOrganizationTabNavigation/MainTabNavigationAddOrg";
function AddOrganizationAdmin() {
  const navigate = useNavigate();

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
      name: "Street 1",
      label: "Street 1",
      type: "text",
      style: {
        width: "445px",
        borderRadius: "40px",
        border: "1px solid var(--Brand-700, #4338CA)",
        backgroundColor: "transparent",
      },
      labelName: false,
      rules: [{ required: true, message: "Please enter Street 1" }],
    },
    {
      name: "Street 2",
      label: "Street 2",
      type: "text",
      style: {
        width: "445px",
        borderRadius: "40px",
        border: "1px solid var(--Brand-700, #4338CA)",
        backgroundColor: "transparent",
      },
      labelName: false,
    },
    {
      name: "City",
      label: "City",
      type: "select",
      options: [
        { label: "Select a City", value: "" },
        { label: "City 1", value: "city1" },
        { label: "City 2", value: "city2" },
      ],
      style: {
        width: "469px",
        height: "50px",
        borderRadius: "40px",
        border: "1px solid var(--Brand-700, #4338CA)",
        backgroundColor: "transparent",
      },
      labelName: false,
      rules: [{ required: true, message: "Please select City" }],
    },
    {
      name: "State",
      label: "State",
      type: "select",
      options: [
        { label: "State 1", value: "state1" },
        { label: "State 2", value: "state2" },
      ],
      style: {
        width: "469px",
        height: "50px",
        borderRadius: "40px",
        border: "1px solid var(--Brand-700, #4338CA)",
        backgroundColor: "transparent",
      },
      labelName: false,
      rules: [{ required: true, message: "Please select State" }],
    },
    {
      name: "Country",
      label: "Country",
      type: "select",
      options: [
        { label: "Country 1", value: "country1" },
        { label: "Country 2", value: "country2" },
      ],
      style: {
        width: "469px",
        height: "50px",
        borderRadius: "40px",
        border: "1px solid var(--Brand-700, #4338CA)",
        backgroundColor: "transparent",
      },
      labelName: false,
      rules: [{ required: true, message: "Please select Country" }],
    },
    {
      name: "Zipcode",
      label: "Zipcode",
      type: "text",
      style: {
        width: "445px",
        borderRadius: "40px",
        border: "1px solid var(--Brand-700, #4338CA)",
        backgroundColor: "transparent",
      },
      labelName: false,
      rules: [{ required: true, message: "Please enter Zipcode" }],
    },
  ];

  const submitHandler = (values) => {
    console.log("Form values:", values);
  };

  const cancelHandler = (values) => {
    console.log("Form values:", values);
    // Redirect to /dashboardadmin/organizationlist
    navigate("/dashboardadmin/organizationlist");
  };

  const submitButtonProperty = {
    display: "flex",
    width: "130px",
    height: "50px",
    padding: "10px 16px",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    flexShrink: "0",
    borderRadius: "30px",
    backgroundColor: "var(--Brand-500, #6366F1)",
    color: "#FFFFFF",
    fontFamily: "Into Lato",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "24px",
    name: "Submit",
  };

  const cancelButtonProperty = {
    display: "flex",
    width: "130px",
    height: "50px",
    padding: "10px 16px",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    flexShrink: "0",
    borderRadius: "30px",
    border: "1px solid var(--Neutral-600, #475569)",
    color: "#334155 !important",
    fontFamily: " Into Lato",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "24px",
    name: "Cancel",
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
      <div className={Styles.superAdminSecondMainDiv}>
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
              <span className={Styles.SuperAdminProfileStyle}>
                Lian Vendiar
              </span>
            </div>
          </div>

          <div className={Styles.addOrganizationAdminSecondDiv}>
            {/* <GeneralForm {...feedingVariable} /> */}
            <MainTabNavigationAddOrg/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddOrganizationAdmin;
