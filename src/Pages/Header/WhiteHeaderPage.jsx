import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Col, Navbar } from 'react-bootstrap'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Header, HeaderCart, HeaderLanguage, HeaderNav, Menu, SearchBar } from "../../Components/Header/Header";
import FooterStyle02 from '../../Components/Footers/FooterStyle02'
import logo from '../../Assets/images/logo.png'

const WhiteHeaderPage = (props) => {
  
  const language = useSelector(state => state.State.language)
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [loadingScreen, setLoadingScreen] = useState(false)
  const token = useSelector(state => state.State.readToken)
  const host = useSelector(state => state.State.host)
  const scrollToTop = () => {
    window.scrollTo({
        top: 0,})}

  useEffect(() => {
    setLoading(false)
    scrollToTop()
    setLoading(true)
    setLoadingScreen(false)
    setTimeout(() => {
      setLoadingScreen(true)
    }, 500)
  },[location.pathname, host, token])

  return (<>
    <div className='z-10 w-full '>
      <div className='dir-rtl'>
      {loading && <Header topSpace={{ desktop: true }} type="reverse-scroll "> 
        <HeaderNav theme="light" bg="light-gray" menu="light" expand="lg" className="px-[15px] mx-12 py-[0px] lg:px-[15px] md:px-0 flex justify-center" containerClass="sm:px-0 mx-16">
          {language === "fa-IR" ? <>
            <Col className="col-3 col-sm-6 col-lg-1 me-auto ps-lg-0 ml-8">
              <Link aria-label="header logo" className="flex items-center" to="/">
                <Navbar className="inline-block p-0 m-0 justify-between">
                  {/* <img className="default-logo" width="80" height="36" loading="lazy" src={logo} data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' /> */}
                  <img className="alt-logo" width="80" height="36" loading="lazy" src={logo} data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
                  {/* <img className="mobile-logo" width="80" height="36" loading="lazy" src={logo} data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' /> */}
                </Navbar>
              </Link>
            </Col>
            <div className="col-auto hidden order-first md:block">
              <Navbar.Toggle className="md:ml-[10px] sm:ml-0">
                <span className="navbar-toggler-line"></span>
                <span className="navbar-toggler-line"></span>
                <span className="navbar-toggler-line"></span>
                <span className="navbar-toggler-line"></span>
              </Navbar.Toggle>
            </div>
            <Navbar.Collapse className="col-auto px-0 justify-end">
              <Menu {...props} />
            </Navbar.Collapse>
            <Col className="col-auto text-right pe-0">
              <SearchBar className="pr-0 xs:pl-[15px]" />
              <HeaderLanguage className="xs:pl-[15px]" />
              <HeaderCart className="xs:pl-[15px]" /> {/** the user icon */}
            </Col>
          </> : language === "en" ? <>
            <Col className="col-auto text-right pe-0">
              <SearchBar className="pr-0 xs:pl-[15px]" />
              <HeaderLanguage className="xs:pl-[15px]" />
              <HeaderCart className="xs:pl-[15px]" /> {/** the user icon */}
            </Col>
            <div className="col-auto hidden order-first md:block">
              <Navbar.Toggle className="md:ml-[10px] sm:ml-0">
                <span className="navbar-toggler-line"></span>
                <span className="navbar-toggler-line"></span>
                <span className="navbar-toggler-line"></span>
                <span className="navbar-toggler-line"></span>
              </Navbar.Toggle>
            </div>
            <Navbar.Collapse className="col-auto px-0 justify-end">
              <Menu {...props} />
            </Navbar.Collapse>
            <Col className="col-3 col-sm-6 col-lg-1 me-auto ps-lg-0">
              <Link aria-label="header logo" className="flex items-center" to="/">
                <Navbar className="inline-block p-0 m-0 justify-between">
                  {/* <img className="default-logo" width="80" height="36" loading="lazy" src={logo} data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' /> */}
                  <img className="alt-logo" width="80" height="36" loading="lazy" src={logo} data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
                  {/* <img className="mobile-logo" width="80" height="36" loading="lazy" src={logo} data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' /> */}
                </Navbar>
              </Link>
            </Col>
          </> : <>
            <Col className="col-3 col-sm-6 col-lg-1 me-auto ps-lg-0">
              <Link aria-label="header logo" className="flex items-center" to="/">
                <Navbar className="inline-block p-0 m-0 justify-between">
                  {/* <img className="default-logo" width="80" height="36" loading="lazy" src={logo} data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' /> */}
                  <img className="alt-logo" width="80" height="36" loading="lazy" src={logo} data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
                  {/* <img className="mobile-logo" width="80" height="36" loading="lazy" src={logo} data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' /> */}
                </Navbar>
              </Link>
            </Col>
            <div className="col-auto hidden order-first md:block">
              <Navbar.Toggle className="md:ml-[10px] sm:ml-0">
                <span className="navbar-toggler-line"></span>
                <span className="navbar-toggler-line"></span>
                <span className="navbar-toggler-line"></span>
                <span className="navbar-toggler-line"></span>
              </Navbar.Toggle>
            </div>
            <Navbar.Collapse className="col-auto px-0 justify-end">
              <Menu {...props} />
            </Navbar.Collapse>
            <Col className="col-auto text-right pe-0">
              <SearchBar className="pr-0 xs:pl-[15px]" />
              <HeaderLanguage className="xs:pl-[15px]" />
              <HeaderCart className="xs:pl-[15px]" /> {/** the user icon */}
            </Col>
          </>}
          
        </HeaderNav>
      </Header>}
      </div>
      <Outlet />
    {loadingScreen && <FooterStyle02/>}
  </div></>)}
export default WhiteHeaderPage