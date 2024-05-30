import React, { useEffect, useState } from 'react'
import logo from "../../Assets/logo.png"
import './sidebar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectUser } from '../../Feature/Userslice';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import profileImage from '../../Assets/org.jpg'
import { useTranslation } from 'react-i18next';

function Sidebar({ search, InternShip, Job, Name, talent, admin, register, student, employer, logout, more, resume, Applications, Contact, changeLanguage }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate()
  const handleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const logoutFunction = () => {
    signOut(auth)
    navigate("/")

  }
  const user = useSelector(selectUser)
  return (
    <>
      <div className="xl:hidden">
        <div className='flex m-auto justify-between gap-3 p-2 border-2 shadow-lg'>
          <div className='flex my-auto gap-3'>
            <div className="m-auto ml-3">
              <span className="cursor-pointer" onClick={handleSidebar}>
                &#9776;
              </span>
            </div>

            <div>
              <Link to="/">
                <img src={logo} alt="" id='' />
              </Link>
            </div>

            <div className='hidden md:flex gap-2 items-center  justify-center p-2 mx-auto'>
              <select className='flex gap-2 flex-col p-2 border-2 rounded-lg' onChange={(e) => changeLanguage(e.target.value)}>
                <option value='en' className={`p-2 border-2 m-2 rounded-lg ${i18n.language === 'en' && 'bg-sky-500 text-white'}`}>English</option>
                <option value='es' className={`p-2 border-2 m-2 rounded-lg ${i18n.language === 'es' && 'bg-sky-500 text-white'}`}>Español</option>
                <option value='pt' className={`p-2 border-2 m-2 rounded-lg ${i18n.language === 'pt' && 'bg-sky-500 text-white'}`}>Português</option>
                <option value='hi' className={`p-2 border-2 m-2 rounded-lg ${i18n.language === 'hi' && 'bg-sky-500 text-white'}`}>हिंदी</option>
                <option value='fr' className={`p-2 border-2 m-2 rounded-lg ${i18n.language === 'fr' && 'bg-sky-500 text-white'}`}>Français</option>
                <option value='zh' className={`p-2 border-2 m-2 rounded-lg ${i18n.language === 'zh' && 'bg-sky-500 text-white'}`}>中文</option>
              </select>

            </div>
          </div>
          <div className="flex m-auto gap-3 p-2">
            <i className="bi bi-search my-auto"></i>
            <input type="search" placeholder={search} className='border-2 p-2 rounded-lg' />
          </div>
          {user && (
            <div className="w-12">
                  <Link to={"/profile"}>
                    <img className='rounded-full justify-center' src={user?.photo || profileImage} alt="" srcset="" />
                  </Link>
                </div>
          )}
        </div>
        {sidebarOpen ? (
          <div className="sidebar open">
           
            <span className="cursor-pointer close-btn" onClick={handleSidebar}>
              &times;
            </span>
            {user ? (
              <>
                <div className="">
                  <Link to={"/profile"}>
                    <img className='rounded-full justify-center' src={user?.photo || profileImage} alt="" srcset="" />
                  </Link>
                  <p className='font-bold text-blue-500 m-2 text-left border-b-2  p-3'>{user?.name || Name}</p>
                </div>
              </>
            ) :
              (
                <div className="auth">
                </div>
              )
            }
            <div className='flex gap-2 items-center  justify-center p-2 mx-auto'>
              <select className='flex gap-2 flex-col p-2 border-2 rounded-lg' onChange={(e) => changeLanguage(e.target.value)}>
                <option value='en' className={`p-2 border-2 m-2 rounded-lg ${i18n.language === 'en' && 'bg-sky-500 text-white'}`}>English</option>
                <option value='es' className={`p-2 border-2 m-2 rounded-lg ${i18n.language === 'es' && 'bg-sky-500 text-white'}`}>Español</option>
                <option value='pt' className={`p-2 border-2 m-2 rounded-lg ${i18n.language === 'pt' && 'bg-sky-500 text-white'}`}>Português</option>
                <option value='hi' className={`p-2 border-2 m-2 rounded-lg ${i18n.language === 'hi' && 'bg-sky-500 text-white'}`}>हिंदी</option>
                <option value='fr' className={`p-2 border-2 m-2 rounded-lg ${i18n.language === 'fr' && 'bg-sky-500 text-white'}`}>Français</option>
                <option vvalue='zh' className={`p-2 border-2 m-2 rounded-lg ${i18n.language === 'zh' && 'bg-sky-500 text-white'}`}>中文</option>
              </select>

            </div>
            <Link to="/internship">{InternShip}</Link>
            <Link to="/Jobs">{Job} </Link>

            <Link to={"/"} className='small'>{Contact}</Link>
            <hr />
            {user ? (
              <>
                <div className="m-2">

                  {user ? (
                    <Link to={"/userapplication"}>
                      <p className='text-left'>{Applications}</p>
                    </Link>
                  ) : (
                    <Link to={"/register"}>
                      <p className='text-left'>{Applications}</p>
                    </Link>
                  )

                  }

                  <Link>

                    <p className='text-left'>{resume}</p>
                  </Link>
                  <Link>
                    <p className='text-left'>{more}</p>
                  </Link>
                  <button className='mt-2 text-xl p-2 text-blue-500' onClick={logoutFunction}>{logout}<i class="bi bi-box-arrow-right"></i></button>


                </div>
              </>
            ) :
              (
                <div className="m-3">
                  <div>
                    <p>{student}</p>
                    <p>{employer}</p>
                  </div>

                  <div className='flex flex-col gap-3 mt-5'>
                    <p className="text-slate-100 font-semibold bg-red-400 p-2 w-1/2 m-auto rounded-lg">{talent}</p>
                    <Link to={'/adminLogin'} ><p className='bg-blue-500 text-xl w-1/2 m-auto text-center text-slate-100 rounded-xl font-semibold p-2'>{admin}</p></Link>
                    <Link to="/register"><p className='bg-blue-500 text-xl w-1/2 m-auto text-center text-slate-100 rounded-xl font-semibold p-2'>{register}</p></Link>
                  </div>
                </div>
              )
            }

          </div>
        ) : (
          ""
        )}
      </div>
    </>

  )
}

export default Sidebar
