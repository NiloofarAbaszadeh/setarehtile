import React, { useRef, useState , useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet-async'
import { Col, Container, Row } from 'react-bootstrap'
import { Parallax } from 'react-scroll-parallax'
import { AnimatePresence, m } from 'framer-motion'
import { Form, Formik } from 'formik'
import axios from 'axios';
import SocialIcons from '../../Components/SocialIcon/SocialIcons'
import FancyTextBox02 from '../../Components/FancyTextBox/FancyTextBox02'
import { ContactFormStyle03Schema } from '../../Components/Form/FormSchema'
import { fadeIn } from '../../Functions/GlobalAnimations'
import MessageBox from '../../Components/MessageBox/MessageBox'
import { resetForm, sendEmail } from '../../Functions/Utilities'
import Seo from '../../Seo'
import { ScaleLoader } from 'react-spinners'

const ContactUsClassicPage = (props) => {  
  const token = useSelector(state => state.State.readToken)
  const host = useSelector(state => state.State.host)
  const language = useSelector(state => state.State.language)
  const [err, setErr] = useState()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [commentSend, setCommentSend] = useState(null)
  const [formData, setFormData] = useState(
    {
      fullName: "",
      email: "",
      phone: "",
      comment: ""
    }
  )

  const handelChange = (event) => {
    setErr(false)
    const { name, value, type, checked } = event.target
    setFormData(pervFormData => {
      return {
        ...pervFormData,
        [name]: type === "checkbox" ? checked : value
      }
    })                                
  }

  const handelSubmmit = async (event) => {
    event.preventDefault()
    if (formData.fullName !== "" && formData.email !== "" && formData.comment !== "") {
      await axios.post(`${host}/api/all-comments&locale=${language}`, {
        data: {
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            comment: formData.comment,
            from : "صفحه تماس با ما",
            destinationId: "صفحه تماس با ما",
        }
      }).then(res => {
        setCommentSend("OK")
      }).catch(res => {
        setCommentSend("faild")
      })
    } else {
      setErr(true)
    }
  }

  useEffect(() => {
    const GetData = async () => {
      await axios.get(`${host}/api/call-us?populate=deep&locale=${language}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        setData({
          seo: res.data.data.attributes.seo,
          boardTitle: res.data.data.attributes.boardTitle,
          boardSubTitle: res.data.data.attributes.boardSubTitle,
          boardImage: host + res.data.data.attributes.boardImage.data.attributes.formats.custom.url,
          logo: host + res.data.data.attributes.logo.data.attributes.formats.custom.url,
          socialTitle: res.data.data.attributes.socialTitle,
          contactInfo : [
            {
                icon: {
                    class: "ti-location-pin text-fastblue"
                },
                title: res.data.data.attributes.contactInfo[0].title,
                description: res.data.data.attributes.contactInfo[0].discraption,
                link: "#"
            },
            {
                icon: {
                    class: "ti-headphone-alt text-fastblue"
                },
                title: res.data.data.attributes.contactInfo[1].title,
                description: res.data.data.attributes.contactInfo[1].discraption,
                link: "#"
            },
            {
                icon: {
                    class: "ti-alarm-clock text-fastblue"
                },
                title: res.data.data.attributes.contactInfo[2].title,
                description: res.data.data.attributes.contactInfo[2].discraption,
                link: "#"
            }
        ],
        shops: [
          {
            name : res.data.data.attributes.stores[0].name,
            address: res.data.data.attributes.stores[0].address,
            phone : res.data.data.attributes.stores[0].phone,
            email: res.data.data.attributes.stores[0].email,
            image: host + res.data.data.attributes.stores[0].image.data.attributes.formats.custom.url,
          },
          {
            name : res.data.data.attributes.stores[1].name,
            address: res.data.data.attributes.stores[1].address,
            phone : res.data.data.attributes.stores[1].phone,
            email: res.data.data.attributes.stores[1].email,
            image: host + res.data.data.attributes.stores[1].image.data.attributes.formats.custom.url,
          },
          {
            name : res.data.data.attributes.stores[2].name,
            address: res.data.data.attributes.stores[2].address,
            phone : res.data.data.attributes.stores[2].phone,
            email: res.data.data.attributes.stores[2].email,
            image: host + res.data.data.attributes.stores[2].image.data.attributes.formats.custom.url,
          },
        ],
        SocialIconsData: [
          // {
          //   color: "#3b5998",
          //   link: res.data.data.attributes.socialMedia.facebookLink,
          //   icon: "fab fa-facebook-f"
          // },
          // {
          //   color: "#00aced",
          //   link: res.data.data.attributes.socialMedia.twitterLink,
          //   icon: "fab fa-twitter"
          // },
          {
            color: "#fe1f49",
            link: res.data.data.attributes.socialMedia.instagramLink,
            icon: "fab fa-instagram"
          },
          {
            color: "#007bb6",
            link: res.data.data.attributes.socialMedia.linkdinLink,
            icon: "fab fa-linkedin-in"
          },
        ]
        })
        setLoading(true)
      })
    }

    GetData()
    
  },[host, token, language])

  const form = useRef(null)
  return ( <>
    <Helmet>
        <title>{language === "fa-IR" ? "تماس با ما | کاشی و سرامیک ستاره " : language === "en" ? "Contact us | Setareh Meybod Tile & Ceramic" : ""}</title>
    </Helmet>
    {!data && <div className='flex justify-center items-center bg-white w-full h-[100vh] fixed top-0 fix z-50 '>
      <ScaleLoader
        color={"#db1010"}
        loading={!data}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"/></div>}
    {loading && <div style={props.style}>
    {loading && data.seo && <Seo data={data.seo} />}
      <div className="h-[560px] lg:h-[580px] md:h-[550px] sm:h-[500px] xs:h-[380px] overflow-hidden relative">
        <div className='absolute top-0 left-0 w-full h-full bg-darkgray opacity-70 z-[1]'></div>
        <Parallax className="lg-no-parallax bg-cover absolute -top-[50px] left-0 w-full h-[100vh] z-0 lg:-top-[70px] md:h-[600px] md:-top-[50px] xs:h-[450px]" translateY={[-40, 40]} style={{ backgroundImage: `url(${data.boardImage})` }}></Parallax>
        <Container className="h-full relative z-[2]">
          <Row className="justify-center h-full">
            <Col xl={6} lg={7} md={8} className="relative text-center flex w-[120%] justify-center flex-col">
              <h1 className="text-white opacity-60 mb-[20px] text-big leading-[20px]">{language === "fa-IR" ? "کاشی ستاره میبد" : language === "en" ? "Setareh Meybod Tile & Ceramic" : ""}</h1>
              <h2 className="text-white font-medium -tracking-[1px] mb-0  text-[50px]">{language === "fa-IR" ? "برقراری ارتباط و تماس با ما" : language === "en" ? "How to communicate with us" : ""}</h2>
            </Col>
          </Row>
        </Container>
      </div>

      <m.section className="bg-lightgray py-[80px] lg:py-[50px] md:py-[35px] sm:py-[20px]" {...fadeIn}>
        <Container>
          <Row className="sm:justify-center xs:mx-8">
            <Col xs={12} sm={8} md={12}>
              <FancyTextBox02
                grid="justify-center row-cols-1 row-cols-md-2 row-cols-lg-3 md:gap-y-[30px] xs:gap-y-[15px]"
                theme="fancy-text-box-02"
                data={data.contactInfo}
                animation={fadeIn} />
            </Col>
          </Row>
        </Container>
      </m.section>
      
      <m.section className="py-[80px] lg:py-[50px] md:py-[35px] sm:py-[20px]" {...fadeIn}>
        <Container>
          <Row className="justify-center">
            <Col xl={6} lg={7} className="text-center mb-[4.5rem] md:mb-12">
              <h4 className="font-medium text-fastblue text-xxlg mb-3">{language === "fa-IR" ? "منتظر نظرات شما هستیم" : language === "en" ? "let us know what you think of us" : ""}</h4>
              <span className="mb-0 -tracking-[.5px] text-basecolor text-xlg block">{language === "fa-IR" ? "درخواست ها، پیشنهادات , انتقادات." : language === "en" ? "Requests, suggestions, criticisms." : ""}</span>
            </Col>
            <Col className="col-xl-10 col-sm-12 col-xs-12">
              <Formik
                initialValues={{ name: '', email: '', phone: '', comment: '', terms_condition: false }}
                validationSchema={ContactFormStyle03Schema}
                onSubmit={async (values, actions) => {
                  actions.setSubmitting(true)
                  const response = await sendEmail(values)
                  response.status === "success" && resetForm(actions)
                }}>
                {({ isSubmitting, status }) => (
                  <Form ref={form} className='flex items-center justify-center'> 
                  <div className='w-[700px] mx-3'>
                    <div className='form-grid'>
                        <div className='flex-colections'>
                        <input
                          type="text"
                          name="fullName"
                          placeholder={language === "fa-IR" ? "نام و نام خانوادگی" : language === "en" ? "Full name" : ""}
                          onChange={handelChange}
                          value={formData.fullName}
                          className={`py-[12px] px-[20px] w-full text-xxmd border-[1px] border-solid border-[#dfdfdf] mb-[26px] rounded-[5px] ${language === "fa-IR" ? "ml-4" : language === "en" ? "mr-4" : ""}`}
                        />
                        <input
                          type="text"
                          name="phone"
                          placeholder={language === "fa-IR" ? "شماره تماس" : language === "en" ? "Phone" : ""}
                          onChange={handelChange}
                          value={formData.phone}
                          className="py-[12px] px-[20px] w-full text-xxmd border-[1px] border-solid border-[#dfdfdf] mb-[26px] rounded-[5px]"
                        />
                        </div>
                        <div>
                        <input
                          type="text"
                          name="email"
                          placeholder={language === "fa-IR" ? "ایمیل" : language === "en" ? "Email" : ""}
                          onChange={handelChange}
                          value={formData.email}
                          className="py-[12px] px-[20px] w-full text-xxmd border-[1px] border-solid border-[#dfdfdf] mb-[26px] rounded-[5px]"
                        />
                        </div>
                        <input value={formData.comment} onChange={handelChange} className="border-[1px] rounded-[5px] border-solid border-[#dfdfdf] w-full py-[14px] px-[20px] text-xxmd h-[210px]"  name="comment" placeholder={language === "fa-IR" ? "متن پیغام شما" : language === "en" ? "your comment" : ""}></input>
                    </div>    
                    <div className='flex-fix'>
                      <button className={`button-custom w-auto mt-[35px] ${isSubmitting ? " loading" : ""}`} title="فرستادن پیام" onClick={handelSubmmit}>{language === "fa-IR" ? "ارسال" : language === "en" ? "Send" : ""}</button>
                    </div>
                    </div>
                    <AnimatePresence>
                      {status && <Row><Col xs={12}><div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><MessageBox className="mt-[20px] py-[10px]" theme="message-box01" variant="success" message="Your message has been sent successfully!" /></div></Col></Row>}
                    </AnimatePresence>
                  </Form>
                )}
              </Formik>
              {commentSend !== null ?
                commentSend === "OK" ? 
                  <span className='mr-4'>{language === "fa-IR" ? "نظر شما با موفقیت ارسال شد !" : language === "en" ? "Your comment has been sent successfully!" : ""}</span>
                 :
                  <span className='mr-4'>{language === "fa-IR" ? "مشکلی در هنگام ارسال پیش آمد، لطفا بعدا دوباره تلاش کنید" : language === "en" ? "There was a problem sending, please try again later." : ""}</span>
              : <></>}                                          
              {err ? <span className='mr-4 c-c-red'>{language === "fa-IR" ? "لطفا همه بخش های مورد نیاز را کامل کنید" : language === "en" ? "Please complete all required sections" : ""}</span> : <></>} 
              </Col>
          </Row>
        </Container>
      </m.section>
      
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] relative z-1 fancy-box-background overflow-hidden cover-background" style={{ backgroundImage: 'url(https://via.placeholder.com/1929x807)' }}>
        <div className="-z-[1] opacity-85 absolute h-full w-full top-0 left-0 bg-darkslateblue"></div>
        <Container>
          <Row className="justify-center">
            <Col lg={7} md={9} className="col-12 text-center mb-[108px] lg:mb-[90px] sm:mb-14">
              <span className="text-white text-xxlg opacity-100 block mb-[10px]">{language === "fa-IR" ? "در سراسر دنیا با شما هستیم" : language === "en" ? "With you, all over the wrold" : ""}</span>
              <h4 className="text-xlg text-white opacity-80 mb-0">{language === "fa-IR" ? "اطلاعات شعبه ها" : language === "en" ? "Branch information" : ""}</h4>
            </Col>
          </Row>
          <Row className="justify-center">
            {data.shops.map((item, i) => {
              return (
                <Col key={i} lg={4} md={6} sm={8} className="col-12 fancy-box-item md:mb-[30px] xs:mb-[15px]">
                  {item.image && <div className="bg-banner-image cover-background" style={{ backgroundImage: `url(${item.image})` }}>
                    <div className="opacity-medium -z-[1] absolute h-full w-full opacity-50 top-0 left-0 bg-gradient-to-tr from-[#171B1B] via-[#171B1B] to-[#171B1B]"></div>
                  </div>}
                  <div className="relative feature-box-main px-16 py-12 rounded-[5px] overflow-hidden lg:px-12 xs:mx-8 xs:mb-4">
                    <div className="flex items-center">
                      <img width="16" height="16" loading="lazy" src="/assets/img/webp/contact-ir-img-flag-01.png" className={`w-[35px] block feature-box-icon ${language === "en" && "mr-2"}`} alt='Ir' />
                      {item.name && <span className="feature-box-content block font-medium transition-default text-darkgray mr-[6px]">{item.name}</span>}
                    </div>
                    <div className="bg-mediumgray inline-block mt-[20px] mb-[9px] w-full h-[1px]"></div>
                    {item.address && <span className="block mb-[20px] w-[100%] lg:w-full  sm:w-[100%] xs:w-[100%] text-justify h-[85px]">{item.address}</span>}
                    {item.phone && <span className="block font-medium mt-[10px] transition-default text-darkgray leading-[20px] w-full">{language === "fa-IR" ? "تلفن: " : language === "en" ? "Phone: " : ""} {item.phone}</span>}
                    {item.email && <a aria-label="mail" href="mailto:info@yourdomain.com" className="text-fastblue underline">{item.email}</a>}
                  </div>
                </Col>)
              })}
          </Row>
        </Container>
      </section>
      {console.log(data)}
      <section className="py-[80px] md:py-[45px] sm:py-[20px]">
        <Container>
          <Row className="justify-center items-center">
            <Col xs={12} xl={3} lg={4} md={5} sm={6} className={`flex justify-end xs:mb-[5px] xs:justify-center`}>
              <span className="font-medium text-xlg text-darkgray inline-block -tracking-[.5px] lg:text-lg">{data.socialTitle}</span>
            </Col>
            <Col xs={12} md={2} className="block sm:hidden">
              <span className="w-full h-[1px] inline-block bg-red"></span>
            </Col>
            <Col xs={12} xl={3} lg={4} md={5} sm={6}>
              <SocialIcons theme="social-icon-style-01" className="justify-left xs:justify-center xs:text-center" size="sm" iconColor="dark" data={data.SocialIconsData} />
            </Col>
          </Row>
        </Container>
      </section>
    </div>}
    </>)}

export default ContactUsClassicPage