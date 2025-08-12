import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectFade, Autoplay } from "swiper";
import { LazyMotion, domMax, m } from 'framer-motion';
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import LazyLoad from 'react-lazyload';
import moment from 'jalali-moment';

const StartupPageBannerSlider = (props) => {
    const [activeSlide, setActiveSlide] = useState(0)
    const host = useSelector(state => state.State.host)
    const [hovered, setHovered] = useState(null);

    return (<>
        {props.data && <section className="bg-darkgray home-startup-swiper">
            <LazyMotion strict features={domMax}>
                <Swiper
                    // modules={[Pagination, Autoplay]}
                    slidesPerView={1}
                    spaceBetween={0}
                    loop={true}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    pagination={{ dynamicBullets: false, clickable: true }}
                    keyboard={true}
                    effect="fade"
                    navigation={false}
                    fadeEffect={{ crossFade: true }}
                    modules={[Pagination, Navigation, EffectFade, Autoplay]}
                    onSlideChange={(swiperCore) => {
                        const { realIndex } = swiperCore;
                        setActiveSlide(realIndex)
                    }}
                    // breakpoints={{ 767: { pagination: true } }}
                    className="white-move swiper-pagination-light h-full swiper-pagination-03 swiper-pagination-medium  swiper-pagination-light swiper-pagination-big">
                    {props.data.filter(item => item.state).map((item, i) => {
                        if (item.schedule) {
                            const now = new Date();
                            let showSlide = true;

                            // Check start date/time if present
                            if (item.schedule.startDatee && item.schedule.startTime) {
                                const startDateTime = new Date(`${item.schedule.startDatee}T${item.schedule.startTime}`);
                                console.log("now", now)
                                console.log("startDateTime", startDateTime)
                                if (now < startDateTime) {
                                    showSlide = false; // too early
                                }
                            }
                        
                            // Check end date/time if present
                            if (item.schedule.endDate && item.schedule.endTime) {
                                const endDateTime = new Date(`${item.schedule.endDate}T${item.schedule.endTime}`);
                                if (now > endDateTime) {
                                    showSlide = false; // expired
                                }
                            }
                        
                            if (!showSlide) {
                                return null; // Skip this slide
                            }
                        }      
                    
                        return (
                            <LazyLoad key={i}>
                                <SwiperSlide
                                    className="overflow-hidden"
                                    onMouseEnter={() => setHovered(i)}
                                    onMouseLeave={() => setHovered(null)}
                                >
                                    <a href={`${item.link}`}>
                                        <m.div
                                            initial={{ scale: 1.2 }}
                                            animate={{ scale: activeSlide === i ? 1 : 1.2 }}
                                            transition={{ duration: 1.7, ease: "easeInOut" }}
                                            style={{ backgroundImage: `url(${host}${item.image.data.attributes.formats.custom.url})` }}
                                            className="overflow-hidden absolute h-full w-full top-0 left-0 cover-background"
                                        />
                                        <m.div className="opacity-30 absolute h-full w-full top-0 left-0 bg-darkgray"></m.div>
                                        <div className="text-center">
                                            <Row className="full-screen items-center w-[150%] md:landscape:h-[500px]">
                                                <Col xs={12} lg={4} md={10} className="flex-fix my-0 ml-auto relative pt-[45vh]">
                                                    {item.Title && (
                                                        <m.h1
                                                            initial={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }}
                                                            animate={{ clipPath: activeSlide === i ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' : 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }}
                                                            transition={{ duration: 0.5, delay: 0.5, ease: "easeIn" }}
                                                            className={`absolute bottom-0 right-[35px] font-semibold mr-8 pb-[10px] mb-0 text-[40px] tracking-[-2px] ${hovered === i ? 'text-red' : 'text-white'} mt-[45vh] lg:text-[45px] lg:leading-[45px] xs:text-[35px] xs:leading-[40px] xs:mb-[20px] transition-colors duration-400 ease-in-out`}
                                                        >
                                                            {item.Title}
                                                        </m.h1>
                                                    )}
                                                    {item.Subject && (
                                                        <m.span
                                                            initial={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }}
                                                            animate={{ clipPath: activeSlide === i ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' : 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }}
                                                            transition={{ duration: 0.5, delay: 0.8, ease: "easeIn" }}
                                                            className={`absolute bottom-[-55px] right-[35px] mr-8 block text-[19px] leading-[28px] mb-[35px] font-light text-white xs:text-base xs:mb-[20px] transition-colors duration-400 ease-in-out`}
                                                        >
                                                            {item.Subject}
                                                        </m.span>
                                                    )}
                                                </Col>
                                            </Row>
                                        </div>
                                    </a>
                                </SwiperSlide>
                            </LazyLoad>
                        );
                    })}
                </Swiper>
            </LazyMotion>
        </section>}
        </>
    )
}

export default StartupPageBannerSlider