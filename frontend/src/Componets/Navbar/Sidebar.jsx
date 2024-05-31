import React, { useState } from 'react'
import logo from "../../Assets/logo.png"
import './sidebar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectUser } from '../../Feature/Userslice';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import profileImage from '../../Assets/org.jpg'
import { useTranslation } from 'react-i18next';

function Sidebar({ lang,handleSidebar, InternShip, Job, Name, talent, admin, register, student, employer, logout, more, resume, Applications, Contact }) {
  const navigate = useNavigate()

  const logoutFunction = () => {
    signOut(auth)
    handleSidebar()
    navigate("/")

  }
  const user = useSelector(selectUser)
  return (
    <div className={`${lang === 'en'||lang === 'es'|| lang === 'pt' ?'bg-white':'bg-inherit' }`}>
      <div className="sidebar open border-r-2 shadow-xl z-10 bg-inherit">
      <span className="cursor-pointer close-btn" onClick={handleSidebar}>
              &times;
            </span>
            <div className='w-32' onClick={handleSidebar}>
          <Link to={"/"}><img src={logo} alt="" srcset="" /></Link>
        </div>

        {user && (
          <div>
            <Link to={"/profile"} className='w-20' onClick={handleSidebar}>
              <img className='rounded-full' src={user?.photo || profileImage} alt="" />
            </Link>
            <p className='font-bold text-blue-500 m-2 text-left border-b-2'>{user?.name || Name}</p>
          </div>
        )}
        <div className='flex flex-col gap-2 m-3'>
          <Link to="/internship" className='p-2' onClick={handleSidebar}>{InternShip}</Link>
          <Link to="/Jobs" className='p-2' onClick={handleSidebar}>{Job} </Link>

          <Link to={"/"} className='p-2' onClick={handleSidebar}>{Contact}</Link>
        </div>

        <hr />

        {user ? (

          <div className="m-3">

            {user ? (
              <Link to={"/userapplication"} onClick={handleSidebar}>
                <p className='text-left p-2'>{Applications}</p>
              </Link>
            ) : (
              <Link to={"/register"} onClick={handleSidebar}>
                <p className='text-left p-2'>{Applications}</p>
              </Link>
            )}

            <Link>
              <p className='text-left p-2'>{resume}</p>
            </Link>
            <Link>
              <p className='text-left p-2'>{more}</p>
            </Link>
            <button className='mt-2 text-xl p-2 text-blue-500 flex gap-2' onClick={logoutFunction}>
              {logout}<i class="bi bi-box-arrow-right"></i>
            </button>
          </div>

        ) :
          (
            <div className="m-3">
              <div>
                <p className='p-2 text-sm'>{student}</p>
                <p className='p-2 text-sm'>{employer}</p>
              </div>

              <div className='flex flex-col gap-3 mt-5'>
                <p className=" text-left font-semibold text-red-400 ml-2">{talent}</p>
                <Link to={'/adminLogin'} ><p className='text-blue-500 text-md ml-2 font-semibold'>{admin}</p></Link>
                <Link to="/register"><p  className='text-blue-500 text-md ml-2 font-semibold'>{register}</p></Link>
              </div>
            </div>
          )
        }

      </div>
    </div>
  )
}

export default Sidebar
