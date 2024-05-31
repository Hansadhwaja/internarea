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
    const [sidebarOpen, setSidebarOpen] = useState(false);



    const changeLanguage = (lng) => {
        if (!user) {
            navigate('/register')
        }

        i18n.changeLanguage(lng);
        console.log(i18n.language)
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
        if(isDivVisibleForProfile){
            setDivVisibleProfile(prev => !prev)
        }
       
    }

    const handleSidebar = () => {
        setSidebarOpen(prev => !prev);
    };

    return (
        <div className='bg-inherit'>
            <nav className='flex gap-2  justify-around shadow-lg p-4 overflow-hidden bg-inherit'>
                <div className='my-auto flex md:gap-3'>
                    <div className="m-auto flex sm:hidden">
                        <span className="cursor-pointer" onClick={handleSidebar}>
                            &#9776;
                        </span>
                    </div>
                    <div className='w-14 my-auto sm:w-24 md:w-32'>
                        <Link to={"/"}>
                            <img src={logo} alt="" srcset="" />
                        </Link>
                    </div>
                    <div className="flex gap-1 md:gap-4 w-fit">
                        <div className='sm:flex gap-2 items-center my-auto hidden text-[12px] md:text-md'>
                            <Link to={"/Internship"}>
                                <p id='int' className='flex gap-3' >{t('cardType')}</p>
                            </Link>
                            <i onClick={handleInternShips} id='ico' className="bi bi-caret-down-fill"></i>
                        </div>
                        <div className='hidden sm:flex gap-2 items-center my-auto text-[12px] md:text-md'>
                            <Link to={"/Jobs"}>
                                <p className='flex gap-3'>{t('cardType2')}</p>
                            </Link>
                            <i className="bi bi-caret-down-fill" id='ico2' onClick={handleJobs}></i>
                        </div>
                        <div className='flex items-center my-auto w-fit text-[10px] md:text-lg'>
                            <select className='flex bg-inherit p-1 md:p-2 border-2 border-slate-400 rounded-md' onChange={(e) => changeLanguage(e.target.value)}>
                                <option value='en'>English</option>
                                <option value='es'>Español</option>
                                <option value='pt'>Português</option>
                                <option value='hi'>हिंदी</option>
                                <option value='fr'>Français</option>
                                <option value='zh'>中文</option>
                            </select>

                        </div>
                    </div>
                </div>
                <div className='flex my-auto gap-2 md:gap-3'>
                    <div className="flex gap-1 md:gap-3 my-auto flex-initial w-3/4 md:w-1/2 text-sm">
                        <input type="text" placeholder={t('search')} className='p-0.5 md:p-2 rounded-md w-full border-2 border-slate-400 bg-inherit text-[11px]' />
                        <i className="bi bi-search my-auto"></i>
                    </div>
                    {
                        user ? (

                            <div className='flex gap-2 p-2 m-auto border-2 rounded-xl'>
                                <Link to={"/profile"} className='w-6 lg:w-12'>
                                    <img src={user?.photo || profileImage} alt="" className='rounded-full' id='' />
                                </Link>
                                <div className='my-auto'>
                                    <i className='bi bi-caret-down-fill' id='ico4' onClick={handleProfile}></i>
                                </div>

                            </div>

                        ) : (

                            <div className="flex">
                                {/* <button className='border-2 border-sky-500 rounded-lg p-3 text-sky-500'><Link to="/login">Login</Link></button> */}


                                <button className='bg-sky-500 rounded-lg p-1 md:p-3 text-[12px] text-white my-auto'><Link to="/register">{t('registerButton')}</Link></button>
                            </div>

                        )


                    }
                    {
                        user ? (
                            <div className='p-2 sm:flex hidden'>
                                <button className='bg-sky-500 rounded-lg text-white p-2 text-sm flex gap-2 m-auto' onClick={logoutFunction}>{t('logout')}<i className="bi bi-box-arrow-right"></i></button>
                            </div>
                        ) : (
                            <div className='md:flex hidden text-[12px] my-auto text-center gap-2'>
                                <div className="flex border-sky-500 border-2 rounded-lg p-1 text-[12px] text-sky-500 m-auto">
                                    <button className=''><Link to="/">{t('Hire Talent')}</Link></button>
                                </div>

                                <div className='bg-sky-500 rounded-lg my-auto p-2 text-white'>
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
                    <div className={`p-3 w-[400px] absolute z-10 ${i18n.language === 'en' || i18n.language === 'es' || i18n.language === 'pt' ? 'bg-white' : 'bg-inherit'} flex gap-3 border-2 border-slate-200 rounded-lg top-20 left-5 h-[60%]`}>
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
                    <div className={`p-3 w-[400px] absolute z-10 ${i18n.language === 'en' || i18n.language === 'es' || i18n.language === 'pt' ? 'bg-white' : 'bg-inherit'} flex gap-3 border-2 border-slate-200 rounded-lg top-20 left-64 h-[60%]`}>
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
                <div className={`${i18n.language === 'en' || i18n.language === 'es' || i18n.language === 'pt' ? 'bg-white' : 'bg-inherit'} absolute top-20 md:top-32 right-10 md:right-20 z-10 border-2 shadow-xl p-3 rounded-xl flex flex-col gap-2 h-fit max-w-sm`}>
                    <Link to={'/profile'} className='border-b-2 pb-3' onClick={() => setDivVisibleProfile(prev => !prev)}>
                        <img src={user?.photo || profileImage} alt="" className='w-16 h-16 rounded-full mx-auto p-2' />
                    </Link>
                    <p className='text-left'>{t('name')}:{user?.name}</p>
                    <p className='text-left'>{t('uid')}:{user?.uid}</p>
                    <p className='text-left'>{t('email')}:{user?.email}</p>
                    <p className='text-left'>{t('phone')}:{user?.phoneNumber}</p>
                    <div className='flex gap-2'>
                        <Link to={'/history'} className='my-auto' onClick={() => setDivVisibleProfile(prev => !prev)}>
                            <button className='p-2 border-2 bg-blue-500 text-white rounded-lg text-sm'>Login History</button>
                        </Link>
                        <div className='p-2 flex '>
                            <button className='bg-sky-500 rounded-lg text-white p-2 text-sm flex gap-2 my-auto' onClick={logoutFunction}>{t('logout')}<i className="bi bi-box-arrow-right"></i></button>
                        </div>
                    </div>

                </div>
            )}

            {sidebarOpen && (
                <Sidebar
                    InternShip={t('cardType')}
                    handleSidebar={handleSidebar}
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
                    lang={i18n.language}
                />
            )}


        </div>
    )
}

export default Navbar
