import React, { memo, useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import SocialIcons from '../SocialIcon/SocialIcons'
import FooterMenu, { Footer } from './Footer';
import FooterData, { FooterDataEn } from './FooterData';
import '../../Assets/css/custom-color.css';
// import Logo from "../../Assets/images/logo.png"
import QRCode from "../../Assets/images/setarehQRCode.png"
import SetarehtileTypo from "../../Assets/images/footer/setareh-tile-typo.png"
// import Iso9001 from "../../Assets/images/iso/ISO-9001.png"
import Iso14001 from "../../Assets/images/iso/ISO-14001.png"
import Iso45001 from "../../Assets/images/iso/ISO-45001.png"
import Iso10015 from "../../Assets/images/iso/ISO-10015.png"
import Iso50001 from "../../Assets/images/iso/ISO-50001.png"
import Iso10002 from "../../Assets/images/iso/ISO-10002.png"
import Iso10004 from "../../Assets/images/iso/ISO-10004.png"
import Iso13006 from "../../Assets/images/iso/ISO-13006.png"
import Iso17025 from "../../Assets/images/iso/ISO-17025.png"
import ce from "../../Assets/images/iso/CE-Certified.png"


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
    {
        color: "#007bb6",
        link: "https://t.me/s/setareh_tile",
        icon: "fab fa-telegram"
    },
] 

const optionsPersion = [
    {
        icon: "feather-phone",
        value: "035-3151"
    },
    {
        icon: "feather-mail",
        value: "info@setarehtile.com"
    },
    {
        icon: "feather-globe",
        value: "www.setarehtile.com"
    },
    {
        icon: "feather-map-pin",
        value: "کارخانه: یزد، کیلومتر 10 جاده میبد - یزد"
    },
    {
        icon: "feather-clock",
        value: "شنبه تا چهارشنبه 7-15، پنجشنبه 7-12:20"
    },
]

const optionsEnglish = [
    {
        icon: "feather-phone",
        value: "035-3151"
    },
    {
        icon: "feather-mail",
        value: "info@setarehtile.com"
    },
    {
        icon: "feather-globe",
        value: "www.setarehtile.com"
    },
    {
        icon: "feather-map-pin",
        value: "Factory:Iran, Yazd, km 10, Meybod - Yazd road"
    },
    {
        icon: "feather-clock",
        value: "Saturday to Wednesday 7:15-07, Thursday 7:20-12:20"
    },
]

