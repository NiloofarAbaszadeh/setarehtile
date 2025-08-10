import React, { memo } from 'react'
import { useSelector } from 'react-redux';

// Libraries
import { Col, Row } from 'react-bootstrap'
import { Link } from "react-router-dom"
import { m } from 'framer-motion'

// css
import "../../Assets/scss/components/_fancytextbox.scss"

const FancyTextBox = (props) => {
    const host = useSelector(state => state.State.host)
    const language = useSelector(state => state.State.language)
    return (
        <Row className={`${props.theme}${props.grid ? ` ${props.grid}` : ""}`}>
            {
                props.data.map((item) => {
                    return (
                        <m.div className={`col${props.themeColor ? ` ${props.themeColor}` : ""}${props.className ? ` ${props.className}` : ""}`} key={item.id} {...{ ...props.animation, transition: { delay: item.id * props.animationDelay } }}>
                            <Col className="fancy-box-item divide-x divide-[#ffffff33] lg:divide-y z-[3]">
                                <div className="bg-banner-image bg-cover overflow-hidden bg-center relative z-0" style={{ backgroundImage: `url(${host}${item.attributes.GroupImage.data.attributes.url})` }}>
                                    <div className="opacity-very-light opacity-30 absolute top-0 left-0 w-full h-full "></div>
                                </div>
                                <div className="fancy-text-box relative overflow-hidden h-[800px] xl:h-[500px] xs:h-[250px] z-[3]">
                                    <div className="fancy-text-content pr-[4rem] pt-[1.5rem] pb-[1.5rem] xl:px-[2rem] xs:pb-[25px] xl:py-[1.5rem] lg:p-8 bg-red sm:p-5"> 
                                        <h3 className="heading-6 font-semibold text-[#fff] uppercase w-[85%] xl:w-full lg:w-3/5 md:w-[80%] mb-6 sm:mb-8">{item.attributes.name}</h3>
                                        <div className="fancy-text-box-bottom justify-center">
                                            <div className="flex">
                                                <p className="m-0 self-center w-[75%] text-[#fff] opacity-60 line-clamp-2 ">{item.attributes.discraption}</p>
                                                <span className="self-center text-center ml-auto mr-[20px]">
                                                    <Link aria-label="link" to={`./product-groups/${item.attributes.name}`} className="inline-flex justify-center items-center leading-10 rounded-full bg-white h-[40px] w-[40px]">
                                                        <i className={`feather-arrow-${language === "fa-IR" ? "left" : language === "en" ? "right" : <></>} text-[#000]`}></i></Link>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="feature-box-overlay bg-red transition-default"></div>
                                    </div>
                                </div>
                            </Col>
                        </m.div>
                    )
                })}
        </Row>
    )
}

export default memo(FancyTextBox)