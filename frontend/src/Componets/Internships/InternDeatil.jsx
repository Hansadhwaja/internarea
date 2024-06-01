import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../../Feature/Userslice'
import "./deatil.css"
import axios from 'axios'
import { useTranslation } from 'react-i18next'

function InternDeatil() {
  const { t } = useTranslation();
  const user = useSelector(selectUser)
  const [isDivVisible, setDivVisible] = useState(false)
  const [textare, setTextare] = useState("")
  const [company, setCompany] = useState("")
  const [category, setCategory] = useState("")
  const [data, setData] = useState([])

  const navigate = useNavigate();
  let search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("q")


  const show = () => {
    setDivVisible(true)
  }
  const hide = () => {
    setDivVisible(false)
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://internarea.onrender.com/api/internship/${id}`)
      setData(response.data)

      const { company, category } = response.data;
      setCompany(company)
      setCategory(category)
    }
    fetchData()
  })

  const submitApplication = async () => {
    const text = document.getElementById("text")
    if (text.value === "") {
      alert("Fill the mendetory fildes")
    }
    else {
      const bodyJson = {
        coverLetter: textare,
        category: category,
        company: company,
        user: user,
        Application: id
      }

      await axios.post("https://internarea.onrender.com/api/application", bodyJson).then((res) => {



      }).catch((err) => {
        alert("error happend")
      })
      alert("Done")
      navigate("/Jobs")
    }
  }


  return (
    <div>
      <div className="p-3">

        <h1 className='font-bold text-3xl my-3'>{data.title}</h1>
        <div className="shadow-sm rounded-xl border-2 border-slate-400 w-fit p-5">
          <p className='m-2 border-2 border-sky-400 p-2 w-fit rounded-lg'> <i className='bi bi-arrow-up-right text-blue-500' ></i> {t('iCardTitle')}</p>
          <div className="flex flex-col gap-2 items-start m-2">
            <p className='text-xl font-bold mt-4'> {data.title}</p>
            <p className='text-sm text-slate-500 font-bold'>{data.company}</p>
            <p> <i class="bi bi-geo-alt-fill"></i> {data.location}</p>
          </div>
          <div className="flex text-sm justify-between m-3">
            <p className='mt-3 text-slate-400'> <i class="bi bi-play-circle-fill"></i> {t("startDate")}  <br />  {data.StartDate}</p>
            <p className='mt-3 text-slate-400' > <i class="bi bi-calendar-check-fill"></i>  {t("duration")}  <br />
              {data.Duration}</p>
            <p className='mt-3 text-slate-400'>  <i class="bi bi-cash"></i>  {t("stipend")}<br /> {data.stipend}</p>
          </div>

          <div className="flex">
            <p className='bg-green-100 rounded-lg text-green-300 p-3 m-2'> <i class="bi bi-clock"></i> 12/12/2012</p>
          </div>
          <hr />
          <div className="flex justify-start m-3">
            <p className='mt-3 text-xl font-bold text-start'> {t("about")}  {data.company}</p>
            <br />
          </div>
          <div className="flex m-3">
            <p className='text-blue-500'> {t("Instagram page")} <i className='bi bi-arrow-up-right-square'></i></p>
          </div>
          <p className='mt-4'> {data.aboutCompany}</p>
          <div className="m-3">
            <p className='mt-3 text-xl font-bold text-start'> {t(" About Job")}</p>
            <p>{data.aboutJob}</p>
          </div>
          <p className='text-blue-500 justify-start'>  {t("Learn Business Communication")}</p>

          <div className="m-3">
            <p className='mt-3 text-xl font-bold text-start'>{t("Who can apply")}</p>
            <p>{data.Whocanapply}</p>
          </div>

          <p className='mt-3 text-xl font-bold text-start m-3'>{t("Perks")}</p>
          <p>{data.perks}</p>

          <p className='mt-3 text-xl font-bold text-start m-3'> {t("Additional information")}</p>
          <p>{data.AdditionalInfo}</p>

          <p className='mt-3 text-xl font-bold text-start m-3'> {t("Number of opening")}</p>
          <p className='text-start'>{data.numberOfopning}</p>
          <div className='flex m-2'>
            <button className='m-auto  bg-blue-500 text-center text-white font-bold w-fit py-2  px-3 rounded-lg' onClick={show}>{t("Apply")}</button>

          </div>

        </div>

      </div>

      {isDivVisible && (

        <div className="p-3">
          <div className="shadow-sm rounded-xl border-2 w-fit p-5">
            <div>
              <button className='bg-sky-500 text-white p-2 rounded-lg flex items-start' onClick={hide} ><i className='bi-bi-x'></i> {t("Close")}</button>
              <p className='font-bold text-xl mt-3'>{t("Applyion for")}  {data.company}</p>
              <p className='mt-3 text-[12px] font-bold text-start mb-3'>{data.aboutCompany}</p>
            </div>
            <div className="moreSteps">
              <p className='font-semibold text-xl'>{t("Your resume")}</p>
              <small>{t("resumeText")}</small>
              <p className='mt-5 font-semibold text-xl'>{t("Cover letter")}</p>
              <p>{t("coverText")}</p>
              <textarea name="coverLetter" placeholder='' id="text" value={textare} onChange={(e) => setTextare(e.target.value)} className='w-full overflow-hidden rounded-lg p-2 bg-inherit shadow-xl'></textarea>
              <p className='mt-5 font-semibold text-xl'>{t("Your availiblity")}</p>
              <p>{t("Confirm your availiblity")}</p>
            </div>
            
            <div className='flex flex-col m-2 p-2 text-start'>
              <div>
                <label>
                  <input
                    type="radio"
                    value="Yes, I am available to join immediately"


                  />
                  {t("confirmText1")}
                </label>
              </div>

              <div>
                <label>
                  <input
                    type="radio"
                    value="No, I am currently on notice period"


                  />
                  {t("confirmText2")}
                </label>
              </div>

              <div>
                <label>
                  <input
                    type="radio"
                    value="No, I will have to serve notice period"


                  />
                  {t("confirmText3")}
                </label>
              </div>


              <div>
                <label>
                  <input
                    type="radio"
                    value="Other"


                  />
                  {t("other")} <span className='text-slate-500'>
                    (({t("confirmText4")}))  </span>
                </label>
              </div>

            </div>

            <p className='mt-5 font-semibold text-xl'>{t("Custom resume")}<span className='text-slate-500'>({t("Optional")})</span></p>
            <small className='text-slate-500'>{t("customText")}</small>


            <div className="submit flex justify-center">
              {user ? (
                <button className='bg-sky-500 text-white p-2 rounded-lg' onClick={submitApplication} >{t("Submit Application")}</button>
              ) : (
                <Link to={"/register"}>
                  <button className='bg-sky-500 text-white p-2 rounded-lg'>{t("Submit Application")}</button>
                </Link>
              )

              }
            </div>
          </div>
        </div>

      )

      }
    </div>
  )
}

export default InternDeatil
