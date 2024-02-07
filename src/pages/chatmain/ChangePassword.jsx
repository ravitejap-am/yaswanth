import React from "react";
import GeneralForm from "../../components/common/forms/GeneralForm";
import { useSelector } from "react-redux";
import { setUser, selectUser } from "../../store/authSlice";

const ChangePassword = ({ setFileSysytem, validateEmail }) => {
  const validatePassword = (_, value) => {
    if (value && value.length < 8) {
      return Promise.reject("Password must be at least 8 characters");
    } else {
      return Promise.resolve();
    }
  };

  const user = useSelector(selectUser);
  const jwt = user.userToken;

  const handleChangePassword = async (values) => {
    try {
      const response = await fetch(
        "http://54.161.113.196:8080/user/verification/reset",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            userId: "",
            oldPassword: values.password,
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword,
          }),
        }
      );
      

      if (response.ok) {
        console.log("Password change successful");
      } else {
        console.error("Failed to change password");
      }
    } catch (error) {
      console.error("Error occurred while changing password", error);
    }
  };

  const feedingVariable = {
    isCancel: false,
    cancelHandler: () => {
      console.log("Canceling....");
    },
    isSubmit: true,
    submitHandler: (values) => {
      console.log("Submitting ChangePassword form....");
      handleChangePassword(values);
    },

    submitButtonProperty: {
      name: "Submit",
      color: "white",
      backgroundColor: "#6366F1",
      type: "primary",
      width: "150px",
      height: "50px",
      borderRadius: "35px",
      marginTop: "5px",
    },
    formElements: [
      {
        label: "Old Password",
        type: "password",
        name: "password",
        rules: [
          { required: true, message: "Please input a valid password!" },
          { validator: validatePassword },
        ],
        style: { width: "350px", marginTop: "40px", marginLeft: "20px" },
      },
      {
        label: "New Password",
        type: "password",
        name: "password",
        rules: [
          { required: true, message: "Please input a valid password!" },
          { validator: validatePassword },
        ],
        style: { width: "350px", marginLeft: "20px" },
      },
      {
        label: "Confirm Password",
        type: "password",
        name: "confirmPassword",
        rules: [{ required: true, message: "Please confirm your password!" }],
        style: { width: "350px", marginLeft: "20px" },
      },
    ],
    formType: "normal",
    validateEmail: validateEmail,
    setFileSysytem: setFileSysytem,
    grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
  };

  return (
    <div className="changepassword-main">
      <div className="changepassword-input">
        <GeneralForm {...feedingVariable} />
      </div>
    </div>
  );
};

export default ChangePassword;
