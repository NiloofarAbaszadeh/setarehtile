import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { m } from 'framer-motion'
import SocialIcons from '../../SocialIcon/SocialIcons';
import { Input } from '../../Form/Form'
import { fadeIn } from "../../../Functions/GlobalAnimations";
import axios from 'axios';
const SocialIconsData = [
    {
        color: "#3b5998",
        link: "https://www.facebook.com/",
        icon: "fab fa-facebook-f"
    },
    {
        color: "#ea4c89",
        link: "https://dribbble.com/",
        icon: "fab fa-dribbble"
    },
    {
        color: "#00aced",
        link: "https://twitter.com/",
        icon: "fab fa-twitter"
    },
    {
        color: "#fe1f49",
        link: "https://www.instagram.com/",
        icon: "fab fa-instagram"
    },

    {
        color: "#0077b5",
        link: "https://www.linkedin.com/",
        icon: "fab fa-linkedin-in"
    }
]


const Sidebar = (props) => {
    const token = useSelector(state => state.State.readToken)
    const host = useSelector(state => state.State.host)
    const language = useSelector(state => state.State.language)

    const navigate = useNavigate();
    const [authorInfo, setAuthorInfo] = useState(null)

    useEffect(() => {
        const GetImage = async () => {
            await axios.get(`${host}/api/authors/${props.data[0].attributes.author.data.id}?populate=deep`, {
                headers: { Authorization: `Bearer ${token}` }
              })
             .then(res => {
                setAuthorInfo(res.data.data.attributes)
            })
 
        }
        GetImage()
        // eslint-disable-next-line
    }, [host,token])


    return (
        <aside className="col-12 col-xl-3 offset-xl-1 col-lg-4 col-md-7 md:pl-[15px]">
            <div className='inline-block w-full mb-20'>
                <span className='mb-[25px] font-medium text-darkgray text-lg block'>{language === "fa-IR" ? "جست و جو" : language === "en" ? "Search" : ""}</span>
                <div className="relative">
                    <Formik
                        initialValues={{ search: '' }}
                        validationSchema={Yup.object().shape({ search: Yup.string().required("Field is required."), })}
                        onSubmit={async (values, actions) => {
                            await new Promise((r) => setTimeout(r, 500));
                            actions.resetForm();
                            navigate("../../search-result/result", { state: { search: values } });
                        }}
                    >
                        {({ isSubmitting, status }) => (
                            <div className="relative">
                                <Form className="relative">
                                    
                                    <Input showErrorMsg={false} type="text" name="search" className="border-[1px] py-[15px] px-[20px] w-full rounded-[5px] border-solidborder-transparent" placeholder={language === "fa-IR" ? "عبارت مورد نظر را وارد کنید..." : language === "en" ? "Enter text..." : ""} />
                                    <button type="submit" className={`text-xs tracking-[1px] text-fastblue py-[15px] !absolute top-[8%] ${language === "fa-IR" ? "left" : language === "en" ? "right" : ""}-0 px-[20px] uppercase${isSubmitting ? " loading" : ""}`}><i className="feather-search"></i></button>
                                </Form>
                            </div>
                        )}
                    </Formik>
                </div>
            </div>
            <div className='p-[38px] mb-20 rounded-[4px] border-mediumgray border text-center'>
                {authorInfo &&
                    props.data[0].attributes.author.data.attributes && (
                        <>
                            <Link aria-label="link" to="/">
                                {authorInfo && <img height="" width="" src={host + authorInfo.profileImg.data.attributes.formats.small.url} alt={authorInfo.fullName} className='mb-[5px] rounded-[50%] block mx-auto w-[100px]' />}
                            </Link>
                            {authorInfo && <span className='mt-[20px] font-medium text-darkgray text-[16px] inline-block'>{authorInfo.fullName}</span>}
                        </>
                    )
                }
                {authorInfo && <span className='mb-[20px] text-gray leading-[18px] text-[12px] block'>{authorInfo.desighnation}</span>}
                {authorInfo &&<p className='mb-[25px]'>{authorInfo.discraption}</p>}
                <SocialIcons theme="social-icon-style-01" size="xs" iconColor="dark" data={SocialIconsData.slice(0, 4)} />
            </div>
            
            <m.div className='visible mb-20 md:w-[90%] sm:w-full' {...fadeIn}>
                <span className='mb-[35px] font-medium text-darkgray text-xlg block'>{language === "fa-IR" ? "تگ ها" : language === "en" ? "Tags" : ""}</span>
                {authorInfo && props.data[0].attributes.tags.data.map(tag => {
                    return (
                        <div  className='inline-block text-center text-sm mt-0 ml-[6px] mb-[10px] mr-0 pt-[5px] px-[18px] pb-[6px] rounded-[4px] border-mediumgray border hover:text-[#828282] hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'>{tag.attributes.tagName}</div>
                    )
                })}
            </m.div>
            
        </aside>
    )
}

export default Sidebar