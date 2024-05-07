import React from 'react'
import {
    GoogleOutlined,
    AppleOutlined,
    MailOutlined,
    FormOutlined,
} from '@ant-design/icons'
import './buttons.css'
const AuthButton = ({ name, type, buttonHandler }) => {
    return (
        <div
            className="sso center butooneffect"
            onClick={buttonHandler}
            style={{}}
        >
            {type == 'google' && (
                <GoogleOutlined
                    className="buttonColor center"
                    style={{ fontSize: '30px', width: '30%' }}
                />
            )}
            {type == 'apple' && (
                <AppleOutlined
                    className="buttonColor center"
                    style={{ fontSize: '30px', width: '30%' }}
                />
            )}
            {type == 'mail' && (
                <MailOutlined
                    className="buttonColor center"
                    style={{ fontSize: '30px', width: '30%' }}
                />
            )}
            {type == 'form' && (
                <FormOutlined
                    className="buttonColor center"
                    style={{ fontSize: '30px', width: '30%' }}
                />
            )}

            <h3 className="buttonColor" style={{ width: '80%' }}>
                {name}
            </h3>
        </div>
    )
}

export default AuthButton
