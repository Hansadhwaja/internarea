import React, { useEffect } from 'react'
import { useState } from 'react'

import axios from 'axios'
import { Link } from 'react-router-dom'
function Job({popular1,list1,list2,list3,list4,list5,list6,list7,list8,iCardTitle,cardType2,viewButton}) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [selectedCategory, setSelectedCategory] = useState("Big Brands")
    const [JobData, setJobData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://internarea.onrender.com/api/job`)
                setJobData(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    const handleJob = (direction) => {
        const contianer = document.getElementById("container3");
        const step = 100;
        if (direction === 'left') {
            setCurrentSlide((preveSlibe) => (preveSlibe > 0 ? preveSlibe - 1 : 0))
        }
        else {
            setCurrentSlide((preveSlibe) => (preveSlibe < 3 ? preveSlibe + 1 : 3))
        }
        sideScrollJob(contianer, direction, 25, step, 10)
    }
    const filterInternShips = JobData.filter((item) =>
        !selectedCategory || item.category === selectedCategory
    )
    return (
        <div className='bg-inherit'>

            <div className=" mt-12">

                <div className=" flex flex-wrap mt-14 border-2 mx-5 p-3 rounded-xl shadow-lg">
                <p className='font-bold w-full text-left ml-6 text-xl mb-3'>{popular1}</p>
                        <span className={`category mr-4 ml-6 ${selectedCategory === 'Big Brands' ? 'bg-blue-500 text-white' : ""}`} onClick={() => setSelectedCategory('Big Brands')}>{list1}</span>
                        <span className={`category mr-4 ml-6 ${selectedCategory === "Work From Home" ? 'bg-blue-500 text-white':""}`} onClick={() => setSelectedCategory("Work From Home")}>{list2}</span>
                        <span className={`category mr-4 ml-6 ${selectedCategory === "Part-time" ? 'bg-blue-500 text-white' :""}`} onClick={() => setSelectedCategory("Part-time")}>{list3}</span>
                        <span className={`category mr-4 ml-6 ${selectedCategory === "MBA" ? 'bg-blue-500 text-white' :""}`} onClick={() => setSelectedCategory("MBA")}>{list4}</span>
                        <span className={`category mr-4 ml-6 ${selectedCategory === "Engineering" ? 'bg-blue-500 text-white' :""}`} onClick={() => setSelectedCategory("Engineering")}>{list5}</span>
                        <span className={`category mr-4 ml-6 ${selectedCategory === "media" ? 'bg-blue-500 text-white' :""}`} onClick={() => setSelectedCategory("media")}>{list6}</span>
                        <span className={`category mr-4 ml-6 ${selectedCategory === "Design" ? 'bg-blue-500 text-white' :""}`} onClick={() => setSelectedCategory("Design")}>{list7}</span>
                        <span className={`category mr-4 ml-6 ${selectedCategory === "Data Science" ? 'bg-blue-500 text-white' :""}`} onClick={() => setSelectedCategory("Data Science")}>{list8}</span>
                </div>
            </div>
            <div className="internships h-[400px]" id='container3'>
                    <div className="internShip-Info flex">
                        {
                            filterInternShips.map((data, index) => (

                                <div className="m-5 p-3 w-[500px] h-[350px] border-2 border-slate-500 rounded-xl" key={index}>
                                    <div className='m-auto flex flex-col'>
                                        <p className='my-3 p-2 rounded-md flex gap-3 border-2'> <i className='bi bi-arrow-up-right text-blue-500' ></i>{iCardTitle}</p>
                                        <p>{data.title}</p>
                                        <small className='text-slate-400 text-sm text-center mt-2'>{data.company}</small>

                                        <hr className='mt-5' />
                                        <p className='mt-3' ><i class="bi bi-geo-alt-fill"></i> {data.location}  </p>
                                        <p className='mt-2'> <i class="bi bi-cash-stack"></i> {data.CTC}</p>
                                        <p className='mt-2'><i class="bi bi-calendar-fill"></i> {data.Experience}</p>
                                    </div>
                                    <div className='flex gap-4 mt-5'>
                                        <span className='bg-slate-200 text-slate-400 p-2 rounded-md text-center'>{cardType2}</span>
                                        <div className='m-auto'>
                                            <Link to={`/detailjob?q=${data._id}`}>
                                                <span className='text-blue-500 m-auto'>
                                                    {viewButton} <i class="bi bi-chevron-right"></i>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>


                            ))
                        }

                    </div>
                </div>
            <div className="flex BUttons m-5">
                <button className='back' onClick={() => handleJob('left')}> <i className='bi bi-chevron-left' id='sideBack'></i></button>
                <button className="next" onClick={() => handleJob('right')}> <i className='bi bi-chevron-right' id='slide'></i></button>
            </div>
        </div>

    )
}

export default Job
function sideScrollJob(element, direction, speed, distance, step) {
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