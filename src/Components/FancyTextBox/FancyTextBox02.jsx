import React, { memo } from 'react'

// Libraries
import { Row } from 'react-bootstrap'
// import { Link } from "react-router-dom"
import { PropTypes } from "prop-types";
import { m } from 'framer-motion'

// Components
// import { addZeroBeforeNumber } from "../../Functions/Utilities";

// Data
import { fancyTextBox01 } from './FancyTextBoxData'

// css
import "../../Assets/scss/components/_fancytextbox.scss"

const FancyTextBoxSwitch = (item) => {
    
            return (
                <div className="text-box-content">
                    <div className="text-box-wrapper h-[180px]">
                        {item.icon.class && <i className={item.icon.class}></i>}
                        {item.title && <span className='font-IranSans text-xlg text-black'>{item.title}</span>}
                        {(item.link || item.linkTitle) && <a aria-label="fancytextbox" href={item.link}><u>{item.linkTitle}</u></a>}
                        {item.description && <p>{item.description}</p>}
                    </div>
                </div>
            )
}

const FancyTextBox02 = (props) => {
    return (
        <Row className={`${props.theme}${props.grid ? ` ${props.grid}` : ""}`}>
            {
                props.data.map((item, i) => {
                    return (
                        <m.div className={`col${props.themeColor ? ` ${props.themeColor}` : ""}${props.className ? ` ${props.className}` : ""}`} key={i} {...{ ...props.animation, transition: { delay: i * props.animationDelay } }}>
                            {FancyTextBoxSwitch(item)}
                        </m.div>
                    )
                })}
        </Row>
    )
}

FancyTextBox02.defaultProps = {
    data: fancyTextBox01,
    theme: "fancy-text-box-01",
    animationDelay: 0.2,
}

FancyTextBox02.propTypes = {
    className: PropTypes.string,
    data: PropTypes.arrayOf(
        PropTypes.exact({
            icon: PropTypes.object,
            title: PropTypes.string,
            description: PropTypes.string,
            linkTitle: PropTypes.string,
            link: PropTypes.string,
            subTitle: PropTypes.string,
            backgroundText: PropTypes.string,
            hoverImg: PropTypes.string,
        })
    ),
    animation: PropTypes.object,
    animationDelay: PropTypes.number,
    theme: PropTypes.string,
    themeColor: PropTypes.string,
    grid: PropTypes.string,
}
export default memo(FancyTextBox02)