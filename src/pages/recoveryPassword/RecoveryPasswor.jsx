import React, { useState, useEffect } from "react";
import "./recoverpassword.module1.css";
import NotifyMessage from "../../components/common/toastMessages/NotifyMessage";
import axios from "axios";
import * as constants from "../../constants/Constant";
import { useMessageState } from "../../hooks/useapp-message";
import Footer from "../../pages/home/Footer/Footer";
import SignHeader from "../home/SignHeader/SignHeader";
import { useNavigate, Link } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import Logo from "../../asset/images/logo.png";
import back_navigation from "../../asset/back_navigation.png"
import { validateEmail } from "../../components/super-admin/validation";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";

const RecoveryPasswor = () => {
  let {
    buttonLoading,
    setButtonLoading,
    isReset,
    setIsReset,
    showNotifyMessage,
    hideNotifyMessage,
  } = useMessageState();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false); 


  const [values, setValues] = useState({
    email: "",
  });

  const dispatch = useDispatch();

  const [validations, setValidations] = useState({
    email: { isValid: true, errorMsg: "" },
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };



  const messageHandler = () => {
    setIsReset(false);
    hideNotifyMessage();
  };

  const validateDetails = () => {
    let flag = false;
    const isValidEmail = validateEmail(values.email);

    if (isValidEmail) {
      flag = true;
      setValidations((prev) => ({
        ...prev,
        email: {
          isValid: false,
          errorMsg: isValidEmail,
        },
      }));
    } else {
      setValidations((prev) => ({
        ...prev,
        email: {
          isValid: true,
          errorMsg: "",
        },
      }));
    }

    return flag;
  };

  const submitHandler = async (e) => {
    e.preventDefault()
    const isValidForm = validateDetails();
    if(!isValidForm){
      const url = `${constants.BASE_API_URL}${constants.MAIL_RECOVERY_PASSWORD_ENDPOINT}`;
      const data = {
        email: values.email,
      };
      try {
        const response = await axios.post(url, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setButtonLoading(false);
        setIsReset(true);
        showNotifyMessage("success", response?.data?.message, messageHandler);
      } catch (error) {
        if (
          error?.response?.status === 500 ||
          error?.response?.status === "500"
        ) {
          navigate("/customerSupport");
        }
  
        setButtonLoading(false);
        showNotifyMessage(
          "error",
          error?.response?.data?.message,
          messageHandler
        );
      }
    }
  };
  useEffect(() => {
    dispatch(setUser(null));
    localStorage.clear();


    window.scrollTo(0, 0);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  const buttonProps = {
    name: "Sign Up",
    type: "primary",
    color: "white",
    backgroundColor: "#6366F1",
    width: "120px",
    padding: "10px 16px",
    height: "40px",
    borderRadius: "30px",
    icons: "",
  };


  return (
    <div style={{overflowY:'auto', height:'100vh'}}>
      <div className="recoverpassword-header">
        <SignHeader
          title={<img src={Logo} alt="" width={120} />}
          linkText={!isMobile && "Don't have an account?"}
          linkTo="/registeruser"
          buttonText={buttonProps.name}
          buttonProps={buttonProps}
        />
      </div>
      <div className="recover-main-css">
        <Box className="text-top-signup" mb={3} >
        <Typography variant="h2" gutterBottom >Forgot Password</Typography>
       <Typography variant="body1" mt={4}gutterBottom color={'#1e293b'}> Please use your organisation email id.</Typography>
        </Box>
         <div className="signin-form-css" >

         <form onSubmit={submitHandler}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              error={!validations["email"].isValid}
              helperText={validations["email"].errorMsg}
              required
              fullWidth
              className="signin_input_css"
              placeholder="Email"
              sx={{ borderRadius: "50px", marginBottom: "16px" }}
            />

        <Button variant="contained" type="submit" color="primary" className="signin_submit_btn_css"
        style={{backgroundColor:constants.BUTTON_COLOUR}}
        >
          <Typography variant="button" display="block">
            Submit
          </Typography>
        </Button>
        <Box sx={{
          textAlign:'center',
          color: 'black',
        }}>
              <Typography variant="body2">
                <Link
                  to={"/signin"}
                  style={{
                    color: "black",
                  }}
                >
                 <img src={back_navigation} alt="back"  className="back-icon"/> Back to Login
                </Link>
              </Typography>
            </Box>
      </Box>
    </form>
         </div>
         {/* <br /> */}
         <br />

        <NotifyMessage />


      </div>
      <div className="forgotpass-footer">
          <Footer />
        </div>
    </div>
  );
};

export default RecoveryPasswor;
