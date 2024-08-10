import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

// Libraries
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import BlogClean from "../../Components/Blogs/BlogClean";

const LatestNewsPage = (props) => {
  const token = useSelector(state => state.State.readToken)
  const host = useSelector(state => state.State.host)

  const [data, setData] = useState(null)
  const [loading , setLoading] = useState(false)

  useEffect(() => {
    const newsElements = async () => {
      await axios.get(`${host}/api/news-elements?populate=*`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setData(res.data.data)
        setLoading(true)
      })
    }
    newsElements()
  },[host,token])

  return (
    <div style={props.style}>

      {/* Section Start */}
      {loading && <section className="bg-lightgray  py-[80px] lg:py-[60px] md:py-[45px] sm:py-[30px]">
        <Container>
          <Row className="justify-center">
            <Col lg={6} className="text-center mb-8 sm:mb-6">
              <span className="font-medium text-fastblue text-xxlg block mb-[5px] uppercase">اخبار</span>
              <h6 className=" text-darkgray text-xlg  uppercase">جدید ترین اخبار </h6>
            </Col>
          </Row>
        </Container>
        <Container fluid className="px-[7%] xl:px-[2%] lg:px-[3%] sm:px-[15px]">
          <Row>
            <Col className="sm:px-0">
              <BlogClean filter={false} overlay={["#e3000f", "#e3000f", "#e3000f", "#e3000f", "#e3000f"]} grid="grid grid-5col xl-grid-5col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large" data={data.slice().reverse().slice(0,5)} />
            </Col>  
          </Row>
          <Row className="flex-fix">
            <div className="flex item-center justify-center">
              <Link to={'./news'}><button className="button-custom w-auto mt-[35px]">مشاهده همه</button></Link>
            </div>
          </Row>
        </Container>
      </section>}
      {/* Section End */}
    </div>
  )
}

export default LatestNewsPage