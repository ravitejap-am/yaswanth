import React, { useState } from 'react'
import Styles from './OrgAddDocument.module.css'
import { selectUser } from '../../store/authSlice'
import axios from 'axios'
import { useSelector } from 'react-redux'
import * as constants from '../../../src/constants/Constant'
import { Upload, Button, Input } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useMessageState } from '../../../src/hooks/useapp-message'
import Layout from '../../Layout'
import { Box, Typography, useMediaQuery } from '@mui/material'
import PageLoader from '../loader/loader'
import { trimFileNameBeforeExtension } from '../../utils/fileNameExtraction'
function AddOrgDocuments() {
    const isAndroid = /Android/.test(navigator.userAgent)
    let {
        buttonLoading,
        setButtonLoading,
        isReset,
        setIsReset,
        showNotifyMessage,
        hideNotifyMessage,
    } = useMessageState()
    const [file, setFile] = useState(null)
    const navigate = useNavigate()

    const user = useSelector(selectUser)
    const jwt = user.userToken
    const [errors, setErrors] = useState('')
    const [isDirty, setIsDirty] = useState(true)
    const isMobile = useMediaQuery('(max-width:600px)')

    const messageHandler = () => {
        setIsReset(false)
        hideNotifyMessage()
    }
    const submitHandler = async () => {
        // console.log('upload values', values);

        if (!file) {
            setErrors('Please upload the document')
            return
        }
        if (trimFileNameBeforeExtension(file?.name).lenght > 50) {
            setErrors('File name should be less than 50 characters')
        }
        setErrors('')
        try {
            setButtonLoading(true)
            const formData = new FormData()
            formData.append('file', file)
            formData.append('name', file?.name)
            console.log("form data--->",formData);
            const response = await axios.post(
                `${constants.BASE_DOC_API_URL}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
            console.log("response---->",response);
            setButtonLoading(false)
            setIsReset(true)
            setErrors('')
            showNotifyMessage(
                'success',
                response?.data?.message,
                messageHandler
            )
            navigate('/documents')
        } catch (error) {
            setButtonLoading(false)
            console.log("error---->",error);
            console.log("axios error---->",error?.status);
            if (error?.status === 408) {
                console.log('timed out error')
                showNotifyMessage(
                    'error',
                    'Looks like request has timed out. Please retry',
                    messageHandler
                )
                return
            }
            setErrors('')

            showNotifyMessage(
                'error',
                error?.response?.data?.message,
                messageHandler
            )
            if (
                error?.response?.status == 500 ||
                error?.response?.status == '500'
            ) {
                navigate('/customerSupport')
            }
        }
    }

    const cancelHandler = (values) => {
        console.log('Form values:', values)
        navigate('/documents')
    }

    const documentProps = {
        name: 'file',
        fileList: file ? [file] : [],
        beforeUpload: (file) => {
            setFile(file)
            setIsDirty(false)
            return false
        },
        onRemove: (file) => {
            setFile(null)
            setIsDirty(true)
            return false
        },
        accept: '.pdf,.PDF,application/pdf',
        onchange: () => {},
    }

    const ErrorMsg = () => {
        return (
            <span style={{ color: 'red', fontSize: '14px', padding: '10px' }}>
                {errors}
            </span>
        )
    }

    return (
        <Layout componentName="Add document">
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
                    }}
                >
                    <Box
                     sx={{
                        minWidth: {
                            md: '495px',
                            xs: '100%',
                        },
                     }}
                    >
                    <Input
                        value={!!file?.name ? file?.name : ''}
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
                    <Typography
                        variant="subtitle1"
                        style={{
                            fontSize: '16px',
                            color: 'grey',
                            paddingLeft: '5px',
                        }}
                    >
                        (Supported files&nbsp;&nbsp;.pdf)
                    </Typography>
                    </Box>
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
                        marginBottom: {
                            xs: isAndroid ? '1em' : '3.5em',
                        },
                    }}
                >
                    <Button
                        onClick={cancelHandler}
                        className={Styles.cancelButton}
                    >
                        <Typography variant="button"> Cancel</Typography>
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className={Styles.addButtonStyle}
                        onClick={() => submitHandler()}
                        disabled={isDirty}
                    >
                        <Typography variant="button"> Add</Typography>
                    </Button>
                </Box>
            </Box>
        </Layout>
    )
}

export default AddOrgDocuments
