import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const messageTypes = ['error', 'info', 'warn', 'success'];

const NotifyMessage = ({
  messageHandler,
  message,
  type,
  theme = 'light',
}) => {
  const notifyMessage = (type) =>
    toast[type](message, {
      position: "top-center",
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
      notifyMessage(type);
    } else {
      notifyMessage('info');
    }
  }, [message, type, messageHandler, theme]);

  const customToastStyles = `
    .Toastify__toast--error {
      background:  var(--Red-rose-50, #FFF1F2);
      color: rgba(225, 29, 72, 1);
      border-radius: 6px;
      width: 500px;
      padding: 16px;
    }
    .Toastify__toast--warning {
      border: 1px solid rgba(217, 119, 6, 1);
      background: rgba(254, 243, 199, 1);
      color: rgba(217, 119, 6, 1);
      border-radius: 6px;
      width: 500px;
      padding: 16px;
    }
    .Toastify__toast--success {
      border: 1px solid rgba(0, 128, 0, 1); /* Green border */
      background: var(--Teal-teal-50, #F0FDFA); /* Light green background */
      color: rgba(0, 128, 0, 1); /* Green text color */
      border-radius: 6px;
      width: 500px;
      padding: 16px;
    }
  `;

  const styleTag = document.createElement('style');
  styleTag.type = 'text/css';
  styleTag.appendChild(document.createTextNode(customToastStyles));
  document.head.appendChild(styleTag);

  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      style={{ left: "45%" }}  // Adjust the left position as needed
    />
  );
};

export default NotifyMessage;
