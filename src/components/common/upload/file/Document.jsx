import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, Modal, message } from "antd";

const Document = (props) => {
  const { setFile, numberOfImage, fileType, fileSize, url, name } = props;
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const fileValidation = (file) => {
    // Validate file type
    if (fileType && file.type !== fileType) {
      message.error(`You can only upload ${fileType} files!`);
      return false;
    }

    // Validate file size
    const isSizeValid = file.size / 1024 / 1024 < fileSize;
    if (!isSizeValid) {
      message.error(`File must be smaller than ${fileSize}MB!`);
      return false;
    }

    return true;
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleChange = async ({ file, fileList: newFileList }) => {
    if (file) {
      const isValid = fileValidation(file);
      if (isValid) {
        setFileList(newFileList);
        setFile(file.originFileObj); // Set the file object to the state
      }
    } else {
      setFileList(newFileList);
    }
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewVisible(true);
    setPreviewImage(file.url || file.preview);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleCancel = () => setPreviewVisible(false);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        action={url}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= numberOfImage ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="Preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default Document;
