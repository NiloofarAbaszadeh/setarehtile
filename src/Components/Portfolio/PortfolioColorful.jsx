import React, { memo, useEffect, useRef, useState } from 'react'

// Libraries
import { Link } from 'react-router-dom';
import { m } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import { useSelector } from 'react-redux';

// Components
import Filter from './Filter';


const PortfolioColorful = (props) => {
    const portfolioWrapper = useRef()
    const swiperRef = useRef()
    const [loading, setLoading] = useState(true)

    
  const host = useSelector(state => state.State.host)

    useEffect(() => {
        if (props.carousel !== true) {
            let allImages = portfolioWrapper.current.querySelectorAll("img");

            Promise.all(Array.prototype.slice.call(allImages).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
                import("../../Functions/Utilities").then(module => {
                    const grid = module.initializeIsotop(portfolioWrapper.current)
                    grid.on('arrangeComplete', () => setLoading(false));
                })
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleFilterChange = () => {
        portfolioWrapper.current.querySelectorAll("li").forEach(item => item.childNodes[0]?.classList.add("appear"))
    }

    return (
        <div className="grid-wrapper">
            {/* Filter Start */}
            <Filter title={props.title} filterData={props.filterData} onFilterChange={handleFilterChange} />
            {/* Filter End */}
            {
                props.carousel === true ? (
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        {...props.carouselOption}
                        className={`${props.className ? ` ${props.className}` : ""}`}
                        ref={swiperRef}>
                        {
                            props.data.map((item, i) => {
                                return (
                                    <SwiperSlide key={i}>
                                        <m.div
                                            className='portfolio-colorful box-shadow'
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                        >
                                            <Link aria-label="link for filter content" target={props.target} to={`/product-groups` + item.link}>
                                                <div className="portfolio-box" style={{ "--brand-color": typeof (props.overlay) === "object" ? props.overlay[i] : props.overlay }}>
                                                    <div className="portfolio-image">
                                                        {item.img && <img className="w-full box-shadow rounded-[3px]" src={host + item.img.data.attributes.url} height={675} width={540} alt="portfolio-colorful" />}
                                                        <div className="portfolio-hover justify-between flex">
                                                            <div className="portfolio-content">
                                                                <div className='flex items-center justify-right flex-col'>
                                                                    {item.discraption && <span className="text-[22px] text-white opacity-70 inline-block">{item.discraption}</span>}
                                                                    {item.name && <h3 className="heading-6 font-semibold text-white uppercase mb-0 text-[32px] py-2">{item.name}</h3>}
                                                                </div>
                                                            </div>
                                                            <i className="ti-arrow-top-left text-basecolor left-[20px] right-auto"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </m.div>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                ) : (
                    <ul ref={portfolioWrapper} className={`grid-container text-center${props.grid ? ` ${props.grid}` : ""}${props.className ? ` ${props.className}` : ""}${loading ? " loading" : ""}`}>
                        <li className="grid-sizer"></li>
                        {
                            props.data.map((item, i) => {
                                return (
                                    <li key={i} className={`grid-item${item.double_col ? " grid-item-double" : ""} ${item.category ? item.category.toString().split(",").join(" ").toLowerCase() : ""}`}>
                                        <m.div
                                            className='portfolio-colorful'
                                            initial={{ opacity: 0 }}
                                            whileInView={!loading && { opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                        >
                                            <Link aria-label="link for filter content" to={`/product-groups` + item.link}>
                                                <div className="portfolio-box" style={{ "--brand-color": typeof (props.overlay) === "object" ? props.overlay[i] : props.overlay }}>
                                                    <div className="portfolio-image">
                                                        {item.img && <img className="w-full" height={572} width={458} src={host + item.img.data.attributes.url} alt="portfolio-box" />}
                                                        <div className="portfolio-hover justify-between flex">
                                                            <div className="portfolio-content">
                                                                {item.discraption && <span className=" text-sm font-serif text-white uppercase mb-[5px] opacity-70 inline-block">{item.discraption}</span>}
                                                                {item.name && <h3 className="heading-6 font-semibold text-white uppercase mb-0">{item.name}</h3>}
                                                            </div>
                                                            <i className="ti-arrow-top-right text-basecolor"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </m.div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                )
            }
        </div>
    )
}



export default memo(PortfolioColorful)