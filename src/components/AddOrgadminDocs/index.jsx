import React, { useEffect, useState } from 'react';
import Styles from './OrgAddDocument.module.css';
import { selectUser } from '../../store/authSlice';
import axios from 'axios';
import { useSelector } from 'react-redux';
import * as constants from '../../../src/constants/Constant';
import { Upload, Button, Input, Form, Spin } from 'antd';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useMessageState } from '../../../src/hooks/useapp-message';
import Layout from '../../Layout';
import { Box, Typography, useMediaQuery } from '@mui/material';
import PageLoader from '../loader/loader';
import { trimFileNameBeforeExtension } from '../../utils/fileNameExtraction';
function AddOrgDocuments() {
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
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    const storedFirstName = localStorage.getItem('firstNameOrganisation');
    setFirstName(storedFirstName);
  }, []);

  const user = useSelector(selectUser);
  const jwt = user.userToken;
  const [errors, setErrors] = useState('');
  const [fileName, setFileName] = useState('');
  const isMobile = useMediaQuery('(max-width:600px)');

  const messageHandler = () => {
    setIsReset(false);
    hideNotifyMessage();
  };
  const submitHandler = async () => {
    // console.log('upload values', values);

    if (!file) {
      setErrors('Please upload the document');
      return;
    }
    if (trimFileNameBeforeExtension(file?.name).lenght > 50) {
      setErrors('File name should be less than 50 characters');
    }
    setErrors('');
    try {
      setButtonLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', trimFileNameBeforeExtension(file?.name));
      console.log('formData', formData);
      const response = await axios.post(
        `${constants.BASE_DOC_API_URL}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setButtonLoading(false);
      setIsReset(true);
      setErrors('');
      showNotifyMessage('success', response?.data?.message, messageHandler);
      navigate('/documents');
      console.log('API Response:', response.data);
    } catch (error) {
      setErrors('');
      console.error('Error occurred:', error);
      showNotifyMessage(
        'error',
        error?.response?.data?.message,
        messageHandler
      );
      if (error?.response?.status == 500 || error?.response?.status == '500') {
        navigate('/customerSupport');
      }
      setButtonLoading(false);
    }
  };

  const cancelHandler = (values) => {
    console.log('Form values:', values);
    navigate('/documents');
  };

  const documentProps = {
    name: 'file',
    fileList: file ? [file] : [],
    beforeUpload: (file) => {
      setFile(file);

      return false;
    },
    onRemove: (file) => {
      setFile(null);
      return false;
    },
    accept: '.pdf',
    onchange: () => {},
  };

  const ErrorMsg = () => {
    return (
      <span style={{ color: 'red', fontSize: '14px', padding: '10px' }}>
        {errors}
      </span>
    );
  };

  return (
    <Layout componentName="Add document">
      <PageLoader loadingStatus={buttonLoading} />
      <Box
        sx={{
          background: 'var(--White, #fff)',
          boxShadow: '0px 2.789px 6.972px 3.486px rgba(0, 0, 0, 0.09)',
          width: '100%',
          height: '85%',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              md: 'row',
              lg: 'row',
              xl: 'row',
              xs: 'column',
            },
            padding: '10px',
            gap: '1em',
            alignItems: 'baseline',
            height: '4em',
          }}
        >
          <Input
            value={!!file?.name ? trimFileNameBeforeExtension(file?.name) : ''}
            placeholder="Upload Document"
            className="Adddoc_input_css"
            style={{
              height: '50px',
              borderRadius: '40px',
              maxWidth: '495px',
              color: '#212529',
              background: 'transperent',
              minWidth: {
                md: '495px',
                lg: '495px',
                xl: '495px',
                xs: '50%',
              },
            }}
            disabled
          />
          <Box
            sx={{
              maxWidth: '10em',
            }}
          >
            <Upload {...documentProps}>
              <Button icon={<UploadOutlined />}></Button>
            </Upload>
          </Box>
        </Box>
        {!!!file?.name ? <ErrorMsg /> : ''}

        <Box
          sx={{
            display: 'flex',
            justifyContent: isMobile ? 'center' : 'flex-end',
            gap: '1em',
            padding: '10px',
            marginTop: {
              xs: file?.name ? '2em' : '0px',
            },
          }}
        >
          <Button onClick={cancelHandler} className={Styles.cancelButton}>
            <Typography variant="button"> Cancel</Typography>
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className={Styles.addButtonStyle}
            onClick={() => submitHandler()}
          >
            <Typography variant="button"> Add</Typography>
          </Button>
        </Box>
      </Box>
    </Layout>
  );
}

export default AddOrgDocuments;
