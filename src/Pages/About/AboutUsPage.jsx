import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { fadeIn } from '../../Functions/GlobalAnimations'
import Team from '../../Components/Team/Team'
import Counter from '../../Components/Counters/Counter'
import Overlap from '../../Components/Overlap/Overlap'
import { Col, Container, Row } from 'react-bootstrap'
import { Parallax } from 'react-scroll-parallax'
import { m } from 'framer-motion'
import { Link as ScrollTo } from "react-scroll"
import Seo from '../../Seo';
import { Helmet } from 'react-helmet-async'; 
import { rotateInLeft } from '../../Functions/GlobalAnimations';
import RotateBox from '../../Components/RotateBox/RotateBox'
import { ScaleLoader } from 'react-spinners';

const AboutUsPage = (props) => {
  const token = useSelector(state => state.State.readToken)
  const host = useSelector(state => state.State.host)
  const language = useSelector(state => state.State.language)

  const [data, setData] = useState()
  useEffect(() => {
    const getData = () => {
      axios.get(`${host}/api/about?populate=deep&locale=${language}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setData(res.data.data)})
      }
    getData()
  },[host, token, language])

  return (
    <div style={props.style}>
      <Helmet>
        <title>{language === "fa-IR" ? " درباره ما | کاشی و سرامیک ستاره" : language === "en" ? "About us | Setareh Meybod Tile & Ceramic" : ""}</title>
      </Helmet>
      {!data && <div className='flex justify-center items-center bg-white w-full h-[100vh] fixed top-0 fix z-50 '>
        <ScaleLoader
        color={"#db1010"}
        loading={!data}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"/></div>}
      {data && data.attributes.seo && <Seo data={data.attributes.seo} />}
      {data && <>
      <div className="h-[95vh] lg:h-[580px] md:h-[550px] sm:h-[500px] xs:h-[380px] overflow-hidden relative">
        <div className='absolute top-0 left-0 w-full h-[100vh] bg-darkgray opacity-50 z-[1]'></div>
        <Parallax className="lg-no-parallax bg-cover absolute -top-[50px] left-0 w-full h-[100vh] z-0 lg:-top-[70px] md:h-[600px] md:-top-[50px] xs:h-[450px]" translateY={[-40, 40]} style={{ backgroundImage: `url(${host}${data.attributes.boardImage.data.attributes.formats.custom.url})` }}></Parallax>
        <Container className="h-full relative z-[2]">
          <Row className="justify-center h-full">
            <Col xl={6} lg={7} md={8} className="relative text-center flex justify-center flex-col">
              <h2 className="text-white font-medium -tracking-[1px] mb-0 text-[50px] sm:text-[24px]">{data.attributes.boardTitle}</h2>
              <ScrollTo to="about" offset={0} delay={0} spy={true} smooth={true} duration={800} className="absolute bottom-[50px] left-1/2 -translate-x-1/2 cursor-pointer">
                <i className="ti-mouse text-[28px] text-white up-down-ani"></i>
              </ScrollTo>
            </Col>
          </Row>
        </Container>
      </div>
      
      <section id="about" className="bg-lightgray py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="">
            <Col lg={4} className="pe-lg-0 flex md:mb-[30px]">
              <div className="w-full md:h-[700px] sm:h-[550px] xs:h-[450px] cover-background" style={{ backgroundImage: `url(${host}${data.attributes.summery.rightImage.data.attributes.formats.custom.url})` }}></div>
            </Col>
            <Col lg={4} md={6} className="ps-lg-0 flex items-center  sm:mb-[30px]">
              <div className="justify-center h-full w-full flex flex-col items-start bg-[#f1edea] px-[4rem] lg:px-[3rem] md:p-16">
                <span className="text-xlg lg:leading-[26px] font-medium text-black mb-[20px] block text-justify">{data.attributes.summery.start}</span>
                <p className="text-darkgray opacity-70 mb-[20px] text-xmd xs:mb-[15px] text-justify mt-[15px]">{data.attributes.summery.discraption}</p>
              </div>
            </Col>
            <Col lg={4} md={6} className="flex flex-col pr-0">
              <img loading="lazy" src={`${host}${data.attributes.summery.leftImage.data.attributes.formats.custom.url}`} alt="about us" className="sm:w-full" />
              <div className="bg-white px-[3.5rem] py-[3rem] h-full lg:p-8 sm:p-16">
                <span className="text-darkgray font-bold text-xlg mb-[10px] block">{data.attributes.summery.aboutTiles}</span>
                <p className="text-gray text-[13px] text-justify">{data.attributes.summery.discraptionTiles}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    
      <section className="py-[90px] lg:py-[75px] md:py-[50px] xs:py-[35px] ">
        <Container>
          <Row className="justify-center flex">
            <m.div className="w-[80%] text-center mb-20 md:mb-12 col-lg-6 col-sm-8" {...fadeIn}>
              <h5 className="mb-[15px] font-medium text-fastblue text-xxlg block w-full">{data.attributes.values.Title}</h5>
              <span className="w-full text-[15px] text-balck  font-medium mb-8 sm:w-full">{data.attributes.values.discraption}</span>
            </m.div>
          </Row>
        </Container>
      </section >
      <section className='py-[130px] md:py-0'>
        <Container>
          <Row className="justify-center lg:mt-[200px] md:mt-0">
            <Overlap className="col-12 col-md-12 col-sm-8 md:mt-0 md:py-[35px] sm:py-[20px] xs:pb-8">
              <RotateBox animation={rotateInLeft} animationDelay={0.4} grid="row-cols-1 row-cols-md-2 row-cols-lg-3 gap-y-10 justify-center" data={data.attributes.values.valu} />
            </Overlap>
          </Row>
        </Container>
      </section>
      
      <m.section className="bg-[#262b35] py-[130px] lg:py-[90px] md:py-[75px] xs:py-[50px]" {...fadeIn}>
        <Container>
          <Row className="items-center">
            <Col lg={6} className="p-0 md:mb-[50px] rounded-[5px] shadow-[0_0_15px_rgba(0,0,0,0.1)]">
              <div className="relative">
                <div className="h-full">
                  <img loading="lazy" src={`${host}${data.attributes.mission.image.data[0].attributes.formats.custom.url}`} alt="mission" className="w-full" width="531" height="413" />
                </div>
              </div>
            </Col>
            <Col lg={{ span: 5, offset: 1 }} >
              <h5 className=" text-white font-semibold pr-[20px] text-xxlg">{data.attributes.mission.title}</h5>
              <p className='text-lightgray pr-[20px] text-[15px] text-justify'>{data.attributes.mission.discraption}</p>
              <p className='text-lightgray pr-[20px] text-[15px] text-justify mt-4'>{data.attributes.mission.subdiscraption}</p>
              <br />
            </Col>
          </Row>
        </Container>
        <br />
        <br />
        <br />
      </m.section>
        
      <section className=" pb-[80px] lg:pb-[50px] md:pb-[35px] xs:pb-[20px]">
        <Container fluid="md" className="sm:px-0">
          <Row className="lg:mx-[15px]">
            <Overlap className="bg-white p-16 shadow-[0_0_15px_rgba(0,0,0,0.1)] mb-[130px] md:mb-[80px] sm:shadow-none sm:border-b sm:mb-[50px]">
              <Counter
                theme={`${language === "fa-IR" ? "counter-style-05" : language === "en" ? "counter-style-06" : ""}`}
                grid="row-cols-1 row-cols-md-3 text-center gap-y-10"
                className="text-black"
                duration={2}
                data={data.attributes.cunter}/>
            </Overlap>
          </Row>
        </Container>

        <Container>
          <Row className="justify-center">
            <m.div className="col-md-6  text-center mb-[2.5rem] sm:mb-8" {...fadeIn}>
            {language === "fa-IR" ? <>
              <span className="text-fastblue text-xxlg ">معرفی افراد</span>
              <h5 className="text-darkgray font-medium text-[17px]">با ما آشنا شوید</h5>
            </> : language === "en" ? <>
              <span className="text-fastblue text-xxlg ">Introduction</span>
              <h5 className="text-darkgray font-medium text-[17px]">Get to know us</h5>
            </> : <></>}  
            </m.div>
          </Row>
          <Team
            themeColor="light"
            overlay={["#b783fffa", "#e37be0fa", "#fa7cc1fa", "#ff85a6fa", "#ff9393fa"]}
            theme='team-style-04'
            data={data.attributes.people}
            grid="row-cols-1 row-cols-md-3 row-cols-sm-1"
            animation={fadeIn}
            animationDelay={0.3}
            carousel={false}
            className="team-about-us"
            carouselOption={{ slidesPerView: 3, spaceBetween: 30, loop: true, navigation: true, autoplay: { delay: 3000, disableOnInteraction: true }, pagination: { dynamicBullets: true, clickable: true } }} />
        </Container>
      </section></>}
    </div>)}

export default AboutUsPage