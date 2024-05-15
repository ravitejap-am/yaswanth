import React, { useEffect, useState } from "react";
import Layout from "../../../../Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import UserForm from "../../../../components/EditForms/UserForm";
import {
  selectUser,
  selectUserDetails,
  setUserData,
} from "../../../../store/authSlice";
import * as constants from "../../../../constants/Constant";
import { useMessageState } from "../../../../hooks/useapp-message";
import { tokenDecodeJWT } from "../../../../utils/authUtils";

const EditUsers = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    buttonLoading,
    setButtonLoading,
    showNotifyMessage,
    hideNotifyMessage,
  } = useMessageState();
  const navigate = useNavigate();
  const { userId } = useParams();
  const user = useSelector(selectUser);
  const userInfo = useSelector(selectUserDetails);
  const dispatch = useDispatch();

  const [userData, setUserDatas] = useState({
    firstNmae: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    setUserDatas({
      firstName: userInfo?.userData?.firstName || "",
      lastName: userInfo?.userData?.lastName || "",
      email: userInfo?.userData?.email || "",
    });
  }, []);

  useEffect(() => {
    return () => {
      dispatch(setUserData(null));
    };
  }, []);

  const jwt = user.userToken;
  const permittedScopes = tokenDecodeJWT(jwt).scopes;

  const messageHandler = () => {
    hideNotifyMessage();
  };

  const submitHandler = async (values) => {
    setButtonLoading(true);
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
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
      const updateUserData = await updateUserResponse.json();
      setButtonLoading(false);
      showNotifyMessage("success", updateUserData?.message, messageHandler);
    } catch (error) {
      console.log("Error updating user details:", error);
      if (error?.response?.status == 500 || error?.response?.status == "500") {
        navigate("/customerSupport");
      }
      setButtonLoading(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelHandler = () => {
    navigate("/users");
  };
  console.log("submit hadler is working ");
  return (
    <Layout componentName="Update user">
      <UserForm
        formData={userData}
        submitHandler={submitHandler}
        buttonLoading={buttonLoading}
        cancelHandler={cancelHandler}
        permittedScopes={permittedScopes}
        editableFields={["firstName", "lastName"]}
      />
    </Layout>
  );
};

export default EditUsers;