import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Col, Navbar } from 'react-bootstrap'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Header, HeaderNav, Menu, SearchBar, HeaderLanguage,HeaderCart } from "../../Components/Header/Header";
import FooterStyle02 from '../../Components/Footers/FooterStyle02'
import logo from '../../Assets/images/logo.png'
// import whiteLogo from '../../Assets/images/logo-white.png'
import LogoFarsi from "../../Assets/images/logo-farsi.png"
import logoEnglish from "../../Assets/images/logo-english.png"

const WhiteHeaderPage = (props) => {
  const language = useSelector(state => state.State.language)
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [loadingScreen, setLoadingScreen] = useState(false)
  const token = useSelector(state => state.State.readToken)
  const host = useSelector(state => state.State.host)
  const [isAtTop, setIsAtTop] = useState(true)
  const [specialLogo, setSpecialLogo] = useState(true)

  useEffect(() => {
  const handleScroll = () => {
    // you can throttle/debounce this if needed
    setIsAtTop(window.scrollY === 0);
  }
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
  return () => window.removeEventListener('scroll', handleScroll)
}, [specialLogo])


  useEffect(() => {
    setSpecialLogo(window.innerWidth >= 990 ? true : false)
    setLoading(false)
    window.scrollTo({ top: 0 })
    setLoading(true)
    setLoadingScreen(false)
    setTimeout(() => setLoadingScreen(true), 500)
  }, [location.pathname, host, token, specialLogo])

  const DefaultLogo = () => (
    <div
      className={`absolute flex items-start justify-center px-2 ${language === "fa-IR" ? "left-[-15px] top-[-17px]" : "right-[280px] top-[-15px]"} `} 
      style={{
        width: "5000px", // make wider
        height: '100.5px',
        aspectRatio: '1 / 0.86602540378', // equilateral ratio
        clipPath: 'polygon(0 0, 100% 0%, 100% 100%, 0 100%)',
        // backgroundColor: '#b90000',
        zIndex: 20,
      }}
    >
      <img className={`alt-logo h-[100%] absolute ${language === "fa-IR" ? "left-[0px]" : "right-[0px]"}`} loading="lazy" src={language === "fa-IR" ? LogoFarsi : logoEnglish} alt="logo" />
    </div>
    
  )

  const LogoWithConditionalShape = () => {
  return (
    <div style={{ position: 'relative', width: 80, height: 36 }}>
      <div
        className='transition-discrete'
        style={{
          position: 'absolute',
          top: "-10px",
          transition: 'opacity 3s cubic-bezier(0.25, 0.1, 0.25, 1) ease-in-out, transform 4s cubic-bezier(0.25, 0.1, 0.25, 1) ease-in-out',
          opacity: (window.innerWidth < 991) ? 1 : 0,
          transform: 'scale(1)',
          pointerEvents: isAtTop ? 'none' : 'auto',
          zIndex: 5,
        }}
      >
        <img className={`alt-logo`} loading="lazy" src={logo} alt="logo" />
      </div>
      
      <div
        className='transition-discrete'
        style={{
          position: 'absolute',
          top: "-5px",
          left: 0,
          width: '420%',
          height: '420%',
          transition: 'opacity 3s cubic-bezier(0.25, 0.1, 0.25, 1) ease-in-out, transform 4s cubic-bezier(0.25, 0.1, 0.25, 1) ease-in-out',
          opacity: (window.innerWidth > 991) ? 1 : 0,
          transform: 'scale(1)',
          pointerEvents: isAtTop ? 'none' : 'auto',
          zIndex: 5,
        }}
      >
        <DefaultLogo />
      </div>
    </div>
  )
  }

  return (<>
    <div className="z-10 w-full relative iran-sans">
      <div className="dir-rtl">
        {loading && (
          <Header topSpace={{ desktop: true }} type="reverse-scroll">
            {/* <Topbar /> */}
            <HeaderNav
              theme="light"
              // bg="light-white"
              menu="light"
              expand="lg"
              className="px-[15px] mx-12 py-[0px] lg:px-[15px] md:px-0 flex justify-center md:justify-between"
              containerClass="sm:px-0 sm:mx-2"
            >
              {language === 'fa-IR' ? (
                <>
                  <Col className="col-3 col-sm-4 col-lg-1 me-auto ps-lg-0 md:ml-0">
                    <Link aria-label="header logo" className="flex items-center md:justify-end" to="/">
                      <Navbar className="inline-block p-0 m-0 justify-between ">
                        <LogoWithConditionalShape />
                      </Navbar>
                    </Link>
                  </Col>
                  <Col className="col-auto hidden order-first md:block">
                    <Navbar.Toggle className="md:ml-[10px] sm:ml-0">
                      <span className="navbar-toggler-line"></span>
                      <span className="navbar-toggler-line"></span>
                      <span className="navbar-toggler-line"></span>
                      <span className="navbar-toggler-line"></span>
                    </Navbar.Toggle>
                  </Col>
                  <Navbar.Collapse className="col-auto px-0 justify-end">
                    <Menu {...props} />
                  </Navbar.Collapse>
                  <Col className="col-auto text-right pe-0 md:hidden">
                    <div className='w-[4vw]'></div>
                  </Col>
                  {/* <Col className="col-auto text-right pe-0">
                    <HeaderCart className="xs:pl-[15px]" /> 
                    <HeaderLanguage className="xs:pl-[15px]" />
                    <SearchBar className="pr-0 xs:pl-[15px]" />
                  </Col> */}
                </>
              ) : language === 'en' ? (
                <>
                  {/* <Col className="col-auto text-right pe-0">
                    <HeaderCart className="xs:pl-[15px]" /> 
                    <HeaderLanguage className="xs:pl-[15px]" />
                    <SearchBar className="pr-0 xs:pl-[15px]" />
                  </Col> */}
                  <Col className="col-auto hidden order-first md:block">
                    <Navbar.Toggle className="md:ml-[10px] sm:ml-0">
                      <span className="navbar-toggler-line"></span>
                      <span className="navbar-toggler-line"></span>
                      <span className="navbar-toggler-line"></span>
                      <span className="navbar-toggler-line"></span>
                    </Navbar.Toggle>
                  </Col>
                  <Navbar.Collapse className="col-auto px-0 justify-end">
                    <Menu {...props} />
                  </Navbar.Collapse>
                  <Col className="col-auto text-right pe-0 md:hidden">
                    <div className='w-[7vw]'></div>
                  </Col>
                  <Col className="col-3 col-sm-4 col-lg-1 me-auto ps-lg-0 md:ml-0">
                    <Link aria-label="header logo" className="flex items-center md:justify-end" to="/">
                      <Navbar className="inline-block p-0 m-0 justify-between ">
                        <LogoWithConditionalShape />
                      </Navbar>
                    </Link>
                  </Col>
                  
                </>
              ) : <></>}
            </HeaderNav>
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
