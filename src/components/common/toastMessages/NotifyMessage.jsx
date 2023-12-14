import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const messageTypes = ['error', 'info', 'warn', 'success'];
const NotifyMessage = ({
  messageHandler,
  message,
  type,
  position,
  theme = 'light',
}) => {
  const notifyMessage = (position, type) =>
    toast[type](message, {
      position: position,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme,
      onClose: messageHandler,
    });
  useEffect(() => {
    if (messageTypes.includes(type)) {
      notifyMessage(position, type);
    } else {
      notifyMessage(position, 'info');
    }
  });
  return <ToastContainer /> ;
};
export default NotifyMessage;
