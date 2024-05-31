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
          <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
              <div className="lg:w-4/5 mx-auto flex flex-col md:flex-row gap-5 md:gap-10">
                <img alt="ecommerce" className="w-32 md:w-64 flex object-cover rounded-xl" src={data.user?.photo} />
                <div className="lg:w-1/2 w-full flex flex-col gap-2">
                  <div>
                    <h2 className="text-sm text-gray-500">{t('Company')}</h2>
                    <p className="text-gray-900 font-bold ">{data.company}</p>
                  </div>
                  <div>
                    <h2>{t('Cover Letter')}</h2>
                    <p className="font-bold">{data.coverLetter}</p>
                  </div>


                  <div className="flex mt-6  pb-5 border-b-2 border-gray-100 mb-5">

                    <span className="mr-3">{t('Application Date')}</span><br />
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
