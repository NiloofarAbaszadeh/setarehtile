import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
// Libraries
import { Col, Container, Row } from 'react-bootstrap'
import { Formik, Form } from 'formik';
import { Link, Navigate } from 'react-router-dom'
import { m } from 'framer-motion';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

// Components
import { Checkbox } from '../../Components/Form/Form'
import Buttons from '../../Components/Button/Buttons'
import { fadeIn } from "../../Functions/GlobalAnimations";
import { resetForm } from '../../Functions/Utilities';
import axios from 'axios';
import { ScaleLoader } from 'react-spinners';
import image from "../../Assets/images/one-person.jpg"

const LoginRegister = () => {
  const location = useLocation()
  const token = useSelector(state => state.State.readToken)
  const host = useSelector(state => state.State.host)
  const [loading, setLoading] = useState(false) 
  const [loadingScreen, setLoadingScreen] = useState(false)
  const [user, setUser] = useState(false)
  const [err, setErr] = useState(false) // for no username
  const [err2, setErr2] = useState(false) // for not thr right password
  const check = localStorage.getItem("userInfo")
  const [formData, setFormData] = useState(
    { user: "",
      password: "",})

const handelChange = (event) => {
  setErr(false)
  setErr2(false)
  const { name, value, type, checked } = event.target
  setFormData(pervFormData => {
    return {
      ...pervFormData,
      [name]: type === "checkbox" ? checked : value
    }})}

const DirectToDashboard = (user) => {
  if (user.password === formData.password) {
    localStorage.setItem("userInfo",user.username)
    localStorage.setItem("userRole",user.role)
    setUser(true)
  } else {setErr2(true)}}

  const handelSubmmit = async (event) => {
    event.preventDefault()
    try {
      // eslint-disable-next-line
      await axios.get(`${host}/api/karbrans?filters\[username]=${formData.user}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        res.data.data.length !== 0 ? DirectToDashboard(res.data.data[0].attributes)  : setErr(true)
      })} catch (e) {console.log(e)}}

    const scrollToTop = () => {
      window.scrollTo({
          top: 100,
      })}

  useEffect(() => {
    setTimeout(() => {
      scrollToTop()
      setLoading(true)
      setLoadingScreen(true)
    }, 3000)
  }, [host, token])

  useLayoutEffect(() => {
    setLoading(false)
  }, [location.pathname])
  return (
    <div >
      <Helmet>
        <title> ورود | کاشی و سرامیک ستاره  </title>
      </Helmet>
      {(user || check) && <Navigate to="/dashboard" replace={true} />}
      {!loadingScreen && <div className='flex justify-center items-center bg-white w-full h-[100vh] fixed top-0 fix z-50 top-[-25px]'>
        <ScaleLoader
        color={"#db1010"}
        loading={!loadingScreen}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>}
      {loadingScreen && loading && <m.section className="fix bg-cover top-0 bg-darkslateblue h-[100vh] flex items-center justify-center"{...fadeIn} style={{ backgroundImage: `url('${image}')` }} >
        <Container>
          <Row className="justify-center items-center">
            <Col xl={5} md={6} className="lg:px-[30px] md:px-[15px] sm:mb-[40px]">
              <h6 className="hidden font-medium text-white">ورود به سایت</h6>
              <div className="bg-lightgray p-12 lg:mt-[-135px] md:p-10 rounded-[5px]">
                <Formik
                  initialValues={{ username: '', password: '' }}
                  validationSchema={Yup.object().shape({
                    username: Yup.string().email("Invalid email.").required("Field is required."),
                    password: Yup.string().required("Field is required.")
                  })}
                  onSubmit={async (actions) => {
                    resetForm(actions)
                  }}
                >
                  {() => (
                    <div className='flex-fix'>
                      <div>
                        <Link to={'/'}><img src={`${host}/uploads/logo_e4ee97606d.png`} alt=''></img></Link>
                      </div>
                      <div>
                        <Form>
                        <div className="mt-[25px] mb-[10px]">نام کاربری<span className="text-[#fb4f58]"> * </span></div>
                        <input
                          type="text"
                          name="user"
                          placeholder="نام کاربری"
                          onChange={handelChange}
                          value={formData.user}
                          className="py-[13px] px-[15px] text-md leading-[initial] w-full border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                          required
                        /> 
                        <div className="mt-[25px] mb-[10px]">رمز عبور<span className="text-[#fb4f58]"> * </span></div>
                        <input
                          type="password"
                          name="password"
                          placeholder="رمز عبور"
                          onChange={handelChange}
                          value={formData.password}
                          className="py-[13px] px-[15px] text-md leading-[initial] w-full border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                          required/>
                          <Checkbox type="checkbox" name="terms_condition" className="inline-block mr-[5px] mt-[15px]" labelClass="flex items-center mb-[25px]">
                            <span className="mr-[5px] text-base mt-[15px]"> مرا به خاطر بسپار </span>
                          </Checkbox>
                            <Buttons onClick={handelSubmmit} ariaLabel="ورود" type="submit" className="btn-fill btn-fancy w-full font-bold text-xxlg uppercase rounded-[7px]" themeColor="#BF0D19" color="#fff" size="md" title="ورود"/>
                          {err && <div className="text-center c-c-red mt-[20px]">
                            <p className='text-[12px] px-2'>نام کاربری اشتباه است</p>
                          </div>}
                          {err2 && <div className="text-center c-c-red mt-[20px]">
                            <p className='text-[12px] px-2'>رمز عبور اشتباه است</p>
                          </div>}
                          <div className="text-right mt-[20px]">
                            <p className='text-[11px] text-gray px-2'>در صورت فراموشی اطلاعات خود، با بخش اطلاعاتی مربوطه تماس بگیرید</p>
                          </div>
                        </Form>
                      </div>
                    </div>)}
                </Formik>
              </div>
            </Col>
          </Row>
        </Container>
      </m.section>}
    </div>)}

export default LoginRegister