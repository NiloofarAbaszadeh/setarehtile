import React, { memo } from 'react'

// Libraries
import { m } from "framer-motion"
// css
import "../../Assets/scss/components/_socialicons.scss"

const SocialIcons = (props) => {
    return (
        <ul className={`social-icon flex-wrap gap-y-5 p-0 ${props.theme} ${props.size} ${props.iconColor} ${props.className} `}>
            {
                props.data.map((item, i) => {
                    return (
                        props.theme === "social-icon-style-20" ? (
                            <m.li key={i} className='rounded-[50%] border-[1px] border-[#ffffff00] hover:border-lightgray transition duration-200' {...{ ...props.animation, transition: { delay: i * props.animationDelay } }} >
                                <a href={item.link} aria-label="social icon" target="_blank" rel="noreferrer">
                                    {/* {item.name && <span className='flex brand-label'>{item.name ? item.name : "icon"}</span>} */}
                                    {item.icon && <i className={`${item.icon} text-white brand-icon flex justify-center items-center pt-2 text-[16px]`}></i>}
                                    <span></span>
                                </a>
                            </m.li>
                            
                        ) : props.theme !== "social-icon-style-11" ? (
                            <m.li key={i} style={{ "--social-icon-color": item.color ? item.color : "#000" }} {...{ ...props.animation, transition: { delay: i * props.animationDelay } }} >
                                <a href={item.link} aria-label="social icon" target="_blank" rel="noreferrer">
                                    {item.name && <span className='flex brand-label'>{item.name ? item.name : "icon"}</span>}
                                    {item.icon && <i className={`${item.icon} text-slateblue brand-icon mt-3 ml-[1px]`}></i>}
                                    <span></span>
                                </a>
                            </m.li>
                        ) : (
                            <m.li key={i} style={{ "--social-icon-color": item.color ? item.color : "#000" }} {...{ ...props.animation, transition: { delay: i * props.animationDelay } }} >
                                <a href={item.link} aria-label="social icon" target="_blank" rel="noreferrer">
                                    {item.socialback && <div className='social-back'><span>{item.socialback}</span></div>}
                                    <div className={`${item.position} social-front grid`}>
                                        {item.icon && <i className={`${item.icon} text-slateblue `}></i>}
                                        {item.name && <span>{item.name ? item.name : "icon"}</span>}
                                    </div>
                                </a>
                            </m.li>
                        )
                    )
                })
            }
        </ul>
    )
}

export default memo(SocialIcons)