import axios from 'axios';
import { useState } from 'react';

// import {   GET_ACTIVE_USERS } from './Constants';
import { UPDATE_ADMIN_USER, USER_PROFILE,GET_ACTIVE_USERS, CHAT, CHAT_OF_SESSION, PLAN_DETAILS, PLAN_DETAILS_BY_ID } from '../constants/Constant';

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

export const getChatResponse = async (body, headers) => {
  try {
    console.log('headers---->', headers);
    const data = await axios.post(
      `${CHAT}`,
      headers, body
    );
    return data;
  } catch (error) {
    console.log('Failed to get amchat response.', error);
    throw new Error('Failed to amchat response');
  }
};


export const getChatSessions = async (id, headers) => {
  try {
    console.log('headers---->', headers);
    const data = await axios.post(
      `${CHAT_OF_SESSION}${id}`,
      headers,
    );
    return data;
  } catch (error) {
    console.log('Failed to get chat session response.', error);
    throw new Error('Failed to get chat session');
  }
};

export const getPlanDetails = async ( headers) => {
  try {
    console.log('headers---->', headers);
    const data = await axios.get(
      `${PLAN_DETAILS}`,
      headers
    );
    return data;
  } catch (error) {
    console.log('Failed to get plan details.', error);
    throw new Error('Failed to get plan details.');
  }
};


export const getPlanDetailsById = async (id, headers) => {
  try {
    console.log('headers---->', headers);
    const data = await axios.post(
      `${PLAN_DETAILS_BY_ID}${id}`,
      headers
    );
    return data;
  } catch (error) {
    console.log('Failed to get plan details by id', error);
    throw new Error('Failed to get plan details by id');
  }
};
