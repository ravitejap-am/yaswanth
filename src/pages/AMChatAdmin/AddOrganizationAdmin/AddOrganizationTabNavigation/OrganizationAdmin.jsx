import React from "react";
import GeneralForm from "../../../../components/common/forms/GeneralForm";
import { useNavigate } from "react-router-dom";
function OrganizationAdmin() {
  const navigate = useNavigate();

  // Define form elements for first name, last name, and email
  const formElements = [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "Enter your first name",
      style: {
        width: "445px",
        borderRadius: "40px",
        border: "1px solid var(--Brand-700, #4338CA)",
        backgroundColor: "transparent",
      },
      rules: [{ required: true, message: "Please enter your first name" }],
      labelName: false,
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      placeholder: "Enter your last name",
      style: {
        width: "445px",
        borderRadius: "40px",
        border: "1px solid var(--Brand-700, #4338CA)",
        backgroundColor: "transparent",
      },
      rules: [{ required: true, message: "Please enter your last name" }],
      labelName: false,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      style: {
        width: "445px",
        borderRadius: "40px",
        border: "1px solid var(--Brand-700, #4338CA)",
        backgroundColor: "transparent",
      },
      rules: [
        { required: true, message: "Please enter your email" },
        { type: "email", message: "Please enter a valid email address" },
      ],
      labelName: false,
    },
  ];

  const submitHandler = (values) => {
    console.log("Form values:", values);
    // Add your logic to handle form submission
  };

  const cancelHandler = (values) => {
    console.log("Form values:", values);
    // Add your logic to handle form cancellation
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
    isSubmit: false,
    isCancel: false,
    submitHandler: submitHandler,
    cancelHandler: cancelHandler,
    submitButtonProperty: submitButtonProperty,
    cancelButtonProperty: cancelButtonProperty,
    formElements: formElements,
    formType: "normal",
  };

  return (
    <div>
      <GeneralForm {...feedingVariable} />
    </div>
  );
}

export default OrganizationAdmin;
