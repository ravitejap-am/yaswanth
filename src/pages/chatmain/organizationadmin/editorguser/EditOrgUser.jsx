import React, { useState, useEffect } from "react";
import Styles from "./EditOrgUserSidebar.module.css";
import profile from "../../../../asset/AmChatSuperAdmin/profile.png";
import GeneralForm from "../../../../components/common/forms/GeneralForm";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useMessageState } from "../../../../hooks/useapp-message";
import NotifyMessage from "../../../../components/common/toastMessages/NotifyMessage";
import { selectUser } from "../../../../store/authSlice";
import * as constants from "../../../../constants/Constant";
import { toast } from "react-toastify";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function EditOrgUser() {
  const { userId } = useParams();
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
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetchUserData();
  }, []);

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
      setUserData(data.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
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

  const submitHandler = async (values) => {
    try {
      const response = await fetch(`${constants.BASE_API_URL}/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          firstName: values["First Name"],
          lastName: values["Last Name"],
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Handle success response
      console.log("Update successful:", data);
      // Show success message
      toast.success("User updated successfully");
      // After successful update, you can choose to refetch user data if needed
      // fetchUserData();
    } catch (error) {
      console.error("Error updating user:", error);
      // Show error message
      toast.error("Failed to update user");
    }
  };

  const cancelHandler = () => {
    navigate("/orguserlist");
  };

  const formElements = [
    {
      name: "firstName",
      label: userData.firstName || "",
      type: "text",
      style: {
        width: "405px",
        borderRadius: "40px",
        border: "1px solid var(--Brand-700, #4338CA)",
        backgroundColor: "transparent",
      },
      // initialValue: userData.firstName || "", // Populate with user data
      rules: [{ required: true, message: "Please enter your name" }],
      labelName: false,
    },
    {
      name: "lastName",
      label: userData.lastName || "",
      type: "text",
      style: {
        width: "405px",
        borderRadius: "40px",
        border: "1px solid var(--Brand-700, #4338CA)",
        backgroundColor: "transparent",
      },
      //initialValue: userData.lastName || "", // Populate with user data
      rules: [{ required: true, message: "Please enter your name" }],
      labelName: false,
    },
    {
      name: "Email",
      label: userData.email || "",
      type: "text",
      // initialValue: userData.email || "", // Populate with user data
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
    name: "Update",
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

  const validateForm = async () => {
    try {
      // Validate the form here
      // For example, you can use Ant Design Form validation methods or any other validation library
      // Return true if the form is valid, false otherwise
      return true;
    } catch (error) {
      console.error("Error validating form:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const isValid = await validateForm();
    if (isValid) {
      submitHandler();
    }
  };

  // Check if userData is loaded before rendering Upload component
  if (Object.keys(userData).length === 0) {
    return null; // or render a loading spinner
  }

  return (
    <div className={Styles.superAdminMainCardDivStyle}>
      <div className={Styles.superAdminMiddleParentDiv}>
        <div className={Styles.superAdminProfileCardStyle}>
          <div>
            <p className={Styles.superAdminProfileName}>Edit User</p>
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
              defaultFileList={[
                {
                  uid: "-1",
                  name: "profile.png",
                  status: "done",
                  url: `${constants.BASE_API_URL}/${userData.profileImagePath}`,
                },
              ]}
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

          <form onSubmit={handleSubmit}>
            <GeneralForm {...feedingVariable} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditOrgUser;
