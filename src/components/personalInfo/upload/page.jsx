import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import { BASE_API_URL } from '../../../constants/Constant';
import axios from 'axios';
import { setUser, selectUser } from '../../../store/authSlice';
import { useSelector } from 'react-redux';
import { useMessageState } from '../../../hooks/useapp-message';
import CircularFileInput from './circularFileInfo';
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const UploadProfilePic = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState(
    localStorage.getItem('userImageUrl') != undefined
      ? [
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: localStorage.getItem('userImageUrl'),
          },
        ]
      : []
  );
  const [isFirst, setIsFirst] = useState(true);
  const [file, setFile] = useState(null);
  let {
    buttonLoading,
    setButtonLoading,
    isReset,
    setIsReset,
    showNotifyMessage,
    hideNotifyMessage,
  } = useMessageState();
  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  //   console.log(e.target.files[0]);
  // };

  const user = useSelector(selectUser);
  const jwt = user.userToken;

  const handleCancel = () => {
    setIsFirst(true);
    setPreviewOpen(false);
  };
  const messageHandler = () => {
    hideNotifyMessage();
  };
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => {
    console.log('filelist', fileList[0]?.originFileObj);
    setFileList(newFileList);
    if (fileList[0]?.originFileObj != undefined && isFirst) {
      uploadFile(fileList[0]?.originFileObj);
    }
  };
  const handleFileChange = (file) => {
    // Handle file change here
    uploadFile(file);
  };
  const uploadFile = async (file) => {
    setIsFirst(false);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(`${BASE_API_URL}/user/dp`, formData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      showNotifyMessage('success', response?.data?.message, messageHandler);
    } catch (error) {
      console.log(error);
      showNotifyMessage('error', error?.message, messageHandler);
    }
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
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
  return (
    <>
      <CircularFileInput onChange={handleFileChange} />
      {/* <Upload
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture-circle"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload> */}
      {/* <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload</button> */}
      {/* <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal> */}
    </>
  );
};
export default UploadProfilePic;
