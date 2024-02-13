import React, { useState } from "react";
import Styles from "./OrgAdminChatSidebar.module.css";
import Tooltip from "./Tooltip";
import profile from "../../../asset/AmChatSuperAdmin/profile.png";
import GeneralForm from "../../../components/common/forms/GeneralForm";
import photograph from "../../../asset/photograph.png";
import { selectUser } from "../../../store/authSlice";
import axios from "axios";
import { useSelector } from "react-redux";
import NotifyMessage from "../../../components/common/toastMessages/NotifyMessage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import * as constants from "../../../constants/Constant";
import { useMessageState } from "../../../hooks/useapp-message";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function AddOrgUser() {
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
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      // Load preview image if not already loaded
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList }) => setFileList(fileList);

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const messageHandler = () => {
    setIsReset(false);
    hideNotifyMessage();
  };

  const submitHandler = async (values) => {
    setButtonLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", fileList[0].originFileObj);

      const responseImage = await fetch(`${constants.BASE_API_URL}/user/dp`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        body: formData,
      });

      if (!responseImage.ok) {
        throw new Error(`HTTP error! status: ${responseImage.status}`);
      }

      const responseData = await responseImage.json();
      console.log("Upload response:", responseData);

      const responseUser = await fetch(
        `${constants.BASE_API_URL}/organisation/user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify(values),
        }
      );

      if (!responseUser.ok) {
        throw new Error(`HTTP error! status: ${responseUser.status}`);
      }

      const data = await responseUser.json();
      switch (data.code) {
        case "SIGNUP-S-001":
          toast.success(data.message);
          break;
        case "SIGNUP-ARR-004":
          toast.warn(data.message);
          break;
        case "SIGNUP-IE-005":
          toast.error(data.message);
          break;
        case "SIGNUP-IO-007":
          toast.error(data.message);
          break;
        default:
          toast.info("Unknown response code");
      }
      setButtonLoading(false);
      setIsReset(true);
      showNotifyMessage('success', data?.data?.message, messageHandler);
    } catch (error) {
      if (error?.response?.status == 500 || error?.response?.status == "500") {
        navigate("/internal500");
      }
      setButtonLoading(false);
      showNotifyMessage(
        'error',
        error?.response?.data?.message,
        messageHandler
      );
    }
  };

  const cancelHandler = () => {
    navigate("/orguserlist");
  };

  const formElements = [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      style: {
        width: "405px",
        borderRadius: "40px",
        border: "1px solid var(--Brand-700, #4338CA)",
        backgroundColor: "transparent",
      },
      rules: [{ required: true, message: "Please enter your name" }],
      labelName: false,
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      style: {
        width: "405px",
        borderRadius: "40px",
        border: "1px solid var(--Brand-700, #4338CA)",
        backgroundColor: "transparent",
      },
      rules: [{ required: true, message: "Please enter your name" }],
      labelName: false,
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      rules: [
        { required: true, message: "Please input your email" },
        { type: "email", message: "Invalid email format" },
      ],
      style: {
        width: "405px",
        borderRadius: "40px",
        border: "1px solid var(--Brand-700, #4338CA)",
        backgroundColor: "transparent",
      },
      labelName: false,
    },
  ];

  const submitButtonProperty = {
    name: "Submit",
    color: "#ffffff",
    backgroundColor: "var(--Brand-500, #6366F1)",
    width: "150px",
    height: "50px",
    borderRadius: "28px",
    marginTop: "10px",
  };

  const cancelButtonProperty = {
    name: "Cancel",
    color: "black",
    backgroundColor: "#fff",
    width: "150px",
    height: "50px",
    borderRadius: "28px",
    marginTop: "10px",
  };

  const feedingVariable = {
    isCancel: true,
    cancelHandler: cancelHandler,
    isSubmit: true,
    submitHandler: submitHandler,
    submitButtonProperty: submitButtonProperty,
    cancelButtonProperty: cancelButtonProperty,
    formElements: formElements,
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
            <p className={Styles.superAdminProfileName}>Add User</p>
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
          <div className={Styles.imageUploadSection}>
            <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture-circle"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                alt="example"
                style={{
                  width: "100%",
                }}
                src={previewImage}
              />
            </Modal>
          </div>
          <GeneralForm
            {...feedingVariable}
            buttonLoading={buttonLoading}
            isReset={isReset}
          />
        </div>
        <NotifyMessage />
      </div>
    </div>
  );
}

export default AddOrgUser;
