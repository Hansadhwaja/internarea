
import { FcGoogle } from 'react-icons/fc'
import PhoneLogin from './PhoneLogin'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { auth, provider } from "../../firebase/firebase"
import { useTranslation } from 'react-i18next'
import EmailLogin from './EmailLogin'
import axios from 'axios'
import UAParser from 'ua-parser-js';
import { useSelector } from 'react-redux'
import { selectUser } from '../../Feature/Userslice'
import MSUser from './MSUser'

const Register = () => {
  const user = useSelector(selectUser)
  const parser = new UAParser();
  const result = parser.getResult();

  const browser = result.browser.name;
  const os = result.os.name;
  const deviceType = result.device.type || "Desktop";
  console.log(`Browser:${browser}`);



  const { t, i18n } = useTranslation();
  let navigate = useNavigate();

  const handleSingin = () => {
    signInWithPopup(auth, provider).then((res) => {
      const user = res.user;
      const uid = user.uid
      navigate("/")

      axios.post('http://localhost:5000/api/history', {
        browser: browser,
        os: os,
        deviceType: deviceType,
        uid: uid
      })
        .then(response => console.log(response.data))
        .catch(error => console.error('Error:', error));
    }).catch((err) => {
      console.log(err)
    })
    toast("Login Success")
  }


  return (
    <div className="sm:w-3/4 m-auto">
      <div className="p-5">
        <div className="flex bg-inherit rounded-lg justify-center overflow-hidden mx-auto">
          <div className='flex flex-col p-3 gap-3 border-2 border-black shadow-xl w-[400px] mx-auto my-5 rounded-xl'>
            {browser === 'Edge' || browser === 'IE' ? (
              <MSUser />
            ) : (

              <>
                <div className='flex gap-2 shadow-xl p-3 rounded-lg max-w-fit h-16 m-auto flex-1' onClick={handleSingin}>
                  <FcGoogle className='h-12 w-12' />
                  <p className="cursor-pointer px-4 py-3 w-5/6 text-center text-md text-gray-600 font-bold">{t('signInText')}</p>
                </div>
                <div>
                  <p className='text-3xl font-bold text-center'>{t("OR")}</p>
                </div>
                <div className='w-full flex justify-center items-center'>
                  {(i18n.language === 'fr' || browser === 'Chrome') ? (
                    <EmailLogin
                      code={t('Send code via Email')}
                      Email={t('Verify your Email')}
                      verify={t('Verify OTP')}
                      OTPText={t(' Enter your OTP')}
                      emailText={t('Enter your Email')}
                    />
                  ) : (
                    <PhoneLogin
                      code={t('Send code via SMS')}
                      Phone={t('Verify your phone number')}
                      verify={t('Verify OTP')}
                      OTPText={t(' Enter your OTP')}

                    />
                  )}


                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register