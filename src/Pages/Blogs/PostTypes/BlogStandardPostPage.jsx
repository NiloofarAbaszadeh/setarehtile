import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'; 
import AuthorBox from "../../../Components/Blogs/HelperComponents/AuthorBox"
import CommentBox from "../../../Components/Blogs/HelperComponents/CommentBox"
import SocialIcons from "../../../Components/SocialIcon/SocialIcons"
import Blockquote from '../../../Components/Blockquote/Blockquote'
import Dropcaps from '../../../Components/Dropcaps/Dropcaps'
import Sidebar from '../../../Components/Blogs/HelperComponents/Sidebar'
import { resetForm } from '../../../Functions/Utilities'
import { ContactFormStyle02Schema } from '../../../Components/Form/FormSchema'
import Buttons from '../../../Components/Button/Buttons'
import MessageBox from '../../../Components/MessageBox/MessageBox'
import { Form, Formik } from "formik"
import { m, AnimatePresence } from 'framer-motion'
import { fadeIn } from '../../../Functions/GlobalAnimations'
import Seo from '../../../Seo'
import { ScaleLoader } from 'react-spinners'

const SocialIconsData = [
  {
    color: "#fe1f49",
    link: "https://www.instagram.com/setarehtile/?hl=en",
    icon: "fab fa-instagram"
  },

  {
    color: "#0077b5",
    link: "https://www.linkedin.com/in/setarehtile/?originalSubdomain=ir",
    icon: "fab fa-linkedin-in"
  }
]

