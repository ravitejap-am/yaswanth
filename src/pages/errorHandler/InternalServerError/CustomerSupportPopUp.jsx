import { useState } from 'react'
import { Modal } from 'antd'
import Style from './page505.module.css'

const CustomerSupportPopUp = (props) => {
    console.log('props---->', props)
    const { isOpen, setIsOpen, handleVerification, handleCancelVerification } =
        props
    return (
        <Modal
            title="Something went wrong"
            centered
            open={isOpen}
            onOk={() => handleVerification()}
            okText="Retry"
            cancelButtonProps={{ style: { display: 'none' } }}
            onCancel={() => handleCancelVerification()}
        >
            <p>Please contact our customer support team</p>
        </Modal>
    )
}

export default CustomerSupportPopUp
