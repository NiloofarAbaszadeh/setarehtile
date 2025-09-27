import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Col, Navbar, Row, Container } from 'react-bootstrap'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Header, HeaderNav, Menu, SearchBar, HeaderLanguage, HeaderCart, Topbar } from "../../Components/Header/Header";
import FooterStyle02 from '../../Components/Footers/FooterStyle02'
import redLogo from "../../Assets/images/idk4.png"
import HeaderData, { HeaderDataEn } from '../../Components/Header/HeaderData';

import SocialIcons from '../../Components/SocialIcon/SocialIcons'



const SocialIconsData = [
  {
        color: "#828282",
        link: "https://www.instagram.com/setarehtile/?hl=en",
        icon: "fab fa-instagram"
    },
    {
        color: "#007bb6",
        link: "https://www.linkedin.com/in/setarehtile/?originalSubdomain=ir",
        icon: "fab fa-linkedin-in"
    },
    {
        color: "#007bb6",
        link: "https://t.me/s/setareh_tile",
        icon: "fab fa-telegram"
    },
]

const WhiteHeaderPage = (props) => {
  const language = useSelector(state => state.State.language)
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [loadingScreen, setLoadingScreen] = useState(false)
  const token = useSelector(state => state.State.readToken)
  const host = useSelector(state => state.State.host)

  useEffect(() => {
    setLoading(false)
    window.scrollTo({ top: 0 })
    setLoading(true)
    setLoadingScreen(false)
    setTimeout(() => setLoadingScreen(true), 500)
  }, [location.pathname, host, token])

  return (<>
    <div className="z-10 w-full relative iran-sans">
      <div className="dir-rtl">
        {loading && (
          <Header className="header-with-topbar" topSpace={{ md: false }} type="reverse-scroll">
            <Topbar className="text-white md:px-[15px] border-b-[1px] border-[#81818199] h-[26px] sm:hidden bg-[#00000099] backdrop-blur-md">
              <Container fluid="lg">
                <Row className="items-center justify-center ">
                  <Col className="col-12 col-md-3 header-social-icon d-none d-md-inline-block border-0 ">
                    <SocialIcons theme="social-icon-style-21" className="justify-start" size="xs" iconColor="light" data={SocialIconsData}
                    />
                  </Col>
                  <Col className="col-12 col-md-6 text-center px-md-0 sm-padding-5px-tb line-height-normal sm:hidden">
                    <span className="text-sm font-serif uppercase -tracking-[0.5px] inline-block">

                    </span>
                  </Col>
                  <Col className="col-auto col-md-3 text-left">
                    <SearchBar className="py-0 text-white" />
                    <HeaderLanguage />
                    <HeaderCart className="py-0 text-white" />
                  </Col>
                </Row>
              </Container>
            </Topbar>
            <div className='bg-[#00000099] backdrop-blur-md'>
              <HeaderNav theme="light" containerClass="!px-0 h-full" className="flex items-center justify-center py-[0px]  md:px-[15px] sm:px-0 h-[65px]">
                <Container className='px-0 h-full'>
                  <Col lg={6} xs={"auto"} className="px-lg-0 position-absolute left-0 right-0 mx-lg-auto text-center md:!relative mr-auto h-0">
                    <Link aria-label="header logo" className="inline-block relative z-50 h-full w-[20vw] sm:w-full" to="/">
                      <div className="p-0 m-0 align-middle  w-full relative flex items-center justify-center">
                        <div className='absolute top-[-40px] md:top-[-41px] sm:top-[-10px]'>
                          {/* <img className="default-logo h-[105px] sm:h-[73px]" src={redLogo} data-rjs='/assets/img/webp/logo-yellow-ochre@2x.webp' alt='logo' /> */}
                          <img className="alt-logo h-[105px] sm:h-[73px]" src={redLogo} data-rjs='/assets/img/webp/logo-yellow-ochre@2x.webp' alt='logo' />
                          {/* <img className="mobile-logo h-[105px] sm:h-[73px]"  src={redLogo} data-rjs='/assets/img/webp/logo-yellow-ochre@2x.webp' alt='logo' /> */}
                        </div>
                      </div>
                    </Link>
                  </Col>
                  <Col className="h-full">
                    <Navbar.Toggle className="absolute z-50 order-last md:ml-[17px] top-9 right-4">
                      <span className="navbar-toggler-line"></span>
                      <span className="navbar-toggler-line"></span>
                      <span className="navbar-toggler-line"></span>
                      <span className="navbar-toggler-line"></span>
                    </Navbar.Toggle>
                    <div className="hidden sm:block">
                      <Navbar.Collapse className="col-auto justify-center">
                        {language === "fa-IR" ? <Menu data={HeaderData} /> : <Menu data={HeaderDataEn} />}
                      </Navbar.Collapse>
                    </div>
                    <div className="flex items-center justify-between w-full h-full sm:hidden col-lg-10 col-xl-8 mx-auto !pl-[25px] !pr-[12px] lg:!pl-0 lg:!pr-0 z-20">
                      {language === "fa-IR" ? 
                        <>
                          <Menu data={HeaderData.slice(0, Math.floor(HeaderData.length / 2))} theme={"skew-x-[-28deg]"} class={`justify-start pl-4`} />
                          <Menu data={HeaderData.slice(Math.floor(HeaderData.length / 2), (HeaderData.length))} theme={"skew-x-[28deg]"} class={`justify-end`} />
                        </> :
                        <>
                          <Menu data={HeaderDataEn.slice(0, Math.floor(HeaderDataEn.length / 2))} theme={"skew-x-[-28deg]"} class={`justify-start`} />
                          <Menu data={HeaderDataEn.slice(Math.floor(HeaderDataEn.length / 2), (HeaderDataEn.length))} theme={"skew-x-[28deg]"} class={`justify-end`} />
                        </>
                      }
                    </div>
                    <Col className="col-auto col-md-3 text-left sm:block hidden">
                      <SearchBar className="py-0 text-white" />
                      <HeaderLanguage className="py-0 text-white"/>
                      <HeaderCart className="py-0 text-white" />
                    </Col>
                  </Col>
                </Container>
              </HeaderNav>
            </div>
            <div className='h-[20px] bg-blue'></div>
          </Header>
        )}
      </div>

      <Outlet />

      {loadingScreen && <FooterStyle02 />}
    </div>
    </>
  )
}

export default WhiteHeaderPage