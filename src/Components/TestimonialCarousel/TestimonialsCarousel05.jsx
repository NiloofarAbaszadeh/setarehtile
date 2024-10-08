import React, { memo } from 'react'

// Libraries
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
// import { PropTypes } from "prop-types";
import { useSelector } from 'react-redux';

// Data
import { TestimonialsCarouselData5 } from './TestimonialsCarouselData';

const TestimonialsCarousel05 = (props) => {
    
  const host = useSelector(state => state.State.host)
    const swiperRef = React.useRef(null)
    return (
        <div className={`relative ${props.className}`}>
            <Swiper
                {...props.carouselOption}
                className="testimonial-carousel-style-05 black-move"
                ref={swiperRef}
                modules={[Navigation, Pagination, Autoplay]} >
                {
                    props.data.map((item, i) => {
                        return (
                            <SwiperSlide key={i}>
                                <div className="flex items-center">
                                    {item.img && <img width="" height="" className="ml-[40px] h-[180px] w-[180px] sm:w-[150px] sm:h-[150px] xs:w-[80px] xs:h-[80px] xs:mr-[15px] rounded-full" src={host + item.img.data.attributes.formats.custom.url} alt="" />}
                                    <div>
                                        <div>
                                            {item.name && <div className="font-semibold uppercase leading-5 text-darkgray">{item.name}</div>}
                                            {item.role && <span className="text-md uppercase ">{item.role}</span>}
                                        </div>
                                        <div>
                                            {item.discraption && <p className="w-[85%] inline-block mb-[25px] md:w-full text-xmd mt-3">{item.discraption}</p>}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
            {
                props.carouselOption.navigation && (
                    <div className="flex">
                        <div onClick={() => swiperRef.current.swiper.slidePrev()} className="btn-slider-next rounded-full flex justify-center items-center text-darkgray bg-white border-[1px] border-solid border-mediumgray h-[40px] w-[40px] cursor-pointer hover:shadow-xl transition-all duration-800 absolute top-[38%] left-[-90px] right-auto">
                            <i className="feather-arrow-left text-xmd"></i>
                        </div>
                        <div onClick={() => swiperRef.current.swiper.slideNext()} className="btn-slider-prev rounded-full border-[1px] border-solid border-mediumgray bg-white text-darkgray flex justify-center items-center h-[40px] w-[40px] ml-[10px] cursor-pointer hover:shadow-xl transition-all duration-800 absolute top-[38%] right-[-90px] left-auto">
                            <i className="feather-arrow-right text-xmd"></i>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

TestimonialsCarousel05.defaultProps = {
    data: TestimonialsCarouselData5
}


export default memo(TestimonialsCarousel05)