const BlogStandardPostPage = (props) => {
  const token = useSelector(state => state.State.readToken)
  const host = useSelector(state => state.State.host)
  const language = useSelector(state => state.State.language)
  const location = useLocation()
  const url = location.pathname.split("/")
  const param = useParams();
  const { id } = param;
  const [data, setData] = useState()
  const [commentSend, setCommentSend] = useState(null)
  const [comments, setComments] = useState()
  const [err, setErr] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(
    {
      fullName: "",
      email: "",
      phone: "",
      comment: ""
    })

  const handelChange = (event) => {
    setErr(false)
    const { name, value, type, checked } = event.target
    setFormData(pervFormData => {
      return {
        ...pervFormData,
        [name]: type === "checkbox" ? checked : value
      }})}

  const handelSubmmit = async (event) => {
    event.preventDefault()
    if (formData.fullName !== "" && formData.email !== "" && formData.comment !== "") {
      await axios.post(`${host}/api/all-comments`, {
        data: {
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            comment: formData.comment,
            from : url[1] === "news" ? `خبر` : `بازدید`,
            destinationId: id,
        }
      }).then(res => {
        setCommentSend("OK")
      }).catch(res => {
        setCommentSend("faild")
      })
    } else {setErr(true)}
    }

  useEffect(() => {
    setLoading(false)
    const newsElements = () => {
      if (url[1] === "news") {
        axios.get(`${host}/api/news-elements?populate=deep&locale=${language}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          setData(res.data.data.filter((item) => item.attributes.title === id))
          setLoading(true)
        })
        axios.get(`${host}/api/all-comments?populate=deep&locale=${language}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          setComments(res.data.data.filter(item => item.attributes.destinationId === id && item.attributes.from === "خبر"))
        })
      } else if (url[1] === "visits") {
        axios.get(`${host}/api/visits?populate=deep&locale=${language}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          setData(res.data.data.filter((item) => item.attributes.title === id))
          setLoading(true)
        })
        axios.get(`${host}/api/all-comments?populate=deep&locale=${language}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          setComments(res.data.data.filter(item => item.attributes.destinationId === id && item.attributes.from === "بازدید").reverse())
        })
      }
    }
    newsElements()
    // eslint-disable-next-line
  }, [id, token, host, language])
  
  return (<>
  {!loading && <div className='flex justify-center items-center bg-white w-full h-[100vh] fixed top-0 fix'>
        <ScaleLoader
          color={"#db1010"}
          loading={!loading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"/></div>}
    {data && <div style={props.style}>
      {data && data[0].attributes.seo && <Seo data={data[0].attributes.seo} />}
      {data[0] && (<>
      <Helmet>
        <title> {language === "fa-IR" ? `${data[0].attributes.title} | کاشی و سرامیک ستاره ` : language === "en" ? `${data[0].attributes.title} | Setareh Meybod Tile & Ceramic` : ""}</title>
      </Helmet>
        <section className="py-[75px] lg:py-[60px] md:py-[45px] sm:py-[40px]">
          <Container>
            <Row className="justify-center">
              <Col lg={8} className="right-sidebar md:mb-[60px] sm:mb-[40px]">
                <Row>
                  <Col className="blog-details-text last:mb-0 mb-8">
                    <h5 className="font-medium text-[20px] text-darkgray mb-[10px] sm:mr-[10px] ">{data[0].attributes.title}</h5>
                    <ul className="flex mb-8 xs:block">
                      {data[0] && <li className="flex items-center justify-start align-middle">
                          <div className='ml-[5px]'><span className="feather-calendar text-fastblue mr-[10px]"></span></div>
                          <div><span className=''>{data[0].attributes.date}</span></div>
                        </li>}
                      {data[0] && (
                          <li className="inline-block text-gray align-middle"><i className="feather-user text-fastblue mx-[10px]"></i>{language === "fa-IR" ? "نوشته شده توسط" : language === "en" ? "Written by" : ""} {data[0].attributes.author.data.attributes.fullName}</li>
                        )}
                    </ul>
                    {/* the first image */}
                    {data[0]&& loading && <img loading="lazy" width="" height="" src={`${host}${data[0].attributes.mainImage.data.attributes.formats.large.url}`} alt="" className="w-full rounded-[2px] mb-[2.5rem]"></img>}
                    <p className="mb-[25px] w-[98%] text-justify sm:px-[10px]">{data[0].attributes.discraption}</p>
                    {/* the text in the midle with the red line in the left */}
                    {data[0].attributes.highlightedText && data[0].attributes.author && <Blockquote
                      className="my-[5.5rem] ml-24 sm:ml-0 sm:px-[10px]"
                      theme="blockquote-style-02"
                      title={data[0].attributes.highLightedText}
                      author={data[0].attributes.author.data.attributes.fullName}
                    />}
                    {/* the second image */}
                    <div>
                      {data[0].attributes.sideImages.data && data[0].attributes.sideImages.data.map((item, i)=> {
                        return <div key={i}>
                          <img loading="lazy" width="" height="" src={`${host}${item.attributes.formats.large.url}`} alt="" className="w-full rounded-[3px] mb-16" />
                        </div>
                      })}
                    </div>
                    {data[0].attributes.personStatement && <Dropcaps theme="dropcaps-style04 sm:px-[10px] " content={data[0].attributes.personStatement.discraption} />}
                  </Col>
                  <Col xs={12} className="flex items-center justify-between mb-[35px] sm:block">
                    {data[0].tags && (
                      <div className="tag-cloud sm:flex sm:justify-center sm:mb-[10px] sm:flex-wrap gap-y-5">
                        {data[0].attributes.tags.map((item, i) => {
                            return (
                              <Link aria-label="links" key={i} to="/blogs/blog-grid">{item}</Link>
                            )})}
                      </div>)}
                  {data[0].attributes.likes && (
                    <div className="text-center md:text-end px-0 flex justify-end sm:justify-center">
                      <Link aria-label="link" className="uppercase text-darkgray text-xs w-auto font-medium inline-block border border-mediumgray rounded pt-[5px] pb-[6px] px-[18px] leading-[20px] hover:text-black transition-default hover:shadow-[0_0_10px_rgba(23,23,23,0.10)] " to="#">
                        <i className="far fa-heart mr-2 text-[#fa5c47]">
                        </i><span className=''>{data[0].attributes.likes} {language === "fa-IR" ? "لایک" : language === "en" ? "Likes" : ""}</span>
                      </Link>
                    </div>)}
                  </Col>
                  <Col>
                    <AuthorBox authorId={data[0].attributes.author} className="mb-[45px] sm:px-[30px]" />
                  </Col>
                  <SocialIcons animation={fadeIn} theme="social-icon-style-09 m-auto" className="justify-center" size="md" iconColor="dark" data={SocialIconsData} />
                </Row>
              </Col>
              {data && <Sidebar data={data} />}
            </Row>
          </Container>
        </section>
        {/* comments */}
        {data && comments && <CommentBox 
        data={comments}
        id={id}/>}

        <m.section {...fadeIn} id="comments" className="overflow-hidden pb-[75px]">
          <Container className='flex justify-center'>
            <div className='box-shadow rounded-[10px] bg-white w-max pt-8 mt-8'>
              <Row className="justify-center">
                <Col lg={9} className="mb-8 sm:mb-8">
                  <h6 className="text-darkgray font-medium mb-[5px]">{language === "fa-IR" ? "نوشتن پیام" : language === "en" ? "Add comment" : ""}</h6>
                  <div className="mb-[5px]">{language === "fa-IR" ? "ایمیل شما منتشر نخواهد شد. قسمت های مورد نیاز علامت زده شده اند." : language === "en" ? "Your email will not be published. The required parts are marked." : ""}<span className="text-red">*</span></div>
                </Col>
              </Row>
              <Row className="justify-center">
                  <Col lg={9}>
                      <Formik
                          initialValues={{ name: '', email: '', comment: '' }}
                          validationSchema={ContactFormStyle02Schema}
                          onSubmit={async (values, actions) => {
                              await new Promise((r) => setTimeout(r, 500));
                              resetForm(actions)
                          }}>
                          {({ isSubmitting, status }) => (
                              <Form className="row mb-[30px]">
                                  <Col md={6} sm={12} xs={12}>
                                  <input
                                    type="text"
                                    name="fullName"
                                    placeholder={language === "fa-IR" ? "نام و نام خانوادگی" : language === "en" ? "Full name" : ""}
                                    onChange={handelChange}
                                    value={formData.fullName}
                                    className="py-[12px] px-[20px] w-full text-xxmd border-[2px] border-solid border-[#dfdfdf] mb-[26px] rounded-[4px]"
                                  />
                                  </Col>
                                  <Col md={6} sm={12} xs={12}>
                                    <input
                                      type="email"
                                      name="email"
                                      placeholder={language === "fa-IR" ? "ایمیل" : language === "en" ? "Email" : ""}
                                      onChange={handelChange}
                                      value={formData.email}
                                      className="py-[12px] px-[20px] w-full text-xxmd border-[2px] border-solid border-[#dfdfdf] mb-[26px] rounded-[4px]"
                                    />
                                  </Col>
                                  <Col md={12} sm={12} xs={12}>
                                      <input value={formData.comment} className="mb-[1rem] rounded-[4px] py-[15px] px-[20px] h-[120px] w-full bg-transparent border-[2px] border-solid border-[#dfdfdf] text-md resize-none" rows="6" name="comment" placeholder={language === "fa-IR" ? "متن پیام خود را وارد کنید" : language === "en" ? "Comment section" : ""} onChange={handelChange} />
                                  </Col>
                                  <Col>
                                      <Buttons type="submit" className={`tracking-[0.5px] btn-fill rounded-[5px] font-medium uppercase${isSubmitting ? " loading" : ""}`} themeColor="#232323" size="md" color="#fff" title={language === "fa-IR" ? "فرستادن پیام" : language === "en" ? "Send" : ""} onClick={handelSubmmit}/>
                                      {commentSend !== null ?
                                        commentSend === "OK" ? 
                                          <span className='mr-4'>{language === "fa-IR" ? "نظر شما با موفقیت ارسال شد !" : language === "en" ? "Your comment has been sent successfully!" : ""}</span>
                                         :
                                          <span className='mr-4'>{language === "fa-IR" ? "مشکلی در هنگام ارسال پیش آمد، لطفا بعدا دوباره تلاش کنید" : language === "en" ? "There was a problem sending, please try again later." : ""}</span>
                                      : <></>}                                          
                                      {err ? <span className='mr-4 c-c-red'>{language === "fa-IR" ? "لطفا همه بخش های مورد نیاز را کامل کنید" : language === "en" ? "Please complete all required sections" : ""}</span> : <></>}   
                                  </Col>
                                  <AnimatePresence>
                                      {status && <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><MessageBox className="mt-[20px] py-[10px]" theme="message-box01" variant="success" message="پیام شما با موفقیت ارسال شد!" /></m.div>}
                                  </AnimatePresence>
                              </Form>
                          )}
                      </Formik>
                  </Col>
                </Row>
              </div>  
            </Container>
          </m.section>
        </>
      )}
    </div>}</>
  )
}

export default BlogStandardPostPage