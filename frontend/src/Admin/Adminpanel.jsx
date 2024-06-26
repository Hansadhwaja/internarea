import React from 'react'
import { Link } from 'react-router-dom'
import { RiSendPlaneFill } from "react-icons/ri";
import { BsMailbox2Flag } from "react-icons/bs";
import { useTranslation } from 'react-i18next';
function Adminpanel() {
  const { t } = useTranslation();
  return (
      <div class="w-full overflow-hidden rounded-lg border bg-inherit shadow-sm block">
        <div class="mx-auto flex max-w-screen-lg items-center gap-8 p-8">
          <div class="gap-8 flex flex-col">
            <div className='shadow-xl border-2 border-slate-400 p-2 rounded-xl'>
              <Link to="/applications" class="group flex gap-4">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500 text-white shadow-lg transition duration-100 group-hover:bg-indigo-600 group-active:bg-indigo-700 md:h-12 md:w-12">
                  <BsMailbox2Flag />
                </div>

                <div>
                  <div class="mb-1 font-semibold">{t('viewApplications')}</div>
                  <p class="text-sm text-gray-500">{t('viewText')}</p>
                </div>
              </Link>
            </div>
            <div  className='shadow-xl border-2 border-slate-400 p-2 rounded-xl'>
              <Link to={"/postJob"} class="group flex gap-4">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500 text-white shadow-lg transition duration-100 group-hover:bg-indigo-600 group-active:bg-indigo-700 md:h-12 md:w-12">
                  <i class="bi bi-briefcase"></i>
                </div>

                <div>
                  <div class="mb-1 font-semibold">{t('Post Job')}</div>
                  <p class="text-sm text-gray-500">{t('postText')}</p>
                </div>
              </Link>
            </div>
            <div  className='shadow-xl border-2 border-slate-400 p-2 rounded-xl'>
              <Link to={"/postInternship"} class="group flex gap-4">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500 text-white shadow-lg transition duration-100 group-hover:bg-indigo-600 group-active:bg-indigo-700 md:h-12 md:w-12">
                  <RiSendPlaneFill />
                </div>
                <div>
                  <div class="mb-1 font-semibold">{t('Post A Internship')}</div>
                  <p class="text-sm text-gray-500">{t('postIntText')}</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
  

  )
}

export default Adminpanel
