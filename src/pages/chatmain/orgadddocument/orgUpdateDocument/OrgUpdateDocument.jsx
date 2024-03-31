import React, { useEffect, useState } from "react";
import Styles from "./OrgUpdateDocument.module.css";
import profile from "../../../../asset/AmChatSuperAdmin/profile.png";
import GeneralForm from "../../../../components/common/forms/GeneralForm";
import axios from "axios";
import Document from "../../../../components/common/upload/file/Document";
import { useSelector } from "react-redux";
import * as constants from "../../../../constants/Constant";
import { selectUser } from "../../../../store/authSlice";
import { Upload, Button, Spin } from "antd";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { useMessageState } from "../../../../hooks/useapp-message";
import { useParams, useNavigate } from "react-router-dom";
import AMChatHeader from "../../../AMChatAdmin/AMChatHeader/AMChatHeader";
import OrganizationAdminHeader from "../../organizationadmin/OrganizationAdminHeader/OrganizationAdminHeader";
import { trimFileNameBeforeExtension } from "../../../../utils/fileNameExtraction";
import { Typography, useMediaQuery } from "@mui/material";

function OrgUpdateDocument(props) {
  const { documentId } = useParams();
  let {
    buttonLoading,
    setButtonLoading,
    isReset,
    setIsReset,
    showNotifyMessage,
    hideNotifyMessage,
  } = useMessageState();

  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigationRoute = props?.navigationRoute;
  const fullName = localStorage.getItem("fullName") || "";
  const [errors, setErrors] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    // Retrieve firstName from localStorage
    const storedFirstName = localStorage.getItem("firstNameOrganisation");
    setFirstName(storedFirstName);
  }, []);

  const user = useSelector(selectUser);
  const jwt = user.userToken;
  const messageHandler = () => {
    setIsReset(false);
    hideNotifyMessage();
  };
  const profileSrc = localStorage.getItem("profileImage");

  const submitHandler = async () => {
    if (!!file) {
      if (
        trimFileNameBeforeExtension(file?.name) !=
        localStorage.getItem("documentName")
      ) {
        setErrors(
          "Uploading file with different name is not allowed. Please try to the file with same name"
        );
        return;
      }
      if (trimFileNameBeforeExtension(file?.name).length > 50) {
        setErrors("File name should be less than 50 characters");
        return;
      }
    }

    if (isSubmitting) {
      return;
    }
    if (!file) {
      setErrors("Please upload the document");
      return;
    }
    setIsSubmitting(true);
    setButtonLoading(true);
    setErrors("");
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.put(
        `${constants.BASE_DOC_API_URL}/${documentId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setButtonLoading(false);
      setIsReset(true);
      showNotifyMessage("success", response?.data?.message, messageHandler);
      setErrors("");
      console.log("API Response:", response.data);
      navigate("/documents");
    } catch (error) {
      setErrors("");
      if (error?.response?.status == 500 || error?.response?.status == "500") {
        navigate("/customerSupport");
      }

      setButtonLoading(false);
      showNotifyMessage(
        "error",
        error?.response?.data?.message,
        messageHandler
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelHandler = () => {
    navigate("/documents");
  };

  const documentProps = {
    name: "file",
    fileList: file ? [file] : [],
    beforeUpload: (file) => {
      setFile(file);
      return false;
    },
    onRemove: (file) => {
      setFile(null);
      return false;
    },
    accept: ".pdf",
  };

  const ErrorMsg = () => {
    return <span style={{ color: "red", fontSize: "14px" }}>{errors}</span>;
  };

  return (
    <div style={{ paddingTop: "30px" }}>
      <Spin
        spinning={buttonLoading}
        indicator={
          <LoadingOutlined style={{ fontSize: 40, color: "#808080" }} spin />
        }
      >
        <div className={Styles.addOrganizationAdminSecondDiv}>
          <div className={Styles.Spacing_Form}>
            <div className={Styles.uploadDocumentContainer}>
              <Typography sx={{ wordWrap: "break-word" }}>
                Document Name : {localStorage.getItem("documentName")}
              </Typography>
              <Upload {...documentProps}>
                <Button icon={<UploadOutlined />}></Button>
              </Upload>
              {!!errors && <ErrorMsg />}
            </div>
          </div>
          <div
            className={Styles.buttonContainer}
            style={{ justifyContent: isMobile ? "center" : "flex-end" }}
          >
            <Button onClick={cancelHandler} className={Styles.cancelButton}>
              <Typography variant="button"> Cancel </Typography>
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className={Styles.addButtonStyle}
              onClick={submitHandler}
            >
              <Typography variant="button">Update </Typography>
            </Button>
          </div>
        </div>
      </Spin>
    </div>
  );
}

export default OrgUpdateDocument;
