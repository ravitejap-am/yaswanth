import React, { useEffect, useState } from 'react';
import Styles from './OrgAddDocument.module.css';
import { selectUser } from '../../store/authSlice';
import axios from 'axios';
import { useSelector } from 'react-redux';
import * as constants from '../../../src/constants/Constant';
import { Upload, Button, Input, Form, Spin } from 'antd';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useMessageState } from '../../../src/hooks/useapp-message';
import Layout from '../../Layout';
import { Box, Typography, useMediaQuery } from '@mui/material';
import PageLoader from '../loader/loader';
import { trimFileNameBeforeExtension } from '../../utils/fileNameExtraction';
import { tokenDecodeJWT } from '../../utils/authUtils';
import { scopes } from '../../constants/scopes';

const tempData = [
  'CHU',
  'CHR',
  'CHD',
  'CHC',
  'UU',
  'UR',
  'UD',
  'UC',
  'DCQR',
  'DCR',
  'DCC',
  'DCD',
  // 'DCU',
];

function UpdateOrgAdminDoc() {
  let {
    buttonLoading,
    setButtonLoading,
    isReset,
    setIsReset,
    showNotifyMessage,
    hideNotifyMessage,
  } = useMessageState();
  const { documentId } = useParams();
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const isAndroid = /Android/.test(navigator.userAgent);

  useEffect(() => {
    const storedFirstName = localStorage.getItem('firstNameOrganisation');
    console.log('storedFirstName--->', storedFirstName);
    setFirstName(storedFirstName);
  }, []);

  const user = useSelector(selectUser);
  const jwt = user.userToken;
  const permittedScopes = tokenDecodeJWT(jwt).scopes;
  // const permittedScopes = tempData;
  const [errors, setErrors] = useState('');
  const [fileName, setFileName] = useState('');
  const [isDirty, setIsDirty] = useState(true);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const messageHandler = () => {
    setIsReset(false);
    hideNotifyMessage();
  };
  const submitHandler = async () => {
    if (!!file) {
      // if (
      //   file?.name !=
      //   localStorage.getItem("documentName")
      // ) {
      //   showNotifyMessage(
      //     "error",
      //     "Uploading file with different name is not allowed. Please try to the file with same name",
      //     messageHandler
      //   );

      //   return;
      // }
      if (file?.name.length > 50) {
        showNotifyMessage(
          'error',
          'File name should be less than 50 characters',
          messageHandler
        );

        return;
      }
    }

    if (isSubmitting) {
      return;
    }
    if (!file) {
      showNotifyMessage('error', 'Please upload the document', messageHandler);

      return;
    }

    setIsSubmitting(true);
    setButtonLoading(true);
    setErrors('');
    console.log('isSubmiting falses');
    try {
      setButtonLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      // formData.append("name", file?.name);
      console.log('formData', formData);
      const response = await axios.put(
        `${constants.BASE_DOC_API_URL}${documentId}`,
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
      setIsDirty(false);
      return false;
    },
    onRemove: (file) => {
      setFile(null);
      setIsDirty(true);
      return false;
    },
    accept: '.pdf,.PDF,application/pdf',
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
    <Layout componentName="Update document">
      <PageLoader loadingStatus={buttonLoading} />
      <Box
        sx={{
          width: '100%',
          height: '85%',

          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          marginTop: isMobile ? '2em' : '0px',
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
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Input
              value={
                !!file?.name ? file?.name : localStorage.getItem('documentName')
              }
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
            {!!!file?.name ? <ErrorMsg /> : ''}
          </div>

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

        <Box
          sx={{
            display: 'flex',
            justifyContent: isMobile ? 'center' : 'flex-end',
            gap: '1em',
            padding: '10px',
            marginTop: {
              xs: file?.name ? '2em' : '0px',
            },
            marginBottom: {
              xs: isAndroid ? '1em' : '3.5em',
            },
          }}
        >
          <Button onClick={cancelHandler} className={Styles.cancelButton}>
            <Typography variant="button"> Cancel</Typography>
          </Button>
          {permittedScopes?.includes(scopes.DCU) && (
            <Button
              type="primary"
              htmlType="submit"
              className={Styles.addButtonStyle}
              onClick={() => submitHandler()}
              disabled={isDirty}
            >
              <Typography variant="button">Update</Typography>
            </Button>
          )}
        </Box>
      </Box>
    </Layout>
  );
}

export default UpdateOrgAdminDoc;
