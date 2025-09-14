import { memo } from 'react'
import { Col } from 'react-bootstrap';
import { m } from 'framer-motion'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ImageGallerySurvay = (props) => {
    const host = useSelector(state => state.State.host)
    
    return (<>
            <Col>
                <ul className={`${props.theme} ${props.className ? `${props.className}` : ""}grid-container  ${props.grid ? `${props.grid}` : ""}`}>
                    {
                        props.data.map((item, i) => {
                            return (
                                <m.li key={i} {...{ ...props.animation, transition: { delay: i * props.animationDelay } }} className={`flex justify-center items-center grid-item${item.double_col ? " grid-item-double" : ""}`} >
                                    <Link to={item.attributes.link} >
                                        <div className="image-box w-[260px] h-[210px] rounded-[5px] box-shadow">
                                            <img className="w-full h-full" src={host + item.attributes.image.data.attributes.url} alt="grid" />
                                            <div className="absolute w-full h-full left-0 top-0 flex items-center justify-center py-[50px] bg-[#000000aa] flex-col">
                                                {/* <div className="feather-zoom-in  text-[28px] font-light	text-white"></div> */}
                                                <p className='text-white text-[20px]' >{item.attributes.title}</p>
                                                <p className='text-white text-[20px]' >{item.attributes.subTitle}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </m.li>
                            )
                        })
                    }
                </ul>
            </Col></>)}

export default memo(ImageGallerySurvay)