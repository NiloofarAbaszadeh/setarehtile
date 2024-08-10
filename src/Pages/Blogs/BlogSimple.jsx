import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
// Libraries
import { Col, Container, Row } from 'react-bootstrap'
// Components
import BlogSimple from '../../Components/Blogs/BlogSimple'
import { Helmet } from 'react-helmet-async'
import { Parallax } from 'react-scroll-parallax'
import { ScaleLoader } from 'react-spinners'

const BlogSimplePage = () => {
  const token = useSelector(state => state.State.readToken)
  const host = useSelector(state => state.State.host)
  const [researchData, setReserchData] = useState()
  // page number
  const itemsPerPage = 8
  const [maxPageNumber, setMaxPageNumber] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [endOffset, setEndOffset] = useState(itemsPerPage);
  const [currentItems, setCurrentItems] = useState();
  // current page number
  const [pageCount, setPageCount] = useState(1);
  const [pageCounter, setPageCounter] = useState([])

  const InitialPageNumber = (max) => {
    // eslint-disable-next-line
    for (var i = 1; i < max; i++) {
      // eslint-disable-next-line
      setPageCounter(per => [...per , i])
    }
  }
  
  useEffect(() => {
    const researchElements = () => {
      axios.get(`${host}/api/researchs?populate=deep`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setCurrentItems(res.data.data.slice().reverse())
        const maxPage = res.data.data.length % itemsPerPage !== 0 ? res.data.data.length / itemsPerPage + 1 : res.data.data.length / itemsPerPage
        setMaxPageNumber(maxPage.toFixed(0))
        InitialPageNumber(maxPage.toFixed(0))
      })
      axios.get(`${host}/api/research-page?populate=deep`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setReserchData(res.data.data)
      })
    }
    researchElements()
  },[host, token])

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

  return (
    <div className='bg-lightgray pb-[7.5rem] md:pb-20'>
      <Helmet>
        <title> مقالات | کاشی و سرامیک ستاره  </title>
      </Helmet>
      {!researchData && <div className='flex justify-center items-center bg-white w-full h-[100vh] fixed top-0 fix z-50 top-[-25px]'>
        <ScaleLoader
        color={"#db1010"}
        loading={!researchData}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"/></div>}
      {researchData && <div className="h-[400px] lg:h-[580px] md:h-[550px] sm:h-[500px] xs:h-[380px] overflow-hidden relative">
        <div className='absolute top-0 left-0 w-full h-full bg-darkgray opacity-70 z-[1]'></div>
          <Parallax className="lg-no-parallax bg-cover absolute -top-[50px] left-0 w-full h-[100vh] z-0 lg:-top-[70px] md:h-[600px] md:-top-[50px] xs:h-[450px]" translateY={[-40, 40]} style={{ backgroundImage: `url(${host}${researchData.attributes.boardImage.data.attributes.formats.custom.url})` }}></Parallax>
          <Container className="h-full relative z-[2]">
            <Row className="justify-center h-full">
              <Col xl={6} lg={7} md={8} className="relative font-serif text-center flex justify-center flex-col">
                {/* <h1 className="text-white opacity-60 mb-[20px] text-big leading-[20px]">کاشی ستاره میبد</h1> */}
                <h2 className="text-white font-medium -tracking-[1px] mb-0 text-[50px]">{researchData.attributes.title}</h2>
              </Col>
            </Row>
          </Container>
      </div>}
      <div className="py-3 bg-lightgray">
      </div>
      {/* Section Start */}
      <section className="overflow-hidden relative px-[5%] pb-[70px] bg-lightgray lg:pb-[60px] lg:px-0 md:pb-[55px] sm:pb-[40px]">
        <Container fluid>
          <Row className="justify-center lg:mx-8 md:mx-0 xs:mx-8">
            <Col xl={12} lg={12} sm={10} className="lg:px-0">
              {currentItems && <BlogSimple link="/research/" overlay="#374162" pagination={true} data={currentItems.slice(itemOffset, endOffset)} />}
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Pagination Start */}
      {currentItems && (
        <div className="flex justify-center mt-[3.5rem] md:mt-20">
          <ul className="pagination pagination-style-01 font-sans font-medium items-center">
            <li className="page-item">
                <button className="feather-arrow-right text-lg page-link" onClick={handelPageChange} value={"per"}></button>
            </li>
            {!pageCounter[0] ? <li className="page-item" onClick={handelPageChange}>
              <button className="page-link" value={1}> 1 </button>
            </li>: pageCounter.map((item, id) => {
              return <li className="page-item" onClick={handelPageChange}>
              <button className="page-link" value={id + 1}> {id + 1} </button>
            </li>
            })}
            <li className="page-item">
                <button className="feather-arrow-left text-lg page-link" onClick={handelPageChange} value={"next"}></button>
            </li>
          </ul>
        </div>
      )}
      {/* Pagination End */}
    </div>
  )
}

export default BlogSimplePage