import React, { useEffect, useState, useContext, useRef, memo } from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import { useScroll } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Accordion, Container, Navbar } from "react-bootstrap";
import useOnClickOutside from "../../Functions/UseOnClickOutside";
import { Input } from '../Form/Form'
import ReactCustomScrollbar from "../ReactCustomScrollbar";
import GlobalContext from "../../Context/Context";
import HeaderData, { HeaderDataEn } from "./HeaderData";
import "../../Assets/scss/layouts/_header.scss"
import { useDispatch } from "react-redux";
import { changeLanguage } from "../../Store/state";
import { useSelector } from "react-redux";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

 
/* Header Component Start */
export const Header = memo((props) => {
  // Add Global Header Data
  const { setHeaderHeight } = useContext(GlobalContext);
  const { scrollY } = useScroll();
  const [scrollPos, setScrollPos] = useState({
    y: 0,
    prevY: -1,
    directionDown: true,
  });
  const location = useLocation()

  useEffect(() => {
    let headerEl = document.querySelector("header");

    // Calculate header height
    function setTopSpace() {
      let windowWidth = window.innerWidth,
        headerheight = (props.topSpace.desktop && props.topSpace.desktop === true) ? headerEl.offsetHeight : 0;

      if (windowWidth <= 1199 && props.topSpace.lg) {
        headerheight = props.topSpace.lg === true ? headerEl.offsetHeight : 0;
      }

      if (windowWidth <= 991 && props.topSpace.md) {
        headerheight = props.topSpace.md === true ? headerEl.offsetHeight : 0;
      }

      if (windowWidth <= 767 && props.topSpace.sm) {
        headerheight = props.topSpace.sm === true ? headerEl.offsetHeight : 0;
      }

      if (windowWidth <= 575 && props.topSpace.xs) {
        headerheight = props.topSpace.xs === true ? headerEl.offsetHeight : 0;
      }

      setHeaderHeight(headerheight);
    }

    setTopSpace();

    window.addEventListener("load", setTopSpace);
    window.addEventListener("resize", setTopSpace);

    if (document.body.classList.contains("mobile-menu")) {
      document.body.classList.remove("navbar-collapse-show")
      document.body.classList.remove("menu-modern")
      document.body.classList.remove("menu-full")
      document.body.style.removeProperty("overflow");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    let lastScrollTop = 0;
    scrollY.onChange((pos) => {
      if (pos > lastScrollTop) {
        setScrollPos({
          ...scrollPos,
          y: pos,
          prevY: pos - 1,
          directionDown: true,
        });
      } else {
        setScrollPos({
          ...scrollPos,
          y: pos,
          prevY: pos - 1,
          directionDown: false,
        });
      }

      if (pos === 0) {
        setScrollPos({ ...scrollPos, directionDown: true });
      }
      lastScrollTop = pos;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //make the header have more hight from here
  return (
    <header
      className={`absolute bg-none mt-0 top-0 z-50 ${props.className ? props.className : ""}${scrollPos.y > 5 ? " sticky-header" : ""}${scrollPos.directionDown === false ? " header-appear" : ""}${props.type ? ` ${props.type}` : ""
        }`}
    >
        {props.children}
      {/* <div className='bg-[#00000088] h-[25px] flex items-center justify-center'></div> */}
    </header>
  );
});
/* Header Component End */

/* Headernav Component Start */
export const HeaderNav = (props) => {
  const handleMenuToggle = () => {
    let header = document.querySelector("header"),
      menu = header.querySelector(".navbar-nav"),
      menu_item = menu.querySelectorAll(".nav-item");

    if (!document.body.classList.contains("navbar-collapse-show")) {
      document.body.classList.add("navbar-collapse-show");
    } else {
      document.body.classList.remove("navbar-collapse-show");
    }

    menu_item.forEach(function (item) {
      if (item.classList.contains("open")) {
        setTimeout(() => {
          item.classList.remove("open");
        }, 200);
      }
    });
  };

  return (
    <Navbar
      collapseOnSelect
      id="headerbar"
      expand={props.expand}
      bg={props.bg ? props.bg : "transparent"}
      variant={props.theme}
      className={`${props.menu && `menu-${props.menu}`}${props.className ? ` ${props.className}` : ""
        }${props.bg || props.bg === "transparent" ? "" : " header-transparent"}`}
      onToggle={handleMenuToggle}
    >
      <Container
        fluid={props.fluid}
        className={props.containerClass ? props.containerClass : ""}
      >
        {props.children}
      </Container>
    </Navbar>
  );
};
/* Headernav Component End */

/* Topbar Component Start */
export const Topbar = ({ className, ...props }) => {
  useEffect(() => {
    let topbar = document.querySelector(".top-bar");
    if (typeof topbar != "undefined" && topbar != null) {
      let topbarHeight = `${topbar.clientHeight}px`;
      topbar.style.setProperty("--topbar-height", topbarHeight);
    }
  }, []);

  return (
    <div className={`${className ? ` ${className}` : ""}`} {...props}>
      {/* i removed this classname from the topbar to make it visible any time : "top-bar" */}
      {props.children}
    </div>
  );
};
/* Topbar Component End */


/* Menu Component Start */

export const Menu = memo((props) => {
  const megamenu_ref = useRef(null);
  const [isMenuActive, setMenuActive] = useState(null);
  const [isHover, setIsHover] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 767);
  const language = useSelector(state => state.State.language)
  const token = useSelector(state => state.State.readToken)
  const host = useSelector(state => state.State.host)
  const [hoveredId, setHoveredId] = useState()
  const [datax, setDatax] = useState([])

  const location = useLocation();

  const handleMenuClick = (e, index) =>
    setMenuActive(index !== isMenuActive ? index : null);

  // Track window width for switching dropdown <-> mega menu
  useEffect(() => {
    const onResize = () => {
      setIsWideScreen(window.innerWidth > 991);
    };

    window.addEventListener("resize", onResize);

    // Initial check
    onResize();

    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    let header = document.querySelector("header"),
      links = header.querySelectorAll(".nav-link");

    const activeLink = Array.from(links).find(
      (link) => link.getAttribute("href") === location.pathname
    );
    if (activeLink) {
      import("../../Functions/Utilities").then((module) => {
        let filtered_dropdown = module
          .getParents(activeLink)
          .filter((item) => item.classList.contains("simple-dropdown"));
        let filtered_nav_item = module
          .getParents(activeLink)
          .filter((item) => item.classList.contains("nav-item"));
        filtered_dropdown.forEach((item) => item.classList.add("active"));
        filtered_nav_item.forEach((item) => item.classList.add("active"));
      });
    }
  }, [location, isHover]);

  useEffect(() => {
    let navItems = document
      .querySelector("header")
      .querySelectorAll(".navbar-nav > .nav-item");
      navItems.forEach((nav) =>
      nav.addEventListener("mouseover", () => setIsHover(true))
    );
  }, []);



  useEffect(() => {
      const fetchData = async () => {
        if (hoveredId) {try {
          const response = await axios.get(`${host}${hoveredId}${language}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.data.data.length > 1) {
            setDatax(response.data.data.map((item) => {
              return {
                name: item.attributes.name,

                image: item.attributes.image ? item.attributes.image.data.attributes.formats.medium.url :
                item.attributes.profileImage ? item.attributes.profileImage.data.attributes.formats.medium.url :
                item.attributes.GroupImage ? item.attributes.GroupImage.data.attributes.formats.medium.url : "",
              
                link: item.attributes.image ? `/product-tilse/${item.attributes.name}`:
                item.attributes.profileImage ? `/product-collection/${item.attributes.name}` :
                item.attributes.GroupImage ? `/product-groups/${item.attributes.name}` : "",
              }
            }));
          } else {
            setDatax(response.data.data[0].attributes.reward.slice(0, 5).map(item => {
              return {
                name: "",
                image: item.profileImage.data.attributes.formats.medium.url,
                link: hoveredId.split("?")[0].split("/")[2] === "gwahy-kharjies" ? "/certificate/external-ce" :
                hoveredId.split("?")[0].split("/")[2] === "aftkharats" ? "/certificate/honors" :
                hoveredId.split("?")[0].split("/")[2] === "gwahy-dakhlies" ? "/certificate/internal-ce" : ""
              }
            }))
          }
          
        } catch (err) {
          console.error("Failed to fetch:", err);
        }}
      };

      fetchData();
  }, [hoveredId, token, host, language]);

  return (
    <div
      className={`${
        props.mobileMenu ? `mobile-menu-${props.mobileMenu}` : ""
      }${props.className ? ` ${props.className}` : ""}`}
    >
      <ul className="navbar-nav p-0 ">
        {props.data.map((item, i) => {
          return (
            <li
              className={`nav-item group relative ${
                item.dropdown || item.megamenu ? ` dropdown` : ""
              }${isMenuActive === i ? " open" : ""} md:px-2`}
              key={i}
            >
              {item.link ? (
                <Link className="nav-link" to={item.link} onMouseEnter={() => setHoveredId(item.url)}>
                  <span className="text-white md:text-[12px]">{item.title}</span>
                  <span
                    className={`absolute left-0 top-[8px] md:top-[-10px] h-[64px] w-full bg-[#c50000] ${props.theme} max-w-0 group-hover:max-w-full -z-10`}
                  ></span>
                </Link>
              ) : (
                <div className="nav-link " onMouseEnter={() => setHoveredId(item.url)}>
                  <span className="text-white md:text-[12px]">{item.title}</span>
                  <span
                    className={`absolute left-0 top-[8px] md:top-[-10px] h-[64px] w-full bg-[#c50000] ${props.theme} max-w-0 group-hover:max-w-full -z-10`}
                  ></span>
                </div>
              )}

              <i onClick={(e) => handleMenuClick(e, i)} className="h-[50px]"/>

              {/* Conditionally render dropdown or mega menu */}
              {item.dropdown && !isWideScreen && (
                <ul className="simple-dropdown-menu skew-0 p-0 md:top-6 mt-18">
                  {item.dropdown.map((subItem, i) => (
                    <li key={i} className="simple-dropdown ">
                      {subItem.link ? (
                        <Link className="nav-link px-4 py-2" to={subItem.link}>
                          <span className="text-white">{subItem.title}</span>
                          {subItem.dropdown && <i className="fas fa-angle-right"></i>}
                        </Link>
                      ) : (
                        <span className="nav-link px-4 py-2">
                          <span className="text-white">{subItem.title}</span>
                          {subItem.dropdown && <i className="fas fa-angle-right"></i>}
                        </span>
                      )}
                      {/* You can keep nested dropdowns here if needed */}
                    </li>
                  ))}
                </ul>
              )}

              {/* Render mega menu instead when wide screen and dropdown exists */}
              {item.dropdown && isWideScreen && (
                <div className={`flex megamenu ${!item.img ? "px-0 justify-start" : "justify-center"}`} ref={megamenu_ref}>
                  <div className={`flex items-start justify-start ${!item.img ? " pt-8 px-4" : "justify-center"} pl-[50px] w-full ${language === "en" && "flex-row-reverse"}`}>
                    <div className={`${item.img ? "flex" : "grid"} `}>
                      {item.dropdown.map((subItem, i) => (
                          <div
                          key={i} 
                            id={i} 
                          className={`nav-item mx-4 relative ${item.img && "pt-12"}`}
                          onMouseEnter={() => setHoveredId(subItem.url)}
                          >
                            <div>
                              {(subItem.img && subItem.link) && (
                              <Link to={subItem.link}>
                                <img
                                  alt="menu-banner"
                                  className="inline-block w-[200px]"
                                  src={subItem.img}
                                />
                              </Link>
                        )}
                        {subItem.title && (
                          <Link
                            className={`${item.img ? "bg-[#c60000aa] flex justify-center items-center top-[-50px]" : "top-[0px]"} nav-link absolute w-full`}
                            to={subItem.link ? subItem.link : "#"}
                          >
                            {subItem.icon && <i className={`${subItem.icon} mr-[10px]`}></i>}
                            <span className="iran-sans text-[18px] text-white my-[10px]">{subItem.title}</span>
                          </Link>
                        )}
                        </div>
                      </div>
                    ))}  
                    </div>
                    {item.megaitem && <div className={`bg-blue w-full flex ${language === "en" ? "justify-end" : "justify-start"} mx-24 mb-8`}>
                      {datax.map((item) => {
                        return <div className="mx-4 border-[1px] border-[#ffffff33]">
                          <Link to={item.link} target="_black">
                            <img className="h-[200px]" src={host + item.image} alt="item.name" />
                            {item.name !== "" && <div className="bg-[#c60000aa] flex justify-center items-center h-[50px]">
                              <span className="text-white text-[16px]">{item.name}</span>
                            </div>}
                          </Link>
                        </div>
                      })}
                    </div>}
                  </div>
                </div>
              )}

              {/* Your existing megamenu handling stays the same */}
              {item.megamenu && (
                <div className="flex megamenu" ref={megamenu_ref}>
                  {item.megamenu.map((megaItem, i) => (
                    <ul
                      className={`${
                        megaItem.dropdown.filter((it) => it.img).length > 0
                          ? "!pr-[30px] img-wrapper inline-block last:!pr-[0px]"
                          : "inline-block"
                      }`}
                      key={i}
                    >
                      {megaItem.title && (
                        <li className="title text-md font-medium mb-[15px] whitespace-nowrap">
                          {megaItem.title}
                        </li>
                      )}
                      {megaItem.dropdown &&
                        megaItem.dropdown.map((ddItem, i) => (
                          <li className="nav-item" key={i}>
                            {ddItem.title && (
                              <Link
                                className="nav-link"
                                to={ddItem.link ? ddItem.link : "#"}
                              >
                                {ddItem.icon && (
                                  <i className={`${ddItem.icon} mr-[10px]`}></i>
                                )}{" "}
                                {ddItem.title}
                              </Link>
                            )}
                            {ddItem.img && ddItem.link && (
                              <Link to={ddItem.link}>
                                <img
                                  height="235"
                                  alt="menu-banner"
                                  width="210"
                                  className="inline-block max-w-[210px]"
                                  src={ddItem.img}
                                />
                              </Link>
                            )}
                          </li>
                        ))}
                    </ul>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
});


/* Mobile Menu Component Start */
export const MobileMenu = (props) => {
  const megamenu_ref = useRef(null);
  const [isMenuActive, setMenuActive] = useState(null);
  const [toggle, setToggle] = useState(false);
  const handleMenuClick = (e, index) => setMenuActive(index !== isMenuActive ? index : null);

  // set Active Menu
  const location = useLocation()
  useEffect(() => {
    let header = document.querySelector("header"),
      links = header.querySelectorAll(".nav-link");

    function getParents(elem) {
      var parents = [];
      while (elem.parentNode && elem.parentNode.nodeName.toLowerCase() !== 'body') {
        elem = elem.parentNode;
        parents.push(elem);
      }
      return parents;
    }

    links.forEach(item => {
      let attr = item.getAttribute("href");
      item.classList.remove("active");
      if (attr === location.pathname) {
        if (item.closest(".simple-dropdown")) {
          item.closest(".simple-dropdown").querySelectorAll(".nav-link").forEach(item => item.classList.remove("active"));
        }
        item.classList.add("active");

        let filtered_dropdown = getParents(item).filter(item => item.classList.contains('simple-dropdown'))
        let filtered_nav_item = getParents(item).filter(item => item.classList.contains('nav-item'))
        filtered_dropdown.forEach(item => item.classList.add("active"))
        filtered_nav_item.forEach(item => item.classList.add("active"))
      }
    })
  }, [location])

  useEffect(() => {
    document.body.classList.add("mobile-menu")
    const close = (e) => {
      if (e.keyCode === 27 && (document.body.classList.contains("menu-modern") || document.body.classList.contains("menu-full"))) {
        document.querySelector("#close-btn").click();
      }
    };

    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  useEffect(() => {
    const breakpoint = window.matchMedia("(max-width: 991px)");
    function breakpointCheck(x) {
      if (x.matches) {
        if (toggle === true) {
          document.body.style.overflow = "hidden"
          document.body.classList.add(`menu-${props.type}`);
        } else {
          document.body.style.removeProperty("overflow");
          document.body.classList.remove(`menu-${props.type}`);
        }
      } else {
        document.body.style.removeProperty("overflow");
        document.body.classList.remove(`menu-${props.type}`);
      }
    }

    breakpointCheck(breakpoint);
    breakpoint.addListener(breakpointCheck);
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [toggle])

  return (
    <div className={props.className ? ` ${props.className}` : ""}>
      <Navbar.Toggle id="toggle-bar" className="order-last md:px-[25px] sm:ml-0" onClick={() => setToggle(!toggle)}>
        <span className="navbar-toggler-line"></span>
        <span className="navbar-toggler-line"></span>
        <span className="navbar-toggler-line"></span>
        <span className="navbar-toggler-line"></span>
      </Navbar.Toggle>
      <Navbar.Collapse id="myCollapsible" className={`col-auto justify-center mobile-menu-${props.type}`}>
        <Navbar.Toggle id="close-btn" onClick={() => setToggle(!toggle)}>
          <span className="navbar-toggler-line bg-white"></span>
          <span className="navbar-toggler-line bg-white"></span>
          <span className="navbar-toggler-line bg-white"></span>
          <span className="navbar-toggler-line bg-white"></span>
        </Navbar.Toggle>
        <ReactCustomScrollbar className="pr-[15px]" theme="light" autoHide>
          <div className="absolute top-20">
            <ul className="navbar-nav">
              {props.data.map((item, i) => {
                return (
                  <li className={`nav-item c-c-red ${item.dropdown || item.megamenu ? ` dropdown` : ""}${isMenuActive === i ? " open" : ""}`} key={i}>
                    {
                      item.link ? (
                        <Link className="nav-link" to={item.link}>
                          {item.title}
                        </Link>
                      ) : (
                        <span className="nav-link  hover-header-item ">{item.title}</span>
                      )
                    }
                    <i className="fa c-c-red fa-angle-down" onClick={(e) => handleMenuClick(e, i)} />
                    {item.dropdown && (
                      <ul className="simple-dropdown-menu ">
                        {item.dropdown.map((item, i) => {
                          return (
                            <li key={i} className="simple-dropdown ">
                              {
                                item.link ? (
                                  <Link className="nav-link" to={item.link}>
                                    {item.title}
                                    {item.dropdown && (<i className="fas fa-angle-right "></i>)}
                                  </Link>
                                ) : (
                                  <span className="nav-link hover-header-item text-xxlg">
                                    {item.title}
                                    {item.dropdown && (<i className="fas fa-angle-right"></i>)}
                                  </span>
                                )
                              }
                              {item.dropdown && (
                                <ul className="simple-dropdown-menu">
                                  {item.dropdown.map((item, i) => {
                                    return (
                                      <li key={i} className="simple-dropdown">
                                        {
                                          item.link ? (
                                            <Link
                                              className={`nav-link${item.dropdown ? " md:text-black md:mt-[15px] md:mb-[7px]" : ""}`}
                                              to={item.link}
                                            >
                                              {item.title}
                                              {item.dropdown && (<i className="fas fa-angle-right"></i>)}
                                            </Link>
                                          ) : (
                                            <span className="nav-link">
                                              {item.title}
                                              {item.dropdown && (<i className="fas fa-angle-right"></i>)}
                                            </span>
                                          )
                                        }
                                        {item.dropdown && (
                                          <ul className="simple-dropdown-menu">
                                            {item.dropdown.map((item, i) => {
                                              return (
                                                <li
                                                  className="simple-dropdown"
                                                  key={i}
                                                >
                                                  <Link className="nav-link" to={item.link}>{item.title}</Link>
                                                </li>
                                              );
                                            })}
                                          </ul>
                                        )}
                                      </li>
                                    );
                                  })}
                                </ul>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                    {item.megamenu && (
                      <div className="megamenu" ref={megamenu_ref}>
                        <div className="flex">
                          {item.megamenu.map((item, i) => {
                            return (
                              <ul key={i} className={`${(item.dropdown.filter(item => item.img).length > 0) ? "img-wrapper" : "inline-block"}`}>
                                <li className="title text-md font-medium mb-[10px] whitespace-nowrap">
                                  {item.title}
                                </li>
                                {item.dropdown &&
                                  item.dropdown.map((item, i) => {
                                    return (
                                      <li className="nav-item" key={i}>
                                        <Link
                                          className="nav-link"
                                          to={item.link ? item.link : "#"}
                                        >
                                          {item.icon && (
                                            <i
                                              className={`${item.icon} mr-[10px]`}
                                            ></i>
                                          )}{" "}
                                          {item.title}
                                        </Link>
                                      </li>
                                    );
                                  })}
                              </ul>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </ReactCustomScrollbar>
      </Navbar.Collapse>
    </div>
  );
};
/* Mobile Menu Component End */

/* HamburgerMenu Component Start */
export const HamburgerMenu = memo((props) => {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useOnClickOutside(ref, (e) => setShow(false));

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setShow(false);
      }
    };

    if (show === true) {
      document.querySelector("body").classList.add("overflow-hidden");
      document.querySelector(".push-button").classList.remove("collapsed");
    } else {
      document.querySelector("body").classList.remove("overflow-hidden");
      document.querySelector(".push-button").classList.add("collapsed");
    }

    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [show]);

  return (
    <>
      {[false].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className={`header-push-button bg-transparent inline-block z-[999] ${props.theme}`}
        >
          <Navbar.Toggle className={`push-button`} onClick={() => setShow(true)}>
            <div className="nav-icon">
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
            </div>
          </Navbar.Toggle>
          <div className={`${show ? "block h-[100vh] left-0 overflow-hidden fixed top-0 w-full z-[999]" : ""}`}>
            <div
              ref={ref} className={`hamburger-menu-wrapper pos-${props.position}${show ? " show" : ""
                }${props.className ? ` ${props.className}` : ""}`}
            >
              {props.closeBtn && (
                <button aria-label="hamburger menu close button" className="close-btn" onClick={() => setShow(false)}>
                  <i className="fas fa-times"></i>
                </button>
              )}
              {show && props.children}
            </div>
          </div>
        </Navbar>
      ))}
    </>
  );
});
/* HamburgerMenu Component End */

/* Searchbar Component Start */
export const SearchBar = memo((props) => {
  const { setIsModalOpen } = useContext(GlobalContext);
  const ref = useRef(null);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const navigate = useNavigate();
  const language = useSelector(state => state.State.language)
  useOnClickOutside(ref, () => setSearchModalOpen(false));

  useEffect(
    () => {
      if (isSearchModalOpen === true) {
        setIsModalOpen(true);
      }

      if (isSearchModalOpen === false) {
        setIsModalOpen(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isSearchModalOpen]
  );

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setSearchModalOpen(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <div className={`header-search-iconbar inline-block align-middle px-[17px] ${language === "fa-IR" ? "pr-[12px] pl-[12px]" : "pr-[12px] pl-[12px]"} text-[17px] sm:pr-2 leading-none${props.className ? ` ${props.className}` : ""}`} style={props.style}>
      <Link to="#" aria-label="search" className="search-form-icon leading-[20px]" onClick={(e) => e.preventDefault()}>
        <div className="feather-search hover:text-red m-[8px] text-[15px]" onClick={() => setSearchModalOpen(true)}></div>
      </Link>

      {/* Search pop-up model Start */}
      <div
        className={`form-wrapper ${language === "en" && "dir-ltr"} ${isSearchModalOpen ? " show" : ""
          }`}
      >
        <button
          title="Close"
          type="button"
          className="search-close"
          onClick={() => setSearchModalOpen(false)}
        >

          ×{" "}
        </button>
        {
          isSearchModalOpen && (
            <Formik
              initialValues={{ search: "" }}
              validationSchema={Yup.object().shape({ search: Yup.string().required(language === "fa-IR" ? "کادر بالا نمیتواند خالی باشد" : language === "en" ? "this fild can not be empty" : "") })}
              onSubmit={async (values, actions) => {
                await new Promise((r) => setTimeout(r, 500));
                actions.resetForm();
                setSearchModalOpen(false);
                navigate(`../search-result/results`, { state: { search: values } });
              }}
            >
              <Form
                role="search"
                method="get"
                id="search-form"
                className="search-form text-start"
                ref={ref}
              >
                <div className="search-form-box">
                  <Input
                    showErrorMsg={true}
                    className="search-input-test text-darkgray relative border-b border-solid border-darkgray text-[12px] mt-6"
                    name="search"
                    type="text"
                    placeholder={language === "fa-IR" ? "کلمه مورد نظر را اینجا بنویسید..." : language === "en" ? "Write the desired word here..." : ""}
                  />
                  <button
                    type="submit"
                    className="search-button absolute top-1/2 right-0 mb-3"
                  >
                    <i
                      className="feather-search text-darkgray"
                      aria-hidden="true"
                    ></i>
                  </button>
                </div>
              </Form>
            </Formik>
          )
        }
      </div>
      {/* Search pop-up model End */}
    </div>
  );
});
/* Search-bar Component End */

/* HeaderLanguage Component Start */

export const HeaderLanguage = (props) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (lan) => {
    dispatch(changeLanguage(lan));
    localStorage.setItem("language", lan);
    window.location.reload();
  };

  return (
    <div
      className={`header-language dropdown inline-block align-middle px-[17px] text-[17px]${
        props.className ? ` ${props.className}` : ""
      }`}
      style={props.style}
    >
      <div className="flex items-center justify-center cursor-pointer">
        <span
          className="feather-globe px-0 inline-block py-0 pl-[20px] text-[15px] hover:text-red"
          onClick={() => setIsPopupOpen(true)}
        ></span>

        {/* AnimatePresence handles mounting/unmounting animations */}
        <AnimatePresence>
          {isPopupOpen && (
            <motion.div
              className="z-20 fixed top-0 left-0 right-0 bottom-0 w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,0.1)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsPopupOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: "rgba(0,0,0,0.65)",
                  borderRadius: "5px",
                  width: "200px",
                }}
                onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
              >
                <div className="flex flex-col items-center justify-center">
                  <ul className="p-[15px] rounded-[6px] m-0 min-w-[140px] z-50 flex flex-col items-center justify-center w-full">
                    <li className="pt-8 pb-3 hover:bg-[#ff0000] w-full flex items-center justify-center">
                      <Link
                        className="flex items-center justify-start"
                        aria-label="link"
                        onClick={() => handleChange("fa-IR")}
                        to="#"
                        title="فارسی"
                      >
                        <div className="icon-country block py-[2px] px-0 text-xs">
                          <img
                            src="/assets/img/country-flag-16X16/Iran.png"
                            alt="iran"
                            width="20"
                            height="20"
                          />
                        </div>
                        <div className="mr-2 text-white">فارسی</div>
                      </Link>
                    </li>
                    <li className="pb-8 pt-3 hover:bg-[#ff0000] w-full flex items-center justify-center">
                      <Link
                        className="flex items-center justify-start"
                        aria-label="link"
                        onClick={() => handleChange("en")}
                        to="#"
                        title="English"
                      >
                        <div className="icon-country block py-[2px] px-0 text-xs">
                          <img
                            src="/assets/img/country-flag-16X16/usa.png"
                            alt="usa"
                            width="20"
                            height="20"
                          />
                        </div>
                        <div className="mr-2 text-white">English</div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
/* HeaderLanguage Component End */

export const HeaderCart = (props) => {
  return (
    <div className={`header-language dropdown inline-block align-middle px-[17px] text-[17px]${props.className ? ` ${props.className}` : ""}`} style={props.style}>
      <Link to="/login" aria-label="account" target="-blank">
        <li className="feather-user block text-[17px] hover:text-red"></li>
      </Link>
    </div>
  );
};

/* Collapsible Menu Component Start */
export const CollapsibleMenu = (props) => {
  const collapsibleMenu = useRef(null)
  let location = useLocation()
  const language = useSelector(state => state.State.language)

  useEffect(() => {
    let mainSelector = collapsibleMenu.current,
      mainlink = mainSelector.querySelectorAll("a");

    function getPerentsElements(elem) {
      var parants = [];
      while (elem.parentNode && elem.parentNode.nodeName.toLowerCase() !== 'body') {
        elem = elem.parentNode;
        parants.push(elem);
      }
      return parants
    }

    mainlink.forEach(item => {
      let attr = item.getAttribute("href");
      item.closest(".menu-list-item") && item.closest(".menu-list-item").classList.remove("active")

      if (attr === location.pathname) {
        item.closest(".menu-list-item") && item.closest(".menu-list-item").classList.add("active")
        if (item.closest(".megamenu")) {
          item.closest(".menu-list-item") && item.closest(".menu-list-item").classList.add("active");
        }

        item.closest(".accordion") && item.closest(".accordion").querySelectorAll(".accordion-item").forEach(item => item.classList.remove("active"))
        let filter_dropdown = getPerentsElements(item).filter(item => item.classList.contains('accordion-item'))
        filter_dropdown.forEach(item => item.classList.add("active"))
      }
    })
  }, [location])

  return (
    <Accordion
      ref={collapsibleMenu}
      className={`collapsible-menu${props.theme ? ` ${props.theme}` : ""}${props.className ? ` ${props.className}` : ""
        }`}
    >
      {language === "fa-IR" ? <>
        {HeaderData &&
        HeaderData.map((item, i) => {
          return (
            <Accordion.Item key={i} eventKey={i}>
              <Accordion.Header>
                {
                  item.link ? (<Link aria-label="link" className="menu-link"
                    to={item.link} > {item.title} </Link>)
                    : (<span className="menu-link"> {item.title} </span>)
                }
                {(item.dropdown || item.megamenu) && (
                  <span className="icon"></span>
                )}
              </Accordion.Header>
              {(item.dropdown || item.megamenu) && (
                <Accordion.Body>
                  {item.dropdown && (
                    <div className="single-dropdown">
                      <Accordion>
                        {item.dropdown.map((item, i) => {
                          return (
                            <Accordion.Item key={i} eventKey={i}>
                              <Accordion.Header>
                                {
                                  item.link ? (<Link aria-label="link" className="menu-link"
                                    to={item.link} > {item.title} </Link>)
                                    : (<span className="menu-link"> {item.title} </span>)
                                }
                                {item.dropdown && (
                                  <span className="icon"></span>
                                )}
                              </Accordion.Header>
                              {item.dropdown && (
                                <Accordion.Body>
                                  <Accordion>
                                    {item.dropdown.map((item, i) => {
                                      return (
                                        <Accordion.Item key={i} eventKey={i}>
                                          <Accordion.Header>
                                            {
                                              item.link ? (<Link aria-label="link" className="menu-link"
                                                to={item.link} > {item.title} </Link>)
                                                : (<span className="menu-link"> {item.title} </span>)
                                            }
                                            {item.dropdown && (
                                              <span className="icon"></span>
                                            )}
                                          </Accordion.Header>
                                          {item.dropdown && (
                                            <Accordion.Body>
                                              <ul className="menu-list">
                                                {item.dropdown.map(
                                                  (item, i) => {
                                                    return (
                                                      <li
                                                        className="menu-list-item"
                                                        key={i}
                                                      >
                                                        {
                                                          item.link ? (<Link aria-label="link" className="menu-link"
                                                            to={item.link} > {item.title} </Link>)
                                                            : (<span className="menu-link"> {item.title} </span>)
                                                        }
                                                      </li>
                                                    );
                                                  }
                                                )}
                                              </ul>
                                            </Accordion.Body>
                                          )}
                                        </Accordion.Item>
                                      );
                                    })}
                                  </Accordion>
                                </Accordion.Body>
                              )}
                            </Accordion.Item>
                          );
                        })}
                      </Accordion>
                    </div>
                  )}
                  {item.megamenu && (
                    <div className="megamenu">
                      <Accordion>
                        {item.megamenu.map((item, i) => {
                          return (
                            <Accordion.Item key={i} eventKey={i} className={`${(item.dropdown.filter(item => item.img).length > 0) ? "img-wrapper" : ""}`}>
                              <Accordion.Header>
                                <span className="menu-link">{item.title}</span>
                                {item.dropdown && (
                                  <span className="icon"></span>
                                )}
                              </Accordion.Header>
                              {item.dropdown && (
                                <Accordion.Body>
                                  <ul className="menu-list">
                                    {item.dropdown.map((item, i) => {
                                      return (
                                        <li key={i} className="menu-list-item">
                                          <Link aria-label="link" className="menu-link"
                                            to={item.link}
                                          >
                                            {item.icon && (
                                              <i
                                                className={`${item.icon} mr-[10px]`}
                                              ></i>
                                            )}
                                            {item.title}
                                          </Link>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </Accordion.Body>
                              )}
                            </Accordion.Item>
                          );
                        })}
                      </Accordion>
                    </div>
                  )}
                </Accordion.Body>
              )}
            </Accordion.Item>
          );
        })}</> : language === "en" ? <>
        {HeaderDataEn &&
        HeaderDataEn.map((item, i) => {
          return (
            <Accordion.Item key={i} eventKey={i}>
              <Accordion.Header>
                {
                  item.link ? (<Link aria-label="link" className="menu-link"
                    to={item.link} > {item.title} </Link>)
                    : (<span className="menu-link"> {item.title} </span>)
                }
                {(item.dropdown || item.megamenu) && (
                  <span className="icon"></span>
                )}
              </Accordion.Header>
              {(item.dropdown || item.megamenu) && (
                <Accordion.Body>
                  {item.dropdown && (
                    <div className="single-dropdown">
                      <Accordion>
                        {item.dropdown.map((item, i) => {
                          return (
                            <Accordion.Item key={i} eventKey={i}>
                              <Accordion.Header>
                                {
                                  item.link ? (<Link aria-label="link" className="menu-link"
                                    to={item.link} > {item.title} </Link>)
                                    : (<span className="menu-link"> {item.title} </span>)
                                }
                                {item.dropdown && (
                                  <span className="icon"></span>
                                )}
                              </Accordion.Header>
                              {item.dropdown && (
                                <Accordion.Body>
                                  <Accordion>
                                    {item.dropdown.map((item, i) => {
                                      return (
                                        <Accordion.Item key={i} eventKey={i}>
                                          <Accordion.Header>
                                            {
                                              item.link ? (<Link aria-label="link" className="menu-link"
                                                to={item.link} > {item.title} </Link>)
                                                : (<span className="menu-link"> {item.title} </span>)
                                            }
                                            {item.dropdown && (
                                              <span className="icon"></span>
                                            )}
                                          </Accordion.Header>
                                          {item.dropdown && (
                                            <Accordion.Body>
                                              <ul className="menu-list">
                                                {item.dropdown.map(
                                                  (item, i) => {
                                                    return (
                                                      <li
                                                        className="menu-list-item"
                                                        key={i}
                                                      >
                                                        {
                                                          item.link ? (<Link aria-label="link" className="menu-link"
                                                            to={item.link} > {item.title} </Link>)
                                                            : (<span className="menu-link"> {item.title} </span>)
                                                        }
                                                      </li>
                                                    );
                                                  }
                                                )}
                                              </ul>
                                            </Accordion.Body>
                                          )}
                                        </Accordion.Item>
                                      );
                                    })}
                                  </Accordion>
                                </Accordion.Body>
                              )}
                            </Accordion.Item>
                          );
                        })}
                      </Accordion>
                    </div>
                  )}
                  {item.megamenu && (
                    <div className="megamenu">
                      <Accordion>
                        {item.megamenu.map((item, i) => {
                          return (
                            <Accordion.Item key={i} eventKey={i} className={`${(item.dropdown.filter(item => item.img).length > 0) ? "img-wrapper" : ""}`}>
                              <Accordion.Header>
                                <span className="menu-link">{item.title}</span>
                                {item.dropdown && (
                                  <span className="icon"></span>
                                )}
                              </Accordion.Header>
                              {item.dropdown && (
                                <Accordion.Body>
                                  <ul className="menu-list">
                                    {item.dropdown.map((item, i) => {
                                      return (
                                        <li key={i} className="menu-list-item">
                                          <Link aria-label="link" className="menu-link"
                                            to={item.link}
                                          >
                                            {item.icon && (
                                              <i
                                                className={`${item.icon} mr-[10px]`}
                                              ></i>
                                            )}
                                            {item.title}
                                          </Link>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </Accordion.Body>
                              )}
                            </Accordion.Item>
                          );
                        })}
                      </Accordion>
                    </div>
                  )}
                </Accordion.Body>
              )}
            </Accordion.Item>
          );
        })}
        </> : <></>}
    </Accordion>
  );
};
/* Collapsible Menu Component End */

Header.defaultProps = {
  topSpace: {
    desktop: false,
  },
};

Header.propTypes = {
  type: PropTypes.string,
  topSpace: PropTypes.object,
};

HeaderNav.defaultProps = {
  fluid: "lg",
  theme: "dark",
  menu: "light",
  expand: "md",
};

HeaderNav.propTypes = {
  fluid: PropTypes.string,
  theme: PropTypes.string,
  bg: PropTypes.string,
  className: PropTypes.string,
};

HamburgerMenu.defaultProps = {
  theme: "light",
  position: "right",
  closeBtn: true,
};

HamburgerMenu.propTypes = {
  theme: PropTypes.string,
  position: PropTypes.string,
  closeBtn: PropTypes.bool,
};

Menu.defaultProps = {
  data: HeaderData,
};

MobileMenu.defaultProps = {
  type: "full",
  data: HeaderData,
};

MobileMenu.propTypes = {
  type: PropTypes.string,
};

export default Header;
