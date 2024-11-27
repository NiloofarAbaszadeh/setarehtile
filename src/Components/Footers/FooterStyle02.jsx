import React, { memo, useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import SocialIcons from '../SocialIcon/SocialIcons'
import FooterMenu, { Footer } from './Footer';
import FooterData, { FooterDataEn } from './FooterData';
import '../../Assets/css/custom-color.css';
import WhiteLogo from "../../Assets/images/logo-white.png"

const iconData = [
    {
        color: "#828282",
        link: "https://www.instagram.com/setarehtile/?hl=en",
        icon: "fab fa-instagram"
    },
    {
        color: "#007bb6",
        link: "https://www.linkedin.com/in/setarehtile/?originalSubdomain=ir",
        icon: "fab fa-linkedin-in"
      },
] 
const FooterStyle02 = (props) => {
    const token = useSelector(state => state.State.readToken)
    const host = useSelector(state => state.State.host)
    const language = useSelector(state => state.State.language)
    const [latestNewsData, setLatestNewsData] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(false)
        const LoadData = async () => {
            await axios.get(`${host}/api/news-elements?populate=deep&sort[0]=id:desc&pagination[page]=1&pagination[pageSize]=2&locale=${language}`, {
                headers: { Authorization: `Bearer ${token}` }
              })
              .then(res => {
                setLatestNewsData(res.data.data)
            })
              setLoading(true)}
        LoadData()
    },[host, token, language])
    return ( <>
        {loading && 
            <Footer theme="dark" className={`text-slateblue bg-[#262b35] w-full`}>
            <div className="py-[4%] lg:py-[4%] md:pb-0 xs:py-[4%]">
                <Container>
                    <Row className="md:text-start justify-start">
                        <Col lg={{ span: 3, order: 0 }} md={5} sm={{ span: 6, order: 1 }} className="md:mb-[50px] xs:mb-[25px]">
                            <Link aria-label="link" to="/" className="mb-[20px] block">
                                <img className='w-[85px]' alt="logo" src={WhiteLogo} width="220" height="120" />
                            </Link>
                            {language === "fa-IR" ? <>
                                <p className="w-[80%] mb-[20px] xs:w-full text-[14px]">شرکت کاشی و سرامیک ستاره میبد در خرداد 1383 در شهر تاریخی و زیبای میبد تاسیس گردید .</p>
                                <p className="w-[80%] mb-[8px] xs:w-full text-[14px]">شماره تماس کارخانه :<br/> 3151 - 07 - 03532372082 </p>
                            </> : language === "en" ? <>
                                <p className="w-[80%] mb-[20px] xs:w-full text-[14px]">Setareh Meybod Tile and Ceramic Company was established in June 2004 in the historic and beautiful city of Meybod .</p>
                                <p className="w-[80%] mb-[8px] xs:w-full text-[14px]">Company phone number :<br/> 3151 - 07 - 03532372082 </p>
                            </> : <></>}
                            <SocialIcons theme="social-icon-style-01" className="justify-start" size="xs" iconColor={props.theme === "dark" ? "light" : "dark"} data={iconData} />
                        </Col>
                        {language === "fa-IR" ? <FooterMenu className="xl:px-[15px] md:mb-[40px] xs:mb-[25px]" data={FooterData.slice(0, 3)} lg={{ span: 2, order: 0 }} sm={{ span: 4, order: 3 }} titleClass="capitalize" /> :
                        language === "en" ? <FooterMenu className="xl:px-[15px] md:mb-[40px] xs:mb-[25px] dir-ltr" data={FooterDataEn.slice(0, 3)} lg={{ span: 2, order: 0 }} sm={{ span: 4, order: 3 }} titleClass="capitalize" /> : <></>}
                        <Col className='sm:hidden' lg={{ span: 3, order: 0 }} md={5} sm={{ span: 6, order: 2 }}>
                            <span className="font-medium block text-themecolor mb-[30px] md:mb-[15px]">{language === "fa-IR" ? "جدیدترین خبر ها" : language === "en" ? "Latest News" : ""}</span>
                            <ul>
                                {loading && latestNewsData.map(item => {
                                    return (<li className="flex mb-[25px]" key={item.id}>
                                        <Link aria-label="link" to={`/news/${item.attributes.title}`} className="w-[75px] mx-[15px] shrink-0">
                                            <img src={host + item.attributes.mainImage.data.attributes.formats.small.url} alt="footer" width={75} height={30}/>
                                        </Link>
                                        <div>
                                            <Link aria-label="link" to={`/news/${item.attributes.title}`}><span className='text-[14px]'>{item.attributes.title}</span></Link>
                                        </div>
                                    </li>)})}
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="footer-bottom py-[15px] border-t border-[#ffffff1a]">
                <Container>
                    <Row>
                        <Col md={6} className="text-right sm:text-center">
                        {language === "fa-IR" ? <>
                                <span className="inline-block xs:text-md">&copy; تمام حقوق این سایت متعلق به <a aria-label="setarehtiles" rel="noreferrer" href="./" target="_blank" className="text-themecolor underline underline-offset-4"> شرکت کاشی و سرامیک ستاره میبد </a> می باشد. </span>
                            </> : language === "en" ? <>
                            <span className="inline-block xs:text-md">&copy; All rights of this site belong to <a aria-label="setarehtiles" rel="noreferrer" href="./" target="_blank" className="text-themecolor underline underline-offset-4">Stare Mibod Tiles and Ceramics Company.</a></span>
                            </> : <></>}
                        </Col>
                        <Col md={6} className="md:mb-[0.75rem] xs:mb-[15px] flex justify-end sm:justify-start sm:text-right">
                            <ul className="flex sm:justify-center md:justify-start xs:flex-col">
                            {language === "fa-IR" ? <>
                                <li className="mr-[35px] md:mr-[20px] xl:mb-0 xs:mb-[7px] xs:text-md"><a aria-label="link" href="https://www.anisagroup.net"><span> طراحی شده توسط گروه مهندسی آنیسا </span></a></li>
                            </> : language === "en" ? <>
                                <li className="mr-[35px] md:mr-[20px] xl:mb-0 xs:mb-[7px] xs:text-md"><a aria-label="link" href="https://www.anisagroup.net"><span> Designed by Anisa Engineering Group </span></a></li>
                            </> : <></>}
                                
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Footer>}</>)}
export default memo(FooterStyle02)