const isofakedata = [
    {
        icon: Iso14001,
    },
    {
        icon: Iso45001,
    },
    {
        icon: Iso10015,
    },
    {
        icon: Iso50001,
    },
    {
        icon: ce,
    },
    {
        icon: Iso10002,
    },
    {
        icon: Iso10004,
    },
    {
        icon: Iso13006,
    },
    {
        icon: Iso17025,
    }
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
            <Footer theme="dark" className={`text-slateblue bg-darkgray w-full xs:px-8`}>
                {language === "fa-IR" && <div className='flex items-center justify-center py-12'>
                    <img src={SetarehtileTypo} width={150} alt='setareh-typo' />
                </div>}
            <div className="pb-[4%] lg:pb-[4%] md:pb-0 xs:pb-[8%]">
                <Container>
                    <Row className='mb-4'>
                        <div className='flex items-center justify-between mb-8'>
                            {isofakedata.map(item => {
                                return <Link to={"/certificate/external-ce"}>
                                        <img className='transition opacity-60 hover:opacity-100 ease-in-out delay-150 pb-0 hover:pb-4' src={item.icon} alt='iso' width={45} />
                                    </Link>
                            })}
                        </div>
                    </Row>
                    <Row className="md:text-start justify-start">
                        <Col lg={{ span: 3, order: 0 }} md={5} sm={{ span: 6, order: 0 }} className="md:mb-[50px] xs:mb-[25px] border-l border-[#f7f7f730] xs:border-none">
                            <div className='border-b border-[#f7f7f730] pb-2 mb-2'>
                                <div className='flex items-center justify-start mb-4'>
                                    <img className='rounded-[5px] w-[30%] xs:w-[20%]' src={QRCode} alt='QRCode' />
                                    {language === "fa-IR" ? <p className='m-4'>جهت ورود به سایت، اسکن نمایید.</p> : <p className='m-4'>Scan to enter the dashboard.</p>}
                                </div>
                                {language === "fa-IR" ? <div className='mt-2'>
                                    {optionsPersion.map((item, i) => {
                                        return <div className='flex items-start justify-start hover:text-red'>
                                            <span className={`${item.icon} text-[15px] px-2 py-1`}> </span>
                                            <p className='px-2 py-1 w-max text-[12.5px]'>{item.value}</p>
                                        </div>
                                    })}
                                </div> :
                                <div className='mt-2'>
                                    {optionsEnglish.map((item, i) => {
                                        return <div className='flex items-start justify-start '>
                                            <span className={`${item.icon} text-[15px] px-2 hover:text-red py-1`}> </span>
                                            <p className='px-2 py-1 w-max text-[12.5px]'>{item.value}</p>
                                        </div>
                                    })}
                                </div>}
                            </div>
                            <div className='flex items-center justify-between text-[12px]'>
                                {language === "fa-IR" ? <span className='mt-2'>با ما همراه باشید</span> : <span className='mt-2'>Fallow us in social media </span>}
                                <SocialIcons theme="social-icon-style-02" className="justify-start" size="xs" iconColor={props.theme === "dark" ? "light" : "dark"} data={iconData} />
                            </div>
                        </Col>
                        <Col className='mr-2'>
                            <Row className='justify-between'>
                                {language === "fa-IR" ? <FooterMenu className="xl:px-[15px] md:mb-[40px] xs:mb-[25px]" data={FooterData.slice(0, 3)} lg={{ span: 2, order: 0 }} sm={{ span: 4, order: 0 }} titleClass="capitalize" /> :
                                language === "en" ? <FooterMenu className="xl:px-[15px] md:mb-[40px] xs:mb-[25px] dir-ltr" data={FooterDataEn.slice(0, 3)} lg={{ span: 2, order: 0 }} sm={{ span: 4, order: 0 }} titleClass="capitalize" /> : <></>}
                                <Col className='sm:hidden' lg={{ span: 3, order: 0 }} md={5} sm={{ span: 6, order: 2 }}>
                                    <span className="block mb-[30px] md:mb-[15px] span-footer">{language === "fa-IR" ? "آخرین اخبار" : language === "en" ? "Latest News" : ""}</span>
                                    <ul>
                                        {loading && latestNewsData.map(item => {
                                            return (<li className="flex mb-[25px]" key={item.id}>
                                                <Link aria-label="link" to={`/news/${item.attributes.title}`} className="mx-[15px] shrink-0">
                                                    <img className='' src={host + item.attributes.mainImage.data.attributes.formats.medium.url} alt="footer" width={65} height={65}/>
                                                </Link>
                                                <div>
                                                    <Link aria-label="link" to={`/news/${item.attributes.title}`}><span className='text-[14px] w-full'>{item.attributes.title}</span></Link>
                                                </div>
                                            </li>)})}
                                    </ul>
                                            
                                </Col>
                            </Row>
                            <Row>

                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="footer-bottom py-[8px] w-[100vw] px-0 bg-black">
                <Container>
                    <Row>
                        <Col md={6} className="text-right sm:text-center">
                        {language === "fa-IR" ? <>
                                <span className="inline-block xs:text-md text-[12px]">&copy; تمام حقوق این سایت متعلق به <a aria-label="setarehtiles" rel="noreferrer" href="./" target="_blank" className="text-themecolor underline underline-offset-4"> شرکت کاشی و سرامیک ستاره میبد </a> می باشد. </span>
                            </> : language === "en" ? <>
                            <span className="inline-block xs:text-md text-[12px]">&copy; All rights of this site belong to <a aria-label="setarehtiles" rel="noreferrer" href="./" target="_blank" className="text-themecolor underline underline-offset-4">Stare Mibod Tiles and Ceramics Company.</a></span>
                            </> : <></>}
                        </Col>
                        <Col md={6} className="md:mb-[0.75rem] xs:mb-[15px] flex justify-end sm:justify-start sm:text-right">
                            <ul className="flex sm:justify-center md:justify-start xs:flex-col">
                            {language === "fa-IR" ? <>
                                <li className="mr-[35px] md:mr-[20px] xl:mb-0 xs:mb-[7px] xs:text-md text-[12px]"><a aria-label="link" href="https://www.anisagroup.net"><span> طراحی شده توسط گروه مهندسی آنیسا </span></a></li>
                            </> : language === "en" ? <>
                                <li className="mr-[35px] md:mr-[20px] xl:mb-0 xs:mb-[7px] xs:text-md text-[12px]"><a aria-label="link" href="https://www.anisagroup.net"><span> Designed by Anisa Engineering Group </span></a></li>
                            </> : <></>}
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Footer>}</>)}
export default memo(FooterStyle02)