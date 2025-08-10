import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import BlogSideImage from "../../Components/Blogs/BlogSideImage";
import { useLocation } from "react-router-dom";
import { Helmet } from 'react-helmet-async'; 
import { Parallax } from 'react-scroll-parallax';
import { ScaleLoader } from "react-spinners";
const BlogSideImgPage = () => {
  const location = useLocation()
  const token = useSelector(state => state.State.readToken)
  const host = useSelector(state => state.State.host)
  const language = useSelector(state => state.State.language)

  const [data, setData] = useState(null)

  // page number
  const itemsPerPage = 6
  const [maxPageNumber, setMaxPageNumber] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [endOffset, setEndOffset] = useState(itemsPerPage);
  const [currentItems, setCurrentItems] = useState();
  // current page number
  const [pageCount, setPageCount] = useState(1);
  const [pageCounter, setPageCounter] = useState([])

  const InitialPageNumber = (max) => {
    var i = 0;
    for (i = 1; i < max; i++) {
      // eslint-disable-next-line
      setPageCounter(per => [...per , i])
    }
  }

  useEffect(() => {
    const newsElements = () => {
      axios.get(`${host}/api/news-elements?populate=deep&sort[0]=id:desc&locale=${language}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setCurrentItems(res.data.data.slice())
        const maxPage = res.data.data.length % itemsPerPage !== 0 ? res.data.data.length / itemsPerPage + 1 : res.data.data.length / itemsPerPage
        setMaxPageNumber(maxPage.toFixed(0))
        InitialPageNumber(maxPage.toFixed(0))
      })
      axios.get(`${host}/api/news-page?populate=*&locale=${language}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setData(res.data.data)
      })
    }
    newsElements()
    // eslint-disable-next-line
  }, [host, token, language])

  const SetErea = (action) => {
    if (action === "next") {
      if (pageCount < maxPageNumber) {
      setItemOffset(peritem => {
        return peritem + itemsPerPage
      })
      setEndOffset(peritem => {
        return peritem + itemsPerPage
      })}
    } else if (action === "per") {
      if (pageCount > 1) {
      setItemOffset(peritem => {
        return peritem - itemsPerPage
      })
      setEndOffset(peritem => {
        return peritem - itemsPerPage
      })}
    } else {
      setItemOffset(itemsPerPage * action - itemsPerPage)
      setEndOffset(itemsPerPage * action )
    }
  }

  const handelPageChange = (event) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
  })
    const action = event.target.value
    if (action === "next") {
      if (pageCount < maxPageNumber) {
        setPageCount(perNum => {
          return perNum + 1;
        })
      }
    } else if (action === "per") {
      if (pageCount !== 1) {
        setPageCount(perNum => {
          return perNum - 1;
        })
      }
    } else {
      setPageCount(action)
    }
    SetErea(action)
}

  return (<><Helmet>
        <title>{language === "fa-IR" ? "اخبار | کاشی ستاره میبد" : language === "en" ? "News | Setareh Meybod Tile & Ceramic" : ""}</title>
      </Helmet>
      {!data && !currentItems && <div className='flex justify-center items-center bg-white w-full h-[100vh] fixed top-0 fix z-50'>
        <ScaleLoader
          color={"#db1010"}
          loading={!data}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"/></div>}
      
      {data && currentItems && <div className="h-[400px] lg:h-[580px] md:h-[550px] sm:h-[500px] xs:h-[380px] overflow-hidden relative">
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
      <div className="py-3 bg-lightgray">
      </div>
      <section className="overflow-hidden relative px-[11%] pb-[130px] bg-lightgray lg:px-0 lg:pb-[90px] md:pb-[75px] sm:pb-[50px]">
        <Container>
          <Row className="justify-center">
            <Col xl={10} sm={9} md={12} >
              {currentItems && <BlogSideImage link={`${location.pathname}/`} pagination={true} data={currentItems.slice(itemOffset, endOffset)} />}
            </Col>
          </Row>
        </Container>
      {/* Pagination Start */}
      {data && (
        <div className="flex justify-center mt-[7.5rem] md:mt-20">
          <ul className="pagination pagination-style-01 font-sans font-medium items-center">
            <li className="page-item">
                <button className={`feather-arrow-${language === "fa-IR" ? "right" : language === "en" ? "left" : ""} text-lg page-link`} onClick={handelPageChange} value={"per"}></button>
            </li>
            {pageCounter.map((item, id) => {
              return <li className="page-item" onClick={handelPageChange}>
              <button className="page-link " value={id + 1}> {id + 1} </button>
            </li>
            })}
            <li className="page-item">
                <button className={`feather-arrow-${language === "fa-IR" ? "left" : language === "en" ? "right" : ""} text-lg page-link`} onClick={handelPageChange} value={"next"}></button>
            </li>
          </ul>
        </div>
      )}
      {/* Pagination End */}
      </section></>)}

export default BlogSideImgPage;
