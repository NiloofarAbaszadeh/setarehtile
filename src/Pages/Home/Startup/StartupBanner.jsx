import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation, EffectFade, Autoplay } from "swiper"
import { LazyMotion, domMax, m } from 'framer-motion'
import { Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const StartupPageBannerSlider = (props) => {
    const [activeSlide, setActiveSlide] = useState(0)
    const host = useSelector(state => state.State.host)
    const language = useSelector(state => state.State.language)

    return (<>
        {props.data && <section className="bg-darkgray home-startup-swiper">
            <LazyMotion strict features={domMax}>
                <Swiper
                    pagination={{ clickable: true, }}
                    keyboard={true}
                    effect="fade"
                    slidesPerView={1}
                    spaceBetween={0}
                    loop={true}
                    navigation={false}
                    autoplay={{ delay: 5500, disableOnInteraction: false }}
                    fadeEffect={{ crossFade: true }}
                    modules={[Pagination, Navigation, EffectFade, Autoplay]}
                    onSlideChange={(swiperCore) => {
                        const { realIndex } = swiperCore;
                        setActiveSlide(realIndex)
                    }}
                    className="startup swiper-navigation-04 swiper-navigation-light swiper-pagination-03 swiper-pagination-light swiper-pagination-medium sm-nav-hidden">
                    {props.data.map((item, i) => {
                        return (
                            <SwiperSlide key={item.id} className="overflow-hidden">
                                <m.div initial={{ scale: 1.2 }} animate={{ scale: activeSlide === i ? 1 : 1.2 }} transition={{ duration: 1.7, ease: "easeInOut" }} style={{ backgroundImage: `url(${host}${window.innerWidth <= 700 ? item.image.data.attributes.formats.medium.url : item.image.data.attributes.url})` }} className="overflow-hidden absolute h-full w-full top-0 left-0 cover-background"> </m.div>
                                <m.div className="opacity-30 absolute h-full w-full top-0 left-0 bg-darkgray"></m.div>
                                <div className="text-center">
                                    <Row className="full-screen items-center w-[120%] md:landscape:h-[500px]">
                                        <Col xs={12} lg={4} md={10} className={`flex-fix my-0 ${language === "fa-IR" ? "ml-auto" : language === "en" ? "mr-auto" : ""} relative pt-[45vh]`}>
                                            {item.Title && <m.h1 initial={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }} animate={{ clipPath: activeSlide === i ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' : 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }} transition={{ duration: 0.5, delay: 0.5, ease: "easeIn" }} className={`absolute bottom-0 ${language === "fa-IR" ? "right-[35px]" : language === "en" ? "left-36" : ""} font-semibold mr-8 pb-[10px] mb-0 text-[40px] tracking-[-2px] text-white mt-[45vh] lg:text-[45px] lg:leading-[45px] xs:text-[25px] xs:mr-0 xs:pb-0 xs:leading-[40px] xs:mb-[20px]`}>{item.Title}</m.h1>}
                                            {item.Subject && <m.span initial={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }} animate={{ clipPath: activeSlide === i ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' : 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }} transition={{ duration: 0.5, delay: 0.8, ease: "easeIn" }} className={`absolute bottom-[-55px] ${language === "fa-IR" ? "right-[35px]" : language === "en" ? "left-36" : ""} mr-8 block text-[19px] leading-[28px] mb-[35px] font-light text-white xs:text-base xs:mb-[20px]`}>{item.Subject}</m.span>}
                                        </Col>
                                    </Row>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </LazyMotion>
        </section>}
        </>
    )
}

export default StartupPageBannerSlider