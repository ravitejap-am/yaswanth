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
import AMChatHeader from "../../../AMChatAdmin/AMChatHeader/AMChatHeader";
import Avatar from "@mui/material/Avatar";

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
  const [previewImage, setPreviewImage] = useState(
    "https://medicalpublic.s3.amazonaws.com/AMCHAT/UserDP_1707819604773.jpeg"
  );
  const [previewTitle, setPreviewTitle] = useState("");
  const [userData, setUserData] = useState({});
  const [fileList, setFileList] = useState([
    // {
    //   uid: "-1",
    //   name: "image.png",
    //   status: "done",
    //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // },
  ]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const PrintImage = () => {
    return (
      <div
        // className={Styles.EditOrgUserImageStyle}
        style={{
          width: "5.5rem",
          height: "180%",
          borderRadius: "50px",
          position: "relative",
          top: "-20px",
          left: "-18px",
        }}
      >
        {userData?.profileImagePath?.length > 0 && (
          <img
            src="https://medicalpublic.s3.amazonaws.com/AMCHAT/UserDP_1707819604773.jpeg"
            height={"80px"}
            width={"120px"}
          />
        )}
      </div>
    );
  };
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
      console.log("====================================");
      console.log(data, "*********************");
      console.log("====================================");
      if (data?.data?.profileImagePath?.length > 0) {
        const obj = {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: constants.BASE_USER_IMAGE_URL + data?.data?.profileImagePath,
        };
        setFileList([obj]);
      }
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

  // const handlePreview = (file) => {
  //   setPreviewImage(file.url);
  //   setPreviewOpen(true);
  //   setPreviewTitle(file.name);
  // };

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
    console.log(values.name);
    setButtonLoading(true); // Indicate the start of an asynchronous operation
  
    try {
      // Update user details
      const updateUserResponse = await fetch(`${constants.BASE_API_URL}/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          firstName: values["firstName"],
          lastName: values["lastName"],
        }),
      });
  
      if (!updateUserResponse.ok) {
        throw new Error(`HTTP error! status: ${updateUserResponse.status}`);
      }
  
      // Assuming the profile image update is dependent on the user details update success
      if (fileList.length > 0) { // Check if there is a file to upload
        const formData = new FormData();
        formData.append("image", fileList[0].originFileObj); // Assuming fileList is not empty
  
        const updateImageResponse = await fetch(`${constants.BASE_API_URL}/user/dp/${userId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          body: formData,
        });
  
        if (!updateImageResponse.ok) {
          throw new Error(`HTTP error! status: ${updateImageResponse.status}`);
        }
      }
  
      // Reset and notify on success
      setButtonLoading(false);
      setIsReset(true);
      showNotifyMessage("success", "User details and profile image updated successfully", messageHandler);
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      setButtonLoading(false);
      const errorMessage = error.message || "Failed to update user details and profile image";
      showNotifyMessage("error", errorMessage, messageHandler);
  
      // Navigate to error page if the error status is 500
      if (error instanceof Error && (error.message.includes("500"))) {
        navigate("/internal500");
      }
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
      initialValue: userData?.firstName ? userData?.firstName : "",
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
      initialValue: userData.lastName || "",
      rules: [{ required: true, message: "Please enter your name" }],
      labelName: false,
    },
    {
      name: "Email",
      label: "Email",
      type: "text",
      initialValue: userData.email || "",
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
      disabled: true,
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

  return (
    <div className={Styles.superAdminMainCardDivStyle}>
      <div className={Styles.superAdminMiddleParentDiv}>
        <div className={Styles.superAdminProfileCardStyle}>
          <AMChatHeader
            componentName="Edit User"
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
          <div className={Styles.imageUploadSection}>
            <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture-circle"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              // defaultFileList={[
              //   {
              //     uid: "-1",
              //     name: "profile.png",
              //     status: "done",
              // url: `${constants.BASE_API_URL}/${userData.profileImagePath}`,
              //     url: `https://medicalpublic.s3.amazonaws.com/AMCHAT/UserDP_1707819604773.jpeg`,
              //   },
              // ]}
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

          <div>
            <GeneralForm {...feedingVariable} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditOrgUser;
