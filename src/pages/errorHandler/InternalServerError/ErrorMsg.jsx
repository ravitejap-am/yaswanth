import { useState } from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setErrorMsg } from '../../../store/authSlice';


const ErrorMsg = (props) => {
    const {message} = props
    const {title, content} = message
    // const handleCancelVerification=useSelector(state=>state.auth.handleCancelVerification)
    const handleVerification=useSelector(state=>state.auth.handleVerification)
    const onOkButtonText = useSelector(state => state.auth.onOkButtonText)

    const dispatch=useDispatch();
    const onClose=()=>{
        // if(handleCancelVerification){
        //     handleCancelVerification();
        // }
        dispatch(setErrorMsg({message:{},handleVerification: null,onOkButtonText:"" }))  
    }

    const onHandleOk = () => {
        if(handleVerification){
            handleVerification()
        }
        dispatch(setErrorMsg({message:{},handleVerification: null,onOkButtonText: ""})) 
    }

    return(
    <Modal
    title={title}
    centered
    open={true}
    onOk={() => {onHandleOk()}}
    okText={onOkButtonText}
    cancelButtonProps={{ style: { display: 'none' } }} 
    onCancel={() =>{ onClose()}}
  >
    <p>{content}</p>
  </Modal>
    )
}

export default ErrorMsg;