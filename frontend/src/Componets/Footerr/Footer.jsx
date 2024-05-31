import React, { useEffect } from 'react'
import logo from '../../Assets/logo.png'
import { Link } from 'react-router-dom'
import playStore from '../../Assets/google.png'
import { useTranslation } from 'react-i18next';

function Footer() {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        document.documentElement.lang = i18n.language;
    }, [i18n.language]);
    console.log(i18n.language);
    return (
        <div>
            <footer className="bg-slate-700 text-white">
                <div className="container px-6 py-12 mx-auto">

                    <div className='w-[120px] bg-white'>
                        <Link to={"/"}><img src={logo} alt="" srcset="" /></Link>
                    </div>
                    <div className="grid grid-cols-2 gap-6 mt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                        <div>
                            <h3 className="text-lg font-bold  ">{t('footer1')}</h3>

                            <div className="flex flex-col items-start mt-4 space-y-4">
                                <p className=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer1Text1')}</p>
                                <p className=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer1Text2')}</p>
                                <p className=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer1Text3')}</p>
                                <p className=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer1Text4')}</p>
                                <p className=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer1Text5')}</p>
                                <p className=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer1Text6')}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold  ">{t('footer2')}</h3>

                            <div className="flex flex-col items-start mt-4 space-y-4">
                                <p className=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer2Text1')}</p>
                                <p className=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer2Text2')}</p>
                                <p className=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer2Text3')}</p>
                                <p className=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer2Text4')}</p>
                                <p className=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer2Text5')}</p>
                                <p className=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer2Text6')}</p>

                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold  ">{t('footer3')}</h3>

                            <div className="flex flex-col items-start mt-4 space-y-4">
                                <a href="/" className=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer3Text1')}</a>
                                <a href="/" className=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer3Text2')}</a>
                                <a href="/" className=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer3Text3')}</a>
                                <a href="/" className=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer3Text4')}</a>
                                <a href="/" className=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer3Text5')}</a>
                                <a href="/" className=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer3Text6')}</a>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold  ">{t('footer4')}</h3>

                            <div className="flex flex-col items-start mt-4 space-y-4">
                                <a href="/" className=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer4Text1')}</a>
                                <a href="/" className=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer4Text2')}</a>
                                <a href="/" className=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer4Text3')}</a>
                                <a href="/" className=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer4Text4')}</a>
                                <a href="/" className=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer4Text5')}</a>
                                <a href="/" className=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer4Text6')}</a>
                            </div>
                        </div>
                    </div>

                    <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />
                    <div className='flex gap-10'>


                        <div className='flex flex-col p-3 gap-10'>
                            <div>
                                <h2 className="text-lg font-bold  ">{t('footer5')}</h2>

                                <div className="flex flex-col items-start mt-4 gap-3">
                                    <a href="/" className=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer5Text1')}</a>
                                    <a href="/" className=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer5Text2')}</a>

                                </div>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold">{t('footer6')}</h2>

                                <div className="flex flex-col items-start mt-4 space-y-4">
                                    <a href="/" className=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer6Text1')}</a>
                                    <a href="/" className=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer6Text2')}</a>

                                </div>
                            </div>
                        </div>

                        <div className='flex p-3 flex-col gap-10'>
                            <div>
                                <h2 className="text-lg font-bold  ">{t('footer7')}</h2>

                                <div className="flex flex-col items-start mt-4 space-y-4">
                                    <a href="/" className=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer7Text1')}</a>
                                    <a href="/" className=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer7Text2')}</a>

                                </div>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold  ">{t('footer8')}</h2>

                                <div className="flex flex-col items-start mt-4 space-y-4">
                                    <a href="/" className=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer8Text1')}</a>


                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col items-center justify-between  mt-10 sm:flex-row">
                        <div className='flex gap-3 border-2 bg-white shadow-xl p-2  rounded-xl' >
                        <p className='my-auto text-slate-700 font-semibold'>{t('androidApp')}</p>
                          
                            <img src={playStore} alt='' className='w-12 h-12' />
                        </div>
                        <div className="social-icons">
                            <i className="fab fa-facebook"></i>
                            <i className="fab fa-twitter"></i>
                            <i className="fab fa-instagram"></i>

                        </div>
                        <p className="mt-4 text-sm  sm:mt-0 dark">{t('copyright')}</p>
                    </div>
                </div>
            </footer>

        </div>
    )
}

export default Footer
