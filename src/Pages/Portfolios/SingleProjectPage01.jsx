import React , { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import axios from "axios";
import { useSelector } from "react-redux";
// Libraries
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Parallax } from "react-scroll-parallax";
import { m } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard } from "swiper";

// Components
import Blockquote from '../../Components/Blockquote/Blockquote'
import Buttons from '../../Components/Button/Buttons'
import { fadeIn, fadeInLeft, zoomIn } from "../../Functions/GlobalAnimations";
import SocialIcons from "../../Components/SocialIcon/SocialIcons";
import Overlap from "../../Components/Overlap/Overlap";
import SideButtons from "../../Components/SideButtons";

// Data
const SwiperImgData = [
  {
    img: "https://via.placeholder.com/1400x933",
  },
  {
    img: "https://via.placeholder.com/1400x933",
  },
  {
    img: "https://via.placeholder.com/1400x933",
  },
  {
    img: "https://via.placeholder.com/1400x933",
  },
];

const SocialIconsData = [
  {
    color: "#3b5998",
    link: "https://www.facebook.com/",
    icon: "fab fa-facebook-f",
  },
  {
    color: "#ea4c89",
    link: "https://dribbble.com/",
    icon: "fab fa-dribbble",
  },
  {
    color: "#1769ff",
    link: "https://www.behance.net/",
    icon: "fab fa-behance",
  },
  {
    color: "#fe1f49",
    link: "https://www.instagram.com/",
    icon: "fab fa-instagram",
  },
];

const SingleProjectPage01 = (props) => {
  const token = useSelector(state => state.State.readToken)
  const host = useSelector(state => state.State.host)

  const param = useParams();
  const { id } = param;
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    const GetData = async () => {
      await axios.get(`${host}/api/collectionss/${id}?populate=deep`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        console.log(res.data.data)
        setData(res.data.data)   
      })
      setLoading(true)
    }

    GetData()
  },[id])
  loading && console.log(data.attributes.groups)
