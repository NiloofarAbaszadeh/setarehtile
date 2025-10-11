import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// Libraries
import { Parallax } from 'react-scroll-parallax';
import { m } from "framer-motion"
import { Container, Row, Col } from "react-bootstrap";
// Data
import axios from "axios";
import moment from 'jalali-moment'
import { Helmet } from 'react-helmet-async'
import { ScaleLoader } from "react-spinners"; 

const BlogSideImage03 = (props) => {
  const [data, setData] = useState()
  const token = useSelector(state => state.State.readToken)
  const host = useSelector(state => state.State.host)
  const language = useSelector(state => state.State.language)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(false)
    const GetData = () => {
      axios.get(`${host}/api/catalog-infos?populate=deep&locale=${language}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        setData(res.data.data[0])
        setTimeout(() => {
          setLoading(true)
        }, 1000)
      })
    }
    GetData()
  }, [host, token, language])

  return (<>
    <Helmet>
      <title>{language === "fa-IR" ? `کاتالوگ ها | کاشی و سرامیک ستاره` : language === "en" ? `Catalogs | Setareh Meybod Tile & Ceramic` : ""}</title>
    </Helmet>
    {!loading && <div className='flex justify-center items-center bg-white w-full h-[100vh] fixed top-0 fix z-50 '>
      <ScaleLoader
        color={"#db1010"}
        loading={!loading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"/></div>}
    {data && loading && <div className="h-[300px] lg:h-[580px] md:h-[550px] sm:h-[500px] xs:h-[380px] overflow-hidden relative">
    <div className='absolute top-0 left-0 w-full h-full bg-darkgray opacity-70 z-[1]'></div>
      <Parallax className="lg-no-parallax bg-cover absolute -top-[50px] left-0 w-full h-[100vh] z-0 lg:-top-[70px] md:h-[600px] md:-top-[50px] xs:h-[450px]" translateY={[-40, 40]} style={{ backgroundImage: `url(${host}${data.attributes.boardImage.data.attributes.formats.custom.url})` }}></Parallax>
      <Container className="h-full relative z-[2]">
        <Row className="justify-center h-full">
          <Col xl={6} lg={7} md={8} className="relative text-center flex justify-center flex-col">
            <h2 className="text-white font-medium -tracking-[1px] mb-0 text-[50px]">{data.attributes.title}</h2>
          </Col>
        </Row>
      </Container>
    </div>}

    <div className="flex-fix mx-12">
      <div className="mb-24">
          <Row className="justify-center">
            <Col xl={10} sm={9} md={12} >
              {data &&
                data.attributes.catalog.reverse().map((item, i) => {
                  const date = item.file.data.attributes.createdAt.split("T")
                  return (
                    <m.div key={i} className={`blog-sideimage p-0 m-5 box-shadow`} {...props.animation}>
                      <div className=" h-[400px]">
                          <img loading="lazy" src={host + item.image.data.attributes.formats.custom.url} className="h-full" alt="custom" />
                      </div>
                      <div className="post-details my-8 px-12">
                        <span className="blog-post-date"> {item.date} </span>
                        <span className="font-semibold text-xlg text-black sm:px-8">{item.name}</span>
                        <p className={`mb-4 text-fastblue text-[12px] sm:px-8 ${language === "fa-IR" && "iran-sans"}`}> {moment(date[0], 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD')}  </p>
                        <p className="w-[100%] mb-4 text-justify text-[12px] sm:px-8">{item.description[0].children[0].text}</p>
                        <Link to={host + item.file.data.attributes.url} target="_blank"><button className="button-custom w-max mt-6 sm:mb-2 sm:mx-8">{language === "fa-IR" ? `دانلود فایل` : language === "en" ? `Download file` : ""}</button></Link>
                      </div>
                    </m.div>
                  );
                })
              }
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default memo(BlogSideImage03);
