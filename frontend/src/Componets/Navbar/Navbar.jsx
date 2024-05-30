import { useEffect, useState } from 'react'
import logo from '../../Assets/logo.png'
import { Link } from 'react-router-dom'
import "./navbar.css"
import Sidebar from './Sidebar'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/firebase'
import { useSelector } from 'react-redux'
import { selectUser } from '../../Feature/Userslice'
import { useNavigate } from 'react-router-dom'
import profileImage from '../../Assets/org.png'
import { useTranslation } from 'react-i18next'



function Navbar() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate()
    const user = useSelector(selectUser)
    const [isDivVisibleForintern, setDivVisibleForintern] = useState(false)
    const [isDivVisibleForJob, setDivVisibleForJob] = useState(false)
    const [isDivVisibleForProfile, setDivVisibleProfile] = useState(false)
    const [isDivVisibleLang, setDivVisibleLang] = useState(false)


    const changeLanguage = (lng) => {
        if (!user) {
            navigate('/register')
        }


        i18n.changeLanguage(lng);
        console.log(i18n.language);
        setDivVisibleLang(prev => !prev)
    };

    useEffect(() => {
        document.documentElement.lang = i18n.language;
    }, [i18n.language]);


    const handleProfile = () => {
        if (isDivVisibleForProfile) {
            document.getElementById("ico4").className = "bi bi-caret-down-fill"
        }
        else {
            document.getElementById("ico4").className = "bi bi-caret-up-fill"
        }

        setDivVisibleProfile(prev => !prev)

    }

    const handleInternShips = () => {
        if (isDivVisibleForintern) {
            document.getElementById("ico").className = "bi bi-caret-down-fill"
        }
        else {
            document.getElementById("ico").className = "bi bi-caret-up-fill"
        }

        setDivVisibleForintern(prev => !prev)
    }

    const handleJobs = () => {
        if (isDivVisibleForJob) {
            document.getElementById("ico2").className = "bi bi-caret-down-fill"
        }
        else {
            document.getElementById("ico2").className = "bi bi-caret-up-fill"
        }

        setDivVisibleForJob(prev => !prev)
    }

    const logoutFunction = () => {
        signOut(auth)
        
        
        navigate("/")
    }

    return (
        <div>
            <nav className='hidden xl:flex  justify-between shadow-lg p-3 overflow-hidden'>
                <div className='my-auto flex gap-3'>
                    <div className='w-[100px]'>
                        <Link to={"/"}><img src={logo} alt="" srcset="" /></Link>
                    </div>
                    <div className="flex gap-4">
                        <div className='flex gap-2 items-center my-auto'>
                            <Link to={"/Internship"}>
                                <p id='int' className='flex gap-3' >{t('cardType')}</p>
                            </Link>
                            <i onClick={handleInternShips} id='ico' className="bi bi-caret-down-fill"></i>
                        </div>
                        <div className='flex gap-2 items-center my-auto'>
                            <Link to={"/Jobs"}>
                                <p className='flex gap-3'>{t('cardType2')}</p>
                            </Link>
                            <i className="bi bi-caret-down-fill" id='ico2' onClick={handleJobs}></i>
                        </div>
                        <div className='flex gap-2 items-center my-auto'>
                            <select className='flex gap-2 flex-col' onChange={(e) => changeLanguage(e.target.value)}>
                                <option value='en' className={`p-2 border-2 m-2 rounded-lg ${i18n.language === 'en' && 'bg-sky-500 text-white'}`}>English</option>
                                <option value='es' className={`p-2 border-2 m-2 rounded-lg ${i18n.language === 'es' && 'bg-sky-500 text-white'}`}>Español</option>
                                <option value='pt' className={`p-2 border-2 m-2 rounded-lg ${i18n.language === 'pt' && 'bg-sky-500 text-white'}`}>Português</option>
                                <option value='hi' className={`p-2 border-2 m-2 rounded-lg ${i18n.language === 'hi' && 'bg-sky-500 text-white'}`}>हिंदी</option>
                                <option value='fr' className={`p-2 border-2 m-2 rounded-lg ${i18n.language === 'fr' && 'bg-sky-500 text-white'}`}>Français</option>
                                <option vvalue='zh' className={`p-2 border-2 m-2 rounded-lg ${i18n.language === 'zh' && 'bg-sky-500 text-white'}`}>中文</option>
                            </select>

                        </div>



                    </div>
                </div>
                <div className='flex my-auto gap-3'>
                    <div className="flex gap-3 my-auto flex-initial">
                        <i className="bi bi-search my-auto"></i>
                        <input type="text" placeholder={t('search')} className='p-2 rounded-md w-fit border-2' />
                    </div>
                    {
                        user ? (
                            <>
                                <div className='hidden sm:flex gap-2 p-2 m-auto border-2 rounded-xl'>
                                    <Link to={"/profile"} className='w-6 lg:w-12'>
                                        <img src={user?.photo || profileImage} alt="" className='rounded-full' id='' />
                                    </Link>
                                    <div className='my-auto'>
                                        <i className='bi bi-caret-down-fill' id='ico4' onClick={handleProfile}></i>
                                    </div>

                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex gap-2">
                                    {/* <button className='border-2 border-sky-500 rounded-lg p-3 text-sky-500'><Link to="/login">Login</Link></button> */}


                                    <button className='bg-sky-500 rounded-lg p-2 text-white'><Link to="/register">{t('registerButton')}</Link></button>
                                </div>
                            </>
                        )


                    }
                    {
                        user ? (
                            <div className='p-4 flex '>
                                <button className='bg-sky-500 rounded-lg text-white p-2 flex gap-2' onClick={logoutFunction}>{t('logout')}<i className="bi bi-box-arrow-right"></i></button>
                            </div>
                        ) : (
                            <div className='flex flex-1 flex-wrap'>
                                <div className="flex my-auto border-2 text-blue-500 p-2 rounded-lg">
                                    {t('Hire Talent')}
                                </div>

                                <div className='bg-sky-500 rounded-lg p-3 text-white'>
                                    <Link to={'/adminLogin'}>
                                        <button>{t('admin')}</button>
                                    </Link>
                                </div>
                            </div>
                        )
                    }

                </div>
            </nav>


            {
                isDivVisibleForintern && (
                    <div className="p-3 w-[400px] absolute z-10 bg-white flex gap-3 border-2 border-slate-200 rounded-lg top-20 left-5 h-[60%]">
                        <div className=" p-2">

                            <p>{t('Top Locations')}</p>
                            <p>{t("Profile")}</p>
                            <p>{t("Top Category")}</p>
                            <p>{t('moreIntern')}</p>
                        </div>
                        <div className="line flex bg-slate-400">

                        </div>
                        <div className="p-2">
                            <p>{t('Intern at India')}</p>
                            <p>{t('Intern at India')}</p>
                            <p>{t('Intern at India')}</p>
                            <p>{t('Intern at India')}</p>
                            <p>{t('Intern at India')}</p>
                        </div>
                    </div>


                )
            }
            {
                isDivVisibleForJob && (
                    <div className="p-3 w-[400px] absolute z-10 bg-white flex gap-3 border-2 border-slate-200 rounded-lg top-20 left-64 h-[60%]">
                        <div className=" p-2">
                            <p>{t('Top Locations')}</p>
                            <p>{t("Profile")}</p>
                            <p>{t("Top Category")}</p>
                            <p>{t('moreJob')}</p>
                        </div>
                        <div className="line flex bg-slate-400">

                        </div>
                        <div className="p-2">
                            <p>{t('Intern at India')}</p>
                            <p>{t('Intern at India')}</p>
                            <p>{t('Intern at India')}</p>
                            <p>{t('Intern at India')}</p>
                            <p>{t('Intern at India')}</p>
                        </div>
                    </div>


                )
            }

            {isDivVisibleForProfile && (
                <div className='profile-dropdown border-2 shadow-xl p-3 rounded-xl flex flex-col gap-2 h-fit'>
                    <Link to={'/profile'} className='border-b-2 pb-3'>
                        <img src={user?.photo || profileImage} alt="" className='w-16 h-16 rounded-full mx-auto p-2' />
                    </Link>
                    <p className='text-left'>{t('name')}:{user?.name}</p>
                    <p className='text-left'>{t('uid')}:{user?.uid}</p>
                    <p className='text-left'>{t('email')}:{user?.email}</p>
                    <p className='text-left'>{t('phone')}:{user?.phoneNumber}</p>
                    <Link to={'/history'} className='m-auto'>
                        <button className='p-2 border-2 bg-blue-500 text-white rounded-lg'>Login History</button>
                    </Link>

                </div>
            )}

            <Sidebar
                InternShip={t('cardType')}
                search={t('search')}
                Job={t('cardType2')}
                Name={t('name')}
                talent={t('Hire Talent')}
                admin={t('admin')}
                register={t('registerButton')}
                student={t('student')}
                employer={t('employer')}
                logout={t('logout')}
                more={t('more')}
                resume={t('resume')}
                Applications={t('applications')}
                Contact={t('contact')}
                changeLanguage={changeLanguage}
            />
        </div>
    )
}

export default Navbar
