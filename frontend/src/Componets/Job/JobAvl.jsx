import React, { useEffect, useState } from 'react'
import "./job.css"
import compLogo from "../../Assets/netflix.png"
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
function JobAvl() {
  const { t, i18n } = useTranslation();

  const [serachCategory, setSearchCategory] = useState("");
  const [searchLoaction, setSearchLocation] = useState("")
  const [jobData, setJobData] = useState([])
  const [filterJob, setFilterJob] = useState([])
  const [isDivVisible, setDivVisible] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://internshipbackend-vwja.onrender.com/api/job`)
        setJobData(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [])
  const showDiv = () => {
    setDivVisible(true)
  }
  const hidediv = () => {
    setDivVisible(false)
  }

  const handleCategoryChange = (e) => {
    const categeoryValue = e.target.value;
    setSearchCategory(categeoryValue);
    setFilterJob([categeoryValue, searchLoaction])
  }

  const handleCategoryLocationChange = (e) => {
    const loactionValue = e.target.value;
    setSearchLocation(loactionValue);
    setFilterJob([serachCategory, loactionValue])
  }
  const filterJobs = (category, location) => {
    const filterData = jobData.filter(
      (Job) =>
        Job.category.toLowerCase().includes(category.toLowerCase()) &&
        Job.location.toLowerCase().includes(location.toLowerCase())
    )
    setFilterJob(filterData)
  }
  useEffect(() => {

    filterJobs(serachCategory, searchLoaction);

  }, [searchLoaction, serachCategory])



  return (
      <div className='flex flex-col sm:flex-row w-full'>
        <div className="w-full mb-14 flex flex-col items-center">
          <div className=" w-fit p-4 mt-3 rounded-lg shadow-lg">
            <p className=' text-center' ><i onClick={showDiv} className="bi bi-funnel  text-blue-400"></i>{t(' Filter')}</p>
            <div className='fill flex flex-col ml-2 gap-2'>
              <label htmlFor="pro">{t('Profile')}</label>
              <input type="text" id='pro' value={serachCategory} onChange={handleCategoryChange} className='border-2 p-2 rounded-lg w-full' placeholder={t('Profile manager')} />
              <label htmlFor="loc">{t('Location')}</label>
              <input type="text" id='loc' value={searchLoaction} onChange={handleCategoryLocationChange} className='border-2 p-2 rounded-lg w-full' placeholder={t('Mumbai') }/>
            </div>
            <div className=" preferences mt-8 flex flex-col">
              <div className="flex mt-3 ml-3 mr-3">
                <input type="checkbox" name="wfh" id="whf" className='mr-2 ml-3' />
                <label htmlFor="wfh">{t("Work From home")}</label>
              </div>
              <div className="flex mt-3 ml-3 mr-3">
                <input type="checkbox" name="pt" id="whf" className='mr-2 ml-3' />
                <label htmlFor="pt">{t("Part-time")}</label>
              </div>
              <p> {t("Annual salary (in lakhs)")}</p>
              <input type="range" name="" id="" />
              <p className='mt-2 ml-3 mr-3'>0  2K  &nbsp;  4k  &nbsp;  6K &nbsp;  8k   &nbsp; 10K</p>
            </div>

            <p className=' mt-5 text-blue-400'>{t("View more filters")} <i class="bi bi-chevron-down"></i></p>
            <span className='justify-end flex text-blue-400 mr-3'>{t("clear")}</span>
          </div>
          <div className="mt-12 shadow-lg rounded-xl p-5 w-fit">
            <div className="flex gap-3 my-auto">
              <input type="text" placeholder={t("inputText")} className='p-2 rounded-lg my-auto border-2' />
              <i className="bi bi-search my-auto"></i>
            </div>
          </div>
        </div>

        <div className="w-full">

          <p className='font-bold text-lg w-full mt-3'  >{filterJob.length} {t("total jobs")}</p>

          {filterJob.map((data, index) => (

            <div className='shadow-lg rounded-lg m-7 border-2 border-slate-400'>
              <div className="m-4">

              <div className="flex justify-between">
                <p className='p-1 rounded-lg border-2 border-sky-400  flex gap-2 my-auto' > <i className='bi bi-arrow-up-right text-blue-500' ></i>{t("iCardTitle")}</p>
                <img src={compLogo} className='w-14' alt="" />
              </div>
                <div className="">
                  <div className='flex flex-col items-start gap-3 m-2' >
                    <p className='text-lg text-black mt-7 font-bold'>{data.title}</p>
                    <p className='text-sm text-slate-500 font-bold'>{data.company}</p>
                    <p className=' mt-2'>{data.location}</p>
                  </div>
                  <div className="flex text-sm justify-between m-2">
                    <p className='mt-3'> <i class="bi bi-play-circle-fill"></i>   {t("startDate")} <br />  {data.StartDate}</p>


                    <p className='mt-3'> <i class="bi bi-calendar-check-fill"></i>{t("duration")}  <br />
                      {data.Duration}</p>

                    <p className='mt-3'>  <i class="bi bi-cash"></i>   {t("stipend")}<br /> {data.stipend}</p>
                  </div>
                </div>
                <div className='flex flex-col w-fit'>

                  <p className='bg-slate-200 text-slate-400 rounded-lg text-center p-2 mb-2'>{t("Permanent")}</p>
                  <p><i className="bi bi-stopwatch text-green-300 mx-2"></i>23/04/2024</p>
                </div>

                <div className="flex justify-end p-1">
                  <Link to={`/detailjob?q=${data._id}`}>
                    <button className='bg-transparent text-blue-500 m-2'>{t("viewButton")}</button>
                  </Link>
                </div>
              </div>
            </div>

          ))

          }

        </div>
      </div>  
  )
}

export default JobAvl
