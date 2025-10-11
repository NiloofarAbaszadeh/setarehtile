 import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import moment from 'jalali-moment'

// Libraries
import { Col, Container, Row } from 'react-bootstrap'
import { useLocation, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'; 
import { ScaleLoader } from 'react-spinners';

// Components
import SocialIcons from '../../../Components/SocialIcon/SocialIcons'
// import Blockquote from '../../../Components/Blockquote/Blockquote'
import { fadeIn } from "../../../Functions/GlobalAnimations"
import Seo from '../../../Seo'
import Lightbox from 'react-18-image-lightbox'
import { Parallax } from 'react-scroll-parallax'


const SocialIconsData = [
  {
    color: "#3b5998",
    link: "linkedin.com/in/setarehtile/?originalSubdomain=ir",
    icon: "fab fa-linkedin"
  },
  // {
  //   color: "#ea4c89",
  //   link: "https://aparat.com/",
  //   icon: "fab fa-dribbble"
  // },
  {
    color: "#00aced",
    link: "http://t.me/s/setareh_tile",
    icon: "fab fa-telegram"
  },
  {
    color: "#fe1f49",
    link: "https://www.instagram.com/setarehtile/?hl=en",
    icon: "fab fa-instagram"
  },
]

const BlogFullWidthPost = (props) => {
  const [data, setData] = useState()
  const token = useSelector(state => state.State.readToken)
  const host = useSelector(state => state.State.host)
  const language = useSelector(state => state.State.language)
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // fetch the query param
  const location = useLocation().pathname.split("/")[2]
  const param = useParams();
  const { id } = param;
  useEffect(() => {

    setLoading(false)
    const GetData =  () => {
      console.log("location", location)
      if (location === "internal-ce") {
         axios.get(`${host}/api/internal-certificates/${id}?populate=deep&locale=${language}`, {
          headers: { Authorization: `Bearer ${token}`, withCredentials: false, }
        })
        .then(res => {
          setData(res.data.data.attributes)
          setLoading(true)
        })
      } else if (location === "external-ce") {
        console.log('working')
         axios.get(`${host}/api/international-certificates/${id}?populate=deep&locale=${language}`, {
          headers: { Authorization: `Bearer ${token}`, withCredentials: false, }
        })
        .then(res => {
          console.log("wtf",res.data.data.attributes)
          setData(res.data.data.attributes)
          setLoading(true)
        })
      }
    }
    GetData()
  },[host, token, language, id, location])

 
  return (
    <div style={props.style}>
      {data && loading && <>
        <Helmet>
          <title>
            {" "}
              {language === "fa-IR"
                ? "وب سایت رسمی کاشی ستاره میبد"
                : language === "en"
                ? "Setareh Meybod Tile & Ceramic"
                : ""}
            {" "}
          </title>
        </Helmet>
        {!loading && !data && (
          <div className="flex justify-center items-center bg-white w-full h-[100vh] fixed top-0 fix z-50">
            <ScaleLoader
              color={"#db1010"}
              loading={!loading}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
        {/* Seo */}
        {loading && data.seo && <Seo data={data.seo} />}
        <div className="h-[400px] lg:h-[580px] md:h-[550px] sm:h-[500px] xs:h-[380px] overflow-hidden relative">
              <div className='absolute top-0 left-0 w-full h-full bg-darkgray opacity-70 z-[1]'></div>
              <Parallax className="lg-no-parallax bg-cover absolute -top-[50px] left-0 w-full h-[100vh] z-0 lg:-top-[70px] md:h-[600px] md:-top-[50px] xs:h-[450px]" translateY={[-40, 40]} style={{ backgroundImage: `url(https://setarehtile.com/uploads/custom_gold_silver_chess_chess_board_game_business_metaphor_leadership_concept_92e741db2f.jpg)` }}></Parallax>
              <Container className="h-full relative z-[2]">
                <Row className="justify-center h-full">
                  <Col xl={6} lg={7} md={8} className="relative text-center flex justify-center flex-col">
                    <h2 className="text-white font-medium -tracking-[1px] mb-0 text-[50px]">{data.title}</h2>
                  </Col>
                </Row>
              </Container>
            </div>
        <section className="pb-[70px] lg:pb-[50px] md:pb-[35px] sm:pb-[20px]">
          <Container>
            <div className="justify-center">
              <div className="md:mb-[60px] sm:mb-[40px] xs:mb-0">
                <Row>
                  <Col className="blog-details-text last:mb-0 mb-12">
                    <div>
                      <div className='mt-12'>
                        <ul className="flex mb-2 xs:block justify-between">
                          <li className="inline-block align-middle">
                            <i className="feather-user text-fastblue m-1"></i>
                            {language === "fa-IR" ? "نوشته شده توسط " : "Written by "}
                            <span className='text-red'>
                              {language === "fa-IR" ? "ادمین ستاره" : "Setareh Admin"}
                            </span>
                            {/* {data[0].attributes.author.data.attributes.fullName} */}
                            </li>
                            <li className="flex items-center justify-center align-middle">
                              <div>{language === "fa-IR" ? 
                                <span>{moment(data.date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')} </span>
                                :
                                <span>{data.date}</span>}
                              </div>
                              <div className='m-1'><span className="feather-calendar text-fastblue"></span></div>
                          </li>
                        </ul>
                      </div>
                      <div className='flex items-start justify-start sm:flex-col pt-8 border-t border-[#00000055]'>
                        <div >
                          <img src={host + data.banner.data.attributes.url} height="" width="" alt="" className="w-full rounded-[6px] mb-[4.5rem] box-shadow" />
                        </div>
                        <div className='mx-4 mt-8'>
                          {data.description.map((item, i) => {
                          return <p key={i} className='mb-2 text-justify'>{item.children[0].text}</p>
                        })}
                        </div>
                      </div>
                    </div>
                    {/* <div>
                      <Blockquote
                        className={`m${language === "fa-IR" ? "r" : "l"}-12 sm:ml-0 sm:px-[10px]`}
                        theme={language === "fa-IR" ? "blockquote-style-02-f" : "blockquote-style-02"}
                        title="و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد،"
                        author="سهیل صحراییان"
                      />
                    </div> */}
                    <div className='flex items-center justify-center relative' onClick={() => setIsOpen(true)}>
                      <div className='relative group box-shadow'>
                        <img src={host + data.mainImage.data.attributes.url} width={300} alt="iso" />
                        <div className='absolute w-full h-full top-0 bg-red opacity-[0%] group-hover:opacity-50 transition-all duration-500 ease-in-out'>
                          <div className="image-box-wrapper absolute w-full left-0 top-[50%] flex items-center justify-center" >
                            <div className="feather-zoom-in text-[28px] font-light text-white drop-shadow h-full
                              opacity-[0%] scale-[4] transition-all duration-500 ease-in-out
                              group-hover:opacity-100 group-hover:scale-[1.5]
                            "></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {isOpen && <Lightbox
                        mainSrc={host + data.mainImage.data.attributes.formats.small.url}
                        onCloseRequest={() => setIsOpen(false)}
                    />}
                  </Col>
                  <SocialIcons theme="social-icon-style-09 m-auto" className="justify-center" size="md" iconColor="dark" data={SocialIconsData} animation={fadeIn} />
                </Row>
              </div>
            </div>
          </Container>
        </section>
      </>}
    </div>
  )
}

export default BlogFullWidthPost