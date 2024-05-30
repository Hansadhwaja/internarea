import axios from 'axios';
import React, { useEffect } from 'react'
import { UAParser } from 'ua-parser-js';
import { signInWithCustomToken } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from "../../firebase/firebase"

const MSUser = () => {
    let navigate = useNavigate();
    const parser = new UAParser();
    const result = parser.getResult();

    const browser = result.browser.name; // Specific browser name like Chrome, Edge, etc.
    const os = result.os.name; // OS name like Windows, Mac OS, etc.
    const deviceType = result.device.type || "Desktop";

    useEffect( () => {
        async function msUserLogin() {


            const result = await axios.post('http://localhost:5000/login-msuser');
            const token = result.data.customToken;
            await signInWithCustomToken(auth, token)
                .then((userCredential) => {
                    const user = userCredential.user;
                    const uid = user.uid
                    navigate('/')

                    axios.post('http://localhost:5000/api/history', {
                        browser: browser,
                        os: os,
                        deviceType: deviceType,
                        uid: uid
                    })
                        .then(response => console.log(response.data))
                        .catch(error => console.error('Error:', error));
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                });
        }
        msUserLogin()
    }, [])

    return (
        <div>MSUser</div>
    )
}

export default MSUser