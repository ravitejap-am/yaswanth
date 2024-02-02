import React from "react";
import GeneralForm from "../../../../components/common/forms/GeneralForm";
import { useNavigate } from "react-router-dom";
function OrganizationInfo() {
  const navigate = useNavigate();
  const submitHandler = (values) => {
    console.log("Form values:", values);
  };
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
      name: "Address 1",
      label: "Address 1",
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
      name: "Address 2",
      label: "Address 2",
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
        margin: "10px 0", // Adjusted for consistent spacing
        paddingLeft: "10px",
        paddingRight: "20px",
        appearance: "border",
        color: "#475569",
        marginTop: "10px",
      },
      labelName: false,
      rules: [{ required: true, message: "Please select Country" }],
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
        margin: "10px 0", // Adjusted for consistent spacing
        paddingLeft: "10px",
        paddingRight: "20px",
        appearance: "border",
        color: "#475569",
      },
      labelName: false,
      rules: [{ required: true, message: "Please select State" }],
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
        margin: "10px 0", // Adjusted for consistent spacing
        paddingLeft: "10px",
        paddingRight: "20px",
        appearance: "border",
        color: "#475569",
      },
      labelName: false,
      rules: [{ required: true, message: "Please select City" }],
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
        margin: "10px 0", // Adjusted for consistent spacing
      },
      labelName: false,
      rules: [{ required: true, message: "Please enter Zipcode" }],
    },
  ];
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
    isCancel: false,

    cancelHandler: cancelHandler,
    isSubmit: false,
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

  const dropdownHeaderStyle = {
    // Define your header style here or retrieve it dynamically
    // For example:
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  };
  return (
    <div style={{}}>
      <GeneralForm {...feedingVariable} />
    </div>
  );
}

export default OrganizationInfo;
