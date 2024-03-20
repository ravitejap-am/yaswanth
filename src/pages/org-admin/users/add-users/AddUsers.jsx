import React, { useState } from "react";
import Layout from "../../../../Layout";
import { useSelector } from "react-redux";
import styles from "./AddUsers.module.css";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../../../store/authSlice";
import * as constants from "../../../../constants/Constant";
import EditForm from "../../../../components/EditForms/EditForms";
import { useMessageState } from "../../../../hooks/useapp-message";
const AddUsers = () => {
  let {
    buttonLoading,
    setButtonLoading,
    isReset,
    setIsReset,
    showNotifyMessage,
    hideNotifyMessage,
  } = useMessageState();

  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const jwt = user.userToken;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const messageHandler = () => {
    setIsReset(false);
    hideNotifyMessage();
  };

  const cancelHandler = () => {
    console.log("calling cancelHandler");
    navigate("/users");
  };

  const submitHandler = async (values) => {
    console.log("values---->567", values);
    if (values === undefined) {
      console.log("values are undefined");
    } else {
      if (isSubmitting) {
        console.log("AI USER 3");
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
        setButtonLoading(false);
        if (responseUser?.ok) {
          setIsReset(true);
          showNotifyMessage("success", data.message, messageHandler);
          navigate("/users");
        } else {
          showNotifyMessage("error", data.message, messageHandler);
          return;
        }
      } catch (error) {
        if (
          error?.response?.status == 500 ||
          error?.response?.status == "500"
        ) {
          navigate("/customerSupport");
        }
        setButtonLoading(false);
        showNotifyMessage(
          "error",
          error?.response?.data?.message || "An error occurred",
          messageHandler
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Layout componentName="Add user">
      <EditForm
        formData={{ firstName: "", lastName: "", email: "" }}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
        isEdit={false}
      />
    </Layout>
  );
};

export default AddUsers;
