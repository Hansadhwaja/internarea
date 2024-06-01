import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import profileImage from '../Assets/org.jpg'
import { Link } from 'react-router-dom';


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


  return (
    <div>
    <div className='m-3'>
    <Link to={'/userapplication'} className='p-2 bg-sky-500 text-white my-auto rounded-lg'>{t('Back')}</Link>
    </div>
    
      {
        data.map((data) => (
          <section class="text-gray-600  overflow-hidden">
            <div class="container px-5 py-24 mx-auto">
              <div class="lg:w-4/5 mx-auto flex gap-10 flex-col">
                <img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover rounded-xl bg-inherit" src={data.user?.photo || profileImage} />
                <div class="lg:w-1/2 w-full flex flex-col gap-2">
                  <div>
                    <h2 class="text-sm text-gray-500">{t('Company')}</h2>
                    <p class="text-gray-900 font-bold ">{data.company}</p>
                  </div>
                  <div>
                    <h2>{t('Cover letter')}</h2>
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
