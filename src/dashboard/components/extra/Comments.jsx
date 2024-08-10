import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import Buttons from '../../../Components/Button/Buttons'
import { Col, Row } from 'react-bootstrap'

import { Form, Formik } from 'formik';
import { m, AnimatePresence } from 'framer-motion';
import moment from 'jalali-moment'
import axios from "axios";
import { ContactFormStyle02Schema } from '../../../Components/Form/FormSchema';

import { resetForm } from "../../../Functions/Utilities";
import MessageBox from '../../../Components/MessageBox/MessageBox';
import { redirect } from "react-router-dom";
export const CommentsLoader = () => {
  if (localStorage.getItem("userRole") !== "نماینده") {
    alert("شما اجازه دسترسی به این صفحه را ندارید.")
    return redirect("/dashboard")
  }
  return null
}


const Comments = () => {
    const token = useSelector(state => state.State.readToken)
    const host = useSelector(state => state.State.host)
  
    
    const [err, setErr] = useState(false)
    const [commentSend, setCommentSend] = useState(null)
    const [comments, setComments] = useState();
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState(
        {
          fullName: "",
          email: "",
          phone: "",
          comment: ""
        }
      );
    
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
        const sendId = localStorage.getItem("userInfo")
        if (formData.fullName !== "" && formData.email !== "" && formData.comment !== "") {
          await axios.post(`${host}/api/bazkhwrd-nmayndgans`, {
            data: {
                fullName: formData.fullName,
                email: formData.email,
                massage: formData.comment,
                senderId: sendId,
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
        const sendId = localStorage.getItem("userInfo")
        const GetData = async () => {
          // eslint-disable-next-line
            await axios.get(`${host}/api/bazkhwrd-nmayndgans?filters\[senderId]=${sendId}&populate=deep`, {
                headers: { Authorization: `Bearer ${token}` }
              }).then(res => {
                setComments(res.data.data)
                setLoading(true)
              })
        }
        GetData()
      },[host, token])

    return <>
    {loading && <div>
    <Row className="justify-center mb-[5.5rem]">
                              
                              {comments[0] && comments.reverse().map(comment => {
                                const date = comment.attributes.createdAt.split("T")
                                const time = date[1].split(".")
                                return (
                                  <>
                                    <Col xs={12} lg={10} className='mb-12 '>
                                      <div className="flex w-full md:items-end sm:block ">
                                        <div className="w-[75px] sm:w-[50px] sm:mb-[10px] ml-[15px]">
                                          <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" width="" height="" className="rounded-full w-[75%] sm:w-full" alt="" />
                                        </div>
                                        <div className="w-full custom-boarder rounded-[5px] pl-[25px] sm:pl-0 bg-white box-shadow">
                                          <div className="text-balck hover:text-fastblue font-medium text-xlg">{comment.attributes.fullName}</div>
                                          <div className="text-md text-spanishgray mb-[15px]"> <span> {moment.utc(`T${time[0]}.00-03:30`, "THH:mm:ss.SSZ").format("HH:mm:ss")}  </span> <span> {moment(date[0], 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD')} </span>  </div>
                                          <p className="w-[100%] text-xmd text-justify">{comment.attributes.massage}</p>
                                        </div>
                                      </div>
                                    </Col>
                                  </>
                                )
                              })}
                            </Row>
                            <Row className="justify-center">
                              <Col lg={10} className="mb-8">
                                <h6 className=" text-balck font-medium mb-[5px] text-[18px]">نظرات خود را با ما به اشتراک بگذارید</h6>
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
                                            placeholder="نام و نام خانوادگی"
                                            onChange={handelChange}
                                            value={formData.fullName}
                                            className="rounded-[5px] py-[15px] px-[20px] w-full border-[1px] border-solid border-[#dfdfdf] box-shadow"
                                          />
                                        {/* <Input showErrorMsg={false} label={<span className="inline-block mb-[15px]">نام و نام خانوادگی <span className="text-[#fb4f58]">*</span> </span>} type="text" name="name" labelClass="mb-[25px]" className="rounded-[5px] py-[15px] px-[20px] w-full border-[1px] border-solid border-[#dfdfdf]" placeholder="نام و نام خانوادگی خود را وارد کنید" /> */}
                                      </Col>
                                      <Col md={6} sm={12} xs={12}>
                                      <input
                                            type="text"
                                            name="email"
                                            placeholder="ایمیل"
                                            onChange={handelChange}
                                            value={formData.email}
                                            className="rounded-[5px] py-[15px] px-[20px] w-full border-[1px] border-solid border-[#dfdfdf] box-shadow"
                                          />
                                      </Col>
                                      <Col md={12} sm={12} xs={12}>
                                        <textarea className="mt-[25px] mb-[1.5rem] rounded-[5px] py-[15px] px-[20px] h-[120px] w-full box-shadow border border-[#dfdfdf] text-md resize-none" rows="6" name="comment" placeholder="متن خود را وارد کنید" onChange={handelChange}></textarea>
                                      </Col>
                                      <Col>
                                        
                                        <div className="flex items-center justify-center">
                                        {commentSend !== null ?
                                              commentSend === "OK" ? 
                                                <span className='mr-4'>نظر شما با موفقیت ارسال شد !</span>
                                               :
                                                <span className='mr-4'>مشکلی در هنگام ارسال پیش آمد، لطفا بعدا دوباره تلاش کنید</span>
                                                
                                            : <></>}
                                        {err ? <span className='mr-4 c-c-red'>لطفا همه بخش های مورد نیاز را کامل کنید</span> : <></>}      
                                        </div>  
                                        <div className="flex items-center justify-center">
                                            <button className="border border-[#dfdfdf] bg-[#ff3030] text-white hover:bg-[#ff3030] button-custom w-auto mt-[20px] rounded-[6px]" onClick={handelSubmmit}> ارسال </button>
                                        </div>
                                      </Col>
                                      <AnimatePresence>
                                        {status && <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><MessageBox className="mt-[20px] text-center py-[10px]" theme="message-box01" variant="success" message="پیام شما با موفقیت ارسال شد !" /></m.div>}
                                      </AnimatePresence>
                                    </Form>
                                  )}
                                </Formik>
                              </Col>
                            </Row>
    </div>}
    </>
}

export default Comments