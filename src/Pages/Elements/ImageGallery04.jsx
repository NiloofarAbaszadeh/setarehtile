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
  const [pageData, setPageData] = useState(null)
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    const GetData = async () => {
      await axios.get(`${host}/api/survays?populate=deep&locale=${language}&sort[0]=order:asc`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      .then(res => {
        setData(res.data.data)
        console.log(res.data.data)
      })
      await axios.get(`${host}/api/survay-page?populate=deep&locale=${language}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      .then(res => {
        setPageData(res.data.data)
      })
      setLoading(true)
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
      {pageData && <section className="py-[130px] cover-background lg:py-[90px] md:py-[75px] sm:py-[50px]" style={{ backgroundImage: `url(${host + pageData.attributes.image.data.attributes.url})` }}>
        <div className="absolute top-0 left-0 w-full h-full bg-darkgray opacity-75"></div>
        <Container>
          <Row className="items-center justify-center">
            <Col xl={6} lg={7} md={10} className="relative text-center">
              <h1 className="text-white font-medium text-[42px] leading-[49px] mb-0 sm:text-[30px] sm:leading-[40px]">{pageData.attributes.title}</h1>
            </Col>
          </Row>
        </Container>
      </section>}

      {pageData && <section className="bg-[#f7f7f7] border-color-extra-light-gray px-[13%] lg:px-0 py-[60px] lg:py-[50px] md:py-[45px] sm:py-[40px]">
        <Container fluid>
          <Row>
            {pageData.attributes.discription.map((item, i) => {
              return <p key={i} className={`text-[20px] mb-8 ${item.children[0].bold && "font-bold text-[24px]"}`}>{item.children[0].text}</p>
            })}
          </Row>
        </Container>
      </section>}


        
      {loading && <section className="border-bottom bg-[#dbdbdb] border-color-extra-light-gray px-[10%] lg:px-0 py-[100px] lg:py-[70px] md:py-[65px] sm:py-[50px]">
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