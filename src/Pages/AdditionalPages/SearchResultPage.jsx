import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async'; 
// Libraries
import { useSelector } from 'react-redux';
import { Link, useLocation } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
// Components
import BlogGrid from '../../Components/Blogs/BlogGrid';
import { ScaleLoader } from 'react-spinners';
import searchImage from "../../Assets/images/no-search-result.png"


const SearchResultPage = (props) => {
  const searchresult = useLocation()
  const token = useSelector(state => state.State.readToken)
  const host = useSelector(state => state.State.host)
  const language = useSelector(state => state.State.language)

  const [data, setData] = useState({
    collections: [],
    groups: [],
    tails: [],
  })
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(false)
    const GetData = () => {
      axios.get(`${host}/api/collectionss?filters[name][$contains]=${searchresult.state.search.search}&populate=*&locale=${language}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        setData(perData => {
          return {
            ...perData,
            collections: res.data.data
          }
        })
        setLoading(true)
      })
      axios.get(`${host}/api/groupss?filters[name][$contains]=${searchresult.state.search.search}&populate=*&locale=${language}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        setData(perData => {
          return {
            ...perData,
            groups: res.data.data
          }
        })
        setLoading(true)
      })
      axios.get(`${host}/api/products?filters[name][$contains]=${searchresult.state.search.search}&populate=*&locale=${language}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        setData(perData => {
          return {
            ...perData,
            tails: res.data.data
          }
        })
        setLoading(true)
      })
      
    }
    GetData()
  }, [token, host, searchresult.state.search.search, language])

  return (
    !loading ? <div className='flex justify-center items-center bg-white w-full h-[100vh] fixed top-0 fix z-50'>
    <ScaleLoader
    color={"#db1010"}
    loading={!loading}
    size={20}
    aria-label="Loading Spinner"
    data-testid="loader"/>
  </div> :
    <div style={props.style}>
      <Helmet>
        <title> {language === "fa-IR" ? "جست و جو | کاشی و سرامیک ستاره" : language === "en" ? "Search result | Setareh Meybod Tile & Ceramic" : ""}</title>
      </Helmet>
      <section className="bg-darkgray py-[25px] page-title-small">
        <Container>
          <Row className="items-center justify-center">
            <Col xl={8} lg={6}>
              <h1 className="text-xlg text-white font-medium mb-0 md:text-center">{language === "fa-IR" ? "نتایج پیدا شده برای " : language === "en" ? "Results for " : ""} "{searchresult.state ? searchresult.state.search.search : "Blog"}"</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end text-smmb-0 md:mt-[10px] md:justify-center m-0">
              <ul className="xs:text-center">
                <li><Link aria-label="homepage" to="/" className="hover:text-white"><span className='text-xlg'>{language === "fa-IR" ? "خانه" : language === "en" ? "Home" : ""}</span></Link></li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      
      {loading && <section className="px-[11%] xl:px-[2%] xs:px-0 bg-lightgray py-[80px] lg:py-[40px] md:py-[35px] sm:py-[20px]">
        <Container fluid>
          <Row>
            <Col xs={12} className="xs:px-0">
              {(data.collections.length === 0 && data.groups.length === 0 && data.tails.length === 0) ?
              <div className='flex items-center justify-center flex-col h-[50vh]'>
                <img className='w-[350px]' src={searchImage} alt='no-result-found'/>
                <p className='text-[16px] mt-6'>{language === "fa-IR" ? "متاسفانه نتیجه ای یافت نشد. لطفا عبارت های مشابه را جست و جو کنید." : language === "en" ? "Unfortunately, no results were found. Please search for similar terms." : ""}</p>
              </div> 
              : <BlogGrid overlay="#374162" pagination={true} grid="grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large" data={data} /> }
            </Col>
          </Row>
        </Container>
      </section>}
    </div>)}
export default SearchResultPage