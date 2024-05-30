
import { CgSpinner } from "react-icons/cg";
import OtpInput from 'otp-input-react';
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../../firebase/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UAParser } from "ua-parser-js";
import axios from "axios";

const PhoneLogin = ({code,Phone ,verify,OTPText}) => {
    const [otp, setOtp] = useState("");
    const [ph, setPh] = useState("");
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const navigate = useNavigate()

    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                auth,
                "recaptcha-container",
                {
                    size: "invisible",
                    callback: () => {
                        onSignup();
                    },
                    "expired-callback": () => { },
                }

            );
        }
    }

    function onSignup() {
        setLoading(true);
        onCaptchVerify();

        const appVerifier = window.recaptchaVerifier;
        const formatPh = "+" + ph;

        signInWithPhoneNumber(auth, formatPh, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setLoading(false);
                setShowOTP(true);
                toast.success("OTP sent successfully!");
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                // appVerifier.render().then(function(widgetId) {
                //     grecaptcha.reset(widgetId);
                //   });
            });
    }

    function onOTPVerify() {
        setLoading(true);
        window.confirmationResult
            .confirm(otp)
            .then(async (res) => {
                const user = res.user;
                // let credential = auth.PhoneAuthProvider.credential(window.confirmationResult.verificationId, otp);
                // auth().signInWithCredential(credential);
                console.log(user);
                if (res.user) {
                    const user = res.user;
                    const uid=user.uid
                    setLoading(false);
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
                }

            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
          
    }

    return (
        <section className="flex items-center justify-center ">
            <div className="border-2 max-h-screen m-10 shadow-xl rounded-xl bg-blue-300">
                <Toaster toastOptions={{ duration: 4000 }} />
                <div id="recaptcha-container"></div>
                <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
                    {showOTP ? (
                        <>
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
                                className="otp-container"
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
                        </>
                    ) : (
                        <>
                            <label
                                htmlFor=""
                                className="font-bold text-xl text-center"
                            >
                                {Phone}
                            </label>
                            <PhoneInput country={"in"} value={ph} onChange={setPh} />
                            <button
                                onClick={onSignup}
                                className="bg-sky-500 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                            >
                                {loading && (
                                    <CgSpinner size={20} className="mt-1 animate-spin" />
                                )}
                                <span>{code}</span>
                            </button>
                        </>
                    )}
                </div>

            </div>
        </section>
    );
};

export default PhoneLogin;
