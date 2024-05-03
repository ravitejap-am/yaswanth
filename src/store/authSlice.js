import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',

    initialState: {
        user: null,
        errorMsg: '',
        callback: null,
        // handleCancelVerification: null,
        handleVerification: null,
        onOkButtonText: '',
        organisation: {
            organisationStatus: '',
            organisationData: null,
        },
        chatSessionId: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setOrganisationStatus: (state, action) => {
            state.organisation.organisationStatus = action.payload
        },
        setOrganisationData: (state, action) => {
            state.organisation.organisationData = action.payload
        },
        setErrorMsg: (state, action) => {
            state.errorMsg = action.payload.message
            // console.log(" message action ",action.payload);
            // state.callback = action?.payload?.callback
            // state.handleCancelVerification = action?.payload?.handleCancelVerification
            state.handleVerification = action?.payload?.handleVerification
            state.onOkButtonText = action?.payload?.onOkButtonText
        },
        setChatSessionId: (state, action) => {
            state.chatSessionId = action.payload
        },
    },
})

export const {
    setUser,
    setOrganisationStatus,
    setOrganisationData,
    setErrorMsg,
    setChatSessionId,
} = authSlice.actions
export const selectUser = (state) => state.auth.user
export const selectOrganisation = (state) => state.auth.organisation
export const selectSessionId = (state) => state.auth.chatSessionId
export default authSlice.reducer
