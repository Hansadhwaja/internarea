import axios from 'axios';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

function Postinternships() {
  const { t} = useTranslation();
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [aboutCompany, setAboutCompany] = useState('');
  const [aboutInternship, setAboutInternship] = useState('');
  const [whoCanApply, setWhoCanApply] = useState('');
  const [perks, setPerks] = useState('');
  const [numberOfOpening, setNumberOfOpening] = useState('');
  const [stipend, setstipend] = useState('');
  const [startDate, setStartDate] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const navigate = useNavigate()

  const sendData = (e) => {
    e.preventDefault();
    if (title === '' &&
      companyName === '' &&
      location === '' &&
      category === '' &&
      aboutCompany === '' &&
      aboutInternship === '' &&
      whoCanApply === '' &&
      perks === '' &&
      numberOfOpening === '' &&
      stipend === '' &&
      startDate === '' &&

      additionalInfo === '') {

      alert("fill the Blanks ")
    }


    else {
      const bodyJosn = {
        title: title,
        company: companyName,
        location: location,
        category: category,
        aboutCompany: aboutCompany,
        aboutInternship: aboutInternship,
        Whocanapply: whoCanApply,
        perks: perks,
        numberOfopning: numberOfOpening,
        stipend: stipend,
        StartDate: startDate,
        AdditionalInfo: additionalInfo,

      }
      axios.post("https://internarea.onrender.com/api/internship", bodyJosn).then((res) => {
        console.log(res.data)
      }).catch((err) =>
        console.log(err))

    }
    alert(" Internship Posted is Successfully")
    navigate("/adminepanel")
  }

  return (
    <div class="bg-inherit py-6 sm:py-8 lg:py-12">
      <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
      <Link to={'/adminepanel'} className='p-2 bg-sky-500 text-white my-auto rounded-lg'>{t('Back')}</Link>
        <div class="mb-10 md:mb-16">
          <h2 class="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">{t('Post A Internship')}</h2>
        </div>

        <form class="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2 border-2 rounded-xl p-3 border-slate-400" onSubmit={sendData}>
          <div>
            <label for="title" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">{t('title')}</label>
            <input name="title" value={title} onChange={(e) => setTitle(e.target.value)} class="w-full rounded border-2 bg-inherit border-gray-500 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
          </div>

          <div>
            <label for="company-name" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">{t('companyName')}</label>
            <input name="company-name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} class=" bg-inherit w-full rounded border-2 border-gray-500 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
          </div>

          <div class="sm:col-span-2">
            <label for="Location" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">{t('Location')}</label>
            <input name="Location" value={location} onChange={(e) => setLocation(e.target.value)} class="w-full rounded border-2 border-gray-500 px-3 py-2 bg-inherit text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
          </div>

          <div class="sm:col-span-2">
            <label for="category" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">{t('category')}</label>
            <input name="category" value={category} onChange={(e) => setCategory(e.target.value)} class="w-full rounded border-2 bg-inherit border-gray-500 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
          </div>

          <div class="sm:col-span-2">
            <label for="aboutCompany" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">{t('aboutCompany')}</label>
            <input name="aboutCompany" value={aboutCompany} onChange={(e) => setAboutCompany(e.target.value)} class="w-full bg-inherit rounded border-2 border-gray-500 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
          </div>

          <div class="sm:col-span-2">
            <label for="aboutInternship" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">{t('aboutInternship')}</label>
            <textarea name="aboutInternship" value={aboutInternship} onChange={(e) => setAboutInternship(e.target.value)} class="h-64 bg-inherit w-full rounded border-2 border-gray-500 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"></textarea>
          </div>
          <div class="sm:col-span-2">
            <label for="Whocanapply" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">{t('Whocanapply')}</label>
            <textarea name="Whocanapply" value={whoCanApply} onChange={(e) => setWhoCanApply(e.target.value)} class="h-34 bg-inherit w-full rounded border-2 border-gray-500 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"></textarea>
          </div>
          <div class="sm:col-span-2">
            <label for="perks" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">{t('Perks')}</label>
            <input name="perks" value={perks} onChange={(e) => setPerks(e.target.value)} class=" w-full bg-inherit rounded border-2 border-gray-500 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"></input>
          </div>
          <div class="sm:col-span-2">
            <label for="numberOfOpening" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">{t('Number of opening')}</label>
            <input name="numberOfOpening" value={numberOfOpening} onChange={(e) => setNumberOfOpening(e.target.value)} class="bg-inherit w-full rounded border-2 border-gray-500 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"></input>
          </div>
          <div class="sm:col-span-2">
            <label for="stipend" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">{t('stipend')}</label>
            <input name="stipend" value={stipend} onChange={(e) => setstipend(e.target.value)} class=" w-full bg-inherit rounded border-2 border-gray-500 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"></input>
          </div>
          <div class="sm:col-span-2">
            <label for="startDate" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">{t('startDate')}</label>
            <input type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} name="startDate" class=" w-full rounded border-2 border-gray-500 px-3 bg-inherit py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"></input>
          </div>

          <div class="sm:col-span-2">
            <label for="additionalInfo" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">{t('Additional Information')}</label>
            <textarea name="additionalInfo" value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} class="bg-inherit h-12 w-full rounded border-2 border-gray-500 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"></textarea>
          </div>

          <button className='bg-blue-600 p-2 rounded-lg text-white'>{t('Post Internship')}</button>
        </form>
      </div>
    </div>
  )
}

export default Postinternships
