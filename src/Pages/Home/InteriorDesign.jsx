import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import '../../Assets/css/custom-color.css';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper";
import { Col, Container, Row } from "react-bootstrap";
import { m, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Parallax } from "react-scroll-parallax";
import { Helmet } from 'react-helmet-async'; 
import { fadeIn } from "../../Functions/GlobalAnimations";
import LazyLoad from 'react-lazyload'
import CustomModal from '../../Components/CustomModal'
import BlogSimple from "../../Components/Blogs/BlogSimple";
import FancyTextBox from '../../Components/FancyTextBox/FancyTextBox'
import TestimonialsCarousel05 from "../../Components/TestimonialCarousel/TestimonialsCarousel05";
import PortfolioColorful from "../../Components/Portfolio/PortfolioColorful";
import StartupPageBannerSlider from "./Startup/StartupBanner"
import Buttons from '../../Components/Button/Buttons';
import Seo from '../../Seo';
import BlogMetro from '../../Components/Blogs/BlogMetro'
import { ScaleLoader } from 'react-spinners';
import loginImage from "../../Assets/images/one-person.jpg"
import MainImageShow from '../../Components/ProductShowHome/MainImageShow';

const InteriorDesignPage = (props) => {
  const token = useSelector(state => state.State.readToken)
  const host = useSelector(state => state.State.host)
  const language = useSelector(state => state.State.language)

  const [activeSlide, setActiveSlide] = useState(0)
  const [data, setData] = useState(null)
  const [loadingHome, setLoadingHome] = useState(false)
  const [researchData, setResearchData] = useState(null)
  const [loadingResearch, setLoadingResearch] = useState(false)
  const [groupData, setgroupData] = useState(null)
  const [loadingGroup, setLoadingGroup] = useState(false)
  const [newsData, setNewsData] = useState(null)
  const [loadingNews, setLoadingNews] = useState(false)

  
  const swiperReff01 = React.useRef(null);
  const swiperReff02 = React.useRef(null);
  
  useEffect(() => {
    setLoadingGroup(false)
    setLoadingHome(false)
    setLoadingResearch(false)
    const GetHomeData =  () => {
       axios.get(`${host}/api/home-page?populate=deep,7&locale=${language}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        setData(res.data.data)
        setLoadingHome(true)
      })
    }
    const GetGroupData =  () => {
       axios.get(`${host}/api/groupss?populate=*&sort[0]=id:desc&pagination[page]=1&pagination[pageSize]=4&locale=${language}`, {
        headers: { Authorization: `Bearer ${token}`, withCredentials: false, }
      }).then(res => {
        setgroupData(res.data.data)
        setLoadingGroup(true)
      })
    }
    const researchElements =  () => {
       axios.get(`${host}/api/researchs?populate=*&sort[0]=id:desc&pagination[page]=1&pagination[pageSize]=2&locale=${language}`, {
        headers: { Authorization: `Bearer ${token}`, withCredentials: false, }
      }).then(res => {
        setResearchData(res.data.data)
        setLoadingResearch(true)
      })
    }
    const newsElements =  () => {
       axios.get(`${host}/api/news-elements?populate=deep&sort[0]=id:desc&pagination[page]=1&pagination[pageSize]=4&locale=${language}`, {
        headers: { Authorization: `Bearer ${token}`, withCredentials: false, }
      })
      .then(res => {
        setNewsData(res.data.data)
        setLoadingNews(true)
      })
    }
    newsElements()
    GetHomeData()
    GetGroupData()
    researchElements()
  },[host, token, language])

  return (
    <div className="interior-design" style={props.style}>
      <Helmet>
        <title>
          {" "}
          {language === "fa-IR"
            ? "وب سایت رسمی کاشی ستاره میبد"
            : language === "en"
            ? "Setareh Meybod Tile & Ceramic"
            : ""}{" "}
        </title>
      </Helmet>
      {!loadingHome && !data && (
        <div className="flex justify-center items-center bg-white w-full h-[100vh] fixed top-0 fix z-50">
          <ScaleLoader
            color={"#db1010"}
            loading={!loadingHome}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      {/* Seo */}
      {loadingHome && data.attributes.seo && <Seo data={data.attributes.seo} />}

      {/* Slider */}
      {loadingHome && data.attributes.Slider && (
        <StartupPageBannerSlider data={data.attributes.Slider} />
      )}

      {/* About us */}
      <LazyLoad height={-100}>
        {loadingHome && data.attributes.aboutUs.state && (
          <section className="bg-white relative py-[100px] lg:py-[80px] md:py-[55px] sm:py-[30px] xs:py-[20px] sm:border-t border-[#dee2e6]">
            <Container>
              <Row className="justify-center">
                <Col lg={6} className="text-center mb-8 sm:mb-6">
                  <span className="font-medium text-fastblue text-xxlg block mb-[5px] uppercase">
                    {data.attributes.aboutUs.mainTitle}
                  </span>
                  <h3 className="text-darkgray text-xlg font-medium">
                    {data.attributes.aboutUs.linkText}
                  </h3>
                </Col>
              </Row>
            </Container>
            <Container
              fluid
              className="px-[7%] xl:px-[2%] lg:px-[3%] sm:px-[15px] "
            >
              {language === "fa-IR" ? (
                <div className="justify-center flex-colections sm:flex-col-reverse">
                  <m.div className=" col-lg-4 col-md-6 md:mb-24 sm:mb-[50px]">
                    <p className="font-semibold mt-[55px] text-xlg text-darkgray mb-[25px] sm:mb-[15px] sm:mr-[20px]">
                      {data.attributes.aboutUs.sideTitle}
                    </p>
                    <p className="lg:w-full text-[#828282] text-[15px] mb-[25px] text-justify sm:pr-[22px] sm:pl-[22px]">
                      {data.attributes.aboutUs.summery}
                    </p>
                    <div className="flex item-center justify-start">
                      <Link to={data.attributes.aboutUs.button.link}>
                        <button className="button-custom w-auto mt-[35px]">
                          {data.attributes.aboutUs.button.title}
                        </button>
                      </Link>
                    </div>
                  </m.div>

                  <m.div className="col-lg-3 mr-[150px] sm:mr-[10px]">
                    <div className="outside-box-bottom relative mb-[-14vw] lg:mb-0">
                      <img
                        loading="lazy"
                        width={1920}
                        height={2468}
                        className="relative z-[1] w-full rounded-[4px] box-shadow"
                        src={
                          host +
                          data.attributes.aboutUs.image.data.attributes.url
                        }
                        alt=""
                      />
                      <LazyLoad height={200} offset={100}>
                        <CustomModal.Wrapper
                          className="absolute bottom-[7px] right-[-10px] z-[1] landscape:md:!-bottom-[25px]"
                          modalBtn={
                            <div className="relative flex items-center p-[25px] right-0 bg-[#f1edea] bottom-[-25px] z-[2] lg:p-[25px] lg:bottom-0 w-[86%] ml-auto cursor-pointer">
                              <span className="flex-1  relative ml-3 video-icon-text text-darkgray text-md font-semibold w-[120%]">
                                {data.attributes.aboutUs.videoTitle}
                              </span>
                              <Buttons
                                ariaLabel="modal btn"
                                type="submit"
                                className="relative btn-sonar border-0"
                                themeColor="#000"
                                color="#fff"
                                size="md"
                                title={
                                  <i className="icon-control-play m-0 pl-[4px]" />
                                }
                              />
                            </div>
                          }
                        >
                          {data.attributes.aboutUs.video && (
                            <div className="w-[1020px] max-w-full relative rounded mx-auto">
                              <div className="fit-video">
                                <video
                                  width="100%"
                                  height="100%"
                                  className="shadow-[0_0_8px_rgba(0,0,0,0.06)]"
                                  controls
                                  src={
                                    host +
                                    data.attributes.aboutUs.video.data
                                      .attributes.url
                                  }
                                  title="دستاورد های شرکت کاشی و سرامیک ستاره میبد"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  autoPlay
                                />
                              </div>
                            </div>
                          )}
                        </CustomModal.Wrapper>
                      </LazyLoad>
                    </div>
                  </m.div>
                </div>
              ) : language === "en" ? (
                <div className="justify-center flex-colections sm:flex-col-reverse">
                  <m.div className="col-lg-3 mr-[150px] sm:mr-[10px]">
                    <div className="outside-box-bottom relative mb-[-14vw] lg:mb-0">
                      <img
                        loading="lazy"
                        width={1920}
                        height={2468}
                        className="relative z-[1] w-full rounded-[4px] box-shadow"
                        src={
                          host +
                          data.attributes.aboutUs.image.data.attributes.url
                        }
                        alt=""
                      />
                      {/* Modal Component Start */}
                      <LazyLoad height={200} offset={100}>
                        <CustomModal.Wrapper
                          className="absolute bottom-[7px] right-[-10px] z-[1] landscape:md:!-bottom-[25px]"
                          modalBtn={
                            <div className="relative flex items-center p-[25px] right-0 bg-[#f1edea] bottom-[-25px] z-[2] lg:p-[25px] lg:bottom-0 w-[86%] ml-auto cursor-pointer">
                              <span className="flex-1  relative ml-3 video-icon-text text-darkgray text-md font-semibold w-[120%]">
                                {data.attributes.aboutUs.videoTitle}
                              </span>
                              <Buttons
                                ariaLabel="modal btn"
                                type="submit"
                                className="relative btn-sonar border-0"
                                themeColor="#000"
                                color="#fff"
                                size="md"
                                title={
                                  <i className="icon-control-play m-0 pl-[4px]" />
                                }
                              />
                            </div>
                          }
                        >
                          {data.attributes.aboutUs.video && (
                            <div className="w-[1020px] max-w-full relative rounded mx-auto">
                              <div className="fit-video">
                                <video
                                  width="100%"
                                  height="100%"
                                  className="shadow-[0_0_8px_rgba(0,0,0,0.06)]"
                                  controls
                                  src={
                                    host +
                                    data.attributes.aboutUs.video.data
                                      .attributes.url
                                  }
                                  title="دستاورد های شرکت کاشی و سرامیک ستاره میبد"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  autoPlay
                                />
                              </div>
                            </div>
                          )}
                        </CustomModal.Wrapper>
                      </LazyLoad>
                      {/* Modal Component End */}
                    </div>
                  </m.div>
                  <m.div className=" col-lg-4 col-md-6 md:mb-24 sm:mb-[50px]">
                    <p className="font-semibold mt-[55px] text-xlg text-darkgray mb-[25px] sm:mb-[15px] sm:mr-[20px]">
                      {data.attributes.aboutUs.sideTitle}
                    </p>
                    <p className="lg:w-full text-[#828282] text-[15px] mb-[25px] text-justify sm:pr-[22px] sm:pl-[22px]">
                      {data.attributes.aboutUs.summery}
                    </p>
                    <div className="flex item-center justify-start">
                      <Link to={data.attributes.aboutUs.button.link}>
                        <button className="button-custom w-auto mt-[35px]">
                          {data.attributes.aboutUs.button.title}
                        </button>
                      </Link>
                    </div>
                  </m.div>
                </div>
              ) : (
                <></>
              )}
            </Container>
          </section>
        )}
      </LazyLoad>

      {/* Section Start */}
      <section className="overflow-hidden py-[180px] lg:py-[140px] md:py-[75px] xs:py-[50px] bg-[#f1edea] pt-[200px]">
        <Row className="g-0 mt-24">
          <Col  xl={6} className="relative p-0 ">
            <Swiper
              ref={swiperReff01}
              loop={true}
              effect="fade"
              modules={[Pagination, Navigation, EffectFade, Autoplay]}
              autoHeight={false}
              autoplay={{ delay: 7000, disableOnInteraction: false }}
              fadeEffect={{ crossFade: true }}
              onSlideChange={(swiperCore) => {
                const { realIndex } = swiperCore;
                setActiveSlide(realIndex);
              }}
              className="black-move h-full"
            >
              {data &&
                data.attributes.ourWork.state &&
                data.attributes.ourWork.boxs.map((item, i) => {
                  return (
                    <SwiperSlide key={i} className="cover-background h-full w-full relative">
                      <AnimatePresence>
                        {activeSlide === i && (
                          <m.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                              opacity: { duration: 1.2, ease: "easeInOut" }, // fade in
                            }}
                            style={{
                              backgroundImage: `url(${host + item.mainImage.data.attributes.url})`,
                            }}
                            className="absolute top-0 left-0 h-full w-full bg-cover bg-center"
                          />
                        )}
                      </AnimatePresence>
                    </SwiperSlide>
                  );
                })}
            </Swiper>

            </Col>
          <Col xl={6} className="relative p-0">
            <div className={`flex absolute bottom-0 ${language === "fa-IR" ? "left" : "right"}-full z-10 lg:right-0`}>
              <div onClick={() => {
                swiperReff01.current.swiper.slidePrev()
                swiperReff02.current.swiper.slidePrev()
              }} className="btn-slider-next pt-2 bg-[#BF0D19cc] hover:bg-red text-[#fff] h-[62px] transition-default w-[62px] leading-[62px] text-[18px] absolute right-0 left-auto  z-10 bottom-[63px] flex items-center justify-center cursor-pointer md:w-[70px]" >
                <button aria-label="swiper next link" className="text-big"><i className="feather-arrow-left"></i></button>
              </div>
              <div onClick={() => {
                swiperReff01.current.swiper.slideNext()
                swiperReff02.current.swiper.slideNext()
              }} className="btn-slider-prev pt-2 bg-[#BF0D19cc] hover:bg-red text-[#fff] h-[62px] transition-default w-[62px] leading-[62px] text-[18px] absolute right-0 left-auto bottom-0 z-10 flex items-center justify-center cursor-pointer md:w-[70px]">
                <button aria-label="swiper prev link" className="text-big"><i className="feather-arrow-right"></i></button>
              </div>
            </div>
            <Swiper ref={swiperReff02} loop={true} modules={[Autoplay]} autoHeight={false} autoplay={{ delay: 7000, disableOnInteraction: false }} className="black-move h-full">
              {data && data.attributes.ourWork.state && data.attributes.ourWork.boxs.map(item => {
                return <SwiperSlide className="cover-background h-full" style={{ backgroundImage: `url(${host + item.sideImage.data.attributes.url})` }}>
                    <div className="text-center h-full">
                      <div className="flex flex-col justify-center bg-white box-shadow py-28 px-[9.5rem] h-full w-[70%] xl:px-20 lg:w-[55%] md:p-16 xs:px-8 md:w-[65%] sm:w-[70%] xs:w-full">
                        <div>
                          <img className="rounded-full mx-auto w-[150px] h-[150px] border-[8px] box-shadow border-red mb-[40px] xs:mb-[30px] xs:mx-auto" src={host + item.avatar.data.attributes.url} alt="" data-no-retina="" />
                          <div className="text-[36px] leading-[42px] font-semibold text-darkgray mb-[30px] tracking-[-1px] xs:mb-[20px]">{item.title}</div>
                          <p className="mb-[25px] text-[17px]">{item.discraption}</p>
                          {/* <Buttons ariaLabel="Explore more" href="#" className="mx-3 font-medium after:bg-black hover:text-black font-serif uppercase btn-link after:h-[1px] md:text-md" color="#000" title="Explore more" size="xl" /> */}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide> 
              })}
            </Swiper>
          </Col>
        </Row>
      </section>
      {/* Section End */}

      {/* Show product */}
      {data && data.attributes.ShowProduct && data.attributes.ShowProduct.state && (
        <LazyLoad height={200} offset={100}>
          <section className="bgwhite pt-[100px] pb-[120px] lg:py-[120px] md:py-[75px] sm:py-[110px] overflow-hidden xs:pt-[9%] xs:px-[15px]">
            <Container className="pt-[6%] lg:pt-0">
              <MainImageShow data={data.attributes.ShowProduct} />
            </Container>
          </section>
        </LazyLoad>
      )}


      {/* Parallax */}
      {data && data.attributes.Parallax.state &&  (
        <LazyLoad height={200} offset={100}>
          {" "}
          <div className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] md:flex md:items-center overflow-hidden relative">
            <Parallax
              className="lg-no-parallax bg-cover absolute top-[0px] left-0 md:-top-[30px] w-full h-[100vh] xs:bg-[center_center]"
              translateY={[-80, 80]}
              style={{
                backgroundImage: `url(${host}${data.attributes.Parallax.image.data.attributes.url})`,
              }}
            ></Parallax>
            <Container className="relative">
              <Row className="justify-center">
                <Col
                  xl={7}
                  lg={8}
                  sm={10}
                  className="text-center text-white overflow-hidden "
                >
                  <m.div>
                    {data.attributes.Parallax.title && (
                      <h2 className="heading-4 font-semibold mb-[25px] sm:mb-[25px] text-fastblue">
                        {data.attributes.Parallax.title}
                      </h2>
                    )}
                    {data.attributes.Parallax.subtitle && (
                      <p className="uppercase text-[20px]">
                        {data.attributes.Parallax.subtitle}
                      </p>
                    )}
                    {data.attributes.Parallax.content && (
                      <p className="uppercase mt-12 text-[16px] text-lightgray">
                        {data.attributes.Parallax.content}
                      </p>
                    )}
                  </m.div>
                  {data.attributes.Parallax.button && (
                    <m.div className="flex item-center justify-center">
                      <Link
                        to={data.attributes.Parallax.button.link}
                      >
                        <button className="button-custom w-auto mt-[35px]">
                          {data.attributes.Parallax.button.title}
                        </button>
                      </Link>
                    </m.div>
                  )}
                </Col>
              </Row>
            </Container>
          </div>{" "}
        </LazyLoad>
      )}

      {/* New in wrold */}
      {data && data.attributes.newInWrold.state && (
        <LazyLoad height={200} offset={100}>
          <m.section
            className="cover-background py-[130px] lg:py-[50px] md:py-[45px] sm:py-[30px] sm:pt-[100px]"
            style={{
              backgroundImage:
                "url(/assets/img/webp/home-interior-design-about-bg.webp)",
            }}
          >
            <Container className="relative">
              <Row className="items-center justify-center ">
                <Col xs={10} lg={6} className="relative">
                  <div className="relative">
                    <Parallax
                      className="lg-no-parallax w-[75%] mr-36"
                      speed={0}
                    >
                      <img
                        loading="lazy"
                        width=""
                        height=""
                        alt=""
                        src={
                          host +
                          data.attributes.newInWrold.bigImg.data.attributes.url
                        }
                      />
                    </Parallax>
                    <Parallax
                      className="lg-no-parallax flex justify-center items-center w-1/2 bg-no-repeat absolute bottom-24 right-[15px] lg:!left-auto lg:!top-[150px] sm:!top-[100px]"
                      speed={20}
                    >
                      <img
                        loading="lazy"
                        width="341.25px"
                        height="349.78px"
                        alt=""
                        src={
                          host +
                          data.attributes.newInWrold.smallImg.data.attributes
                            .url
                        }
                      />
                    </Parallax>
                  </div>
                </Col>
                <m.div className="col-lg-5 offset-lg-1 col-md-10 ml-0 mr-[4%]">
                  <div className="font font-medium mb-[15px] sm:mb-4 flex sm:mt-24">
                    <div className="flex-grow-1">
                      <span className="text-basecolor uppercase text-fastblue font-bold text-[24px]">
                        {data.attributes.newInWrold.redtext}
                      </span>
                    </div>
                  </div>
                  <h2 className="heading-5  uppercase text-darkgray font-bold w-[85%] mb-[30px] xl:w-full">
                    {data.attributes.newInWrold.title}
                  </h2>
                  <p className="w-[75%] xl:w-full mb-[25px] text-[15px] text-justify pl-6 pr-2">
                    {data.attributes.newInWrold.discraption}
                  </p>
                  <div className="flex item-center justify-start">
                    <Link to={data.attributes.newInWrold.button.link}>
                      <button className="button-custom w-auto mt-[35px] sm:mt-4">
                        {data.attributes.newInWrold.button.title}
                      </button>
                    </Link>
                  </div>
                </m.div>
              </Row>
            </Container>
          </m.section>
        </LazyLoad>
      )}

      {/* Done work */}
      {data && data.attributes.doneWork.state && (
        <LazyLoad height={200} offset={100}>
          <section className="py-[90px] lg:py-[60px] md:py-[45px] sm:py-[30px] relative border-t border-mediumgray overflow-hidden bg-[#f1edea]">
            <Container fluid className="px-0">
              <m.div className="row justify-center text-center mb-[70px] lg:mb-20 md:mb-16">
                <Col
                  xl={6}
                  lg={7}
                  md={8}
                  sm={12}
                  className=" flex flex-col items-center text-center"
                >
                  <span className="font-medium text-fastblue text-xxlg uppercase m-[10px]">
                    {data.attributes.doneWork.mainTitle}
                  </span>
                  <h2 className="heading-5 text-xlg -tracking-[1px] text-darkgray block w-3/5 mb-0">
                    {data.attributes.doneWork.SubTitle}
                  </h2>
                </Col>
              </m.div>
              <m.div className="row">
                <Col className="pr-40 lg:pr-24 lg:pl-24 sm:pr-12 md:pl-0">
                  <PortfolioColorful
                    grid="grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large"
                    overlay="#23232396"
                    data={data.attributes.doneWork.item}
                    carousel={true}
                    carouselOption={{
                      spaceBetween: 30,
                      loop: true,
                      slidesPerView: "auto",
                      autoplay: { delay: 4000, disableOnInteraction: false },
                    }}
                    className="swiper-auto-slide"
                  />
                </Col>
              </m.div>
            </Container>
          </section>
        </LazyLoad>
      )}

      {/* latest news */}
      {loadingNews && newsData && loadingHome && data.attributes.newsElements.state && (
        <LazyLoad height={200} offset={100}>
          <section className="bg-white relative border-t border-mediumgray overflow-hidden">
            <section className="pt-[90px] lg:pt-[70px] md:pt-[55px] sm:pt-[40px]  pb-[50px] md:pb-[55px] sm:pb-[40px]">
              <Container fluid>
                <Row className="justify-center">
                  <Col lg={6} className="text-center mb-8 sm:mb-6">
                    <span className="font-medium text-fastblue text-xxlg block mb-[5px] uppercase">
                      {data.attributes.newsElements.mainTitle}
                    </span>
                    <h6 className=" text-darkgray text-xlg  uppercase">
                      {data.attributes.newsElements.SubTitle}
                    </h6>
                  </Col>
                </Row>
                <Row>
                  <Col className="px-md-0">
                    <BlogMetro
                      pagination={false}
                      grid="grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large"
                      data={newsData}
                    />
                  </Col>
                </Row>
                <Row className="flex-fix">
                  <div className="flex item-center justify-center">
                    <Link to={"./news"}>
                      <button className="button-custom w-auto mt-[35px]">
                        {language === "fa-IR" ? (
                          "مشاهده همه"
                        ) : language === "en" ? (
                          "Read All"
                        ) : (
                          <></>
                        )}
                      </button>
                    </Link>
                  </div>
                </Row>
              </Container>
            </section>
          </section>
        </LazyLoad>
      )}

      {/* Latest groups */}
      {loadingGroup && data && data.attributes.groupElements.state && (
        <LazyLoad height={200} offset={100}>
          <>
            <m.div className="flex items-center justify-center text-center py-24 w-full bg-[#f1edea]">
              <Col
                xl={6}
                lg={7}
                md={8}
                sm={12}
                className=" flex flex-col items-center text-center"
              >
                <span className="font-medium text-fastblue text-xxlg uppercase m-[10px]">
                  {data.attributes.groupElements.title}
                </span>
                <h2 className="heading-5 text-xlg -tracking-[1px] text-darkgray block w-3/5 mb-0">
                  {data.attributes.groupElements.subtitle}
                </h2>
              </Col>
            </m.div>
            <m.section
              className="cover-background overflow-hidden"
              style={{
                backgroundImage: `url(${host}${
                  data &&
                  data.attributes.groupElements.Image.data.attributes.url
                })`,
              }}
            >
              <Container fluid className="px-0">
                <FancyTextBox
                  grid="row row-cols-1 row-cols-xl-4 row-cols-sm-2 gx-0 px-0"
                  themeColor=""
                  className="justify-center"
                  theme="fancy-text-box-05"
                  data={groupData}
                  animation={fadeIn}
                />
              </Container>
            </m.section>
            <div className="flex-fix py-12 pt-2 bg-[#f1edea]">
              <div className="flex item-center justify-center">
                <Link to={data.attributes.groupElements.button.link}>
                  <button className="button-custom w-auto mt-[35px]">
                    {data.attributes.groupElements.button.title}
                  </button>
                </Link>
              </div>
            </div>
          </>
        </LazyLoad>
      )}

      {/* Comments */}
      {data && data.attributes.comments.item[0] && data.attributes.comments.state && (
        <LazyLoad height={200} offset={100}>
          <section className="py-[100px] lg:py-[50px] md:py-[45px]  xs:py-[30px]">
            <Container>
              <Row className="items-center justify-center overflow-hidden">
                <m.div className="col-lg-4 col-sm-8 lg:text-start md:mb-20 md:text-center px-[15px] mb-[45px]">
                  <span className="font-medium text-basecolor uppercase block text-fastblue text-xlg mb-[15px]">
                    {data.attributes.comments.mainTitle}
                  </span>
                  <h2 className="heading-5 font-bold uppercase text-darkgray -tracking-[1px] m-0">
                    {data.attributes.comments.SubTitle}
                  </h2>
                </m.div>
                <m.div className="col-xl-7 col-lg-8 offset-xl-1">
                  <TestimonialsCarousel05
                    data={data.attributes.comments.item}
                    className="overflow-hidden"
                    carouselOption={{
                      slidesPerView: 1,
                      loop: true,
                      navigation: false,
                      autoplay: { delay: 2500, disableOnInteraction: false },
                    }}
                  />
                </m.div>
              </Row>
            </Container>
          </section>
        </LazyLoad>
      )}

      {/* Article */}
      {loadingHome && data.attributes.articleElements.state && (
        <LazyLoad height={200} offset={100}>
          <section className="py-[90px] lg:py-[70px] md:py-[55px]  xs:py-[40px] relative bg-[#f1edea]">
            <Container fluid>
              <Row className="justify-center text-center ">
                <Col
                  xl={6}
                  lg={7}
                  md={8}
                  sm={12}
                  className="flex flex-col items-center text-center mb-18 lg:mb-12 md:mb-8 xs:mb-15"
                >
                  <span className="font-medium text-fastblue text-xxlg uppercase m-[10px]">
                    {data.attributes.articleElements.mainTitle}
                  </span>
                  <h2 className="heading-5 text-xlg -tracking-[1px] text-darkgray block w-3/5 mb-0">
                    {data.attributes.articleElements.SubTitle}
                  </h2>
                </Col>
              </Row>
            </Container>
            {loadingResearch && (
              <Container fluid className="px-[6%]">
                <Row className="justify-center">
                  <Col xl={12} lg={12} sm={10} className="interiordesign-blog">
                    <BlogSimple
                      overlay="#374162"
                      pagination={false}
                      grid="grid grid-2col xl-grid-2col lg-grid-2col md-grid-1col sm-grid-1col xs-grid-1col gutter-double-extra-large"
                      data={researchData}
                    />
                  </Col>
                </Row>
                <Row className="flex-fix">
                  <div className="flex item-center justify-center">
                    <Link to={"./research"}>
                      <button className="button-custom w-auto mt-[35px]">
                        {language === "fa-IR" ? (
                          "مشاهده همه"
                        ) : language === "en" ? (
                          "Read All"
                        ) : (
                          <></>
                        )}
                      </button>
                    </Link>
                  </div>
                </Row>
              </Container>
            )}
          </section>
        </LazyLoad>
      )}

      {/* Login page link */}
      {loadingHome && (
        <LazyLoad height={200} offset={100}>
          {" "}
          <section
            className="bg-cover relative bg-center bg-no-repeat realtive overflow-hidden py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]"
            style={{ backgroundImage: `url('${loginImage}')` }}
          >
            <div className="opacity-50 bg-darkgray absolute top-0 left-0 w-full h-full"></div>
            <Container>
              <Row className="items-center justify-center">
                <Col className="text-center relative">
                  {language === "fa-IR" ? (
                    <h2 className="heading-6 text-xlg md:text-lg xs:text-lg font-semibold text-[#fff] uppercase mb-0">
                      جهت ورود به سایت بر روی کلمه &nbsp;
                      <a
                        aria-label="button"
                        href="/login"
                        className="font-semibold text-xlg pt-0 uppercase text-decoration-line-bottom md:text-lg md:leading-[26px] text-[#fff] hover:text-white"
                      >
                        ورود{" "}
                      </a>
                      کلیک کنید
                    </h2>
                  ) : language === "en" ? (
                    <h2 className="heading-6 text-xlg md:text-lg xs:text-lg font-semibold text-[#fff] uppercase mb-0">
                      Click &nbsp;
                      <a
                        aria-label="button"
                        href="/login"
                        className="font-semibold text-xlg pt-0 uppercase text-decoration-line-bottom md:text-lg md:leading-[26px] text-[#fff] hover:text-white"
                      >
                        Here
                      </a>{" "}
                      &nbsp; to enter the site.
                    </h2>
                  ) : (
                    <></>
                  )}
                </Col>
              </Row>
            </Container>
          </section>
        </LazyLoad>
      )}
    </div>
  );
}
export default InteriorDesignPage