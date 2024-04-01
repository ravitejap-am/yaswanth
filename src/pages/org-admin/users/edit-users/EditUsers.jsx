import React, { useEffect, useState } from "react";
import Layout from "../../../../Layout";
import styles from "./EditUsers.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import EditForm from "../../../../components/EditForms/EditForms";
import { selectUser } from "../../../../store/authSlice";
import * as constants from "../../../../constants/Constant";
import { useMessageState } from "../../../../hooks/useapp-message";

const EditUsers = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileList, setFileList] = useState();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  let {
    buttonLoading,
    setButtonLoading,
    isReset,
    setIsReset,
    showNotifyMessage,
    hideNotifyMessage,
  } = useMessageState();
  const navigate = useNavigate();
  const { userId } = useParams();
  const user = useSelector(selectUser);
  const jwt = user.userToken;

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `${constants.BASE_API_URL}/user/${userId}/details`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUserData({
        firstName: data?.data?.firstName,
        lastName: data?.data?.lastName || "",
        email: data?.data?.email,
      });
      if (data?.data?.profileImagePath?.length > 0) {
        const url =
          constants.BASE_USER_IMAGE_URL + data?.data?.profileImagePath;
        setFileList(url);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const messageHandler = () => {
    setIsReset(false);
    hideNotifyMessage();
  };

  const submitHandler = async (values) => {
    setButtonLoading(true);
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    if (values === undefined) {
    } else if (
      userData?.firstName === values?.firstName &&
      userData?.lastName === values?.lastName
    ) {
      setButtonLoading(false);
      setIsSubmitting(false);
      showNotifyMessage("success", "Already updated!", messageHandler);
    } else {
      try {
        const updateUserResponse = await fetch(
          `${constants.BASE_API_URL}/user/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({
              firstName: values["firstName"],
              lastName: values["lastName"],
            }),
          }
        );
        if (!updateUserResponse.ok) {
          throw new Error(`HTTP error! status: ${updateUserResponse.status}`);
        }
        setIsReset(true);
        const updateUserData = await updateUserResponse.json();
        setButtonLoading(false);
        setIsReset(true);
        showNotifyMessage("success", updateUserData?.message, messageHandler);
      } catch (error) {
        console.log("Error updating user details:", error);
        if (
          error?.response?.status == 500 ||
          error?.response?.status == "500"
        ) {
          navigate("/customerSupport");
        }
        setButtonLoading(false);
      } finally {
        console.log("SBH 17");
        setIsSubmitting(false);
        fetchUserData();
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Layout componentName="Update user">
      <EditForm
        formData={userData}
        setFormsData={setUserData}
        submitHandler={submitHandler}
        isEdit={true}
        buttonLoading={buttonLoading}
      />
    </Layout>
  );
};

export default EditUsers;
