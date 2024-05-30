import React, { useState } from 'react'
import { signInWithCustomToken } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from "../../firebase/firebase"
import { CgSpinner } from 'react-icons/cg'
import axios from 'axios';
import { useTranslation } from 'react-i18next'
import OtpInput from 'otp-input-react';
import { UAParser } from 'ua-parser-js'

const EmailLogin = ({ code, Email, verify, OTPText, emailText}) => {
    const { t, i18n } = useTranslation();
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [loading, setLoading] = useState(false);


    const onSigninWithEmail = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/email/send-otp', { email });
            if (response.data.message === 'OTP sent successfully') {
                setEmailSent(true);
                setLoading(false)
            }
        } catch (error) {
            console.error('Error sending OTP', error);
            setLoading(false)
        }
    }

    const onOTPVerify = async () => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:5000/api/email/verify-otp', { email, otp });
            setMessage(response.data.message);
            const result = await axios.post('http://localhost:5000/login', { email });
            const token = result.data.customToken;
            await signInWithCustomToken(auth, token)
                .then((userCredential) => {
                    const user = userCredential.user;
                    const uid=user.uid
                    setLoading(false)
                    navigate('/')
                    const parser = new UAParser();
                    const result = parser.getResult();
                
                    const browser = result.browser.name; // Specific browser name like Chrome, Edge, etc.
                    const os = result.os.name; // OS name like Windows, Mac OS, etc.
                    const deviceType = result.device.type || "Desktop";
                
                
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

        } catch (error) {
            console.error('Error verifying OTP', error);
            setMessage('Verification failed');
            setLoading(false)
        }
    }

    return (

        <div className="w-full">
            <div className='flex flex-col p-2 gap-3  w-full mx-auto bg-blue-300  shadow-xl rounded-xl'>
                {emailSent ? (
                    <div className='flex gap-2 p-2 flex-col'>
                        <label
                            htmlFor="otp"
                            className="font-bold text-xl text-white text-center"
                        >
                            {OTPText}
                        </label>
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            OTPLength={6}
                            otpType="number"
                            disabled={false}
                            autoFocus
                            className="otp-container mx-auto mb-3"
                        ></OtpInput>
                        <button
                            onClick={onOTPVerify}
                            className="bg-sky-500 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                        >
                            {loading && (
                                <CgSpinner size={20} className="mt-1 animate-spin" />
                            )}
                            <span>{verify}</span>
                        </button>
                    </div>
                ) : (
                    <div className='w-full p-3 flex flex-col gap-3 '>
                        <label htmlFor="" className="font-bold text-xl text-slate-700 text-center">
                            {Email}
                        </label>
                        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='p-3 w-full shadow-lg border-2 rounded-lg' placeholder={emailText} />
                        <button
                            onClick={onSigninWithEmail}
                            className="bg-sky-500 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                        >
                            {loading && (
                                <CgSpinner size={20} className="mt-1 animate-spin" />
                            )}
                            <span>{code}</span>
                        </button>

                    </div>
                )}

            </div>
        </div>


    )
}

export default EmailLogin