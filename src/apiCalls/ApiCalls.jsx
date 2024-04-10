import axios from 'axios';
import { useState } from 'react';

// import {   GET_ACTIVE_USERS } from './Constants';
import { UPDATE_ADMIN_USER, USER_PROFILE,GET_ACTIVE_USERS, CHAT, CHAT_OF_SESSION, PLAN_DETAILS, PLAN_DETAILS_BY_ID, LIST_OF_CHAT_SESSIONS, DEFAULT_QUESTIONS, INDIVIDUAL_SESSION_CHAT, USAGE_SUBSCRIPTION } from '../constants/Constant';

export const getUserProfileDetails = async (userId, headers) => {
  try {
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
    const data = await axios.post(
      `${CHAT}`,
       body, {headers: headers}
    );
    return data;
  } catch (error) {
    console.log('Failed to get amchat response.', error);
    throw new Error('Failed to amchat response');
  }
};


export const getChatSessions = async (id, headers) => {
  try {
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
    const data = await axios.get(
      `${DEFAULT_QUESTIONS}`,
      headers
    );
    return data;
  } catch (error) {
    console.log('Failed to get default questions', error);
    throw new Error('Failed to get default questions');
  }
};


export const getSessionList = async (headers) => {
  try {
    const data = await axios.get(
      `${LIST_OF_CHAT_SESSIONS}`,
      {headers: headers}
    );
    return data;
  } catch (error) {
    console.log('Failed to get session list', error);
    throw new Error('Failed to get session list');
  }
};

export const getQuestions = async (headers) => {
  try {
    const data = await axios.get(
      `${DEFAULT_QUESTIONS}`,
      {headers: headers}
    );
    return data;
  } catch (error) {
    console.log('Failed to get questions', error);
    throw new Error('Failed to get questions');
  }
};


export const getIndividualChatSessions = async (id, headers) => {
  try {
    const data = await axios.get(
      `${INDIVIDUAL_SESSION_CHAT}${id}`,
      {headers: headers }
    );
    return data;
  } catch (error) {
    console.log('Failed to get questions', error);
    throw new Error('Failed to get questions');
  }
};


export const getUsageSubscription = async (headers) => {
  try {
    const data = await axios.get(
      USAGE_SUBSCRIPTION,
      {headers: headers }
    );
    return data;
  } catch (error) {
    console.log('Failed to get usage subscription details in dashboard', error);
    throw new Error('Failed to get usage subscription details in dashboard');
  }
};
