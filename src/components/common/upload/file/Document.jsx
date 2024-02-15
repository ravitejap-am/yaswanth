import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Upload, Modal, message } from 'antd';

const Document = (props) => {
  const { setFile, numberOfImage, fileType, fileSize, url, form, name } = props;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const handleCancel = () => setPreviewOpen(false);
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
  const fileValidation = (file) => {
    console.log();
    let isValidFormat = false;
    if (fileType != undefined) {
      isValidFormat = file.type === fileType;
    } else {
      isValidFormat = true;
    }

    if (!isValidFormat && fileType != undefined) {
      message.error(`You can only upload ${fileType} file!`);
      return;
    }
    const isValidSize = file.size / 1024 / 1024 < fileSize;
    if (!isValidSize) {
      message.error(`Image must smaller than ${fileSize}MB!`);
      return;
    }
    return isValidFormat && isValidSize;
  };
  const handleChange = ({ file: file, fileList: newFileList }) => {
    const isFileValid = fileValidation(file);
    if (isFileValid) {
      console.log(newFileList);
      setFileList(newFileList);
      setFile(newFileList);
      if (form != undefined && !!name) {
        form.setFieldsValue({ [name]: [...newFileList] });
      }
    }
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
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
      </Modal>
    </>
  );
};

export default Document;
