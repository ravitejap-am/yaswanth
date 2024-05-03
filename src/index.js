// index.js
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { persistor, store } from '../src/store/config'
import { MessageProvider } from './contexts/provider/MessageProvider'
import { ChatProvider } from './contexts/provider/ChatContext'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
    typography: {
        fontFamily: [
            'Montserrat', // Add your preferred font family here
            'Arial', // Backup font in case the preferred font is not available
            'sans-serif',
        ].join(','),
        h1: {
            fontWeight: 600, // Bold
        },
        h2: {
            fontWeight: 600, // Bold
        },
        h3: {
            fontWeight: 600, // Bold
        },
        h4: {
            fontWeight: 600, // Bold
        },
        h5: {
            fontWeight: 500, // Semi-bold
        },
        h6: {
            fontWeight: 500, // Semi-bold
        },
    },
})
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <MessageProvider>
                    <ChatProvider>
                        <ThemeProvider theme={theme}>
                            <App />
                        </ThemeProvider>
                    </ChatProvider>
                </MessageProvider>
            </PersistGate>
        </Provider>
    </BrowserRouter>
)
