import React, { memo } from 'react'
import { Col } from 'react-bootstrap';
import { m } from 'framer-motion'
import ImageGallery01 from './ImageGallery01'
import { Link } from 'react-router-dom';

const ImageGallery = (props) => {

    const BgColor = (props.overlay && typeof (props.overlay) === "object") ? `linear-gradient(to top right, ${props.overlay.map((item, i) => item)})` : props.overlay
    return (<>
            <Col>
                <ul className={`${props.theme} ${props.className ? `${props.className}` : ""}grid-container  ${props.grid ? `${props.grid}` : ""}`}>
                    {/* <li className="grid-sizer"></li> */}
                    {
                        props.data.map((item, i) => {
                            return (
                                <m.li key={i} {...{ ...props.animation, transition: { delay: i * props.animationDelay } }} className={`flex justify-center items-center grid-item${item.double_col ? " grid-item-double" : ""}`} >
                                    <div className="image-box w-[260px] h-[210px] rounded-[5px] box-shadow" style={{ background: props.theme === "image-gallery-03" ? (props.overlay[i] && props.overlay[i]) : BgColor }}>
                                        <Link to={`/certificate/${props.url}/${item.id}`}>
                                            <ImageGallery01 data={item} />
                                        </Link>
                                    </div>
                                </m.li>
                            )
                        })
                    }
                </ul>
            </Col></>)}

export default memo(ImageGallery)