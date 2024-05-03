import React, { useEffect, createRef, useState } from 'react'
import img1 from '../../../asset/contact.png'
import GeneralForm from '../../../components/common/forms/GeneralForm'
import { Form, Input, Grid } from 'antd'
import axios from 'axios'
import * as constants from '../../../constants/Constant'
import { useMessageState } from '../../../hooks/useapp-message'
import './ContactUp.css'
import { Link, useNavigate } from 'react-router-dom'
import {
    Typography,
    useMediaQuery,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    TextField,
    TextareaAutosize,
    Button,
    FormHelperText,
    CircularProgress,
} from '@mui/material'
import Thankyou from './Thankyou'
import {
    validatFirstName,
    validateEmail,
    validateFilledInput,
} from '../../../components/super-admin/validation'
import { LoadingButton } from '@mui/lab'
import Submit from '../../../components/common/buttons/Submit'

const { TextArea } = Input

const ContactUp = (props) => {
    const { selectPlan, setSelectPlan } = props
    const formRef = createRef()
    let {
        buttonLoading,
        setButtonLoading,
        isReset,
        setIsReset,
        showNotifyMessage,
        hideNotifyMessage,
    } = useMessageState()
    const navigate = useNavigate()
    const { useBreakpoint } = Grid
    const isMobile = useMediaQuery('(max-width:600px)')
    const [showThanksPopup, setShowThanksPopup] = useState(false)

    const smallTextStyles = isMobile
        ? {
              fontSize: '27px',
              lineHeight: '1.5',
          }
        : {}
    const screens = useBreakpoint()
    const [form] = Form.useForm()

    const [values, setValues] = useState({
        name: '',
        email: '',
        plan: '',
        comments: '',
    })

    const [validations, setValidations] = useState({
        name: { isValid: true, errorMsg: '' },
        email: { isValid: true, errorMsg: '' },
        plan: { isValid: true, errorMsg: '' },
        comments: { isValid: true, errorMsg: '' },
    })

    useEffect(() => {
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'auto' })
        }
        setValues({ ...values, plan: selectPlan })
    }, [selectPlan])

    const selectOptions = [
        { value: 'FREEMIUM', label: 'Freemium' },
        { value: 'PREMIUM', label: 'Standard' },
        { value: 'ENTERPRISE', label: 'Enterprise' },
    ]

    const messageHandler = () => {
        setIsReset(false)
        hideNotifyMessage()
    }

    const validateDetails = () => {
        let flag = false
        const errorMsg = 'Please enter your name'
        const isValidName = validateFilledInput(values.name, errorMsg)
        const isValidEmail = validateEmail(values.email)
        const message = 'Please select your plan'
        const isValidPlan = validateFilledInput(values.plan, message)

        if (isValidName) {
            flag = true
            console.log('inside invalid name', isValidName)
            setValidations((prev) => ({
                ...prev,
                name: {
                    isValid: false,
                    errorMsg: isValidName,
                },
            }))
        } else {
            setValidations((prev) => ({
                ...prev,
                name: {
                    isValid: true,
                    errorMsg: '',
                },
            }))
        }

        if (isValidEmail) {
            flag = true
            console.log('inside invalid email', isValidEmail)
            setValidations((prev) => ({
                ...prev,
                email: {
                    isValid: false,
                    errorMsg: isValidEmail,
                },
            }))
        } else {
            setValidations((prev) => ({
                ...prev,
                email: {
                    isValid: true,
                    errorMsg: '',
                },
            }))
        }

        if (isValidPlan) {
            flag = true
            console.log('inside invalid plan', isValidPlan)
            setValidations((prev) => ({
                ...prev,
                plan: {
                    isValid: false,
                    errorMsg: isValidPlan,
                },
            }))
        } else {
            setValidations((prev) => ({
                ...prev,
                plan: {
                    isValid: true,
                    errorMsg: '',
                },
            }))
        }
        return flag
    }

    const submitHandler = async () => {
        // e.preventDefault()
        console.log('submit hanler function is executed')
        console.log('values---->', values)

        const isValidForm = validateDetails()

        console.log('isValidForm---->', isValidForm)

        if (!isValidForm) {
            setButtonLoading(true)
            console.log('contact up', values)
            try {
                const response = await axios.post(
                    `${constants.BASE_API_URL}/user/contactUs`,
                    {
                        name: values.name,
                        emailId: values.email,
                        status: true,
                        plan: values.plan,
                        comments: values.comments,
                        createdBy: 'admin',
                        updatedBy: 'admin',
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                )
                setButtonLoading(false)
                setIsReset(true)
                setShowThanksPopup(true)
                // showNotifyMessage("success", response?.data?.message, messageHandler);
            } catch (error) {
                if (
                    error?.response?.status == 500 ||
                    error?.response?.status == '500'
                ) {
                    navigate('/customerSupport')
                }

                setButtonLoading(false)
                showNotifyMessage(
                    'error',
                    error?.response?.data?.message,
                    messageHandler
                )
            }
        }
    }

    const handleClose = (event) => {
        setShowThanksPopup(false)
    }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }

    return (
        <div className="Contact-us-page-main-div">
            {screens.sm || screens.lg ? (
                <div className="Contact-usi-left-side-img">
                    <img
                        src={img1}
                        alt="contact-image"
                        className="contact-us-image-style"
                    />
                </div>
            ) : (
                ''
            )}
            <div className="Contact-us-page-ant-form">
                <div>
                    <Typography
                        variant="h4"
                        className="Contact-us-form-title"
                        sx={smallTextStyles}
                    >
                        Contact Us
                    </Typography>
                    <Typography
                        variant="body2"
                        mt={2}
                        mb={2}
                        className="Contact-us-form-sub-title"
                    >
                        To get in touch with AM-Chat team, simply fill out the
                        form below, and one of us will reach out to you as soon
                        as possible.
                    </Typography>
                </div>
                <div className="Contact-Us-General-Form-Style">
                    <TextField
                        name="name"
                        label="Name"
                        value={values.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        className="contact_input_css custom_input input_text"
                        error={!validations['name'].isValid}
                        helperText={validations['name'].errorMsg}
                        InputLabelProps={{
                            style: { color: 'white' },
                        }}
                    />
                    <TextField
                        name="email"
                        label="Email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        className="contact_input_css custom_input input_text"
                        error={!validations['email'].isValid}
                        helperText={validations['email'].errorMsg}
                        InputLabelProps={{
                            style: { color: 'white' },
                        }}
                    />
                    <FormControl
                        size="large"
                        margin="normal"
                        required
                        error={!validations['plan'].isValid}
                    >
                        <InputLabel id="Select-plan" style={{ color: 'white' }}>
                            Select Plan
                        </InputLabel>
                        <Select
                            labelId="Select-plan"
                            name="plan"
                            id="Select-plan"
                            label="Select Plan"
                            className="contact_input_css custom_input"
                            onChange={handleChange}
                            value={values?.plan}
                        >
                            {selectOptions?.length > 0 &&
                                selectOptions.map((item) => {
                                    return (
                                        <MenuItem value={item.value}>
                                            {item.label}
                                        </MenuItem>
                                    )
                                })}
                        </Select>
                        {validations['plan'].errorMsg && (
                            <FormHelperText style={{ color: 'red' }}>
                                {validations['plan'].errorMsg}
                            </FormHelperText>
                        )}
                    </FormControl>

                    <TextField
                        label="Comments"
                        name="comments"
                        multiline
                        maxRows={2}
                        // maxRows={2}
                        margin="normal"
                        className="comment_input_css custom_comment .comment_text"
                        style={{ color: 'white', marginBottom: '16px' }}
                        InputLabelProps={{
                            style: { color: 'white' },
                        }}
                        onChange={handleChange}
                    />
                    <Submit
                        backgroundColor={constants.BUTTON_COLOUR}
                        buttonLoading={buttonLoading}
                        btnText={'Submit'}
                        submitHandler={submitHandler}
                    />
                </div>
            </div>
        </div>
    )
}

export default ContactUp
