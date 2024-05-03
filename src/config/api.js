import axios from 'axios'
import { useState } from 'react'

// const  = "http://localhost:8081/users";

// const USER_REGISTER = {
//   url: `${BASE_url}/register`,
// };
// const LOGIN = {
//   url: `${BASE_url}/login`,
// };

// const FORGET_PASSWORD = {
//   url: `${BASE_url}/forgetPassword`,
// };
// const [registerDetailsResponse,setRegisterDetails]=useState("")
const sendLoginDetails = async (body) => {
    try {
        const data = await axios.post(body)
        return data
    } catch (error) {
        console.log(error)
    }
}

const registerDetails = async (body) => {
    try {
        const data = await axios.post(
            'http://localhost:8081/users/register',
            body
        )
        return data
    } catch (error) {
        console.log(error)
    }
}
const recoverPassword = async (body) => {
    try {
        const res = await axios.post(
            'http://localhost:8081/users/forgetPassword',
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        return res
    } catch (error) {
        console.log(error)
    }
}

export { sendLoginDetails, registerDetails, recoverPassword }
