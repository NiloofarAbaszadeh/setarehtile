import React, { memo } from 'react'

// Component
import { Col, Row } from 'react-bootstrap'
// import Buttons from '../Button/Buttons'
import { m } from "framer-motion"

// css
import "../../Assets/scss/components/_rotatebox.scss"
import { useSelector } from 'react-redux';

const RotateBox = (props) => {
    
  const host = useSelector(state => state.State.host)
    return (
        <>
            <Row className={`${props.grid}${props.className ? ` ${props.className}` : ""}`}>
                {
                    props.data.map((item, i) => {
                        return (
                            <Col key={i}>
                                <m.div
                                    className="rm-rotate-box text-center"
                                    initial={{ opacity: 0, transform: "perspective(400px) rotateY(90deg)" }}
                                    whileInView={{ opacity: 1, transform: "perspective(400px) rotateY(0deg)" }}
                                    viewport={{ once: true }}
                                    transition={{ type: "spring", stiffness: 100, duration: 1 }}
                                >
                                    <div className="flipper to-left">
                                        <div className="thumb-wrap">
                                            <div className="card-side front overflow-hidden box-shadow rounded-[4px] h-[490px] lg:h-[450px]" style={{ backgroundImage: `url(${host}${item.valueImg.data.attributes.formats.custom.url})` }}>
                                                <div className="absolute top-0 left-0 w-full h-full opacity-70 overlay-rotatebox"></div>
                                                <div className="content-wrap px-[15px]">
                                                    <span className="text-white text-[18px] uppercase inline-block font-medium mb-[10px]">{item.valueName}</span>
                                                    <span className="text-white opacity-70 text-[14px] uppercase  block">{item.valueSubName}</span>
                                                </div>
                                            </div>
                                            <div className="card-side back rounded-[4px] overflow-hidden">
                                                <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-r from-[#DC143C] via-[#8B0000] to-[#800000] "></div>
                                                <div className="content-wrap p-[60px] lg:px-[30px] md:px-[40px] xs:p-[30px]">
                                                    <i className={`${item.icon} text-[50px] text-white mb-[35px] inline-block`}></i>
                                                    <span className="text-white text-[18px] font-medium uppercase block mb-[10px]">{item.valueName}</span>
                                                    <p className="text-white opacity-70 mb-[25px]">{item.valueDiscraption}</p>
                                                    {/* <Buttons ariaLabel="pricing table" href={item.btnLink} className="font-medium text-darkgray hover:text-darkgray font-serif after:bg-black uppercase btn-link after:h-[1px] md:text-md" color="#232323" size="xl" title={item.btnTitle} /> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </m.div>
                            </Col>
                        )
                    })
                }
            </Row>
        </>
    )
}


export default memo(RotateBox)
