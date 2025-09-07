import React, { useState, memo } from 'react'
import { Col } from 'react-bootstrap';
import Lightbox from 'react-18-image-lightbox'
import { m } from 'framer-motion'
import ImageGallery01 from './ImageGallery01'

const ImageGallery = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0)
    const BgColor = (props.overlay && typeof (props.overlay) === "object") ? `linear-gradient(to top right, ${props.overlay.map((item, i) => item)})` : props.overlay
    
    const handleClick = (i) => {
        setIsOpen(true)
        setPhotoIndex(i)}
    
    return (<> {(isOpen) && (
                <Lightbox
                imageCaption={<p className='text-xxlg mb-8'>{props.data[photoIndex].title}</p>}
                mainSrc={props.data[photoIndex].src}
                onCloseRequest={() => setIsOpen(false)}
                nextSrc={props.data[(photoIndex + 1) % props.data.length].src}
                prevSrc={props.data[(photoIndex + props.data.length - 1) % props.data.length].src}
                onMovePrevRequest={() => setPhotoIndex((photoIndex + props.data.length - 1) % props.data.length)}
                onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % props.data.length)}
            />)}
            <Col>
                <ul className={`${props.theme} ${props.className ? `${props.className}` : ""}grid-container  ${props.grid ? `${props.grid}` : ""}`}>
                    {/* <li className="grid-sizer"></li> */}
                    {
                        props.data.map((item, i) => {
                            return (
                                <m.li key={i} {...{ ...props.animation, transition: { delay: i * props.animationDelay } }} className={`flex justify-center items-center grid-item${item.double_col ? " grid-item-double" : ""}`} >
                                    <div className="image-box w-[260px] h-[210px] rounded-[5px] box-shadow" style={{ background: props.theme === "image-gallery-03" ? (props.overlay[i] && props.overlay[i]) : BgColor }} onClick={() => handleClick(i)}>
                                    <ImageGallery01 data={item} />
                                    </div>
                                </m.li>
                            )
                        })
                    }
                </ul>
            </Col></>)}

export default memo(ImageGallery)