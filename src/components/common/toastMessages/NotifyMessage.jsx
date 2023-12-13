import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const NotifyMessage = ({ messageHandler, message, type, position }) => {
  const notifyError = (position) =>
    toast.error(message, {
      position: position,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      onClose: messageHandler,
    });
  const notifyInfo = (position) =>
    toast.info(message, {
      position: position,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      onClose: messageHandler,
    });
  const notifyWarn = (position) =>
    toast.warn(message, {
      position: position,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      onClose: messageHandler,
    });
  const notifySucces = (position) =>
    toast.success(message, {
      position: position,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      onClose: messageHandler,
    });
  useEffect(() => {
    if (type == 'error') notifyError(position);
    if (type == 'info') notifyInfo(position);
    if (type == 'warn') notifyWarn(position);
    if (type == 'succes') notifySucces(position);
    // notify();
  });
  return <ToastContainer />;
};
export default NotifyMessage;
