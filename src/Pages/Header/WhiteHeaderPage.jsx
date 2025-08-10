import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Col, Navbar } from 'react-bootstrap'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Header, HeaderCart, HeaderLanguage, HeaderNav, Menu, SearchBar } from "../../Components/Header/Header";
import FooterStyle02 from '../../Components/Footers/FooterStyle02'
import logo from '../../Assets/images/logo.png'
// Placeholder for your white logo
import whiteLogo from '../../Assets/images/logo-white.png'

const WhiteHeaderPage = (props) => {
  const language = useSelector(state => state.State.language)
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [loadingScreen, setLoadingScreen] = useState(false)
  const token = useSelector(state => state.State.readToken)
  const host = useSelector(state => state.State.host)
  const [isAtTop, setIsAtTop] = useState(true)

  useEffect(() => {
  const handleScroll = () => {
    // you can throttle/debounce this if needed
    setIsAtTop(window.scrollY === 0);
  }
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
  return () => window.removeEventListener('scroll', handleScroll)
}, [])


  useEffect(() => {
    setLoading(false)
    window.scrollTo({ top: 0 })
    setLoading(true)
    setLoadingScreen(false)
    setTimeout(() => setLoadingScreen(true), 500)
  }, [location.pathname, host, token])

  // Triangle logo area
  const RightTriangleLogo = () => (
    <div
      className={`absolute top-[-24px]  flex items-start justify-center rotate-180 rounded-[5px] ${language === "en" ? "scale-y-[-100%] right-[-40px] rotate-0 pr-[100px]" : "right-[-330px]"} `} 
      style={{
        width: '400px', // make wider
        height: '120px',
        aspectRatio: '1 / 0.86602540378', // equilateral ratio
        clipPath: 'polygon(0 0, 100% 0%, 85% 100%, 0 100%)',
        backgroundColor: '#BF0D19',
        zIndex: 20,
      }}
    >
      <img
        className={`rotate-180 pb-2 absolute right-[90px] ${language === "en" && "scale-y-[-100%] rotate-0"}`}
        src={whiteLogo}
        alt="logo"
        style={{
          width: '35%',
          height: 'auto',
          marginTop: '10px',
        }}
      />
    </div>
  )

  const DefaultLogo = () => (
    <img className="alt-logo" width="80" height="36" loading="lazy" src={logo} alt="logo" />
  )

  const LogoWithConditionalShape = () => {
  return (
    <div style={{ position: 'relative', width: 80, height: 36 }}>
      {/* Triangle Logo */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transition: 'opacity 3s cubic-bezier(0.25, 0.1, 0.25, 1) ease-in-out, transform 4s cubic-bezier(0.25, 0.1, 0.25, 1) ease-in-out',
          opacity: isAtTop ? 1 : 0,
          transform: isAtTop ? 'scale(1)' : 'scale(0.8)',
          pointerEvents: isAtTop ? 'auto' : 'none',
          zIndex: isAtTop ? 10 : 5,
        }}
      >
        <RightTriangleLogo />
      </div>

      {/* Default Logo */}
      <div
        className='transition-discrete'
        style={{
          position: 'absolute',
          top: "-10px",
          left: 0,
          width: '100%',
          height: '100%',
          transition: 'opacity 3s cubic-bezier(0.25, 0.1, 0.25, 1) ease-in-out, transform 4s cubic-bezier(0.25, 0.1, 0.25, 1) ease-in-out',
          opacity: isAtTop ? 0 : 1,
          transform: isAtTop ? 'scale(0.8)' : 'scale(1)',
          pointerEvents: isAtTop ? 'none' : 'auto',
          zIndex: isAtTop ? 5 : 10,
        }}
      >
        <DefaultLogo />
      </div>
    </div>
  )
}



  return (
    <div className="z-10 w-full relative font-sans">
      <div className="dir-rtl">
        {loading && (
          <Header topSpace={{ desktop: true }} type="reverse-scroll">
            <HeaderNav
              theme="light"
              bg="light-gray"
              menu="light"
              expand="lg"
              className="px-[15px] mx-12 py-[0px] lg:px-[15px] md:px-0 flex justify-center"
              containerClass="sm:px-0 mx-12 sm:mx-2"
            >
              {language === 'fa-IR' ? (
                <>
                  <Col className="col-3 col-sm-4 col-lg-1 me-auto ps-lg-0 ml-8">
                    <Link aria-label="header logo" className="flex items-center" to="/">
                      <Navbar className="inline-block p-0 m-0 justify-between">
                        <LogoWithConditionalShape />
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
                    <HeaderCart className="xs:pl-[15px]" />
                  </Col>
                </>
              ) : language === 'en' ? (
                <>
                  <Col className="col-auto text-right pe-0">
                    <SearchBar className="pr-0 xs:pl-[15px]" />
                    <HeaderLanguage className="xs:pl-[15px]" />
                    <HeaderCart className="xs:pl-[15px]" />
                  </Col>
                  <div className="col-auto hidden order-first md:block pl-6">
                    <Navbar.Toggle className="md:ml-[10px] sm:ml-0">
                      <span className="navbar-toggler-line"></span>
                      <span className="navbar-toggler-line"></span>
                      <span className="navbar-toggler-line"></span>
                      <span className="navbar-toggler-line"></span>
                    </Navbar.Toggle>
                  </div>
                  <Navbar.Collapse className="col-auto px-0 justify-center">
                    <Menu {...props} />
                  </Navbar.Collapse>
                  <Col className="col-3 col-sm-4 col-lg-1 me-auto ps-lg-0 pr-12 ">
                    <Link aria-label="header logo" className="flex items-center" to="/">
                      <Navbar className="inline-block p-0 m-0 justify-between">
                        <LogoWithConditionalShape />
                      </Navbar>
                    </Link>
                  </Col>
                </>
              ) : (
                <>
                  <Col className="col-3 col-sm-4 col-lg-1 me-auto ps-lg-0">
                    <Link aria-label="header logo" className="flex items-center" to="/">
                      <Navbar className="inline-block p-0 m-0 justify-between">
                        <LogoWithConditionalShape />
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
                    <HeaderCart className="xs:pl-[15px]" />
                  </Col>
                </>
              )}
            </HeaderNav>
          </Header>
        )}
      </div>
      <Outlet />
      {loadingScreen && <FooterStyle02 />}
    </div>
  )
}

export default WhiteHeaderPage
