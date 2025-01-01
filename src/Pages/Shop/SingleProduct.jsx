import React, { useEffect, useState } from 'react'
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap'
import { Link, useParams, Navigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Form, Formik } from 'formik';
import { m, AnimatePresence } from 'framer-motion';
import { Navigation, Thumbs } from "swiper";
import Lightbox from 'react-18-image-lightbox';
import Buttons from '../../Components/Button/Buttons'
import { fadeIn } from '../../Functions/GlobalAnimations';
import { ContactFormStyle02Schema } from '../../Components/Form/FormSchema';
import MessageBox from '../../Components/MessageBox/MessageBox';
import { resetForm } from "../../Functions/Utilities";
import { useSelector } from 'react-redux';
import axios from 'axios';
import IconWithText02 from '../../Components/IconWithText/IconWithText02';
import ShopWide02 from '../../Components/Products/ShopWide02';
import moment from 'jalali-moment'
import Seo from '../../Seo';
import { Helmet } from 'react-helmet-async'; 
import { ScaleLoader } from "react-spinners"

const SingleProduct = (props) => {
  const token = useSelector(state => state.State.readToken)
  const host = useSelector(state => state.State.host)
  const send = useSelector(state => state.State.sendToken)
  const language = useSelector(state => state.State.language)
  const prams = useParams()
  const [photoIndex, setPhotoIndex] = useState(0)
  const swiperRef = React.useRef(null)
  const [data, setData] = useState(null)
  const [IconWithTextData, setIconWithTextData] = useState(null)
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(false)
  const [image, setImage] = useState([])

  import("../../Functions/Utilities").then(module => {
    module.InputField(1);
  })
  const user = localStorage.getItem("userInfo")
  const [commentSend, setCommentSend] = useState(null)
  const [comments, setComments] = useState();
  const [formData, setFormData] = useState(
    {
      fullName: "",
      email: "",
      phone: "",
      comment: ""
    }
  )

  const addtoWishList = async (e) => {
    e.preventDefault()
    if (user) {
      alert(language === "fa-IR" ? 'کاشی به لیست علاقه مندی ها اضافه شد. هم اکنون می توانید آن را از داخل داشبورد خود ببینید' : language === "en" ? "Tile was added to the list of favorites. Now you can see it from inside your dashboard" : "")
      // eslint-disable-next-line
      await axios.get(`${host}/api/karbrans?filters\[username]=${user}&populate=deep`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        
        const before = res.data.data[0].attributes.favorite === null ? [data] : res.data.data[0].attributes.favorite.concat(data)
        axios.put(`${host}/api/karbrans/${res.data.data[0].id}`,{
          "data" : {
          "favorite" : before,
          }},{
            headers: { Authorization: `Bearer ${send}` }
          }).then(res => {
        })  
      })
    } else {
      alert(language === "fa-IR" ? 'برای استفاده از این بخش ابتدا باید وارد سایت شوید' : language === "en" ? `To use this section, you must first log in to the site.` : "")
      return <Navigate to={"../../login"} />
    }
  }

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
      await axios.post(`${host}/api/all-comments`, {
        data: {
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            comment: formData.comment,
            from : "کاشی",
            destinationId: prams.id,
        }
      }).then(res => {
        setCommentSend("OK")
      }).catch(res => {
        setCommentSend("faild")
      })
    } else {setErr(true)}
  }

  const handleClick = (i) => {
    setIsOpen(true)
    setPhotoIndex(i)
  }

  const SetBaseInfo = (baseInfo) => {
    const base = [
      baseInfo.bakeType.data !== null && {
        img: host + baseInfo.bakeType.data.attributes.icon.data.attributes.formats.custom.url,
        title: language === "fa-IR" ? `نوع پخت` : language === "en" ? `Bake` : "",
        name: baseInfo.bakeType.data.attributes.bakeType
      },
      baseInfo.bodyColor.data !== null && {
        img: host + baseInfo.bodyColor.data.attributes.icon.data.attributes.formats.custom.url,
        title: language === "fa-IR" ? `رنگ بدنه` : language === "en" ? `Body Color` : "",
        name: baseInfo.bodyColor.data.attributes.color
      },
      baseInfo.color_themes.data !== null && {
        sideimg: baseInfo.color_themes.data.map(item => {
          return {
            img: host + item.attributes.icon.data.attributes.formats.custom.url,
            name: item.attributes.color
          }
        }),
        title: language === "fa-IR" ? `تم رنگی` : language === "en" ? `Color Theme` : "",
      },
      baseInfo.design.data !== null && {
        img: host + baseInfo.design.data.attributes.icon.data.attributes.formats.custom.url,
        title: language === "fa-IR" ? `نوع طراحی` : language === "en" ? `Design` : "",
        name: baseInfo.design.data.attributes.design
      },
      baseInfo.galeb.data !== null && {
        img: host + baseInfo.galeb.data.attributes.icon.data.attributes.formats.custom.url,
        title: language === "fa-IR" ? `نوع قالب` : language === "en" ? `Template` : "",
        name: baseInfo.galeb.data.attributes.molde
      },
      baseInfo.glazeType.data !== null && {
        img: host + baseInfo.glazeType.data.attributes.icon.data.attributes.formats.custom.url,
        title: language === "fa-IR" ? `نوع لعاب` : language === "en" ? `Glaze` : "",
        name: baseInfo.glazeType.data.attributes.glaze
      },
      baseInfo.shape.data !== null && {
        img: host + baseInfo.shape.data.attributes.icon.data.attributes.formats.custom.url,
        title: language === "fa-IR" ? `نوع شکل` : language === "en" ? `Shape` : "",
        name: baseInfo.shape.data.attributes.shape
      },
      baseInfo.size.data !== null && {
        img: host + baseInfo.size.data.attributes.icon.data.attributes.formats.custom.url,
        title: language === "fa-IR" ? `ابعاد` : language === "en" ? `Size` : "",
        name: baseInfo.size.data.attributes.size
      },
      baseInfo.special_types.data !== null && {
        sideimg: baseInfo.special_types.data.map(item => {
          return {
            img: host + item.attributes.icon.data.attributes.formats.custom.url,
            name: item.attributes.feature

          }
        }),
        title: language === "fa-IR" ? `ویژگی های خاص` : language === "en" ? `Special features` : "",
      },
      baseInfo.stamp.data !== null && {
        img: host + baseInfo.stamp.data.attributes.icon.data.attributes.formats.custom.url,
        title: language === "fa-IR" ? `نوع چاپ` : language === "en" ? `Stamp` : "",
        name: baseInfo.stamp.data.attributes.stamp
      },
      baseInfo.type.data[0] !== undefined && {
        sideimg: baseInfo.use_places.data.map(item => {
          return {
            img: host + item.attributes.icon.data.attributes.formats.custom.url,
            name: item.attributes.type
          }
        }),
        title: language === "fa-IR" ? `نوع محصول` : language === "en" ? `Product Type` : "",
      },
      baseInfo.use_places.data !== null && {
        sideimg: baseInfo.use_places.data.map(item => {
          return {
            img: host + item.attributes.icon.data.attributes.formats.custom.url,
            name: item.attributes.place
          }
        }),
        title: language === "fa-IR" ? `مکان استفاده` : language === "en" ? `Use place` : "",
      },
    ]
    setIconWithTextData(base)
  }

  useEffect(() => {
    const GetData = async () => {
      // eslint-disable-next-line
      await axios.get(`${host}/api/products?filters\[name]=${prams.id}&populate=deep&locale=${language}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        setLoading(false)
        Set(res.data.data)
        setTimeout(() => {
          setLoading(true)
        }, 3000)
      })
    }
    const Set = async (data) => {
      await SetBaseInfo(data[0].attributes.baseInfo)
      await setData({
        tileName: data[0].attributes.name,
        discraption : data[0].attributes.discraption,
        tileId: data[0].id,
        groupName: data[0].attributes.groups.data[0] && data[0].attributes.groups.data[0].attributes.name,
        groupId: data[0].attributes.groups.data[0] && data[0].attributes.groups.data[0].id,
        collectionName: data[0].attributes.groups.data[0] && data[0].attributes.groups.data[0].attributes.collections.data[0] && data[0].attributes.groups.data[0].attributes.collections.data[0].attributes.name,
        collectionId: data[0].attributes.groups.data[0] && data[0].attributes.groups.data[0].attributes.collections.data[0] && data[0].attributes.groups.data[0].attributes.collections.data[0].id,
        seo: data[0].attributes.seo,
        tileData: {
          similar: [
            (data[0].attributes.baseInfo.size.data !== null) && data[0].attributes.baseInfo.size.data.id,
            data[0].attributes.baseInfo.color_themes.data[0].id
          ],
          image: host + data[0].attributes.image.data.attributes.formats.medium.url,
          baseInfo: {
            bakeType: (data[0].attributes.baseInfo.bakeType.data !== null) && data[0].attributes.baseInfo.bakeType.data.attributes.bakeType,
            bodyColor:(data[0].attributes.baseInfo.bodyColor.data !== null) &&  data[0].attributes.baseInfo.bodyColor.data.attributes.color,
            brandName: (data[0].attributes.baseInfo.brandName.data !== null) && data[0].attributes.baseInfo.brandName.data.attributes.brand,
            colorTheme: (data[0].attributes.baseInfo.color_themes.data !== null) && data[0].attributes.baseInfo.color_themes.data.map(item => {
              return item.attributes.color
            }),
            design:(data[0].attributes.baseInfo.design.data !== null) &&  data[0].attributes.baseInfo.design.data.attributes.design,
            galeb: (data[0].attributes.baseInfo.galeb.data !== null) && data[0].attributes.baseInfo.galeb.data.attributes.molde,
            glazeType: (data[0].attributes.baseInfo.glazeType.data !== null) && data[0].attributes.baseInfo.glazeType.data.attributes.glaze,
            shape: (data[0].attributes.baseInfo.shape.data !== null) && data[0].attributes.baseInfo.shape.data.attributes.shape,
            size: (data[0].attributes.baseInfo.size.data !== null) && data[0].attributes.baseInfo.size.data.attributes.size,
            specialTypes: (data[0].attributes.baseInfo.special_types.data !== null) && data[0].attributes.baseInfo.special_types.data.map(item => {
              return item.attributes.feature
          }),
            stamp: (data[0].attributes.baseInfo.stamp.data !== null) && data[0].attributes.baseInfo.stamp.data.attributes.stamp,
            // type: (data[0].attributes.baseInfo.type.data !== null) && data[0].attributes.baseInfo.type.data.attributes.type,
            usePlaces: (data[0].attributes.baseInfo.use_places.data !== null) && data[0].attributes.baseInfo.use_places.data.map(item => {
              return item.attributes.place
          }),
          }
        }
      })
      if (data[0].attributes.sideImages.data !== null)
      {setImage(data[0].attributes.sideImages.data.map(item => {
        return item.attributes.formats.medium.url
      })
      )}
      await setImage([])
      await setImage(perdata => {
        return [
         {img: `${host}${data[0].attributes.image.data.attributes.formats.medium.url}`},
          ...perdata,]
      })
      await axios.get(`${host}/api/all-comments?populate=*`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setComments(res.data.data.filter(item => item.attributes.from === "کاشی" && item.attributes.destinationId === prams.id).reverse())
      })
    
    
    }
    GetData()
    // eslint-disable-next-line
  },[prams.id,host,token, language])


  return (
    <div className="single-product" style={props.style} >
      {(!loading || !data) && <div className='flex justify-center items-center bg-white w-full h-[100vh] fixed top-0 fix z-50'>
        <ScaleLoader
        color={"#db1010"}
        loading={!loading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"/></div>}
      {loading && data.seo && <Seo data={data.seo} />}
      {loading && <Helmet>
        <title> {data.tileName} | {language === "fa-IR" ? `کاشی و سرامیک ستاره  ` : language === "en" ? `Setareh Meybod Tile & Ceramic` : ""}</title>
      </Helmet>}
      
      {/* Section Start */}
      {data && <section className="py-[60px] bg-white lg:py-[40px] md:py-[35px] sm:py-[30px] xs:py-[25px] overflow-hidden">
        <Container>
          <Row>
            <Col >
              <div className="breadcrumb text-sm p-0 mb-0 flex-colections">
                  <div>
                    <ul>
                      <li><Link aria-label="homepage-link" to="/"><span className='text-[15px] text-gray font-sans'>{language === "fa-IR" ? `خانه` : language === "en" ? `Home` : ""}</span></Link></li>
                      <li><Link aria-label="shop-link" to={`/product-collection/${data.collectionName}`}><span className='text-[15px] text-gray font-sans'>{data.collectionName}</span></Link></li>
                      <li><Link aria-label="shop-link" to={`/product-groups/${data.groupName}`}><span className='text-[15px] text-gray font-sans'>{data.groupName}</span></Link></li>
                      <li><span className='text-[15px] text-red font-sans'>{data.tileName}</span></li>
                    </ul>
                  </div>
                </div>  
            </Col>
            <Col className="col-12 flex flex-column flex-lg-row align-items-md-start" >
            <div className={`w-[40%] md:w-full product-summary ${language === "fa-IR" ? "pl-28" : language === "en" ? "pr-28" : ""} lg:pl-20 md:pl-0 pt-12`}>
                <div className="flex items-center my-14 md:my-6">
                  <div className="flex-grow">
                    <div className="text-darkgray font-semibold text-[25px] mb-[5px]">{data.tileName}</div>
                  </div>
                  <div className="text-end leading-[30px]">
                    <div><Link to="#" className="tracking-[3px]" aria-label="product-rating">
                      <i className="fas fa-star text-[12px] text-[#ff9c00]"></i>
                      <i className="fas fa-star text-[12px] text-[#ff9c00]"></i>
                      <i className="fas fa-star text-[12px] text-[#ff9c00]"></i>
                      <i className="fas fa-star text-[12px] text-[#ff9c00]"></i>
                      <i className="fas fa-star text-[12px] text-[#ff9c00]"></i></Link>
                    </div>
                  </div>
                </div>
                <p className='text-[15px] text-justify text-gray'>
                  {data.discraption}
                </p>
                <div className="mt-12">
                  <div className="mb-[20px] flex items-center">
                    <label className="text-darkgray text-xmd  uppercase w-[60px] mr-[3px]">{language === "fa-IR" ? `خانه` : language === "en" ? `Color Theme` : ""}</label>
                    <ul className=" flex shop-color">
                      {data.tileData.baseInfo.colorTheme.includes("خاکستری" || "Gray") ? <li>
                        <input className="hidden" type="radio" id="color-1" value="1" name="color" disabled/>
                        <label htmlFor="color-1"><span className="after:text-white after:z-[12] after:text-[500px] border" style={{ backgroundColor: "#b6c4b6" }}></span></label>
                      </li> : <></>}
                      {data.tileData.baseInfo.colorTheme.includes("زرد" || "Yellow") ? <li>
                        <input className="hidden" type="radio" id="color-1" value="1" name="color"  />
                        <label htmlFor="color-1"><span className="after:text-white after:z-[12] after:text-[500px] border" style={{ backgroundColor: "#fff78a" }}></span></label>
                      </li> : <></>}
                      {data.tileData.baseInfo.colorTheme.includes("زیتونی" || "Olive") ? <li>
                        <input className="hidden" type="radio" id="color-1" value="1" name="color"  />
                        <label htmlFor="color-1"><span className="after:text-white after:z-[12] after:text-[500px] border" style={{ backgroundColor: "#897f21" }}></span></label>
                      </li> : <></>}
                      {data.tileData.baseInfo.colorTheme.includes("سفید" || "White") ? <li>
                        <input className="hidden" type="radio" id="color-1" value="1" name="color"  />
                        <label htmlFor="color-1"><span className="after:text-white after:z-[12] after:text-[500px] border" style={{ backgroundColor: "#fbf6ff" }}></span></label>
                      </li> : <></>}
                      {data.tileData.baseInfo.colorTheme.includes("صورتی" || "Pink") ? <li>
                        <input className="hidden" type="radio" id="color-1" value="1" name="color"  />
                        <label htmlFor="color-1"><span className="after:text-white after:z-[12] after:text-[500px] border" style={{ backgroundColor: "#ffc0d9" }}></span></label>
                      </li> : <></>}
                      {data.tileData.baseInfo.colorTheme.includes("فیروزه ای" || "Turquoise") ? <li>
                        <input className="hidden" type="radio" id="color-1" value="1" name="color"  />
                        <label htmlFor="color-1"><span className="after:text-white after:z-[12] after:text-[500px] border" style={{ backgroundColor: "#86b6f6" }}></span></label>
                      </li> : <></>}
                      {data.tileData.baseInfo.colorTheme.includes("قهوه ای" || "Brown") ? <li>
                        <input className="hidden" type="radio" id="color-1" value="1" name="color"  />
                        <label htmlFor="color-1"><span className="after:text-white after:z-[12] after:text-[500px] border" style={{ backgroundColor: "#994d1c" }}></span></label>
                      </li> : <></>}
                      {data.tileData.baseInfo.colorTheme.includes("مشکی" || "Black") ? <li>
                        <input className="hidden" type="radio" id="color-1" value="1" name="color"  />
                        <label htmlFor="color-1"><span className="after:text-white after:z-[12] after:text-[500px] border" style={{ backgroundColor: "#191919" }}></span></label>
                      </li> : <></>}
                      {data.tileData.baseInfo.colorTheme.includes("آبی" || "Blue") ? <li>
                        <input className="hidden" type="radio" id="color-1" value="1" name="color"  />
                        <label htmlFor="color-1"><span className="after:text-white after:z-[12] after:text-[500px] border" style={{ backgroundColor: "#1716b8" }}></span></label>
                      </li> : <></>}
                      {data.tileData.baseInfo.colorTheme.includes("کرم" || "Cerem") ? <li>
                        <input className="hidden" type="radio" id="color-1" value="1" name="color"  />
                        <label htmlFor="color-1"><span className="after:text-white after:z-[12] after:text-[500px] border" style={{ backgroundColor: "#ead196" }}></span></label>
                      </li> : <></>}
                    </ul>
                  </div>
                  <div className="mb-8 flex items-center">
                    <div className="text-darkgray text-xmd uppercase w-[60px] mr-[3px]">{language === "fa-IR" ? `ابعاد` : language === "en" ? `Size` : ""}</div>
                    <ul className="text-xmd flex">
                      <li className='mr-[12px]'>
                        <span>{data.tileData.baseInfo.size}</span>
                      </li>
                    </ul>
                    {/* <CustomModal.Wrapper
                      closeBtnIn={true}
                      closeBtnOuter={false}
                      className="size-chart"
                      modalBtn={<label className="uppercase  text-xs text-decoration-line-bottom">Size Guide</label>}
                    >
                      <div className="relative w-full mx-auto bg-white p-20 xl:w-[70%] md:w-[80%] md:p-16 xs:w-[95%] xs:p-12 size-chart-popup">
                        <CustomModal.Close className="close-btn absolute top-0 right-0 text-[#333]">
                          <button title="Close (Esc)" type="button" className="border-none text-[30px] font-light w-[44px] h-[44px]">×</button>
                        </CustomModal.Close>
                        <div className="table-style-01">
                          <table>
                            <tbody>
                              <tr className=" bg-darkgray font-medium text-white">
                                <th>SIZE</th>
                                <th>S</th>
                                <th>M</th>
                                <th>L</th>
                                <th>XL</th>
                                <th>XXL</th>
                                <th>2XL</th>
                                <th>3XL</th>
                              </tr>
                              <tr>
                                <td>Collar</td>
                                <td>14</td>
                                <td>15</td>
                                <td>16</td>
                                <td>17</td>
                                <td>18</td>
                                <td>19</td>
                                <td>20</td>
                              </tr>
                              <tr className="bg-lightgray">
                                <td>Shoulder</td>
                                <td>16</td>
                                <td>17</td>
                                <td>18</td>
                                <td>19</td>
                                <td>20</td>
                                <td>21</td>
                                <td>22</td>
                              </tr>
                              <tr>
                                <td>Chest, waist, hips</td>
                                <td>28-29</td>
                                <td>30-31</td>
                                <td>32-33</td>
                                <td>34-35</td>
                                <td>36-37</td>
                                <td>38-39</td>
                                <td>40-41</td>
                              </tr>
                              <tr className="bg-lightgray">
                                <td>Cuff</td>
                                <td>9</td>
                                <td>9.5</td>
                                <td>10</td>
                                <td>10.5</td>
                                <td>11</td>
                                <td>11.5</td>
                                <td>12</td>
                              </tr>
                              <tr>
                                <td>Short-sleeve length</td>
                                <td>10</td>
                                <td>10.5</td>
                                <td>11</td>
                                <td>11.5</td>
                                <td>12</td>
                                <td>12.5</td>
                                <td>13</td>
                              </tr>
                              <tr className="bg-lightgray">
                                <td>Long-sleeve length</td>
                                <td>23</td>
                                <td>23.5</td>
                                <td>24</td>
                                <td>24.5</td>
                                <td>25</td>
                                <td>25.5</td>
                                <td>26</td>
                              </tr>
                              <tr>
                                <td>Arm Hole</td>
                                <td>22</td>
                                <td>22.5</td>
                                <td>32</td>
                                <td>23.5</td>
                                <td>24</td>
                                <td>24.5</td>
                                <td>25</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </CustomModal.Wrapper> */}
                  </div>
                  <div className="flex flex-wrap mt-8 ">
                    
                    <div className=" w-full">
                      <button aria-label="add-to-wishlist" onClick={addtoWishList} className="uppercase text-[13px] font-medium custom-box"><i className="feather-heart align-middle ml-[5px]"></i>{language === "fa-IR" ? `افزوردن به علاقه مندی ها ` : language === "en" ? `Add to favorite` : ""}</button>
                    </div>
                  </div>
                  <div className="flex  mt-1 items-center">
                    <div className="flex-grow">
                      <span className="uppercase text-xmd font-medium text-darkgray block">{language === "fa-IR" ? `تگ ها:` : language === "en" ? `Tags:` : ""} 
                        <Link to="#" aria-label="product" className="font-normal text-[#828282] ml-[5px]">{language === "fa-IR" ? `فعلا محتوا ندارد` : language === "en" ? `No content yet` : ""}</Link>
                      </span>
                    </div>
                    {/* <SocialIcons theme="social-icon-style-01" className="justify-center" size="xs" iconColor="dark" data={SocialIconsData} /> */}
                  </div>
                </div>
              </div>
              <div className="w-[60%] md:w-full rev-dir">
                <Row>
                <Col lg={{ order: 2, span: 3 }} className="relative single-product-thumb flex justify-center md:mb-[50px] sm:mb-[40px]">
                    <Swiper
                      ref={swiperRef}
                      direction="horizontal"
                      onSwiper={setThumbsSwiper}
                      spaceBetween={15}
                      slidesPerView={3.2}
                      modules={[Navigation, Thumbs]}
                      navigation={{ el: ".swiper-thumb-next-prev" }}
                      className="mySwiper overflow-hidden absolute h-full pb-[40px] md:pb-0 md:relative"
                      breakpoints={{
                        992: {
                          direction: "vertical"
                        }
                      }}
                    >
                      { 
                        image.map((item, i) => {
                          return (
                            item.img &&
                            <SwiperSlide className="overflow-hidden bg-white py-1"  key={i}>
                              <img src={`${item.img}`}  alt="products" width="" height="" className="w-full" />
                            </SwiperSlide>
                          )
                        })
                      }
                    </Swiper>
                    
                  </Col>
                  <Col lg={{ span: 9, order: 1 }} className="relative product-image md:mb-[10px] px-lg-0 ">
                    <Swiper
                      style={{
                        "--swiper-navigation-color": "#fff",
                        "--swiper-pagination-color": "#fff",
                      }}
                      spaceBetween={10}
                      navigation={true}
                      thumbs={{ swiper: thumbsSwiper }}
                      modules={[Navigation, Thumbs]}
                      className="mySwiper2 w-full ">
                      {
                        image.map((item, i) => {
                          return (
                            <SwiperSlide key={i} className='bg-white py-12' onClick={() => handleClick(i)}>
                              <img src={`${item.img}`}  alt="products" width="512" height="652.8" className="w-full" />
                            </SwiperSlide>
                          )
                        })
                      }
                    </Swiper>
                    {isOpen && (
                      <Lightbox
                        imageCaption={`${photoIndex + 1} از ${image.length}`}
                        mainSrc={image[photoIndex].img}
                        onCloseRequest={() => setIsOpen(false)}
                        nextSrc={image[(photoIndex + 1) % image.length]}
                        prevSrc={image[(photoIndex + image.length - 1) % image.length]}
                        onMovePrevRequest={() =>
                          setPhotoIndex((photoIndex + image.length - 1) % image.length)
                        }
                        onMoveNextRequest={() =>
                          setPhotoIndex((photoIndex + 1) % image.length)
                        }
                        reactModalProps={{ contentLabel: "Example Modal" }}
                      />
                    )}
                  </Col>
                  
                </Row>
              </div>
              {language === "fa-IR" && <div className='m-[25px]'></div>}
            </Col>
          </Row>
        </Container>
      </section>}
      {/* Section End */}

      {/* Section Start */}
      {loading && <section className="border-mediumgray bg-[#f1edea] pt-0 py-[40px] lg:py-[50px] md:py-[35px] sm:py-[20px]">
        <Container fluid>
          <Row>
            <Col>
              <Tab.Container id="left-tabs-example" defaultActiveKey={0}>
                <Row className="tab-style-07">
                  <Col lg={12} className="p-0">
                    <Nav className="justify-center uppercase font-medium text-center cursor-pointer border-b border-t border-solid border-mediumgray mb-12 md:flex-nowrap md:mb-[72px] sm:mb-[66px] sm:border-b-0 xs:mb-[35px]">
                      <Nav.Item>
                        <Nav.Link className="block text-darkgray border-b-[3px] border-solid border-transparent py-[30px] px-[40px] mb-0" eventKey={0} ><span className='text-xlg text-balck'>{language === "fa-IR" ? `اطلاعات پایه` : language === "en" ? `Base Info` : ""}</span></Nav.Link>
                      </Nav.Item>
                      {/* <Nav.Item>
                        <Nav.Link className="block text-darkgray border-b-[3px] border-solid border-transparent py-[30px] px-[40px] mb-0" eventKey={1} ><span className='text-xlg text-balck'>توضیحات</span></Nav.Link>
                      </Nav.Item> */}
                      <Nav.Item>
                        <Nav.Link className="block text-darkgray border-b-[3px] border-solid border-transparent py-[30px] px-[40px] mb-0" eventKey={1} ><span className='text-xlg text-balck'>{language === "fa-IR" ? `دیدگاه ها ` : language === "en" ? `Comments` : ""}{comments.length !== 0 && <>({comments.length})</>}</span></Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col lg={12} className="p-0">
                    <Container>
                      <Col>
                        <Tab.Content>
                          <Tab.Pane eventKey={0} >
                          <Row className="tems-center">
                              <Col>
                              {/* the base information comes in here */}
                              {loading && <section className="pt-[70px] lg:pt-[75px] md:pt-[55px] sm:pt-[35px] cover-background md:pb-[20px] sm:pb-[20px]" >
                                <Container>
                                  <IconWithText02 grid="row-cols-2 row-cols-lg-6 row-cols-sm-3 text-center" theme="icon-with-text-03" data={IconWithTextData} animation={fadeIn} animationDelay={0.3} />
                                </Container>
                              </section>}
                              </Col>
                            </Row>
                          </Tab.Pane>
                          {/* <Tab.Pane eventKey={1}>
                            <Row className="items-center">
                              <Col xl={5} lg={6} className="md:mb-[50px] pl-12">
                                <p className="mb-[25px] text-[15px] text-balack leading-9 text-justify">این بخش شامل متنی نسبتا کوتاه در خصوص برتری های این نوع کاشی میباشد. به دلیل در دست نداشتن محتوای مناسب فعلا این بخش جهت تست با این متن پر شده است.</p>
                                <Lists theme="list-style-04" data={ListData} animation={fadeIn} />
                              </Col>
                              <Col lg={6} xl={{ offset: 1 }} className='pr-12'>
                                <img loading="lazy" width="564" height="564" src={data.gruopimage} alt="products" />
                              </Col>
                            </Row>
                          </Tab.Pane> */}
                          <Tab.Pane eventKey={1}>
                            <Row className="justify-center mb-[1.5rem]">
                              {/* the reveiws part */}
                              {comments[0] && comments.reverse().map(comment => {
                                const date = comment.attributes.createdAt.split("T")
                                const time = date[1].split(".")
                                return (
                                  <>
                                    <Col xs={12} lg={10} className='mb-12'>
                                      <div className="flex w-full md:items-start">
                                        <div className="w-[75px] sm:w-[50px] sm:mb-[10px] ml-[15px] md:mt-4">
                                          <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" width="" height="" className="rounded-full w-[75%] sm:w-full" alt="" />
                                        </div>
                                        <div className="w-full custom-boarder box-shadow pl-[25px] sm:pl-0 bg-white">
                                          <div className="text-balck font-medium text-xlg">{comment.attributes.name}</div>
                                          <div className="text-md text-spanishgray mb-[15px] "> <span className='text-fastblue'> {moment.utc(`T${time[0]}.00-03:30`, "THH:mm:ss.SSZ").format("HH:mm:ss")}  </span> <span className='text-fastblue'> {moment(date[0], 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD')} </span>  </div>
                                          <p className="w-[100%] text-xmd text-justify">{comment.attributes.comment}</p>
                                        </div>
                                      </div>
                                    </Col>
                                  </>
                                )
                              })}
                            </Row>
                            <Row className='flex justify-center w-full px-24 md:px-0 lg:mr-0'>
                            <div className='custom-border rounded-[10px] box-shadow bg-white py-12 md:px-12'>
                            <Row className="justify-center">
                              <Col lg={10} className="mb-8">
                                <h6 className=" text-balck font-medium mb-[5px] text-[18px]">{language === "fa-IR" ? `نظرات خود را با ما به اشتراک بگذارید` : language === "en" ? `Share your thoughts with us` : ""}</h6>
                                <div className="mb-[5px] text-darkgray">{language === "fa-IR" ? `ایمیل شما نشان داده نخواهد شد. بخش های مورد نیاز علامت گذاری شده اند` : language === "en" ? `Your email will not be shown. Required sections are marked` : ""}
                                  <span className="text-[#fb4f58]">*</span></div>
                              </Col>
                            </Row>
                            <Row className="justify-center">
                              <Col lg={10}>
                                <Formik
                                  initialValues={{ name: '', email: '' }}
                                  validationSchema={ContactFormStyle02Schema}
                                  onSubmit={async (values, actions) => {
                                    await new Promise((r) => setTimeout(r, 500));
                                    resetForm(actions)
                                  }}>
                                  {({ isSubmitting, status }) => (
                                    <Form className="row">
                                      <Col md={6} sm={12} xs={12}>
                                      <input
                                            type="text"
                                            name="fullName"
                                            placeholder={language === "fa-IR" ? `نام و نام خانوادگی` : language === "en" ? `Full name` : ""}
                                            onChange={handelChange}
                                            value={formData.fullName}
                                            className="rounded-[5px] py-[15px] px-[20px] w-full border-[1px] border-solid border-[#dfdfdf] sm:mb-8"
                                          />
                                      </Col>
                                      <Col md={6} sm={12} xs={12}>
                                      <input
                                            type="text"
                                            name="email"
                                            placeholder={language === "fa-IR" ? `ایمیل` : language === "en" ? `Email` : ""}
                                            onChange={handelChange}
                                            value={formData.email}
                                            className="rounded-[5px] py-[15px] px-[20px] w-full border-[1px] border-solid border-[#dfdfdf]"
                                          />
                                      </Col>
                                      <Col md={12} sm={12} xs={12}>
                                        <textarea className="mt-[25px] mb-[1.5rem] rounded-[4px] py-[15px] px-[20px] h-[120px] w-full border border-[#dfdfdf] text-md resize-none" rows="6" name="comment" placeholder={language === "fa-IR" ? `متن خود را وارد کنید` : language === "en" ? `Enter comment...` : ""} onChange={handelChange}></textarea>
                                      </Col>
                                      <Col>
                                        <Buttons type="submit" className={`tracking-[0.5px] btn-fill rounded-[2px] font-medium uppercase${isSubmitting ? " loading" : ""}`} themeColor="#232323" size="md" color="#fff" title={language === "fa-IR" ? `ارسال` : language === "en" ? `Send` : ""} onClick={handelSubmmit} />
                                        {commentSend !== null ?
                                      commentSend === "OK" ? 
                                        <span className='mr-4'>{language === "fa-IR" ? "نظر شما با موفقیت ارسال شد !" : language === "en" ? "Your comment has been sent successfully!" : ""}</span>
                                       :
                                        <span className='mr-4'>{language === "fa-IR" ? "مشکلی در هنگام ارسال پیش آمد، لطفا بعدا دوباره تلاش کنید" : language === "en" ? "There was a problem sending, please try again later." : ""}</span>
                                    : <></>}                                          
                                    {err ? <span className='mr-4 c-c-red'>{language === "fa-IR" ? "لطفا همه بخش های مورد نیاز را کامل کنید" : language === "en" ? "Please complete all required sections" : ""}</span> : <></>}      
                                      </Col>
                                      <AnimatePresence>
                                        {status && <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><MessageBox className="mt-[20px] text-center py-[10px]" theme="message-box01" variant="success" message="پیام شما با موفقیت ارسال شد !" /></m.div>}
                                      </AnimatePresence>
                                    </Form>
                                  )}
                                </Formik>
                              </Col>
                            </Row>
                            </div>
                            </Row>
                          </Tab.Pane>
                        </Tab.Content>
                      </Col>
                    </Container>
                  </Col>
                </Row>
              </Tab.Container>
            </Col>
          </Row>
        </Container>
      </section>}
      {/* Section End */}
      {/* Section Start */}
      {loading && data.tileData.similar[0] && <section className="border-t border-mediumgray py-[90px] lg:py-[75px] md:py-[55px] sm:py-[30px]">
        <Container>
          <Row className="row justify-center">
            <Col lg={5} md={6} className=" font-medium text-center">
              <span className="uppercase text-[28px] inline-block mb-[5px]">{language === "fa-IR" ? `شاید خوشتان بیاید` : language === "en" ? `You may like` : ""}</span>
              <h5 className="text-red -tracking-[.5px] ">{language === "fa-IR" ? `کاشی های مشابه` : language === "en" ? `Similar tiles` : ""}</h5>
            </Col>
          </Row>
          <Row>
            <span className='w-[85vw] h-[2px] bg-red mb-[25px]'></span>
          </Row>
          <Row>
            <Col className="xs:px-0">
              <ShopWide02 filter={false} grid=" gutter-extra-large text-center" data={data.tileData.similar} />
            </Col>
          </Row>
        </Container>
      </section>}
      {/* Section End */}
    </div>
  )
}

export default SingleProduct