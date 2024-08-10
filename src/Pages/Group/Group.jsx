import React, { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Row, Col, Container } from 'react-bootstrap'
import { m } from "framer-motion"
import { Link as ScrollTo } from "react-scroll"
// Components
import { fadeIn } from "../../Functions/GlobalAnimations"
import IconWithText03 from "../../Components/IconWithText/IconWithText03"
import BlogSideImage02 from "../../Components/Blogs/BlogSideImage02"
import { ScaleLoader } from "react-spinners"
import Seo from "../../Seo"
import { Helmet } from 'react-helmet-async';
 
const Group = () => {
  const prams = useParams()
  const { id } = prams

  const token = useSelector(state => state.State.readToken)
  const host = useSelector(state => state.State.host)

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [tailsData, setTailsData] = useState()

  const [IconWithTextData, setIconWithTextData] = useState(null)
  
  const SetBaseInfo = (baseInfo) => {
    const base = [
      baseInfo.bakeType.data !== null && {
        img: host + baseInfo.bakeType.data.attributes.icon.data.attributes.formats.custom.url,
        title: "نوع پخت",
        name: baseInfo.bakeType.data.attributes.bakeType
      },
      baseInfo.bodyColor.data !== null && {
        img: host + baseInfo.bodyColor.data.attributes.icon.data.attributes.formats.custom.url,
        title: "رنگ بدنه",
        name: baseInfo.bodyColor.data.attributes.color
      },
      baseInfo.color_themes.data[0] !== undefined && {
        sideimg: baseInfo.color_themes.data.map(item => {
          return {
            img: host + item.attributes.icon.data.attributes.formats.custom.url,
            name: item.attributes.color
          }
        }),
        title: "تم رنگی",
      },
      baseInfo.design.data !== null && {
        img: host + baseInfo.design.data.attributes.icon.data.attributes.formats.custom.url,
        title: "نوع طرح",
        name: baseInfo.design.data.attributes.design
      },
      baseInfo.galeb.data !== null && {
        img: host + baseInfo.galeb.data.attributes.icon.data.attributes.formats.custom.url,
        title: "نوع قالب",
        name: baseInfo.galeb.data.attributes.molde
      },
      baseInfo.glazeType.data !== null && {
        img: host + baseInfo.glazeType.data.attributes.icon.data.attributes.formats.custom.url,
        title: "نوع لعاب",
        name: baseInfo.glazeType.data.attributes.glaze
      },
      baseInfo.shape.data !== null && {
        img: host + baseInfo.shape.data.attributes.icon.data.attributes.formats.custom.url,
        title: "نوع شکل",
        name: baseInfo.shape.data.attributes.shape
      },
      baseInfo.size.data !== null && {
        img: host + baseInfo.size.data.attributes.icon.data.attributes.formats.custom.url,
        title: "ابعاد",
        name: baseInfo.size.data.attributes.size
      },
      baseInfo.special_types.data[0] !== undefined && {
        sideimg: baseInfo.special_types.data.map(item => {
          return {
            img: host + item.attributes.icon.data.attributes.formats.custom.url,
            name: item.attributes.feature
          }
        }),
        title: "ویژگی خاص",
      },
      baseInfo.stamp.data !== null && {
        img: host + baseInfo.stamp.data.attributes.icon.data.attributes.formats.custom.url,
        title: "نوع چاپ",
        name: baseInfo.stamp.data.attributes.stamp
      },
      baseInfo.type.data[0] !== undefined && {
        sideimg: baseInfo.use_places.data.map(item => {
          return {
            img: host + item.attributes.icon.data.attributes.formats.custom.url,
            name: item.attributes.type
          }
        }),
        title: "نوع محصول",
      },
      baseInfo.use_places.data[0] !== undefined && {
        sideimg: baseInfo.use_places.data.map(item => {
          return {
            img: host + item.attributes.icon.data.attributes.formats.custom.url,
            name: item.attributes.place
          }
        }),
        title: "مکان استفاده",
      },

    ]
    setIconWithTextData(base)


  }
 
  useEffect(() => {
    const GetData = async () => {
      // eslint-disable-next-line
      await axios.get(`${host}/api/groupss?filters\[name]=${id}&populate=deep`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        setData(res.data.data)
        Set(res.data.data)
      })
      
        
    }
    const Set = async (data) => {
      await setTailsData(data[0].attributes.tiles.data)
      await SetBaseInfo(data[0].attributes.tiles.data[0].attributes.baseInfo)
      
    setLoading(true)
    }
    GetData()
    // eslint-disable-next-line
  }, [host, token])
 
  return (
    <>
      {!loading && !data && <div className='flex justify-center items-center bg-white w-full h-[100vh] fixed top-0 fix z-50 top-[-25px]'>
        <ScaleLoader
        color={"#db1010"}
        loading={!loading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"/></div>}
      <Helmet>
        {loading && <title> {data[0].attributes.name} | کاشی و سرامیک ستاره  </title>}
      </Helmet>
      {loading && data[0].attributes.seo && <Seo data={data[0].attributes.seo} />}
      {loading && 
      <m.section className="relative rev-dir bg-cover h-[92vh]" style={{ backgroundImage: `url(${host}${data[0].attributes.GroupImage.data.attributes.formats.large.url})` }} {...fadeIn}>
      
        
        <div className="w-[100vw] h-[100vh] relative">
          <img className="w-full h-[92vh]" src={host + "/uploads/Layer_2_a777b8a13e.png"} alt=""></img>
          <div className="absolute top-[35vh] right-[135px] sm:right-[55px] flex flex-col items-start justify-start">
            <p className="text-white text-[40px] mb-8">{data[0].attributes.name}</p>
            {data[0].attributes.discraption && <p className="text-gray text-[17px] w-[30vw] text-justify">{data[0].attributes.discraption}</p>}
          </div>
        </div>
        <ScrollTo to="about" offset={0} delay={0} spy={true} smooth={true} duration={800} className="absolute bottom-[50px] left-1/2 -translate-x-1/2 cursor-pointer">
                <i className="ti-mouse text-[28px] text-white up-down-ani"></i>
              </ScrollTo>
    </m.section>
    }
      

      {loading && <section className="pt-8 bg-white overflow-hidden relative px-[11%] pb-[30px] lg:px-0 lg:pb-[20px] md:pb-[15px] sm:pb-[10px] bg-lightgray">
        <Container>
          <Row className="justify-center">
            <Col xl={10} sm={9} md={12} className="">
              {loading && <BlogSideImage02 link="/product-tilse/" pagination={true} data={tailsData} />}
            </Col>
          </Row>
        </Container>
      </section>}

      {loading && <section className="pt-[50px] pb-[10px] lg:pt-[50px] md:pt-[55px] sm:pt-[50px] cover-background md:pb-[10px] sm:pb-[10px] bg-[#f1edea]" >
        <Container>
          <Row className="justify-center">
            <Col lg={6} sm={8} className="text-center mb-4 md:mb-4 xs:mb-4">
              <m.h2 className="heading-5 font-medium text-xxlg tracking-[-1px]" {...fadeIn}>اطلاعات پایه</m.h2>
            </Col>
          </Row>
          <IconWithText03 grid="row-cols-3 row-cols-lg-6 row-cols-sm-4 text-center" data2={"group"} theme="icon-with-text-03" data={IconWithTextData} animation={fadeIn} animationDelay={0.3} />
        </Container>
      </section>}

      {/* {loading && <section className="border-t bg-white border-mediumgray py-[80px] lg:py-[50px] md:py-[35px] sm:py-[20px]">
        <Container>
          <Row className="row justify-center">
            <Col lg={5} md={6} className=" font-medium text-center">
              <h5 className="text-darkgray -tracking-[.5px] mb-2">شاید خوشتان بیاید</h5>
              <span className="uppercase inline-block mb-[15px] text-fastblue text-[16px]">کاشی های مشابه </span>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="xs:px-0">
              <ShopWide02 filter={false} grid="grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large text-center" data={shopWideData.slice(0, 4)} />
            </Col>
          </Row>
        </Container>
      </section>} */}
    </>
  )
}

export default Group