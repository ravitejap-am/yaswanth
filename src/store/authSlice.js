import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    organisation: {
      organisationStatus: '',
      organisationData: null,
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setOrganisationStatus: (state, action) => {
      state.organisation.organisationStatus = action.payload;
    },
    setOrganisationData: (state, action) => {
      state.organisation.organisationData = action.payload;
    },
  },
});

export const { setUser, setOrganisationStatus, setOrganisationData } =
  authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const selectOrganisation = (state) => state.auth.organisation;
export default authSlice.reducer;
