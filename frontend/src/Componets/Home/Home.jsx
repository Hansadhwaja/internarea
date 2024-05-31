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
import { FcGoogle } from 'react-icons/fc'
import { useSelector } from 'react-redux'
import { selectUser } from '../../Feature/Userslice'




function Home() {
    const { t, i18n } = useTranslation();

    const user = useSelector(selectUser)

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
            <div className="flex BUttons mt-5 bg-inherit">
                <button className='back bg-inherit' onClick={() => handleSlide('left')}> <i className='bi bi-chevron-left' id='sideBack'></i></button>
                <button className="next bg-inherit" onClick={() => handleSlide('right')}> <i className='bi bi-chevron-right' id='slide'></i></button>
            </div>


            <div className='bg-inherit'>
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
            <div className='bg-inherit'>
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
            </div>


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
                {!user && (
                    <div className="flex gap-3 sm:flex-col">
                    <div>
                        <Link to="/register" className='flex gap-1 p-1 shadow-xl rounded-lg bg-white'>
                            <FcGoogle className='h-10 w-10' />
                            <p className="cursor-pointer my-auto w-5/6 text-center text-md text-gray-600 font-bold">{t('signInText')}</p>
                        </Link>
                    </div>
                    <div>
                        <Link to="/register">
                            <button className='bg-sky-500 w-full text-slate-200 p-3 rounded-lg'>{t("registerButton")}</button>
                        </Link>
                    </div>
                </div>
                )}
               
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