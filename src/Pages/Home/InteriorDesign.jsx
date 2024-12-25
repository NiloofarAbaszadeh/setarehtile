import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import '../../Assets/css/custom-color.css';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { Col, Container, Row } from "react-bootstrap";
import { m } from "framer-motion";
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

  const swiperRef = React.useRef(null)
  const [data, setData] = useState(null)
  const [loadingHome, setLoadingHome] = useState(false)
  const [researchData, setResearchData] = useState(null)
  const [loadingResearch, setLoadingResearch] = useState(false)
  const [groupData, setgroupData] = useState(null)
  const [loadingGroup, setLoadingGroup] = useState(false)
  const [newsData, setNewsData] = useState(null)
  const [loadingNews, setLoadingNews] = useState(false)
  // console.log(language)
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
        <title> {language === "fa-IR" ? "وب سایت رسمی کاشی ستاره میبد" : language === "en" ? "Setareh Meybod Tile & Ceramic" : ""} </title>
      </Helmet>
      {!loadingHome && !data && <div className='flex justify-center items-center bg-white w-full h-[100vh] fixed top-0 fix z-50'>
        <ScaleLoader
        color={"#db1010"}
        loading={!loadingHome}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"/></div>}
      {loadingHome && data.attributes.seo && <Seo data={data.attributes.seo} />}
      {loadingHome && data.attributes.Slider && <StartupPageBannerSlider data={data.attributes.Slider} />}

      <LazyLoad height={-100}>
      {loadingHome && <section className="bg-white relative py-[100px] lg:py-[80px] md:py-[55px] sm:py-[30px] xs:py-[20px] sm:border-t border-[#dee2e6]">
      <Container>
          <Row className="justify-center">
            <Col lg={6} className="text-center mb-8 sm:mb-6">
              <span className="font-medium text-fastblue text-xxlg block mb-[5px] uppercase">{data.attributes.aboutUs.mainTitle}</span>
              <h3 className="text-basecolor text-xlg hover:text-darkgray font-medium">{data.attributes.aboutUs.linkText}</h3>
            </Col>
          </Row>
        </Container>
        <Container fluid className="px-[7%] xl:px-[2%] lg:px-[3%] sm:px-[15px] ">
        {language === "fa-IR" ? <div className='justify-center flex-colections sm:flex-col-reverse'>
          <m.div className=" col-lg-4 col-md-6 md:mb-24 sm:mb-[50px]">
            <p className="font-semibold mt-[55px] text-xlg text-darkgray mb-[25px] sm:mb-[15px] sm:mr-[20px]">{data.attributes.aboutUs.sideTitle}</p>
            <p className="lg:w-full text-[#828282] text-[15px] mb-[25px] text-justify sm:pr-[22px] sm:pl-[22px]">{data.attributes.aboutUs.summery}</p>
            <div className="flex item-center justify-start">
              <Link to={'./about-us'}><button className="button-custom w-auto mt-[35px]">{language === "fa-IR" ? "درباره شرکت ما" : language === "en" ? "Read More" : <></>}</button></Link>
            </div>
          </m.div>

          <m.div className="col-lg-3 mr-[150px] sm:mr-[10px]">
            <div className="outside-box-bottom relative mb-[-14vw] lg:mb-0">
                <img loading="lazy" width={1920} height={2468} className="relative z-[1] w-full rounded-[4px] box-shadow" src={host + data.attributes.aboutUs.image.data.attributes.url} alt="" />
              {/* Modal Component Start */}
              <LazyLoad height={200} offset={100}>
              <CustomModal.Wrapper
                className="absolute bottom-[7px] right-[-10px] z-[1] landscape:md:!-bottom-[25px]"
                modalBtn={
                  <div className="relative flex items-center p-[25px] right-0 bg-[#f1edea] bottom-[-25px] z-[2] lg:p-[25px] lg:bottom-0 w-[86%] ml-auto cursor-pointer">
                    <span className="flex-1  relative ml-3 video-icon-text text-darkgray text-md font-semibold w-[120%]">{data.attributes.aboutUs.videoTitle}</span>
                    <Buttons ariaLabel="modal btn" type="submit" className="relative btn-sonar border-0" themeColor="#000" color="#fff" size="md" title={<i className="icon-control-play m-0 pl-[4px]" />} />
                  </div>
                } >
                {data.attributes.aboutUs.video && <div className="w-[1020px] max-w-full relative rounded mx-auto">
                  <div className="fit-video">
                    <video width="100%" height="100%" className="shadow-[0_0_8px_rgba(0,0,0,0.06)]" controls src={host + data.attributes.aboutUs.video.data.attributes.url} title="دستاورد های شرکت کاشی و سرامیک ستاره میبد" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen autoPlay />
                  </div>
                </div>}
              </CustomModal.Wrapper>
              </LazyLoad>
              {/* Modal Component End */}
              </div>
            </m.div>
          </div> : language === "en" ? <div className='justify-center flex-colections sm:flex-col-reverse'>
          <m.div className="col-lg-3 mr-[150px] sm:mr-[10px]">
            <div className="outside-box-bottom relative mb-[-14vw] lg:mb-0">
                <img loading="lazy" width={1920} height={2468} className="relative z-[1] w-full rounded-[4px] box-shadow" src={host + data.attributes.aboutUs.image.data.attributes.url} alt="" />
              {/* Modal Component Start */}
              <LazyLoad height={200} offset={100}>
              <CustomModal.Wrapper
                className="absolute bottom-[7px] right-[-10px] z-[1] landscape:md:!-bottom-[25px]"
                modalBtn={
                  <div className="relative flex items-center p-[25px] right-0 bg-[#f1edea] bottom-[-25px] z-[2] lg:p-[25px] lg:bottom-0 w-[86%] ml-auto cursor-pointer">
                    <span className="flex-1  relative ml-3 video-icon-text text-darkgray text-md font-semibold w-[120%]">{data.attributes.aboutUs.videoTitle}</span>
                    <Buttons ariaLabel="modal btn" type="submit" className="relative btn-sonar border-0" themeColor="#000" color="#fff" size="md" title={<i className="icon-control-play m-0 pl-[4px]" />} />
                  </div>
                } >
                {data.attributes.aboutUs.video && <div className="w-[1020px] max-w-full relative rounded mx-auto">
                  <div className="fit-video">
                    <video width="100%" height="100%" className="shadow-[0_0_8px_rgba(0,0,0,0.06)]" controls src={host + data.attributes.aboutUs.video.data.attributes.url} title="دستاورد های شرکت کاشی و سرامیک ستاره میبد" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen autoPlay />
                  </div>
                </div>}
              </CustomModal.Wrapper>
              </LazyLoad>
              {/* Modal Component End */}
              </div>
            </m.div>
            <m.div className=" col-lg-4 col-md-6 md:mb-24 sm:mb-[50px]">
            <p className="font-semibold mt-[55px] text-xlg text-darkgray mb-[25px] sm:mb-[15px] sm:mr-[20px]">{data.attributes.aboutUs.sideTitle}</p>
            <p className="lg:w-full text-[#828282] text-[15px] mb-[25px] text-justify sm:pr-[22px] sm:pl-[22px]">{data.attributes.aboutUs.summery}</p>
            <div className="flex item-center justify-start">
              <Link to={'./about-us'}><button className="button-custom w-auto mt-[35px]">{language === "fa-IR" ? "درباره شرکت ما" : language === "en" ? "Read More" : <></>}</button></Link>
            </div>
          </m.div>
          </div> : <></>}
        </Container>
      </section>}
      </LazyLoad>
      
      {data && data.attributes.ShowProduct && <LazyLoad height={200} offset={100}>
      <section className="bg-[#f1edea] pt-[100px] pb-[120px] lg:py-[120px] md:py-[75px] sm:py-[110px] overflow-hidden xs:pt-[9%] xs:px-[15px]">
        <Container className="pt-[6%] lg:pt-0">
          <MainImageShow data={data.attributes.ShowProduct} />
        </Container>
      </section>
      </LazyLoad>}
      
      {data && <LazyLoad height={200} offset={100}>
      <section className="bg-lightgray pt-[60px] pb-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] overflow-hidden xs:pt-[9%] xs:px-[15px]">
        <Container className="pt-[6%] lg:pt-0">
          <Row className="items-center">
            <m.div className="relative md:mb-[20px] col-xl-3 col-lg-4 col-md-6 pt-[65px] md:pt-0 xs:p-0">
              <span className=" mb-[20px] block uppercase text-xlg font-medium text-fastblue">{data.attributes.ourWork.discreptionText}</span>
              <h2 className="heading-6  uppercase text-darkgray font-bold mb-[40px] md:mb-[20px]">{data.attributes.ourWork.subDiscreptionText}</h2>
              <div className="flex">
                <div onClick={() => swiperRef.current.swiper.slidePrev()} className="btn-slider-next ml-8 text-[40px] text-[#828282] hover:text-black transition-default leading-[40px] w-auto h-[40px] mr-[25px]" >
                  <button aria-label="swiper next" className=""><i className={`line-icon-Arrow-Out${language === "fa-IR" ? "Right" : language === "en" ? "Left" : <></>}`}></i></button>
                </div>
                <div onClick={() => swiperRef.current.swiper.slideNext()} className="btn-slider-prev text-[40px] text-[#828282] hover:text-black transition-default leading-[40px] w-auto h-[40px]" >
                  <button aria-label="swiper prev" className=""><i className={`line-icon-Arrow-Out${language === "fa-IR" ? "Left" : language === "en" ? "Right" : <></>}`}></i></button>
                </div>
              </div>
            </m.div>
            <m.div className="col-lg-8 offset-xl-1">
              <Swiper
                className="interiordesign-icon-with-text black-move swiper-pagination-medium h-full min-w-[1170px] md:min-w-full "
                ref={swiperRef}
                spaceBetween={30}
                slidesPerView={1}
                observer={true}
                observeParents={true}
                loop={true}
                modules={[Autoplay]}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                keyboard={{
                  enabled: true,
                  onlyInViewport: true
                }}
                breakpoints={{ 992: { slidesPerView: 3 }, 768: { slidesPerView: 2 } }}>
                  <Row className={`${props.grid} md:justify-center`}>
                    {data.attributes.ourWork.boxs.map((item, i) => {
                      return (
                        <SwiperSlide key={i}>
                          <m.div className="feature-box-bg-white-hover border-[1px] rounded-0 border-[#0000001a] overflow-hidden" {...{ ...props.animation, transition: { delay: 0.2 * i } }}>
                            <div className="feature-box-move-bottom-top py-12 px-16 md:py-8 md:px-10 sm:py-12 sm:px-[4.5rem] xs:pt-16">
                              <h2 className="heading-4  font-medium text-temp mb-[20px] -tracking-[2px]">{`${i <= 9 ? "0" : ""}${i + 1}`}</h2>
                              <div className="feature-box-content">
                                {item.title && <span className="font-semibold text-darkgray title  uppercase text-xlg mb-[10px] inline-block">{item.title}</span>}
                                {item.discraption && <p className='text-xmd text-justify'>{item.discraption}</p>}
                              </div>
                              <div className="move-bottom-top w-full flex justify-start mt-[15px] xs:mt-0">
                                {(item.linkTitle || item.link) && <Buttons ariaLabel="swiper btn" className="font-medium uppercase btn-link after:h-[2px] md:text-md md:mb-[15px] after:bg-basecolor hover:text-basecolor text-fastblue" to={item.link} title={"اطلاعات بیشتر"} />}
                              </div>
                            </div>
                          </m.div>
                        </SwiperSlide>)})}
                  </Row>
              </Swiper>
            </m.div>
          </Row>
        </Container>
      </section>
      </LazyLoad>}
      
      {data && <LazyLoad height={200} offset={100}>  <div className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] md:flex md:items-center overflow-hidden relative" >
        <Parallax className="lg-no-parallax bg-cover absolute top-[0px] left-0 md:-top-[30px] w-full h-[100vh] xs:bg-[center_center]" translateY={[-80, 80]} style={{ backgroundImage: `url(${host}${data.attributes.Parallax.image.data.attributes.url})` }}></Parallax>
        <Container className="relative">
          <Row className="justify-center">
            <Col xl={7} lg={8} sm={10} className="text-center text-white overflow-hidden ">
              <m.div>
                {data.attributes.Parallax.title && <h2 className="heading-4 font-semibold mb-[25px] sm:mb-[25px] text-fastblue">{data.attributes.Parallax.title}</h2>}
                {data.attributes.Parallax.subtitle && <p className="uppercase text-[20px]">{data.attributes.Parallax.subtitle}</p>}
                {data.attributes.Parallax.content && <p className="uppercase mt-12 text-[16px] text-lightgray">{data.attributes.Parallax.content}</p>}
              </m.div>
              {data.attributes.Parallax.button && <m.div className="flex item-center justify-center">
                <Link to={language === "fa-IR" ? './agent/internal-agent' : language === "en" ? './agent/external-agent' : ""}><button className="button-custom w-auto mt-[35px]">{data.attributes.Parallax.button}</button></Link>
              </m.div>}
            </Col>
          </Row>
        </Container>
      </div> </LazyLoad>}
      
      {data && <LazyLoad height={200} offset={100}>
        <m.section className="cover-background py-[130px] lg:py-[50px] md:py-[45px] sm:py-[30px] sm:pt-[100px]" style={{ backgroundImage: "url(/assets/img/webp/home-interior-design-about-bg.webp)" }}>
        <Container className="relative">
          <Row className="items-center justify-center ">
            <Col xs={10} lg={6} className="relative">
              <div className="relative">
                <Parallax className="lg-no-parallax w-[75%] mr-36" speed={0}>
                  <img loading="lazy" width="" height="" alt="" src={host + data.attributes.newInWrold.bigImg.data.attributes.url} />
                </Parallax>
                <Parallax className="lg-no-parallax flex justify-center items-center w-1/2 bg-no-repeat absolute bottom-24 right-[15px] lg:!left-auto lg:!top-[150px] sm:!top-[100px]" speed={20}>
                  <img loading="lazy" width="341.25px" height="349.78px" alt="" src={host + data.attributes.newInWrold.smallImg.data.attributes.url} />
                </Parallax>
              </div>
            </Col>
            <m.div className="col-lg-5 offset-lg-1 col-md-10 ml-0 mr-[4%]">
              <div className="font font-medium mb-[30px] sm:mb-4 flex sm:mt-24">
                <div className="flex-grow-1">
                  <span className="text-basecolor uppercase text-fastblue">{data.attributes.newInWrold.redtext}</span></div></div>
                  <h2 className="heading-5  uppercase text-darkgray font-bold w-[85%] mb-[30px] xl:w-full">{data.attributes.newInWrold.title}</h2>
                  <p className="w-[75%] xl:w-full mb-[25px] text-[15px] text-justify pl-6 pr-2">{data.attributes.newInWrold.discraption}</p>
                <div className="flex item-center justify-start">
                <Link to={'/about-us'}><button className="button-custom w-auto mt-[35px] sm:mt-4">{language === "fa-IR" ? "اطلاعات بیشتر" : language === "en" ? "Read More" : <></>}</button></Link>
              </div>
            </m.div>
          </Row>
        </Container>
      </m.section>
      </LazyLoad>}

      {data &&
      <LazyLoad height={200} offset={100}> 
      <section className="py-[90px] lg:py-[60px] md:py-[45px] sm:py-[30px] relative border-t border-mediumgray overflow-hidden bg-[#f1edea]">
        <Container fluid className="px-0">
          <m.div className="row justify-center text-center mb-[70px] lg:mb-20 md:mb-16">
            <Col xl={6} lg={7} md={8} sm={12} className=" flex flex-col items-center text-center">
              <span className="font-medium text-fastblue text-xxlg uppercase m-[10px]">{data.attributes.doneWork.mainTitle}</span>
              <h2 className="heading-5 text-xlg -tracking-[1px] text-darkgray block w-3/5 mb-0">{data.attributes.doneWork.SubTitle}</h2>
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
                  autoplay: { delay: 4000, disableOnInteraction: false }
                }}
                className="swiper-auto-slide"/>
            </Col>
          </m.div>
        </Container>
      </section>
      </LazyLoad>}

      {loadingNews && newsData && loadingHome &&<LazyLoad height={200} offset={100}> 
       <section className="bg-white relative border-t border-mediumgray overflow-hidden">
        <section className="pt-[90px] lg:pt-[70px] md:pt-[55px] sm:pt-[40px]  pb-[50px] md:pb-[55px] sm:pb-[40px]">
          <Container fluid>
            <Row className="justify-center">
              <Col lg={6} className="text-center mb-8 sm:mb-6">
                <span className="font-medium text-fastblue text-xxlg block mb-[5px] uppercase">{language === "fa-IR" ? "اخبار" : language === "en" ? "News" : <></>}</span>
                <h6 className=" text-darkgray text-xlg  uppercase">{language === "fa-IR" ? "جدیدترین اخبار" : language === "en" ? "Letest News" : <></>}</h6>
              </Col>
            </Row>
            <Row>
              <Col className="px-md-0">
                <BlogMetro pagination={false} grid="grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large" data={newsData} />
              </Col>
            </Row>
            <Row className="flex-fix">
              <div className="flex item-center justify-center">
                <Link to={'./news'}><button className="button-custom w-auto mt-[35px]">{language === "fa-IR" ? "مشاهده همه" : language === "en" ? "Read All" : <></>}</button></Link>
              </div>
            </Row>
          </Container>
        </section>
      </section>
      </LazyLoad>}
      
      {loadingGroup && data &&<LazyLoad height={200} offset={100}> 
       <>
        <m.div className="flex items-center justify-center text-center py-24 w-full bg-[#f1edea]" >
          <Col xl={6} lg={7} md={8} sm={12} className=" flex flex-col items-center text-center">
            <span className="font-medium text-fastblue text-xxlg uppercase m-[10px]">{data.attributes.groupElements.title}</span>
            <h2 className="heading-5 text-xlg -tracking-[1px] text-darkgray block w-3/5 mb-0">{data.attributes.groupElements.subtitle}</h2>
          </Col>
        </m.div>
        <m.section className="cover-background overflow-hidden" style={{ backgroundImage: `url(${host}${data && data.attributes.groupElements.Image.data.attributes.url})` }} >
          <Container fluid className="px-0">
             <FancyTextBox
              grid="row row-cols-1 row-cols-xl-4 row-cols-sm-2 gx-0 px-0"
              themeColor=""
              className="justify-center"
              theme="fancy-text-box-05"
              data={groupData}
              animation={fadeIn} />
          </Container>
        </m.section>
        <div className="flex-fix py-12 pt-2 bg-[#f1edea]">
            <div className="flex item-center justify-center">
              <Link to={'./product-groups'}><button className="button-custom w-auto mt-[35px]">{language === "fa-IR" ? "مشاهده همه" : language === "en" ? "See All" : <></>}</button></Link>
            </div>
        </div></>
      </LazyLoad>}

      {data && data.attributes.comments.item[0] && <LazyLoad height={200} offset={100}> 
       <section className="py-[100px] lg:py-[50px] md:py-[45px]  xs:py-[30px]">
        <Container>
          <Row className="items-center justify-center overflow-hidden">
            <m.div className="col-lg-4 col-sm-8 lg:text-start md:mb-20 md:text-center px-[15px] mb-[45px]">
              <span className="font-medium text-basecolor uppercase block text-fastblue text-xlg mb-[15px]">{data.attributes.comments.mainTitle}</span>
              <h2 className="heading-5 font-bold uppercase text-darkgray -tracking-[1px] m-0">{data.attributes.comments.SubTitle}</h2>
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
                }}/>
            </m.div>
          </Row>
        </Container>
      </section>
      </LazyLoad>}

      {loadingHome && <LazyLoad height={200} offset={100}> 
       <section className="py-[90px] lg:py-[70px] md:py-[55px]  xs:py-[40px] relative bg-[#f1edea]">
        <Container fluid>
          <Row className="justify-center text-center ">
            <Col xl={6} lg={7} md={8} sm={12} className="flex flex-col items-center text-center mb-18 lg:mb-12 md:mb-8 xs:mb-15">
              <span className="font-medium text-fastblue text-xxlg uppercase m-[10px]">{data.attributes.articleElements.mainTitle}</span>
              <h2 className="heading-5 text-xlg -tracking-[1px] text-darkgray block w-3/5 mb-0">{data.attributes.articleElements.SubTitle}</h2>
            </Col>
          </Row>
        </Container>
        {loadingResearch && <Container fluid className="px-[6%]">
          <Row className="justify-center">
            <Col xl={12} lg={12} sm={10} className="interiordesign-blog">
              <BlogSimple overlay="#374162" pagination={false} grid="grid grid-2col xl-grid-2col lg-grid-2col md-grid-1col sm-grid-1col xs-grid-1col gutter-double-extra-large" data={researchData} />
            </Col>
          </Row>
          <Row className="flex-fix">
            <div className="flex item-center justify-center">
              <Link to={'./research'}><button className="button-custom w-auto mt-[35px]">{language === "fa-IR" ? "مشاهده همه" : language === "en" ? "Read All" : <></>}</button></Link>
            </div>
          </Row>
        </Container>}
      </section>
      </LazyLoad>}
      
      {loadingHome && <LazyLoad height={200} offset={100}>  <section className="bg-cover relative bg-center bg-no-repeat realtive overflow-hidden py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" style={{ backgroundImage: `url('${loginImage}')` }}>
        <div className="opacity-50 bg-darkgray absolute top-0 left-0 w-full h-full"></div>
        <Container>
          <Row className="items-center justify-center">
            <Col className="text-center relative">
              {language === "fa-IR" ? <h2 className="heading-6 text-xlg md:text-lg xs:text-lg font-semibold text-[#fff] uppercase mb-0">جهت ورود به سایت بر روی کلمه  &nbsp;
                <a aria-label="button" href="/login" className="font-semibold text-xlg pt-0 uppercase text-decoration-line-bottom md:text-lg md:leading-[26px] text-[#fff] hover:text-white">ورود </a>
                 کلیک کنید 
              </h2> : language === "en" ? <h2 className="heading-6 text-xlg md:text-lg xs:text-lg font-semibold text-[#fff] uppercase mb-0">Click  &nbsp;
                <a aria-label="button" href="/login" className="font-semibold text-xlg pt-0 uppercase text-decoration-line-bottom md:text-lg md:leading-[26px] text-[#fff] hover:text-white">Here</a> &nbsp;
                  to enter the site.
              </h2> : <></>}
            </Col>
          </Row>
        </Container>
      </section>
      </LazyLoad>}
    </div>
  )
}
export default InteriorDesignPage