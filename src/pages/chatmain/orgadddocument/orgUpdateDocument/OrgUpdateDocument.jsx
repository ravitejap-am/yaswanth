import React, { useState } from "react";
import Styles from "./OrgUpdateDocument.module.css";
import profile from "../../../../asset/AmChatSuperAdmin/profile.png";
import GeneralForm from "../../../../components/common/forms/GeneralForm";
import axios from "axios";
import Document from "../../../../components/common/upload/file/Document";
import { useSelector } from "react-redux";
import * as constants from "../../../../constants/Constant";
import { selectUser } from "../../../../store/authSlice";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useMessageState } from "../../../../hooks/useapp-message";
import { useParams, useNavigate } from "react-router-dom";

function OrgUpdateDocument() {
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

  const user = useSelector(selectUser);
  const jwt = user.userToken;
  const messageHandler = () => {
    setIsReset(false);
    hideNotifyMessage();
  };

  const submitHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.put(
        `${constants.BASE_API_URL}/document/${documentId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      showNotifyMessage("success", response?.data?.message, messageHandler);
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const cancelHandler = () => {
    navigate("/orgdocumentlist");
    console.log(navigate("/orgdocumentlist"));
  };



  const documentProps = {
    name: "file",
    fileList: file ? [file] : [],
    beforeUpload: (file) => {
      setFile(file);
      return false;
    },
    accept: ".pdf",
  };

  const submitButtonProperty = {
    name: "Add",
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
    formElements: [],
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
          <div>
            <p className={Styles.superAdminProfileName}>
              Upload Correct Document
            </p>
          </div>
          <div
            className={Styles.superAdminProfileImgNameStyle}
            style={{ display: "flex", alignItems: "center" }}
          >
            <img src={profile} alt="" className={Styles.AdminProfileStyle} />
            <span className={Styles.SuperAdminProfileStyle}>Lian Vendiar</span>
          </div>
        </div>

        <div className={Styles.addOrganizationAdminSecondDiv}>
          <div className={Styles.uploadDocumentContainer}>
            {" "}
            <Upload {...documentProps}>
              <Button icon={<UploadOutlined />}>Upload Document</Button>
            </Upload>
          </div>
          <GeneralForm
            {...feedingVariable}
            buttonLoading={buttonLoading}
            isReset={isReset}
          />
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default OrgUpdateDocument;
