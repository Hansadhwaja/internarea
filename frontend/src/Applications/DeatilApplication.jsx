import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';


function DeatilApplication() {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([])
  let search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("a")

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://internshipbackend-vwja.onrender.com/api/application/${id}`)

      setData([response.data])
    }
    fetchData()
  }, [id])
  const handleAcceptAndReject = async (id, action) => {
    try {
      const response = await axios.put(`https://internshipbackend-vwja.onrender.com/api/application/${id}`, { action })
      const UpdateApplication = data.map(app => (app._id === id ? response.data.data : app))
      setData(UpdateApplication)

    } catch (error) {
      console.log(error)
    }

  }
 

  return (
    <div>
      {
        data.map((data) => (
          <section class="text-gray-600 body-font overflow-hidden">
          <div class="container px-5 py-24 mx-auto">
              <div class="lg:w-4/5 mx-auto flex gap-10">
                <img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover rounded-xl" src={data.user?.photo} />
                <div class="lg:w-1/2 w-full flex flex-col gap-2">
                  <div>
                    <h2 class="text-sm text-gray-500">{t('Company')}</h2>
                    <p class="text-gray-900 font-bold ">{data.company}</p>
                  </div>
                  <div>
                    <h2>{t('Cover Letter')}</h2>
                    <p class="font-bold">{data.coverLetter}</p>
                  </div>


                  <div class="flex mt-6  pb-5 border-b-2 border-gray-100 mb-5">

                    <span class="mr-3">{t('Application Date')}</span><br />
                    <p className='font-bold'>{new Date(data?.createAt).toLocaleDateString()}</p>

                  </div>
                  <h4 className=' mt-9'>{t('Applied By')}</h4>
                  <p className='font-bold'>{data.user.name}</p>

                </div>

              </div>
            </div>
          </section>
        ))
      }
    </div>
  )
}

export default DeatilApplication
