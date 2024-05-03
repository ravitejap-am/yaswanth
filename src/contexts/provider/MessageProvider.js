import React, { createContext, useState } from 'react'
import NotifyMessage from '../../components/common/toastMessages/NotifyMessage'

export const MessageStateContext = createContext()

export const MessageProvider = ({ children }) => {
    const [buttonLoading, setButtonLoading] = useState(false)
    const [isReset, setIsReset] = useState(false)
    const [messageDetails, setMessageDetails] = useState({
        isShowMessage: false,
        type: '',
        message: '',
        messageHandler: () => {},
    })

    const showNotifyMessage = (type, message, messageHandler) => {
        setMessageDetails({
            isShowMessage: true,
            type,
            message,
            messageHandler,
        })
    }

    const hideNotifyMessage = () => {
        setMessageDetails({
            isShowMessage: false,
            type: '',
            message: '',
            messageHandler: () => {},
        })
    }

    return (
        <MessageStateContext.Provider
            value={{
                buttonLoading,
                setButtonLoading,
                isReset,
                setIsReset,
                showNotifyMessage,
                hideNotifyMessage,
            }}
        >
            {children}
            {messageDetails.isShowMessage && (
                <NotifyMessage
                    messageHandler={messageDetails.messageHandler}
                    type={messageDetails.type}
                    message={messageDetails.message}
                    position="bottom-center"
                />
            )}
        </MessageStateContext.Provider>
    )
}
