import React from 'react'
import GeneralButton from '../../../components/common/buttons/GeneralButton'
import { Link } from 'react-router-dom'
import './SignHeader.css'
import headerVector from '../../../asset/headerVector.png'

const SignHeader = () => {
    return (
        <div className='signheader-main'>
            <div className='signheader-content'>
                <div className='signheader-amchattext'>
                    <h2>
                        AM-Chat <img className='headerVector-icon' src={headerVector} alt="" />
                    </h2>
                </div>
                <div className='signheader-buttoncontent'>
                    <div className='signheader-account'>
                        <Link to="/registerUser">Don’t have an account?</Link>
                    </div>
                    <div className='signheader-btn'>
                        <GeneralButton
                            name="Sign Up"
                            type="primary"
                            color="white"
                            backgroundColor="#6366F1"
                            width="120px"
                            padding="10px 16px"
                            height="40px"
                            borderRadius="30px"
                            icons={""}

                        />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SignHeader