import React from 'react';
import GeneralForm from "../../components/common/forms/GeneralForm";

const ChangePassword = ({ setFileSysytem, validateEmail }) => {
    const validatePassword = (_, value) => {
        if (value && value.length < 8) {
          return Promise.reject("Password must be at least 8 characters");
        } else {
          return Promise.resolve();
        }
      };


    const feedingVariable = {
        isCancel: false,
        cancelHandler: () => {
            console.log("Canceling....");
        },
        isSubmit: true,
        submitHandler: () => {
            console.log("Submitting ChangePassword form....");
        },
        submitButtonProperty: {
            name: "Submit",
            color: "white",
            backgroundColor: "#6366F1",
            type: "primary",
            width: "150px",
            height: "50px",
            borderRadius: "35px",
            marginTop:"5px"
            
        },
        formElements: [
            {
                label: "Old Password",
                type: "password",
                name: "password",
                rules: [
                  { required: true, message: "Please input a valid password!" },
                  { validator: validatePassword },
                ],
                style: { width: "350px" ,marginTop:"40px",marginLeft:"20px"}
              },
              {
                label: "New Password",
                type: "password",
                name: "password",
                rules: [
                  { required: true, message: "Please input a valid password!" },
                  { validator: validatePassword },
                ],
                style: { width: "350px",marginLeft:"20px"}
              },
              {
                label: "Confirm Password",
                type: "password",
                name: "confirmPassword",
                rules: [
                  { required: true, message: "Please confirm your password!" },
                ],
                style: { width: "350px",marginLeft:"20px" }
              }
        ],
        formType: "normal",
        validateEmail: validateEmail,
        setFileSysytem: setFileSysytem,
        grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }

    };

    return (
        <div className='changepassword-main'>
            <div className='changepassword-input'>
                <GeneralForm {...feedingVariable} />
            </div>
        </div>
    );
}

export default ChangePassword;
