import React, { useState } from "react";
import Layout from "../../../../Layout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../../../store/authSlice";
import * as constants from "../../../../constants/Constant";
import UserForm from "../../../../components/EditForms/UserForm";
import { useMessageState } from "../../../../hooks/useapp-message";
import { tokenDecodeJWT } from "../../../../utils/authUtils";

const AddUsers = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const {
    buttonLoading,
    setButtonLoading,
    setIsReset,
    showNotifyMessage,
    hideNotifyMessage,
  } = useMessageState();

    const navigate = useNavigate()
    const user = useSelector(selectUser)
    const jwt = user.userToken
    const permittedScopes = tokenDecodeJWT(jwt).scopes
    const [isSubmitting, setIsSubmitting] = useState(false)

  const messageHandler = () => {
    setIsReset(false);
    hideNotifyMessage();
  };

  const cancelHandler = () => {
    navigate("/users");
  };

  const submitHandler = async (values) => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    setButtonLoading(true);

    try {
      const responseUser = await fetch(`${constants.BASE_ORG_API_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(values),
      });

      const data = await responseUser.json();

      if (responseUser.ok) {
        setIsReset(true);
        showNotifyMessage("success", data.message, messageHandler);
        navigate("/users");
      } else {
        showNotifyMessage("error", data.message, messageHandler);
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        navigate("/customerSupport");
      }
      showNotifyMessage(
        "error",
        error.response?.data?.message || "An error occurred",
        messageHandler
      );
    } finally {
      setButtonLoading(false);
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Layout componentName="Add user">
      <UserForm
        formData={formData}
        submitHandler={submitHandler}
        buttonLoading={buttonLoading}
        cancelHandler={cancelHandler}
        permittedScopes={permittedScopes}
        onChange={handleChange}
        editableFields={["firstName", "lastName", "email"]}
      />
    </Layout>
  );
};


export default AddUsers