// data.attributes.groups.data[0].attributes.tiles.data[0].attributes.image.data.attributes.formats.custom.url

  return (
    <div style={props.style}>
      
      <SideButtons />

      {loading && <section className="py-[130px] cover-background lg:py-[90px] md:py-[75px] sm:py-[50px]" style={{ backgroundImage: `url(${host}/uploads/bg_image_05e9d90d1a.jpg)` }}>
        <div className="absolute top-0 left-0 w-full h-full bg-darkgray opacity-75"></div>
        <Container>
          <Row className="items-center justify-center">
            <Col xl={6} lg={7} md={10} className="relative text-center">
              <h2 className="text-white font-medium text-[42px] leading-[49px] mb-0 sm:text-[30px] sm:leading-[40px]">{data.attributes.name}</h2>
            </Col>
          </Row>
        </Container>
      </section>}


      {/* {loading && <div className="h-[800px] md:h-[650px] sm:h-[350px] flex items-center overflow-hidden relative">
        <Parallax className="lg-no-parallax bg-cover cover-background absolute top-[0px] left-0 md:-top-[30px] w-full h-[100vh] md:h-[700px] sm:h-[400px] sm:-top-[60px] bg-black" translateY={[-40, 40]} style={{ backgroundImage: `url(${host}/uploads/bg_image_05e9d90d1a.jpg)` }}></Parallax>
        
        <Container fluid className="relative xs:px-0">
          <Row className="h-full justify-center">
            <Col md={6} className="relative text-center flex flex-column justify-center">
              <h2 className="text-white font-semibold uppercase block mb-0">
                {data.attributes.name}
              </h2>
            </Col>
          </Row>
        </Container>
      </div>} */}

      {/* Section Start */}
      {loading && <section className="pb-[130px] lg:pb-[90px] md:pb-[75px] sm:py-[50px]">
        <Container className="mb-[130px] lg:mb-[90px] md:mb-[75px] sm:mb-[50px]">
          <Row>
            <Overlap className="z-10">
              <img
                height="600px" width="400px"
                className="rounded-circle sm:w-[30%] xs:w-[40%] border-[12px] border-red rounded-full box-shadow-extra-large mx-auto"
                src={`${host}${data.attributes.groups.data[0].attributes.tiles.data[0].attributes.image.data.attributes.formats.custom.url}`}
                alt=""
              />
            </Overlap>
          </Row>
        </Container>
        <Container>
          <Row className="justify-center">
            <Col className="col-12 col-lg-11">
              <m.div {...fadeIn} className="row">
                <Col lg={4} className="pr-[5%] lg:pr-[15px] md:mb-[50px]">
                  <h5 className="font-serif text-darkgray font-medium mb-16 -tracking-[1px]">
                    The project description
                  </h5>
                  <ul className="pl-0">
                    <li className="border-b border-mediumgray pb-[20px] mb-[20px]">
                      <span className="uppercase text-darkgray w-[35%] inline-block font-medium font-serif text-md">
                        Published
                      </span>
                      20 January 2020
                    </li>
                    <li className="border-b border-mediumgray pb-[20px] mb-[20px]">
                      <span className="uppercase text-darkgray w-[35%] inline-block font-medium font-serif text-md">
                        Services
                      </span>
                      Branding
                    </li>
                    <li>
                      <span className="uppercase text-darkgray w-[35%] inline-block font-medium font-serif text-md">
                        Industry
                      </span>
                      Lifestyle
                    </li>
                  </ul>
                </Col>
                <Col lg={{ span: 7, offset: 1 }}>
                  <span className="font-serif text-md uppercase font-medium mb-[20px] inline-block text-darkgray">Sbon – Your timeless staples identity</span>
                  <p className="mb-[25px] text-justify xs:text-left xs:mb-[15px]">
                    Lorem ipsum is simply dummy text of the printing and
                    typesetting industry. lorem ipsum has been the industrys
                    standard dummy text ever since when an unknown printer took
                    a galley of type and scrambled it to make a type specimen
                    book. It has survived not only five centuries but also leap
                    into typesetting.
                  </p>
                  <p className="mb-[25px] text-justify xs:text-left xs:mb-[15px]">
                    Printer ipsum is simply dummy text of the printing and
                    typesetting industry. lorem ipsum has been the industrys
                    standard dummy text ever since when an unknown printer took
                    a galley of type and scrambled it to make a type specimen
                    book.
                  </p>
                  <Buttons ariaLabel="button" href="#" className="font-medium font-serif uppercase btn-link after:h-[2px] after:bg-darkgray hover:text-darkgray" color="#232323" title="Yourdomain.com" size="lg" />
                </Col>
              </m.div>
            </Col>
          </Row>
        </Container>
      </section>}
      {/* Section End */}

      {/* Section Start */}

      {loading && <section className="py-0 relative">
        <Swiper
          slidesPerView="auto"
          speed={1000}
          loop={true}
          modules={[Autoplay, Keyboard]}
          autoplay={{ delay: 1500, disableOnInteraction: false }}
          keyboard={{ enabled: true, onlyInViewport: true }}
          spaceBetween={10}
          centeredSlides={true}
          breakpoints={{
            576: {
              spaceBetween: 20
            },
            768: {
              spaceBetween: 30
            }
          }}
          className="SingleProjectPage05 relative black-move"
        >
          {data.attributes.groups.data.map((item) => {
            return (
              <SwiperSlide className="w-[55%] sm:w-[65%]" key={item.id}>
                <Link to={`../product/product-collection/group/${item.id}`} >
                <img height="400px" width="700px" src={`${host}${item.attributes.GroupImage.data.attributes.formats.custom.url}`} alt="" />
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>}

      {loading && <m.section className="py-[130px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] overflow-hidden" {...fadeIn}>
        <Container>
          <Row>
            <Col lg={11} xs={12}>
              <Row className="items-center">
                <m.div className="col-12 col-md-6 xs:mb-[30px]" {...fadeIn}>
                  <img height="" width="" src={`${host}${data.attributes.profileImage.data.attributes.formats.custom.url}`} alt="" />
                </m.div>
                <m.div className="col-12 col-md-6 col-xl-5 offset-xl-1" {...fadeInLeft}>
                  <Blockquote
                    className="xs:my-0"
                    theme="blockquote-style-02"
                    title="این بخش در بر دارنده توضیحاتی در خصوص این کلکسیون است اما به دلیل نبود این بخش در سایت قبلی و نداشتن دانش نویسندگی بنده فعلا با این متن جهت تست پر شده است."
                    author="ادمین ستاره"
                  />
                </m.div>
              </Row>
            </Col>
          </Row>
        </Container>
      </m.section>}
      
      {loading && <section className="pt-15px py-[250px] px-36 xl:px-12 lg:py-[180px] sm:px-[15px] sm:py-[50px] xs:px-0 bg-lightgray ">
        <Container fluid>
          <Row className="row-cols-1 row-cols-lg-4 row-cols-sm-2">
            {data.attributes.groups.data[0].attributes.tiles.data[0] && <m.div {...fadeIn} className="col mt-32 md:mt-16 xs:mt-0 xs:mb-[15px]">
              <Link to={`../product/product-collection/groups/tiles/${data.attributes.groups.data[0].attributes.tiles.data[0].id}`} >  
                <img height="" width="" src={`${host}${data.attributes.groups.data[0].attributes.tiles.data[0].attributes.image.data.attributes.formats.custom.url}`} alt="" />
              </Link>
            </m.div>}
            {data.attributes.groups.data[0].attributes.tiles.data[1] && <m.div {...{ ...fadeIn, transition: { delay: 0.5 } }} className="col xs:mb-[15px]">
              <Link to={`../product/product-collection/groups/tiles/${data.attributes.groups.data[0].attributes.tiles.data[1].id}`} >  
                <img height="" width="" src={`${host}${data.attributes.groups.data[0].attributes.tiles.data[1].attributes.image.data.attributes.formats.custom.url}`} alt="" />
              </Link>
            </m.div>}
            {data.attributes.groups.data[0].attributes.tiles.data[2] && <m.div {...{ ...fadeIn, transition: { delay: 0.6 } }} className="col mt-32 md:mt-16 xs:mt-0 xs:mb-[15px]">
              <Link to={`../product/product-collection/groups/tiles/${data.attributes.groups.data[0].attributes.tiles.data[2].id}`} >  
                <img height="" width="" src={`${host}${data.attributes.groups.data[0].attributes.tiles.data[2].attributes.image.data.attributes.formats.custom.url}`} alt="" />
              </Link>
            </m.div>}
            {data.attributes.groups.data[0].attributes.tiles.data[3] && <m.div {...{ ...fadeIn, transition: { delay: 0.7 } }} className="col">
              <Link to={`../product/product-collection/groups/tiles/${data.attributes.groups.data[0].attributes.tiles.data[3].id}`} >  
                <img height="" width="" src={`${host}${data.attributes.groups.data[0].attributes.tiles.data[3].attributes.image.data.attributes.formats.custom.url}`} alt="" />
              </Link>
            </m.div>}
          </Row>
        </Container>
      </section>}
      
      <section className="py-0 overflow-hidden">
        <Container fluid>
          <Row>
            <m.div {...{ ...fadeIn }} className="col-12 col-lg-6 cover-background h-[700px] md:h-[550px] sm:h-[350px]" style={{ backgroundImage: "url(https://via.placeholder.com/960x763)" }}></m.div>
            <m.div {...{ ...fadeIn, transition: { delay: 0.5 } }} className="col-12 col-lg-6 cover-background h-[700px] md:h-[550px] sm:h-[350px]" style={{ backgroundImage: "url(https://via.placeholder.com/960x763)", }}></m.div>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="items-center xs:justify-center">
            <Col md={4} sm={4} className="text-right text-darkgray uppercase text-xlg font-medium sm:text-end xs:text-center xs:mb-[10px]">
              صفحات مجازی رسمی ما
            </Col>
            <Col md={4} sm={2}>
              <div className="w-full h-[3px] bg-red xs:my-[15px]"></div>
            </Col>
            <Col md={4} sm={6}>
              <SocialIcons
                theme="social-icon-style-01"
                className="text-darkgray xs:justify-center"
                size="sm"
                iconColor="dark"
                data={SocialIconsData}
              />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}      
    </div>
  );
};

export default SingleProjectPage01;
