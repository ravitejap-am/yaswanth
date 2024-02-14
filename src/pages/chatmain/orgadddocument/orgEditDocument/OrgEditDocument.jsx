import React, { useState, useEffect } from "react";
import Styles from "./OrgEditDocument.module.css";
import profile from "../../../../asset/AmChatSuperAdmin/profile.png";
import GeneralForm from "../../../../components/common/forms/GeneralForm";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../../../../constants/Constant";
import { Spin } from "antd";
import { useMessageState } from "../../../../hooks/useapp-message";
import { setUser, selectUser } from "../../../../store/authSlice";
import { useSelector } from "react-redux";
import * as constants from "../../../../constants/Constant";
import AMChatHeader from "../../../AMChatAdmin/AMChatHeader/AMChatHeader";

function OrgEditDocument() {
  let {
    buttonLoading,
    setButtonLoading,
    isReset,
    setIsReset,
    showNotifyMessage,
    hideNotifyMessage,
  } = useMessageState();
  const { documentId } = useParams();
  const navigate = useNavigate();
  const [documentDetails, setDocumentDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const user = useSelector(selectUser);
  const jwt = user.userToken;

  useEffect(() => {
    const fetchDocumentDetails = async () => {
      try {
        const response = await axios.get(
          `${constants.BASE_API_URL}/document/getDetails/${documentId}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        setDocumentDetails(response.data.data);
        setLoading(false);
        setIsReset(true);
      } catch (error) {
        console.error("Error fetching document details:", error);
        setLoading(false);
      }
    };
    fetchDocumentDetails();
  }, [documentId]);

  const cancelHandler = () => {
    // alert("Cancelling")
    navigate("/orgdocumentlist");
  };
  const messageHandler = () => {
    setIsReset(false);
    hideNotifyMessage();
  };

  const submitHandler = async (values) => {
    setButtonLoading(true);
    try {
      console.log("Submitting form with values:", values);

      const requestData = {
        name: values["Document Name"],
      };

      console.log("Request Data:", requestData);

      const response = await axios.put(
        `${constants.BASE_API_URL}/document/edit/${documentId}`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      // console.log("API Response:", response);

      setButtonLoading(false);
      setIsReset(true);
      showNotifyMessage("success", response?.data?.message, messageHandler);
    } catch (error) {
      if (error?.response?.status == 500 || error?.response?.status == "500") {
        navigate("/internal500");
      }

      setButtonLoading(false);
      showNotifyMessage(
        "error",
        error?.response?.data?.message,
        messageHandler
      );
    }
  };

  const submitButtonProperty = {
    name: "Update",
    color: "#ffffff",
    backgroundColor: "var(--Brand-500, #6366F1)",
    width: "150px",
    height: "50px",
    borderRadius: "28px",
  };

  const cancelButtonProperty = {
    name: "Cancel",
    color: "black",
    backgroundColor: "#fff",
    width: "150px",
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
    formElements: [
      {
        name: "Document Name",
        label: "Document Name",
        type: "text",
        style: {
          width: "405px",
          borderRadius: "40px",
          border: "1px solid var(--Brand-700, #4338CA)",
          backgroundColor: "transparent",
          marginBottom: "20px",
        },
        rules: [{ required: true, message: "Please enter your Document Name" }],
        labelName: false,
        initialValue: documentDetails.name,
      },
    ],
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
          <AMChatHeader
            componentName="Edit Document Name"
            name="Rajeev"
            profileImageSrc={profile}
            customStyle={{
              containerStyle: {
                display: "flex",
                borderRadius: "8px",
              },
              imageStyle: {
                width: "50%",
                height: "70%",
              },
              textStyle: {
                color: "blue",
                fontWeight: "bold",
              },
            }}
          />
        </div>

        <div className={Styles.addOrganizationAdminSecondDiv}>
          {!loading && (
            <GeneralForm
              initialValues={documentDetails}
              {...feedingVariable}
              buttonLoading={buttonLoading}
            />
          )}
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default OrgEditDocument;
