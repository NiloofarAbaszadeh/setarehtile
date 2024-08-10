import React from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

// Libraries
import { Container, Row, Col } from 'react-bootstrap'

// Components
import { fadeIn } from '../../Functions/GlobalAnimations'
import ImageGallery from '../../Components/ImageGallery/ImageGallery'
import Seo from '../../Seo'


const ImageGalleryPage04 = () => {
  const token = useSelector(state => state.State.readToken)
  const host = useSelector(state => state.State.host)

  const [data, setData] = useState(null)
  const [tempData, setTempData] = useState(null)
  const [loading, setLoading] =useState(false)
  
  useEffect(() => {
    const GetData = async () => {
      await axios.get(`${host}/api/catalog-infos?populate=deep`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      .then(res => {
        const temp = res.data.data[0].attributes.catalog.map(item => {
          return {
            title: item.name,
            src: host + item.image.data.attributes.formats.xsmall.url,
            file: host + item.file.data.attributes.url
          }
        })
        setTempData(temp)
        setData(res.data.data)
        setLoading(true)
      })
    }
    GetData()
  },[token, host])

  loading && console.log(data)

  return (
    <>
      {loading && data[0].attributes.seo && <Seo data={data[0].attributes.seo} />}
      {loading && <section className="py-[130px] cover-background lg:py-[90px] md:py-[75px] sm:py-[50px]" style={{ backgroundImage: `url(${host}${data[0].attributes.boardImage.data.attributes.formats.custom.url})` }}>
        <div className="absolute top-0 left-0 w-full h-full bg-darkgray opacity-75"></div>
        <Container>
          <Row className="items-center justify-center">
            <Col xl={6} lg={7} md={10} className="relative text-center">
              <h1 className="text-white font-medium text-[42px] leading-[49px] mb-0 sm:text-[30px] sm:leading-[40px]">{data[0].attributes.title}</h1>
            </Col>
          </Row>
        </Container>
      </section>}

      {loading && <section className="border-bottom bg-[#f7f7f7] border-color-extra-light-gray px-[10%] lg:px-0 py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container fluid>
          <Row>
            <ImageGallery theme="image-gallery-01" data={tempData} overlay={["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"]} className="" animation={fadeIn} />
          </Row>
        </Container>
      </section>}
    </>
  )
}

export default ImageGalleryPage04