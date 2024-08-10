import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { ScaleLoader } from "react-spinners"
import { Col, Container, Row } from 'react-bootstrap'
import { Parallax } from 'react-scroll-parallax'
import { useParams } from "react-router-dom";

// Components
import BlogMasonry from '../../Components/Blogs/BlogMasonry'
import { Helmet } from 'react-helmet-async'; 


const Collection = () => {
  const prams = useParams()
  const { id } = prams

  const token = useSelector(state => state.State.readToken)
  const host = useSelector(state => state.State.host)

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  


  useEffect(() => {
    const GetData = async () => {
      // eslint-disable-next-line
      await axios.get(`${host}/api/collectionss?filters\[name]=${id}&populate=deep`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        setData(res.data.data)
        setLoading(true)
      })
    }
    GetData()
  }, [host, id, token])

  return (
    <>
      {!loading && !data && <div className='flex justify-center items-center bg-white w-full h-[100vh] fixed top-0 fix z-50 top-[-25px]'>
      <ScaleLoader
      color={"#db1010"}
      loading={!loading}
      size={50}
      aria-label="Loading Spinner"
      data-testid="loader"/></div>}

      {loading && data && <Helmet>
        <title>{data[0].attributes.name} | کاشی و سرامیک ستاره  </title>
      </Helmet>}

      {loading && <div className="h-[560px] lg:h-[580px] md:h-[550px] sm:h-[500px] xs:h-[380px] overflow-hidden relative">
        <div className='absolute top-0 left-0 w-full h-full bg-darkgray opacity-70 z-[1]'></div>
        <Parallax className="lg-no-parallax bg-cover absolute -top-[50px] left-0 w-full h-[100vh] z-0 lg:-top-[70px] md:h-[600px] md:-top-[50px] xs:h-[450px]" translateY={[-40, 40]} style={{ backgroundImage: `url(${host}/uploads/bg_image_05e9d90d1a.jpg)` }}></Parallax>
        <Container className="h-full relative z-[2]">
          <Row className="justify-center items-center h-full">
            <Col md={8} xl={6} lg={7} sm={9} className="relative text-center lg:text-center">
              <h2 className=" text-white my-6 text-[3.2rem] font-medium mb-0 ">{data[0].attributes.name}</h2>
            </Col>
            <Col md={8} xl={6} lg={7} sm={9} className="relative text-start">
              <img src={host + data[0].attributes.profileImage.data.attributes.formats.custom.url} alt={data[0].attributes.name}/>
            </Col>
          </Row>
        </Container>
      </div>}

      {/* Section Start */}
      {loading && <section className="overflow-hidden relative pb-[150px] px-[11%] pb-[130px] bg-lightgray xl:px-[2%] lg:pb-[90px] md:px-0 md:pb-[75px] sm:pb-[50px]">
        <Container fluid>
          <Row>
            <Col className="mx-[12%] xs:px-0">
              <BlogMasonry
                link="/product-groups/"
                data={data[0].attributes.groups.data}
                pagination={true}
                grid="grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-double-extra-large"
              />
            </Col>
          </Row>
        </Container>
      </section>}
      {/* Section End */}
      
    </>
  )
}

export default Collection