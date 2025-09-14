import axios from 'axios'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

// Libraries
import { Container, Row, Col } from 'react-bootstrap'

// Components
import { fadeIn } from '../../Functions/GlobalAnimations'
import Seo from '../../Seo'
import ImageGallerySurvay from '../../Components/ImageGallery/ImageGallerySurvay'
import { Helmet } from 'react-helmet-async'; 
import { ScaleLoader } from 'react-spinners'


const ImageGalleryPage04 = () => {
  const token = useSelector(state => state.State.readToken)
  const host = useSelector(state => state.State.host)
  const language = useSelector(state => state.State.language)

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    const GetData = async () => {
      await axios.get(`${host}/api/survays?populate=deep&locale=${language}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      .then(res => {
        setData(res.data.data)
        setLoading(true)
      })
    }
    GetData()
  },[token, host, language])

  return (
    <>
      <Helmet>
        <title> {language === "fa-IR" ? "نظرسنجی ها | کاشی و سرامیک ستاره میبد" : language === "en" ? "Survay | Setareh Meybod Tile & Ceramic" : ""}</title>
      </Helmet>
      {!loading && <div className='flex justify-center items-center bg-white w-full h-[100vh] fixed top-0 fix z-50'>
        <ScaleLoader
          color={"#db1010"}
          loading={!loading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"/></div>}
      {loading && data[0].attributes.seo && <Seo data={data[0].attributes.seo} />}
      {loading && <section className="py-[130px] cover-background lg:py-[90px] md:py-[75px] sm:py-[50px]" style={{ backgroundImage: `url(https://setarehtile.com/uploads/custom_gold_silver_chess_chess_board_game_business_metaphor_leadership_concept_92e741db2f.jpg)` }}>
        <div className="absolute top-0 left-0 w-full h-full bg-darkgray opacity-75"></div>
        <Container>
          <Row className="items-center justify-center">
            <Col xl={6} lg={7} md={10} className="relative text-center">
              <h1 className="text-white font-medium text-[42px] leading-[49px] mb-0 sm:text-[30px] sm:leading-[40px]">{language === "fa-IR" ? "نظرسنجی ها" : "Survay"}</h1>
            </Col>
          </Row>
        </Container>
      </section>}

      {loading && <section className="border-bottom bg-[#f7f7f7] border-color-extra-light-gray px-[10%] lg:px-0 py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container fluid>
          <Row>
            <ImageGallerySurvay theme="image-gallery-01" data={data} overlay={["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"]} className="" animation={fadeIn} />
          </Row>
        </Container>
      </section>}
    </>
  )
}

export default ImageGalleryPage04