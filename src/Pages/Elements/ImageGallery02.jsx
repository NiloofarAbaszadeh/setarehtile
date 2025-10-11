import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import { fadeIn } from '../../Functions/GlobalAnimations'
import ImageGallery from '../../Components/ImageGallery/ImageGallery'
import Seo from '../../Seo'
import { Helmet } from 'react-helmet-async'; 
import { Parallax } from 'react-scroll-parallax'
import { ScaleLoader } from 'react-spinners' 

const ImageGalleryPage02 = () => {
  const token = useSelector(state => state.State.readToken)
  const host = useSelector(state => state.State.host)
  const language = useSelector(state => state.State.language)

  const [data, setData] = useState(null)
  const [tempData, setTempData] = useState(null)
  const url = "external-ce"
  useEffect(() => {
    const GetData = async () => {
      await axios.get(`${host}/api/gwahy-kharjies?populate=deep&locale=${language}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      .then(res => {
        setData(res.data.data)
      })
      await axios.get(`${host}/api/international-certificates?populate=deep&locale=${language}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      .then(res => {
        setTempData(res.data.data)
      })
    }
    GetData()
  },[token, host, language])
  
  return (
    <>
      <Helmet>
        <title> {language === "fa-IR" ? "گواهی های  خارجی | کاشی و سرامیک ستاره میبد" : language === "en" ? "External CE | Setareh Meybod Tile & Ceramic" : ""}</title>
      </Helmet>
      {!data && <div className='flex justify-center items-center bg-white w-full h-[100vh] fixed top-0 fix z-50'>
        <ScaleLoader
          color={"#db1010"}
          loading={!data}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"/></div>}
      {data && data[0].attributes.seo && <Seo data={data[0].attributes.seo} />}
      {data && 
      <div className="h-[300px] lg:h-[580px] md:h-[550px] sm:h-[500px] xs:h-[380px] overflow-hidden relative">
      <div className='absolute top-0 left-0 w-full h-full bg-darkgray opacity-70 z-[1]'></div>
      <Parallax className="lg-no-parallax bg-cover absolute -top-[50px] left-0 w-full h-[100vh] z-0 lg:-top-[70px] md:h-[600px] md:-top-[50px] xs:h-[450px]" translateY={[-40, 40]} style={{ backgroundImage: `url(${host}${data[0].attributes.boardImage.data.attributes.formats.medium.url})` }}></Parallax>
      <Container className="h-full relative z-[2]">
        <Row className="justify-center h-full">
          <Col xl={6} lg={7} md={8} className="relative text-center flex justify-center flex-col">
            <h2 className="text-white font-medium -tracking-[1px] mb-0 text-[50px]">{data[0].attributes.title}</h2>
          </Col>
        </Row>
      </Container>
    </div>}

      {tempData && <section className="border-bottom border-color-extra-light-gray px-[10%] lg:px-0 py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container fluid>
          <Row>
            <ImageGallery theme="image-gallery-01" url={url} data={tempData.reverse()} overlay={["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"]} className="" animation={fadeIn} />
          </Row>
        </Container>
      </section>}
    </>)}

export default ImageGalleryPage02