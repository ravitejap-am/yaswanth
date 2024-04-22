import React from "react";
import GeneralForm from "../../components/common/forms/GeneralForm";
import { useSelector } from "react-redux";
import { setUser, selectUser } from "../../store/authSlice";
import * as constants from "../../constants/Constant"; // Import constants
import NotifyMessage from "../../components/common/toastMessages/NotifyMessage";
import { useMessageState } from "../../hooks/useapp-message";
import { useNavigate } from "react-router-dom";

const ChangePassword = ({ setFileSysytem, validateEmail }) => {
  const navigate = useNavigate();
  let {
    buttonLoading,
    setButtonLoading,
    isReset,
    setIsReset,
    showNotifyMessage,
    hideNotifyMessage,
  } = useMessageState();

  const messageHandler = () => {
    setIsReset(false);
    hideNotifyMessage();
  };
  const validatePassword = (_, value) => {
    if (value && value.length < 8) {
      return Promise.reject("Password must be at least 8 characters");
    } else {
      return Promise.resolve();
    }
  };

  const user = useSelector(selectUser);
  const jwt = user.userToken;
  const passwordStyles = { 
    position: 'absolute',
    top: '73%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    left: '340px'
}

const confirmPasswordStyles = { 
  position: 'absolute',
  // right: '10px',
  top: '60%',
  transform: 'translateY(-50%)',
  cursor: 'pointer',
  left: '340px'
}


  const handleChangePassword = async (values) => {
    setButtonLoading(true);
    try {
      const response = await fetch(
        `${constants.BASE_API_URL}${constants.RECOVERY_PASSWORD_ENDPOINT}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            userId: "292",
            oldPassword: values.password,
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword,
          }),
        }
      );
      if (response.ok) {
        setButtonLoading(false);
        setIsReset(true);
        showNotifyMessage(
          "success",
          "Password Changed Successfully",
          messageHandler
        );
      } else {
        showNotifyMessage("error", "Failed to change password", messageHandler);
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        navigate("/customerSupport");
      }
      setButtonLoading(false);
      // showNotifyMessage(
      //   "error",
      //   error.response ? error.response.data.message : "An error occurred",
      //   messageHandler
      // );
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
        iconStyle: passwordStyles
      },
      {
        label: "New Password",
        type: "password",
        name: "newPassword",
        rules: [
          { required: true, message: "Please input a valid password!" },
          { validator: validatePassword },
        ],
        style: { width: "350px", marginTop: "40px", marginLeft: "20px" },
        iconStyle: passwordStyles
      },
      {
        label: "Confirm Password",
        type: "password",
        name: "confirmPassword",
        rules: [{ required: true, message: "Please confirm your password!" }],
        style: { width: "350px", marginLeft: "20px" },
        iconStyle: confirmPasswordStyles
      },
    ],
    formType: "normal",
    validateEmail: validateEmail,
    setFileSysytem: setFileSysytem,
    grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
  };

  return (
    <div className="changepassword-main" style={{ width: "96%" }}>
      <div className="changepassword-input">
        <GeneralForm {...feedingVariable} />
      </div>
      <NotifyMessage />
    </div>
  );
};

export default ChangePassword;
