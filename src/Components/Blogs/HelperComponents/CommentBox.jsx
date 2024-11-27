import React from 'react'
import { Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { m } from 'framer-motion'
import { fadeIn } from '../../../Functions/GlobalAnimations'
import moment from 'jalali-moment'
import userIcon from "../../../Assets/images/user-icon.png"
import { useSelector } from 'react-redux'

const CommentBox = (props) => {
    const language = useSelector(state => state.State.language)
    
    const Comments = () => {
        const elements = props.data.map(item => {
            const date = item.attributes.createdAt.split("T")
            const time = date[1].split(".")
            return (
                <li className="mt-[20px]">
                    <div className="flex w-full md:items-start sm:block">
                    <div className="w-[75px] sm:w-[50px] sm:mb-[10px] ml-4">   
                          <img src={userIcon} width="" height="" className="rounded-full w-[95%] sm:w-full" alt="آیکون آدمک" />
                    </div>
                        <div className="w-full pl-[25px] sm:pl-0 box-shadow rounded-[10px] bg-white p-4">
                            <Link aria-label="link" to="#" className="text-darkgray font-medium text-[18px] hover:text-fastblue">{item.attributes.name}</Link>
                            <div className="text-md text-spanishgray mb-[15px"> 
                                <span className='mr-2 text-red'>  
                                    {moment(date[0], 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD')} 
                                </span> 
                                <span className='text-red'>  
                                     {moment.utc(`T${time[0]}.00-03:30`, "THH:mm:ss.SSZ").format("HH:mm:ss")} 
                                </span> 
                                 
                            </div>
                            
                            <p className="w-[95%] mt-2 text-[14px] opacity-[80%]">{item.attributes.comment}</p>
                        </div>
                    </div>
                </li>
            )
        })
        return elements
    }

    return (
        <>
            <m.section {...fadeIn} className="py-[20px] overflow-hidden lg:py-[10px] md:pt-[25px] sm:py-[10px]">
                <Container>
                    <Row className="justify-center">
                        <Col md={6} className="text-center mb-4">
                            <h6 className="text-darkgray text-[28px] font-medium">{language === "fa-IR" ? "کامنت ها" : language === "en" ? "Comments" : ""}</h6>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={9} className="mx-auto">
                            <ul className="blog-comment">
                                <li>
                                    <ul className="child-comment ml-[14px]">
                                        {Comments()}
                                    </ul>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </m.section>
            
        </>
    )
}

export default CommentBox