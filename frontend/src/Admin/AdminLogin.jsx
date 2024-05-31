import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./admin.css"
import { useTranslation } from 'react-i18next';

function AdminLogin() {
  const { t } = useTranslation();
  const [username, setusername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()


  const LoginAdmin = async () => {
    if (username === "" || password === "") {
      alert("fill the blanks")
    }
    else {
      const bodyjson = {
        username: username,
        password: password
      }
      axios.post("https://internshipbackend-vwja.onrender.com/api/admin/adminLogin", bodyjson).then((res) => {
        alert("success")
        navigate("/adminepanel")
      }).catch((err) => {
        console.log(err)
      })
    }
  }
  return (
    <div>
      <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-12">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">{t('Admin Login')}</h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">{t('adminText')}</p>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div class=" border-2 flex flex-col gap-3 rounded-xl p-3">
              <div class="p-2 w-full ">
                <div class="relative">
                  <label htmlFor="name" class="leading-7 text-sm text-gray-600 mb-3">{t('name')}</label>
                  <input type="text" value={username} onChange={(e) => setusername(e.target.value)} id="name" name="name" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="pass" class="leading-7 text-sm text-gray-600 mb-3">{t('Password')}</label>
                  <input type="password" id="pass" name="password" value={password} onChange={(e) => setPassword(e.target.value)} class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <button onClick={LoginAdmin} className='p-3 bg-blue-500 text-white w-fit m-auto rounded-lg'>{t('Login')}</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdminLogin
