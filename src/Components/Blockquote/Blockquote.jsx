import React, { memo } from 'react'

// Libraries
import { m } from "framer-motion";

// css
import "../../Assets/scss/components/_blockquote.scss"

const Blockquote = (props) => {
    return (
        <m.blockquote className={` ${props.theme}${props.className ? ` ${props.className}` : ""}`} {...props.animation}>
            <div className='fornt-IranSans'>
            {props.icon && <i className={props.icon}></i>}
            {props.title && <p className='text-justify'>{props.title}</p>}
            {props.author && <p className="text-basecolor">{props.author}</p>}
            </div>
        </m.blockquote>
    )
}


export default memo(Blockquote)