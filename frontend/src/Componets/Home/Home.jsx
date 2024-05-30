import React, { useEffect, useState } from 'react'
import first from "../../Assets/Firstslide.png"
import second from "../../Assets/secondslide.webp"
import third from "../../Assets/thirdsilde.webp"
import fouth from "../../Assets/fourthslide.webp"
import "./home.css"
import Job from './Job'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useTranslation } from "react-i18next";




function Home() {
    const { t, i18n } = useTranslation();



    const [currentSlide, setCurrentSlide] = useState(0)
    const [selectedCategory, setSelectedCategory] = useState("Big Brands")
    const [internshipData, setInternshipData] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://internshipbackend-vwja.onrender.com/api/internship`)
                setInternshipData(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    const filterInternShips = internshipData.filter((item) =>
        !selectedCategory || item.category === selectedCategory
    )


    const handleSlide = (direction) => {
        const contianer = document.getElementById("container");
        const step = 100;
        if (direction === 'left') {
            setCurrentSlide((preveSlibe) => (preveSlibe > 0 ? preveSlibe - 1 : 0))
        }
        else {
            setCurrentSlide((preveSlibe) => (preveSlibe < 3 ? preveSlibe + 1 : 3))
        }
        sideScroll(contianer, direction, 25, step, 10)
    }

    const handleSlideIntern = (direction) => {
        const contianer = document.getElementById("container2");
        const step = 100;
        if (direction === 'left') {
            setCurrentSlide((preveSlibe) => (preveSlibe > 0 ? preveSlibe - 1 : 0))
        }
        else {
            setCurrentSlide((preveSlibe) => (preveSlibe < 3 ? preveSlibe + 1 : 3))
        }
        sideScrollIntern(contianer, direction, 25, step, 10)
    }


    return (
        <div className={` p-2`}>
            <h1 className='text-center text-4xl font-bold mt-5'>{t('header')}</h1>
            <p className='text-center text-lg font-bold mt-3'>{t("headerDownText")} 🔥</p>

            <div className="imgs flex justify-center" id='container'>
                <div className="slide flex sm:mt-10 " id='content'>
                    <img className='slide_Img ml-4' src={first} alt="" />
                    <img className='slide_Img ml-4' src={second} alt="" />
                    <img className='slide_Img ml-4' src={third} alt="" />
                    <img className='slide_Img ml-4' src={fouth} alt="" />
                </div>
            </div>
            <div className="flex BUttons mt-5">
                <button className='back' onClick={() => handleSlide('left')}> <i className='bi bi-chevron-left' id='sideBack'></i></button>
                <button className="next" onClick={() => handleSlide('right')}> <i className='bi bi-chevron-right' id='slide'></i></button>
            </div>


            <div className={`${i18n.language === 'hi' ? " bg-blue-200" : ''}`}>
                <div className="info-intern">
                    <div className="mt-16">
                        <h1 className='text-center font-bold text-4xl'>{t("header2")}</h1>
                    </div>
                    <div className="categories flex flex-wrap mt-14 border-2 mx-5 p-3 rounded-xl shadow-lg">
                        <p className='font-bold w-full text-left ml-6 text-xl mb-3'>{t("popular1")}</p>
                        <span className={`category mr-4 ml-6 shadow-xl ${selectedCategory === 'Big Brands' ? 'bg-blue-500 text-white' : ""}`} onClick={() => setSelectedCategory('Big Brands')}>{t("pList1")}</span>
                        <span className={`category mr-4 ml-6  shadow-xl ${selectedCategory === "Work From Home" ? 'bg-blue-500 text-white' : ""}`} onClick={() => setSelectedCategory("Work From Home")}>{t("pList2")}</span>
                        <span className={`category mr-4 ml-6  shadow-xl ${selectedCategory === "Part-time" ? 'bg-blue-500 text-white' : ""}`} onClick={() => setSelectedCategory("Part-time")}>{t("pList3")}</span>
                        <span className={`category mr-4 ml-6  shadow-xl ${selectedCategory === "MBA" ? 'bg-blue-500 text-white' : ""}`} onClick={() => setSelectedCategory("MBA")}>{t("pList4")}</span>
                        <span className={`category mr-4 ml-6  shadow-xl ${selectedCategory === "Engineering" ? 'bg-blue-500 text-white' : ""}`} onClick={() => setSelectedCategory("Engineering")}>{t("pList5")}</span>
                        <span className={`category mr-4 ml-6  shadow-xl ${selectedCategory === "media" ? 'bg-blue-500 text-white' : ""}`} onClick={() => setSelectedCategory("media")}>{t("pList6")}</span>
                        <span className={`category mr-4 ml-6  shadow-xl ${selectedCategory === "Design" ? 'bg-blue-500 text-white' : ""}`} onClick={() => setSelectedCategory("Design")}>{t("pList7")}</span>
                        <span className={`category mr-4 ml-6  shadow-xl ${selectedCategory === "Data Science" ? 'bg-blue-500 text-white' : ""}`} onClick={() => setSelectedCategory("Data Science")}>{t("pList8")}</span>
                    </div>
                </div>
                <div className={`internships h-[400px]`} id='container2'>
                    <div className={`internShip-Info flex ${i18n.language === 'fr' && " bg-yellow-200"} ${i18n.language === 'hi' && " bg-blue-200"} ${i18n.language === 'zh' && " bg-green-200"}`}>
                        {
                            filterInternShips.map((data, index) => (

                                <div className="m-5 p-3 w-[500px] h-[350px] border-2 border-slate-500 rounded-xl shadow-xl" key={index}>
                                    <div className='mx-auto flex flex-col'>
                                        <p className='my-3 p-2 rounded-md flex gap-2 border-2 w-fit'> <i className='bi bi-arrow-up-right text-blue-500' ></i>{t("iCardTitle")}</p>
                                        <p>{data.title}</p>
                                        <small className='text-slate-400 text-sm text-center mt-2'>{data.company}</small>

                                        <hr className='mt-5' />
                                        <p className='mt-3' ><i class="bi bi-geo-alt-fill"></i> {data.location}  </p>
                                        <p className='mt-2'> <i class="bi bi-cash-stack"></i> {data.stipend}</p>
                                        <p className='mt-2'><i class="bi bi-calendar-fill"></i> {data.Duration}</p>
                                    </div>
                                    <div className='flex gap-4 mt-5'>
                                        <span className='bg-slate-200 text-slate-400 p-2 rounded-md text-center'>{t("cardType")}</span>
                                        <div className='m-auto'>
                                            <Link to={`/detailInternship?q=${data._id}`}>
                                                <span className='text-blue-500 m-auto'>
                                                    {t("viewButton")}<i class="bi bi-chevron-right"></i>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>


                            ))
                        }

                    </div>
                </div>
                <div className="flex items-center justify-center mt-9">
                    <button className='back' onClick={() => handleSlideIntern('left')}> <i className='bi bi-chevron-left' id='sideBack'></i></button>
                    <button className="next" onClick={() => handleSlideIntern('right')}> <i className='bi bi-chevron-right' id='slide'></i></button>
                </div>
            </div>
            <Job
                popular1={t('popular1')}
                list1={t('pList1')}
                list2={t('pList2')}
                list3={t('pList3')}
                list4={t('pList4')}
                list5={t('pList5')}
                list6={t('pList6')}
                list7={t('pList7')}
                list8={t('pList8')}
                iCardTitle={t("iCardTitle")}
                cardType2={t("cardType2")}
                viewButton={t("viewButton")}
            />

            <hr />
            <div className="mt-8 flex flex-wrap justify-center items-center text-center  gap-3 md:gap-10">
                <div className="text-block mt-5">
                    <span className='font-bold  text-xl md:text-6xl text-blue-600'>300K+</span>
                    <p className='text-sm md:text-xl'>{t('num1')}</p>
                </div>
                <div className="text-block mt-5">
                    <span className='font-bold text-xl md:text-6xl text-blue-600'>10K+</span>
                    <p className='text-sm md:text-xl'>{t('num2')}</p>
                </div>
                <div className="text-block mt-5">
                    <span className='font-bold text-xl md:text-6xl text-blue-600'>21Mn+</span>
                    <p className='text-sm md:text-xl'>{t('num3')}</p>
                </div>
                <div className="text-block mt-5">
                    <span className='font-bold text-xl md:text-6xl text-blue-600'>600K+</span>
                    <p className='text-sm md:text-xl'>{t('num4')}</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row bg-blue-700 justify-around p-3  h-32 mt-8">
                <div className="cont">
                    <p className="flex justify-center text-white  text-md sm:text-xl items-center w-fit font-semibold">{t("lowerText")}</p>
                </div>
                <div className="flex gap-3 sm:flex-col">
                    <div className='max-w-sm w-fit' >
                        <a href="/register" id='buttons' className='flex gap-2 p-2 bg-white rounded-xl px-5'>
                            <div className='my-auto'>
                                <svg className="h-6 w-6" viewBox="0 0 40 40">
                                    <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                                    <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                                    <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                                    <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                                </svg>
                            </div>
                            <p className='px-2'>{t("signInText")}</p>
                        </a>
                    </div>
                    <div>
                        <a to="/register">
                            <button className='bg-sky-500 w-full text-slate-200 p-2 rounded-lg'>{t("registerButton")}</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home


function sideScroll(element, direction, speed, distance, step) {
    let scrollAmount = 0;
    const slideTimer = setInterval(function () {
        if (direction === 'left') {
            element.scrollLeft -= step
        }
        else {
            element.scrollLeft += step
        }
        scrollAmount += step;
        if (scrollAmount >= distance) {
            window.clearInterval(slideTimer)
        }
    }, speed)
}
function sideScrollIntern(element, direction, speed, distance, step) {
    let scrollAmount = 0;
    const slideTimer = setInterval(function () {
        if (direction === 'left') {
            element.scrollLeft -= step
        }
        else {
            element.scrollLeft += step
        }
        scrollAmount += step;
        if (scrollAmount >= distance) {
            window.clearInterval(slideTimer)
        }
    }, speed)
}