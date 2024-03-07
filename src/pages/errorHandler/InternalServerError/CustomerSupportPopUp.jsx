import { useState } from 'react';
import { Modal } from 'antd';
import Style from "./page505.module.css";

const CustomerSupportPopUp = (props) => {
    // const [isOpen , setIsOpen] = useState(value)
    const {isOpen, setIsOpen } = props

    return(
    <Modal
    title="Something went wrong"
    centered
    open={isOpen}
    onOk={() => setIsOpen(false)}
    onCancel={() => setIsOpen(false)}
  >
    <p className={Style.cutomerSupportMsgError}>Please contact our customer support team</p>
  </Modal>
    )
}

export default CustomerSupportPopUp;