import './App.css';
import Footer from './Componets/Footerr/Footer';
import Home from './Componets/Home/Home';
import Navbar from './Componets/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Register from './Componets/auth/Register';
import Intern from "./Componets/Internships/Intern"
import JobAvl from "./Componets/Job/JobAvl"
import JobDetail from './Componets/Job/JobDetail';
import InternDeatil from "./Componets/Internships/InternDeatil"
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from "./Feature/Userslice"
import { useEffect } from 'react';
import { auth } from './firebase/firebase';
import Profile from './profile/Profile';
import AdminLogin from './Admin/AdminLogin';
import Adminpanel from './Admin/Adminpanel';
import ViewAllApplication from "./Admin/ViewAllApplication"
import Postinternships from './Admin/Postinternships';
import DeatilApplication from './Applications/DeatilApplication';
import UserApplicatiom from './profile/UserApplicatiom';
import UserapplicationDetail from "./Applications/DeatilApplicationUser"
import './i18n';
import PostJob from './Admin/PostJob';
import { useTranslation } from 'react-i18next';
import History from './Componets/History/History';
import { UAParser } from 'ua-parser-js';


function App() {
  const { t, i18n } = useTranslation();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const parser = new UAParser();
  const result = parser.getResult();

  const deviceType = result.device.type || "Desktop";

  const currentTime = new Date();
  const currentHour = currentTime.getHours();


  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({

          uid: authUser.uid,
          photo: authUser.photoURL,
          name: authUser.displayName,
          email: authUser.email,
          phoneNumber: authUser.phoneNumber
        }))
      }
      else {
        dispatch(logout())
      }
    })
  }, [dispatch]);




  return (
    <>
      {(deviceType === 'mobile' && currentHour < 10 && currentHour >= 13) ? (
        <div className='w-1/2 h-1/2 border-2 rounded-xl shadow-xl'>
          <h1>You Can Only Access InternArea Website In a Mobile Device Between 10AM to 1PM. </h1>
        </div>
      ) : (
        <div className={`${i18n.language === 'hi' && " bg-blue-200"} ${i18n.language === 'zh' && " bg-green-200"} ${i18n.language === 'fr' && " bg-yellow-200"}`}>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/internship' element={<Intern />} />
            <Route path='/Jobs' element={<JobAvl />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/detailjob' element={<JobDetail />} />
            <Route path='/detailInternship' element={<InternDeatil />} />
            <Route path='/detailApplication' element={<DeatilApplication />} />
            <Route path='/adminLogin' element={<AdminLogin />} />
            <Route path='/adminepanel' element={<Adminpanel />} />
            <Route path='/postInternship' element={<Postinternships />} />
            <Route path='/postJob' element={<PostJob />} />
            <Route path='/applications' element={<ViewAllApplication />} />
            <Route path='/UserapplicationDetail' element={< UserapplicationDetail />} />
            <Route path='/userapplication' element={<UserApplicatiom />} />
            <Route path='/history' element={<History />} />
          </Routes>
          <Footer />
        </div>
      )}
    </>

  );
}

export default App;











