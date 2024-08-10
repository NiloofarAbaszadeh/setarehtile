import React, { useState, useEffect, useRef, memo } from 'react'

import { Link } from "react-router-dom";
import { m } from "framer-motion";

// Components
import Filter from "../Portfolio/Filter";

const ShopWide = (props) => {
    const shopWrapper = useRef();
    const [loading, setLoading] = useState(true);
    const [pageLoading, setPageLoading] = useState(false)
    // page number
    const itemsPerPage = 18
    const [maxPageNumber, setMaxPageNumber] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [endOffset, setEndOffset] = useState(itemsPerPage);
    // eslint-disable-next-line
    const [currentItems, setCurrentItems] = useState();
    // current page number
    const [pageCount, setPageCount] = useState(1);
    const [pageCounter, setPageCounter] = useState([])

    const InitialPageNumber = (max) => {
        // eslint-disable-next-line
      for (var i = 0; i < max; i++) {
        // eslint-disable-next-line
        setPageCounter(per => [...per , i])
      }
    }

    useEffect(() => {
        import("../../Functions/Utilities").then(module => {
            const grid = module.initializeIsotop(shopWrapper.current)
            grid.on('arrangeComplete', () => setLoading(false));
        })
        if (!pageLoading) {
            setCurrentItems(props.data.slice().reverse())
            const maxPage = props.data.length / itemsPerPage
            setMaxPageNumber(maxPage.toFixed(0))
            InitialPageNumber(maxPage.toFixed(0))
        } else {
            setCurrentItems(props.data.slice().reverse())
        }
        setPageLoading(true)
        // eslint-disable-next-line
    }, [props.data, pageCount])

    const handleFilterChange = () => {
        shopWrapper.current.querySelectorAll("li").forEach(item => item.childNodes[0]?.classList.add("appear"))
    }

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
        <>
            <div className="grid-wrapper">
                {/* Filter Start */}
                <Filter title={props.title} filterData={props.filterData} onFilterChange={handleFilterChange} />
                {/* Filter End */}
                <div className="border-t border-fastblue pb-12 mb-12 pt-6 mt-6 relative">
                <ul ref={shopWrapper} className={`grid-container${props.grid ? ` ${props.grid}` : ""}${loading ? " loading" : ""}${props.className ? ` ${props.className}` : ""}${props.filter === false ? "" : " mt-18 md:mt-[4.5rem] sm:mt-8"}`}>
                    
                    <li className="grid-sizer"></li>
                    {   
                    //  eslint-disable-next-line
                        pageLoading && props.data.slice(itemOffset, endOffset).map((item, i) => {
                            if (item !== null)
                            return (
                                <>{item !== null && <li className={`grid-item ${item.double_col ? " grid-item-double" : ""} cloth `} key={item.id}>
                                    <m.div
                                        key={i}
                                        initial={{ opacity: 0 }}
                                        whileInView={!loading && { opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.6, ease: "easeOut" }}
                                        className="product-box rounded-[5px] border-redius-bottom bg-white relative overflow-hidden w-full mb-[45px] xs:mb-0">
                                        <div className="product-image relative overflow-hidden border-redius-top">
                                            {(props.type === "collections") && <Link aria-label="link" to={`./${item.name}`}>
                                                <div className='pt-3'>
                                                    {item.profileImage && <img className="default-image rounded-[5px] w-[600px] h-[200px]" src={`${item.profileImage}`} alt="" />}
                                                    {item.profileImage && <img height={765} className="hover-img rounded-[5px] w-[600px] h-[200px]" src={`${item.profileImage}`} alt="" />}
                                                </div>
                                            
                                            {item.badge &&
                                                item.badge.map((item) => {
                                                    return item.title && <span key={item.id} style={{ backgroundColor: item.color }} className="absolute top-[25px] left-[25px] text-[10px] font-semibold text-[#fff] leading-[11px] font-sans text-center uppercase block py-[5px] px-[8px] rounded-sm">{item.title}</span>
                                                })
                                            }
                                            <div className="product-overlay absolute top-0 left-0 w-full h-full"></div>
                                            <div className="product-hover-bottom absolute bottom-0 w-full left-0 transition-default py-[35px] text-center">
                                                {/* <OverlayTrigger overlay={(props) => (<Tooltip className="text-xxs font-serif" {...props}>ADD TO CART</Tooltip>)} placement="top"><Link aria-label="shopwide" to="#" rel="noreferrer" className="product-link-icon move-top-bottom relative rounded-full bg-[#fff] text-darkgray inline-block text-center transition-default m-[5px] h-[40px] w-[40px] leading-[42px]">
                                                    <i className="feather-shopping-cart m-0 text-base "></i>
                                                </Link></OverlayTrigger>
                                                <OverlayTrigger overlay={(props) => (<Tooltip {...props}>QUICK SHOP</Tooltip>)} placement="top"><Link aria-label="shopwide" to="#" rel="noreferrer" className="product-link-icon move-top-bottom relative rounded-full bg-[#fff] text-darkgray inline-block text-center transition-default m-[5px] h-[40px] w-[40px] leading-[42px]">
                                                    <i className="feather-zoom-in m-0 text-base"></i>
                                                </Link></OverlayTrigger>
                                                <OverlayTrigger overlay={(props) => (<Tooltip {...props}>ADD TO WISHLIST</Tooltip>)} placement="top"><Link aria-label="shopwide" to="#" rel="noreferrer" className="product-link-icon move-top-bottom relative rounded-full bg-[#fff] text-darkgray inline-block text-center transition-default m-[5px] h-[40px] w-[40px] leading-[42px]">
                                                    <i className="feather-heart m-0 text-base"></i>
                                                </Link></OverlayTrigger> */}
                                            </div>
                                            <div className="product-footer text-center p-[15px] xs:p-[8px]">
                                            <Link aria-label="link" to={`./${item.name}`} className="text-black text-xlg hover:text-black font-medium inline-block">{item.name}</Link>
                                            {
                                                (item.price || item.oldPrice) && <div className="product-price text-md">
                                                    {item.oldPrice && <span className="line-through mr-2">{item.oldPrice}</span>}
                                                    {item.price && <span>{item.price}</span>}
                                                </div>
                                            }
                                        </div>
                                            </Link>}
                                            {(props.type === "groups") && <Link aria-label="link" to={`./${item.name}`}>
                                                <div className='c-bg-lightgray'>
                                                    {item.profileImage && <img className="default-image w-[600px] h-[200px]" src={`${item.profileImage}`} alt="" />}
                                                    {item.profileImage && <img height={765} className="hover-img w-[600px] h-[200px]" src={`${item.profileImage}`} alt="" />}
                                                </div>
                                            
                                            {item.badge &&
                                                item.badge.map((item) => {
                                                    return item.title && <span key={item.id} style={{ backgroundColor: item.color }} className="absolute top-[25px] left-[25px] text-[10px] font-semibold text-[#fff] leading-[11px] font-sans text-center uppercase block py-[5px] px-[8px] rounded-sm">{item.title}</span>
                                                })
                                            }
                                            <div className="product-overlay absolute top-0 left-0 w-full h-full"></div>
                                            <div className="product-hover-bottom absolute bottom-0 w-full left-0 transition-default py-[35px] text-center">
                                                {/* <OverlayTrigger overlay={(props) => (<Tooltip className="text-xxs font-serif" {...props}>ADD TO CART</Tooltip>)} placement="top"><Link aria-label="shopwide" to="#" rel="noreferrer" className="product-link-icon move-top-bottom relative rounded-full bg-[#fff] text-darkgray inline-block text-center transition-default m-[5px] h-[40px] w-[40px] leading-[42px]">
                                                    <i className="feather-shopping-cart m-0 text-base "></i>
                                                </Link></OverlayTrigger>
                                                <OverlayTrigger overlay={(props) => (<Tooltip {...props}>QUICK SHOP</Tooltip>)} placement="top"><Link aria-label="shopwide" to="#" rel="noreferrer" className="product-link-icon move-top-bottom relative rounded-full bg-[#fff] text-darkgray inline-block text-center transition-default m-[5px] h-[40px] w-[40px] leading-[42px]">
                                                    <i className="feather-zoom-in m-0 text-base"></i>
                                                </Link></OverlayTrigger>
                                                <OverlayTrigger overlay={(props) => (<Tooltip {...props}>ADD TO WISHLIST</Tooltip>)} placement="top"><Link aria-label="shopwide" to="#" rel="noreferrer" className="product-link-icon move-top-bottom relative rounded-full bg-[#fff] text-darkgray inline-block text-center transition-default m-[5px] h-[40px] w-[40px] leading-[42px]">
                                                    <i className="feather-heart m-0 text-base"></i>
                                                </Link></OverlayTrigger> */}
                                            </div>
                                            <div className="product-footer text-center p-[15px] xs:p-[8px]">
                                            <Link aria-label="link" to={`./${item.name}`} className="text-black text-xlg hover:text-black font-medium inline-block">{item.name}</Link>
                                            {
                                                (item.price || item.oldPrice) && <div className="product-price text-md">
                                                    {item.oldPrice && <span className="line-through mr-2">{item.oldPrice}</span>}
                                                    {item.price && <span>{item.price}</span>}
                                                </div>
                                            }
                                        </div>
                                            </Link>}
                                            {(props.type === "tiles") && <Link aria-label="link" to={`./${item.name}`}>
                                                <div className=''>
                                                    {item.profileImage && <img className="default-image w-[600px] h-[200px]" src={`${item.profileImage}`} alt="" />}
                                                    {item.profileImage && <img height={765} className="hover-img w-[600px] h-[200px]" src={`${item.profileImage}`} alt="" />}
                                                </div>
                                            
                                            {item.badge &&
                                                item.badge.map((item) => {
                                                    return item.title && <span key={item.id} style={{ backgroundColor: item.color }} className="absolute top-[25px] left-[25px] text-[10px] font-semibold text-[#fff] leading-[11px] font-sans text-center uppercase block py-[5px] px-[8px] rounded-sm">{item.title}</span>
                                                })
                                            }
                                            <div className="product-overlay absolute top-0 left-0 w-full h-full"></div>
                                            <div className="product-hover-bottom absolute bottom-0 w-full left-0 transition-default py-[35px] text-center">
                                                {/* <OverlayTrigger overlay={(props) => (<Tooltip className="text-xxs font-serif" {...props}>ADD TO CART</Tooltip>)} placement="top"><Link aria-label="shopwide" to="#" rel="noreferrer" className="product-link-icon move-top-bottom relative rounded-full bg-[#fff] text-darkgray inline-block text-center transition-default m-[5px] h-[40px] w-[40px] leading-[42px]">
                                                    <i className="feather-shopping-cart m-0 text-base "></i>
                                                </Link></OverlayTrigger>
                                                <OverlayTrigger overlay={(props) => (<Tooltip {...props}>QUICK SHOP</Tooltip>)} placement="top"><Link aria-label="shopwide" to="#" rel="noreferrer" className="product-link-icon move-top-bottom relative rounded-full bg-[#fff] text-darkgray inline-block text-center transition-default m-[5px] h-[40px] w-[40px] leading-[42px]">
                                                    <i className="feather-zoom-in m-0 text-base"></i>
                                                </Link></OverlayTrigger>
                                                <OverlayTrigger overlay={(props) => (<Tooltip {...props}>ADD TO WISHLIST</Tooltip>)} placement="top"><Link aria-label="shopwide" to="#" rel="noreferrer" className="product-link-icon move-top-bottom relative rounded-full bg-[#fff] text-darkgray inline-block text-center transition-default m-[5px] h-[40px] w-[40px] leading-[42px]">
                                                    <i className="feather-heart m-0 text-base"></i>
                                                </Link></OverlayTrigger> */}
                                            </div>
                                            <div className="product-footer text-center p-[15px] xs:p-[8px]">
                                            <Link aria-label="link" to={`./${item.name}`} className="text-black text-xlg hover:text-black font-medium inline-block">{item.name}</Link>
                                            {
                                                (item.price || item.oldPrice) && <div className="product-price text-md">
                                                    {item.oldPrice && <span className="line-through mr-2">{item.oldPrice}</span>}
                                                    {item.price && <span>{item.price}</span>}
                                                </div>
                                            }
                                        </div>
                                            </Link>}
                                        </div>
                                        {/* <div className="product-footer text-center p-[15px] xs:p-[8px]">
                                            <Link aria-label="link" to={`./${item.id}`} className="text-black text-xlg hover:text-black font-medium inline-block">{item.name}</Link>
                                            {
                                                (item.price || item.oldPrice) && <div className="product-price text-md">
                                                    {item.oldPrice && <span className="line-through mr-2">{item.oldPrice}</span>}
                                                    {item.price && <span>{item.price}</span>}
                                                </div>
                                            }
                                        </div> */}
                                    </m.div>
                                </li>}</>
                            )
                        })}
                </ul>
                    
                </div>
                
            </div>
            <div>
                    {pageLoading && (
                      <div className="flex justify-center mt-[7.5rem] md:mt-20">
                        <ul className="pagination pagination-style-01 font-sans font-medium items-center">
                          <li className="page-item">
                              <button className="feather-arrow-right text-lg page-link" onClick={handelPageChange} value={"per"}></button>
                          </li>
                          {pageCounter.map((item, id) => {
                            return <li key={id} className="page-item" onClick={handelPageChange}>
                            <button className="page-link" value={id + 1}> {id + 1} </button>
                          </li>
                          })}
                          <li className="page-item">
                              <button className="feather-arrow-left text-lg page-link" onClick={handelPageChange} value={"next"}></button>
                          </li>
                        </ul>
                      </div>
                    )}
                </div>
        </>
    )
}

export default memo(ShopWide)

