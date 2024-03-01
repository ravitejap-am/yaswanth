import axios from 'axios';
import { useState } from 'react';

import { USER_PROFILE, UPDATE_ADMIN_USER, GET_ACTIVE_USERS } from './Constants';

export const getUserProfileDetails = async (userId, headers) => {
  try {
    console.log('userId----->', userId);
    console.log('headers---->', headers);
    const data = await axios.get(
      `${USER_PROFILE}/${userId}/getUserProfile`,
      headers
    );
    return data;
  } catch (error) {
    console.log('Failed to fetch user profile.', error);
    throw new Error('Failed to fetch user profile-1');
  }
};

export const updateAdminProfileDetails = async (userId, headers, reqBody) => {
  try {
    console.log('userId----->', userId);
    console.log('headers---->', headers);
    const data = await axios.put(
      `${UPDATE_ADMIN_USER}/${userId}`,
      reqBody,
      headers
    );
    return data;
  } catch (error) {
    console.log('Failed to update user profile.', error);
    throw new Error('Failed to update user profile');
  }
};


export const getActiveUserList = async ( headers) => {
  try {
    console.log('headers---->', headers);
    const data = await axios.get(
      `${GET_ACTIVE_USERS}`,
      headers
    );
    return data;
  } catch (error) {
    console.log('Failed to get users.', error);
    throw new Error('Failed to get users');
  }
};
