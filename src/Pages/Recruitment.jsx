import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Card } from "@material-tailwind/react"
import axios from "axios"
import { Parallax } from "react-scroll-parallax"
import { Col, Container, Row } from 'react-bootstrap'
import image from "../Assets/images/recruitment image.png"
import { ScaleLoader } from 'react-spinners'; 

const TABLE_HEAD = ["شرکت", "سمت", "سابقه کار", "حقوق دریافتی (به ریال)", "علت ترک کار", "آدرس", "شماره تلفن"];

const Recruitment = () => {
    const host = useSelector(state => state.State.host)
    const [state, setState] = useState(null)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState(
        {
            fullName: "",
            fatherName: "",
            id: "",
            nationalCode: "",
            birthDay: "",
            birthPlace: "",
            weight: "",
            height: "",
            maritalStatus: "",
            children: "",
            physicalCondition: "",
            address: "",
            addressState: "",
            phone: "",
            mobile: "",

            militaryService: "",
            serviceUnit: "",
            remissionState: "",
            remissionReason: "",

            lastEducationalCertificate: "",
            fieldOfStudy: "",
            university: "",
            specializedCertificate: "",
            internshipHistory: "",
            language: "",
            languageState: "",

            workExperience1company: "",
            workExperience1side: "",
            workExperience1workExperience: "",
            workExperience1income: "",
            workExperience1leavingReason: "",
            workExperience1address: "",
            workExperience1phonNumber: "",
            
            workExperience2company: "",
            workExperience2side: "",
            workExperience2workExperience: "",
            workExperience2income: "",
            workExperience2leavingReason: "",
            workExperience2address: "",
            workExperience2phonNumber: "",
            
            workExperience3company: "",
            workExperience3side: "",
            workExperience3workExperience: "",
            workExperience3income: "",
            workExperience3leavingReason: "",
            workExperience3address: "",
            workExperience3phonNumber: "",
            
            demandedJob: "",
            salaryRequested: "",
            allowChangeSide: "",
            experienceInSetareh: "",
            acquaintanceToSetareh: "",
            
            missionOutsideWorkTime: "",
            workThreeShiftes: "",
            requestExtraBenefits: "",
            currentWorkPlace: "",
            insuranceNumber: "",
            skillsAtWork: "",
            extraWork: "",

            familyfather: "",
            familyfathersJob: "",
            familymather: "",
            familymathersJob: "",
            familybrathers: "",
            familysisters: "",
            familyspouse: "",
            familyspousesJob: "",
        
            introduceBy1fullName: "",
            introduceBy1relationship: "",
            introduceBy1address: "",
            introduceBy1mobile: "",
        
            introduceBy2fullName: "",
            introduceBy2relationship: "",
            introduceBy2address: "",
            introduceBy2mobile: "",
        
            acquaintancesInfo: "",
        })

    const handelChange = (event) => {
    const { name, value } = event.target
    setFormData(pervFormData => {
        return {
          ...pervFormData,
          [name]: value
    }})}
    useEffect(() => {
      
      setTimeout(() => {
        setLoading(true)
      }, 1500)
    }, [])

  const handelSubmmit = async (event) => {
    event.preventDefault()
      await axios.post(`${host}/api/recruitment-forms`, {
        data: {
          acquaintanceToSetareh: formData.acquaintanceToSetareh,
          acquaintancesInfo: formData.acquaintancesInfo,
          address: formData.address,
          addressState: formData.addressState,
          allowChangeSide: formData.allowChangeSide === "بله" ? true : false,
          birthDay: formData.birthDay,
          birthPlace: formData.birthPlace,
          children: formData.children,
          currentWorkPlace: formData.currentWorkPlace,
          demandedJob: formData.demandedJob,
          experienceInSetareh: formData.experienceInSetareh,
          extraWork: formData.extraWork === "بله" ? true : false,
          familybrathers: formData.familybrathers,
          familyfathersJob: formData.familyfathersJob,
          familymather: formData.familymather,
          familymathersJob: formData.familymathersJob,
          familysisters: formData.familysisters,
          familyspouse: formData.familyspouse,
          familyspousesJob: formData.familyspousesJob,
          fatherName: formData.fatherName,
          fieldOfStudy: formData.fieldOfStudy,
          fullName: formData.fullName,
          height: formData.height,
          insuranceNumber: formData.insuranceNumber,
          internshipHistory: formData.internshipHistory,
          introduceBy1address: formData.introduceBy1address,
          introduceBy1fullName: formData.introduceBy1fullName,
          introduceBy1mobile: formData.introduceBy1mobile,
          introduceBy1relationship: formData.introduceBy1relationship,
          introduceBy2address: formData.introduceBy2address,
          introduceBy2fullName: formData.introduceBy2fullName,
          introduceBy2mobile: formData.introduceBy2mobile,
          introduceBy2relationship: formData.introduceBy2relationship,
          language: formData.language,
          languageState: formData.languageState,
          lastEducationalCertificate: formData.lastEducationalCertificate,
          maritalStatus: formData.maritalStatus,
          militaryService: formData.militaryService,
          missionOutsideWorkTime: formData.missionOutsideWorkTime === "بله" ? true : false,
          mobile: formData.mobile,
          nationalCode: formData.nationalCode,
          personId: formData.id,
          phone: formData.phone,
          physicalCondition: formData.physicalCondition,
          remissionReason: formData.remissionReason,
          remissionState: formData.remissionState,
          requestExtraBenefits: formData.requestExtraBenefits,
          salaryRequested: formData.salaryRequested,
          serviceUnit: formData.serviceUnit,
          skillsAtWork: formData.skillsAtWork,
          specializedCertificate: formData.specializedCertificate,
          university: formData.university,
          weight: formData.weight,
          workExperience1address: formData.workExperience1address,
          workExperience1company: formData.workExperience1company,
          workExperience1income: formData.workExperience1income,
          workExperience1leavingReason: formData.workExperience1leavingReason,
          workExperience1phonNumber: formData.workExperience1phonNumber,
          workExperience1side: formData.workExperience1side,
          workExperience1workExperience: formData.workExperience1workExperience,
          workExperience2address: formData.workExperience2address,
          workExperience2company: formData.workExperience2company,
          workExperience2income: formData.workExperience2income,
          workExperience2leavingReason: formData.workExperience2leavingReason,
          workExperience2phonNumber: formData.workExperience2phonNumber,
          workExperience2side: formData.workExperience2side,
          workExperience2workExperience: formData.workExperience2workExperience,
          workExperience3address: formData.workExperience3address,
          workExperience3company: formData.workExperience3company,
          workExperience3income: formData.workExperience3income,
          workExperience3leavingReason: formData.workExperience3leavingReason,
          workExperience3phonNumber: formData.workExperience3phonNumber,
          workExperience3side: formData.workExperience3side,
          workExperience3workExperience: formData.workExperience3workExperience,
          workThreeShiftes: formData.workThreeShiftes === "بله" ? true : false,
        }
      }).then(res => {
        setState(true)
      }).catch(res => {
        setState(false)
      })}

    return <>
      {!loading && <div className='flex justify-center items-center bg-white w-full h-[100vh] fixed top-0 fix z-50 '>
          <ScaleLoader
          color={"#db1010"}
          loading={!loading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"/></div>}
      <div className="h-[400px] lg:h-[580px] md:h-[550px] sm:h-[500px] xs:h-[380px] overflow-hidden relative">
          <div className='absolute top-0 left-0 w-full h-full bg-darkgray opacity-60 z-[1]'></div>
          <Parallax className="lg-no-parallax bg-cover absolute -top-[50px] left-0 w-full h-[100vh] z-0 lg:-top-[70px] md:h-[600px] md:-top-[50px] xs:h-[450px] " translateY={[-40, 40]} style={{ backgroundImage: `url('${image}')` }}></Parallax>
          <Container className="h-full relative z-[2]">
            <Row className="justify-center h-full">
              <Col xl={6} lg={7} md={8} className="relative font-serif text-center flex justify-center flex-col">
                <h2 className="text-white font-medium -tracking-[1px] mb-0 text-[50px]">استخدام</h2>
              </Col>
            </Row>
          </Container>
      </div>

            <div className="flex items-center justify-center mt-24">
              <p className="text-[30px]">فرم درخواست کار کاشی و سرامیک ستاره میبد</p>
            </div>
            <form onSubmit={handelSubmmit}>
                {/*  for cols in responsive uI/uX */}
                <p className="mr-[12vw] mt-12 mb-4 text-[20px]"><span className="ti-user text-red ml-2"></span>مشخصات متقاضی</p>
                <div className="mx-24 xs:mx-4 flex flex-col items-center justify-center">
                    {/* مشخصات متقاضی */}
                    <div className="flex xs:flex-col items-start xs:items-center justify-center bg-white boarder-2 box-shadow w-full pb-12 pt-6 w-max rounded-[5px]">
                        {/* right side */}
                        <div className="w-[40vw] xs:w-[80vw] flex items-start justify-center">  
                            <div>
                                <div className="flex flex-col items-start justify-center">
                                    <label className="mt-[18px] mb-[10px]" name="fullname">نام و نام خانوادگی<span className="text-[#fb4f58]"> * </span></label>
                                    <input
                                      // onInvalid={() => {
                                      //   document
                                      //     .getElementById("fullname")
                                      //     .setCustomValidity("لطفا این بخش را کامل کنید");
                                      // }}
                                      type="text"
                                      name="fullName"
                                      id="fullname"
                                      placeholder="نام و نام خانوادگی"
                                      onChange={handelChange}
                                      value={formData.fullName}
                                      className="w-[14vw] xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial]  border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                                      required
                                    /> 
                                </div>

                                <div className="flex flex-col items-start justify-center">
                                    <label className="mt-[18px] mb-[10px]">شماره شناسنامه<span className="text-[#fb4f58]"> * </span></label>
                                    <input
                                      // onInvalid={() => {
                                      //   document
                                      //     .getElementById("id")
                                      //     .setCustomValidity("لطفا این بخش را کامل کنید");
                                      // }}
                                      type="text"
                                      name="id"
                                      id="id"
                                      placeholder="شماره شناسنامه"
                                      onChange={handelChange}
                                      value={formData.id}
                                      className="w-[14vw] xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial]  border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                                      required
                                    /> 
                                </div>

                                <div className="flex flex-col items-start justify-center">
                                    <label className="mt-[18px] mb-[10px]">تاریخ تولد<span className="text-[#fb4f58]"> * </span></label>
                                    <input
                                      // onInvalid={() => {
                                      //   document
                                      //     .getElementById("birthDay")
                                      //     .setCustomValidity("لطفا این بخش را کامل کنید");
                                      // }}
                                      id="birthDay"
                                      type="text"
                                      name="birthDay"
                                      placeholder="تاریخ تولد"
                                      onChange={handelChange}
                                      value={formData.birthDay}
                                      className="w-[14vw] xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial]  border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                                      required
                                    /> 
                                </div>

                                <div className="flex flex-col items-start justify-center">
                                    <label className="mt-[18px] mb-[10px]">وزن<span className="text-[#fb4f58]"> * </span></label>
                                    <input
                                      // onInvalid={() => {
                                      //   document
                                      //     .getElementById("weight")
                                      //     .setCustomValidity("لطفا این بخش را کامل کنید");
                                      // }}
                                      id="weight"
                                      type="text"
                                      name="weight"
                                      placeholder="وزن"
                                      onChange={handelChange}
                                      value={formData.weight}
                                      className="w-[14vw] xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial]  border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                                      required
                                    /> 
                                </div>

                                <div className="flex flex-col items-start justify-center ">
                                    <label className="mt-[18px] mb-[10px]">وضعیت تاهل<span className="text-[#fb4f58]"> * </span></label>   
                                    <div className="w-[14vw] xs:w-[25vw] border-[1px] border-solid border-[#dfdfdf] rounded-[2px] pl-[7px]">
                                    <select name="maritalStatus" id="maritalStatus" 
                                    // onInvalid={() => {
                                    //   document
                                    //     .getElementById("maritalStatus")
                                    //     .setCustomValidity("لطفا این بخش را کامل کنید");
                                    // }}
                                    onChange={handelChange}
                                    value={formData.maritalStatus}
                                    className="py-[13px] px-[15px] text-md leading-[initial] w-full "
                                    required
                                    placeholder="وضعیت تاهل">
                                        <option className="text-[14px]" value=""></option>
                                        <option className="text-[14px]" value="مجرد">مجرد</option>
                                        <option className="text-[14px]" value="متاهل">متاهل</option>
                                    </select>
                                    </div>
                                </div>
                            </div>
                    
                            <div className="mr-12">
                                <div className="flex flex-col items-start justify-center">
                                    <label className="mt-[18px] mb-[10px]">نام پدر<span className="text-[#fb4f58]"> * </span></label>
                                    <input
                                      // onInvalid={() => {
                                      //   document
                                      //     .getElementById("fatherName")
                                      //     .setCustomValidity("لطفا این بخش را کامل کنید");
                                      // }}
                                      id="fatherName"
                                      type="text"
                                      name="fatherName"
                                      placeholder="نام پدر"
                                      onChange={handelChange}
                                      value={formData.fatherName}
                                      className="w-[14vw] xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial]  border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                                      required
                                    /> 
                                </div>

                                <div className="flex flex-col items-start justify-center">
                                    <label className="mt-[18px] mb-[10px]">کد ملی<span className="text-[#fb4f58]"> * </span></label>
                                    <input
                                      // onInvalid={() => {
                                      //   document
                                      //     .getElementById("nationalCode")
                                      //     .setCustomValidity("لطفا این بخش را کامل کنید");
                                      // }}
                                      id="nationalCode"
                                      type="text"
                                      name="nationalCode"
                                      placeholder="کد ملی"
                                      onChange={handelChange}
                                      value={formData.nationalCode}
                                      className="w-[14vw] xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial]  border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                                      required
                                    /> 
                                </div>

                                <div className="flex flex-col items-start justify-center">
                                    <label className="mt-[18px] mb-[10px]">محل تولد<span className="text-[#fb4f58]"> * </span></label>
                                    <input
                                      
                                      id="birthPlace"
                                      type="text"
                                      name="birthPlace"
                                      placeholder="محل تولد"
                                      onChange={handelChange}
                                      value={formData.birthPlace}
                                      className="w-[14vw] xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial]  border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                                      required
                                    /> 
                                </div>

                                <div className="flex flex-col items-start justify-center">
                                    <label className="mt-[18px] mb-[10px]">قد<span className="text-[#fb4f58]"> * </span></label>
                                    <input
                                      // onInvalid={() => {
                                      //   document
                                      //     .getElementById("height")
                                      //     .setCustomValidity("لطفا این بخش را کامل کنید");
                                      // }}
                                      id="height"
                                      type="text"
                                      name="height"
                                      placeholder="قد"
                                      onChange={handelChange}
                                      value={formData.height}
                                      className="w-[14vw] xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial] border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                                      required
                                    /> 
                                </div> 

                                <div className="flex flex-col items-start justify-center">
                                    <label className="mt-[18px] mb-[10px]">تعداد فرزندان<span className="text-[#fb4f58]"> * </span></label>
                                    <input
                                      // onInvalid={() => {
                                      //   document
                                      //     .getElementById("children")
                                      //     .setCustomValidity("لطفا این بخش را کامل کنید");
                                      // }}
                                      // onInput="this.setCustomValidity('')"
                                      id="children"
                                      type="text"
                                      name="children"
                                      placeholder="تعداد فرزندان"
                                      onChange={handelChange}
                                      value={formData.children}
                                      className="w-[14vw] xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial]  border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                                      required
                                    /> 
                                </div> 
                            </div>
                        </div>

                        {/* left side */}
                        <div className="flex flex-col items-start xs:items-center justify-center w-[40vw] xs:w-[80vw]">
                            <div className="flex items-center justify-center">
                                <div className="flex flex-col items-start justify-center">
                                    <label className="mt-[18px] mb-[10px]">وضعیت جسمانی<span className="text-[#fb4f58]"> * </span></label>
                                    <div className="w-[14vw] xs:w-[25vw] border-[1px] border-solid border-[#dfdfdf] rounded-[2px] pl-[7px]">
                                    <select name="physicalCondition" id="physicalCondition"
                                    // onInvalid={() => {
                                    //   document
                                    //     .getElementById("physicalCondition")
                                    //     .setCustomValidity("لطفا این بخش را کامل کنید");
                                    // }}
                                    onChange={handelChange}
                                    value={formData.physicalCondition}
                                    className="py-[13px] px-[15px] text-md leading-[initial] w-full"
                                    required>
                                        <option className="text-[14px]" value=""></option>
                                        <option className="text-[14px]" value="سالم">سالم</option>
                                        <option className="text-[14px]" value="دارای نقض عضو">دارای نقض عضو</option>
                                    </select>
                                    </div>
                                </div>
                                <div className="flex flex-col items-start justify-center mr-24 xs:mr-12">
                                    <label className="mt-[18px] mb-[10px]">وضعیت مسکن<span className="text-[#fb4f58]"> * </span></label>
                                    <div className="w-[14vw] xs:w-[25vw] border-[1px] border-solid border-[#dfdfdf] rounded-[2px] pl-[7px]">
                                    <select name="addressState" id="addressState"
                                    // onInvalid={() => {
                                    //   document
                                    //     .getElementById("addressState")
                                    //     .setCustomValidity("لطفا این بخش را کامل کنید");
                                    // }}
                                    onChange={handelChange}
                                    value={formData.addressState}
                                    className="py-[13px] px-[15px] text-md leading-[initial] w-full"
                                    required>
                                        <option className="text-[14px]" value=""></option>
                                        <option className="text-[14px]" value="استیجاری">استیجاری</option>
                                        <option className="text-[14px]" value="شخصی">شخصی</option>
                                        <option className="text-[14px]" value="سایر">سایر</option>
                                    </select>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-start justify-start">
                                <label className="mt-[18px] mb-[10px]">نشانی کامل محل سکونت فعلی<span className="text-[#fb4f58]"> * </span></label>
                                <input
                                  id="address"
                                  // onInvalid={() => {
                                  //   document
                                  //     .getElementById("address")
                                  //     .setCustomValidity("لطفا این بخش را کامل کنید");
                                  // }}
                                  type="text"
                                  name="address"
                                  placeholder="نشانی کامل محل سکونت فعلی"
                                  onChange={handelChange}
                                  value={formData.address}
                                  className="w-[36vw] xs:w-[55vw] h-[145px] py-[13px] px-[15px] text-md leading-[initial] border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                                  required
                                /> 
                            </div> 

                            <div className="flex items-center justify-center">
                                <div className="flex flex-col items-start justify-center">
                                    <label className="mt-[18px] mb-[10px]">تلفن ثابت<span className="text-[#fb4f58]"> * </span></label>
                                    <input
                                      id="phone"
                                      // onInvalid={() => {
                                      //   document
                                      //     .getElementById("phone")
                                      //     .setCustomValidity("لطفا این بخش را کامل کنید");
                                      // }}
                                      type="text"
                                      name="phone"
                                      placeholder="تلفن ثابت"
                                      onChange={handelChange}
                                      value={formData.phone}
                                      className="w-[15vw] xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial] border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                                      required
                                    /> 
                                </div>
                                <div className="flex flex-col items-start justify-center mr-24 xs:mr-12">
                                    <label className="mt-[18px] mb-[10px]">تلفن همراه<span className="text-[#fb4f58]"> * </span></label>
                                    <input
                                      id="mobile"
                                      // onInvalid={() => {
                                      //   document
                                      //     .getElementById("mobile")
                                      //     .setCustomValidity("لطفا این بخش را کامل کنید");
                                      // }}
                                      type="text"
                                      name="mobile"
                                      placeholder="تلفن همراه"
                                      onChange={handelChange}
                                      value={formData.mobile}
                                      className="w-[15vw] xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial] border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                                      required
                                    /> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="mr-[12vw] mt-12 mb-4 text-[20px]"><span className="ti-id-badge text-red ml-2"></span>وضعیت سربازی</p>
                {/* وضعیت نظام وضیفه */}
                <div className="mx-24 flex flex-col items-center justify-center ">
                <div className="grid xl:grid-cols-4 xs:grid-cols-2 gap-8 items-start justify-start bg-white boarder-2 box-shadow pb-12 pt-6 rounded-[5px] w-[80vw] px-20">
                        <div className="flex flex-col items-start justify-center">
                        <label className="mt-[18px] mb-[10px]">وضعیت سربازی<span className="text-[#fb4f58]"> * برای آقایان</span></label>
                        <div className="w-[14vw] xs:w-[25vw] border-[1px] border-solid border-[#dfdfdf] rounded-[2px] pl-[7px]">
                        <select name="militaryService" id="militaryService"
                        // onInvalid={() => {
                        //   document
                        //     .getElementById("militaryService")
                        //     .setCustomValidity("لطفا این بخش را کامل کنید");
                        // }}
                        onChange={handelChange}
                        value={formData.militaryService}
                        className="py-[13px] px-[15px] text-md leading-[initial] w-full"
                        >
                            <option className="text-[14px]" value=""></option>
                            <option className="text-[14px]" value="پایان خدمت">پایان خدمت</option>
                            <option className="text-[14px]" value="معاف">معاف</option>
                        </select>
                        </div>
                        </div>
                        {/* در صورت پایان نظام وظیفه کامل شود */}
                        {formData.militaryService === "پایان خدمت" && <div className="flex flex-col items-start justify-center mr-12">
                            <label className="mt-[18px] mb-[10px]">یگان خدمتی<span className="text-[#fb4f58]"> * </span></label>
                            <input
                              id="serviceUnit"
                              // onInvalid={() => {
                              //   document
                              //     .getElementById("serviceUnit")
                              //     .setCustomValidity("لطفا این بخش را کامل کنید");
                              // }}
                              type="text"
                              name="serviceUnit"
                              placeholder="یگان خدمتی"
                              onChange={handelChange}
                              value={formData.serviceUnit}
                              className="w-[14vw] py-[13px] px-[15px] text-md leading-[initial] border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                              required
                            /> 
                        </div>}
                        {/* در صورت معافی کامل شود */}
                        {formData.militaryService === "معاف" && <div className="flex flex-col items-start justify-center mr-12">
                        <label className="mt-[18px] mb-[10px]">علت معافی<span className="text-[#fb4f58]"> * </span></label>
                        <div className="w-[14vw] xs:w-[25vw] border-[1px] border-solid border-[#dfdfdf] rounded-[2px] pl-[7px]">
                        <select name="remissionState" id="remissionState"
                        // onInvalid={() => {
                        //   document
                        //     .getElementById("remissionState")
                        //     .setCustomValidity("لطفا این بخش را کامل کنید");
                        // }}
                        onChange={handelChange}
                        value={formData.remissionState}
                        className="py-[13px] px-[15px] text-md leading-[initial] w-full"
                        required>
                            <option className="text-[14px]" value=""></option>
                            <option className="text-[14px]" value="پزشکی">پزشکی</option>
                            <option className="text-[14px]" value="سرپرست خانواده">سرپرست خانواده</option>
                            <option className="text-[14px]" value="غیره">غیره</option>
                        </select>
                        </div>
                        </div>}

                        {formData.militaryService === "معاف" && <div className="flex flex-col items-start justify-center mr-12">
                            <label className="mt-[18px] mb-[10px]">علت معافیت پزشکی و غیره<span className="text-[#fb4f58]"> * </span></label>
                            <input
                              id="remissionReason"
                              // onInvalid={() => {
                              //   document
                              //     .getElementById("remissionReason")
                              //     .setCustomValidity("لطفا این بخش را کامل کنید");
                              // }}
                              type="text"
                              name="remissionReason"
                              placeholder="علت معافیت"
                              onChange={handelChange}
                              value={formData.remissionReason}
                              className="w-[14vw] py-[13px] px-[15px] text-md leading-[initial] border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                              required
                            /> 
                        </div>}
                    </div>
                </div>

                {/* وضعیت تحصیلی */}
                <p className="mr-[12vw] mt-12 mb-4 text-[20px]"><span className="ti-write text-red ml-2"></span>وضعیت تحصیلی</p>
                <div className="mx-24 flex flex-col items-center justify-center ">
                    <div className="grid xl:grid-cols-4 xs:grid-cols-2 gap-8 items-start justify-start bg-white boarder-2 box-shadow pb-12 pt-6 rounded-[5px] w-[80vw] px-20">
                        <div className="flex flex-col items-start justify-center">
                            <label className="mt-[18px] mb-[10px]">آخرین مدرک تحصیلی<span className="text-[#fb4f58]"> * </span></label>
                            <input
                              id="lastEducationalCertificate"
                              // onInvalid={() => {
                              //   document
                              //     .getElementById("lastEducationalCertificate")
                              //     .setCustomValidity("لطفا این بخش را کامل کنید");
                              // }}
                              type="text"
                              name="lastEducationalCertificate"
                              placeholder="آخرین مدرک تحصیلی"
                              onChange={handelChange}
                              value={formData.lastEducationalCertificate}
                              className="w-[14vw] xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial] border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                              required
                            /> 
                        </div>

                        <div className="flex flex-col items-start justify-center">
                            <label className="mt-[18px] mb-[10px]">رشته تحصیلی<span className="text-[#fb4f58]"> * </span></label>
                            <input
                              id="fieldOfStudy"
                              // onInvalid={() => {
                              //   document
                              //     .getElementById("fieldOfStudy")
                              //     .setCustomValidity("لطفا این بخش را کامل کنید");
                              // }}
                              type="text"
                              name="fieldOfStudy"
                              placeholder="رشته تحصیلی"
                              onChange={handelChange}
                              value={formData.fieldOfStudy}
                              className="w-[14vw] xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial] border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                              required
                            /> 
                        </div>
                        <div className="flex flex-col items-start justify-center">
                            <label className="mt-[18px] mb-[10px]">دانشگاه<span className="text-[#fb4f58]"> * </span></label>
                            <input
                              id="university"
                              // onInvalid={() => {
                              //   document
                              //     .getElementById("university")
                              //     .setCustomValidity("لطفا این بخش را کامل کنید");
                              // }}
                              type="text"
                              name="university"
                              placeholder="دانشگاه"
                              onChange={handelChange}
                              value={formData.university}
                              className="w-[14vw] xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial] border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                              required
                            /> 
                        </div>
                        <div className="flex flex-col items-start justify-center">
                            <label className="mt-[18px] mb-[10px]">گواهینامه تخصصی</label>
                            <input
                              id="specializedCertificate"
                              // onInvalid={() => {
                              //   document
                              //     .getElementById("specializedCertificate")
                              //     .setCustomValidity("لطفا این بخش را کامل کنید");
                              // }}
                              type="text"
                              name="specializedCertificate"
                              placeholder="گواهینامه تخصصی"
                              onChange={handelChange}
                              value={formData.specializedCertificate}
                              className="w-[14vw] xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial] border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                            /> 
                        </div>
                        <div className="flex flex-col items-start justify-center">
                            <label className="mt-[18px] mb-[10px]">سابقه کارآموزی</label>
                            <input
                              id="internshipHistory"
                              type="text"
                              name="internshipHistory"
                              placeholder="سابقه کارآموزی"
                              onChange={handelChange}
                              value={formData.internshipHistory}
                              className="w-[14vw] xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial] border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                            /> 
                        </div>
                        <div className="flex flex-col items-start justify-center">
                            <label className="mt-[18px] mb-[10px]">آشنایی با زبان<span className="text-[#fb4f58]"> * </span></label>
                            <input
                              id="language"
                              // onInvalid={() => {
                              //   document
                              //     .getElementById("language")
                              //     .setCustomValidity("لطفا این بخش را کامل کنید");
                              // }}
                              type="text"
                              name="language"
                              placeholder="زبان انگلیسی، عربی، روسی و ..."
                              onChange={handelChange}
                              value={formData.language}
                              className="w-[14vw] xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial] border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                              required
                            /> 
                        </div>
                        <div className="flex flex-col items-start justify-center">
                        <label className="mt-[18px] mb-[10px]">میزان مهارت در زبان<span className="text-[#fb4f58]"> * </span></label>
                        <div className="w-[14vw] xs:w-[25vw] border-[1px] border-solid border-[#dfdfdf] rounded-[2px] pl-[7px]">
                        <select name="languageState" id="languageState"
                        // onInvalid={() => {
                        //   document
                        //     .getElementById("languageState")
                        //     .setCustomValidity("لطفا این بخش را کامل کنید");
                        // }}
                        onChange={handelChange}
                        value={formData.languageState}
                        className="py-[13px] px-[15px] text-md leading-[initial] w-full"
                        required>
                            <option className="text-[14px]" value=""></option>
                            <option className="text-[14px]" value="عالی">عالی</option>
                            <option className="text-[14px]" value="خوب">خوب</option>
                            <option className="text-[14px]" value="متوسط">متوسط</option>
                            <option className="text-[14px]" value="خیلی کم">خیلی کم</option>
                        </select>
                        </div>
                        </div>
                    </div>
                </div>

                {/* سوابق کاری */}
                <p className="mr-[12vw] mt-12 mb-4 text-[20px]"><span className="ti-bag text-red ml-2"></span>سوابق کاری</p>
                <div className="mx-24 flex flex-col items-center justify-center ">
                    <div className="flex flex-col items-start xs:items-center justify-start bg-white boarder-2 box-shadow w-full pb-12 pt-6 w-max rounded-[5px] w-[80vw] px-20">
                        <div>
                            <p className="xl:hidden xs:block "><span className="text-[#fb4f58]"> * </span>جهت پر کردن بهتر جدول، گوشی خود را بچرخانید </p>
                        </div>
                            <table className="w-[72vw] table-auto text-right ">
                              <thead>
                                <tr key={-1}>
                                  {TABLE_HEAD.map((head) => (
                                    <th key={head} className="border-2 border-slate-950/10 bg-white p-2">
                                        <p className="text-[14px] text-darkgray">{head}</p>
                                      </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                    <tr className="even:bg-blue-gray-50/50">
                                    <td className="m-0 p-0">
                                      <input
                                          type="text"
                                          name="workExperience1company"
                                          onChange={handelChange}
                                          value={formData.workExperience1company}
                                          className="w-full xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial]react-scroll-parallax border-[1px] border-solid border-[#dfdfdf]"
                                          
                                        /> 
                                    </td>
                                    <td className="m-0 p-0">
                                      <input
                                          type="text"
                                          name="workExperience1side"
                                          onChange={handelChange}
                                          value={formData.workExperience1side}
                                          className="w-full xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial]react-scroll-parallax border-[1px] border-solid border-[#dfdfdf]"
                                          
                                        />
                                    </td>
                                    <td className="m-0 p-0">
                                      <input
                                          type="text"
                                          name="workExperience1workExperience"
                                          onChange={handelChange}
                                          value={formData.workExperience1workExperience}
                                          className="w-full xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial]react-scroll-parallax border-[1px] border-solid border-[#dfdfdf]"
                                          
                                        />
                                    </td>
                                    <td className="m-0 p-0">
                                      <input
                                          type="text"
                                          name="workExperience1income"
                                          onChange={handelChange}
                                          value={formData.workExperience1income}
                                          className="w-full xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial]react-scroll-parallax border-[1px] border-solid border-[#dfdfdf]"
                                          
                                        />
                                    </td>
                                    <td className="m-0 p-0">
                                      <input
                                          type="text"
                                          name="workExperience1leavingReason"
                                          onChange={handelChange}
                                          value={formData.workExperience1leavingReason}
                                          className="w-full xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial]react-scroll-parallax border-[1px] border-solid border-[#dfdfdf]"
                                          
                                        />
                                    </td>
                                    <td className="m-0 p-0">
                                      <input
                                          type="text"
                                          name="workExperience1address"
                                          onChange={handelChange}
                                          value={formData.workExperience1address}
                                          className="w-full xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial]react-scroll-parallax border-[1px] border-solid border-[#dfdfdf]"
                                          
                                        />
                                    </td>
                                    <td className="m-0 p-0">
                                      <input
                                          type="text"
                                          name="workExperience1phonNumber"
                                          onChange={handelChange}
                                          value={formData.workExperience1phonNumber}
                                          className="w-full xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial]react-scroll-parallax border-[1px] border-solid border-[#dfdfdf]"
                                          
                                        />
                                    </td>
                                  </tr>
                                  <tr className="even:bg-blue-gray-50/50">
                                    <td className="m-0 p-0">
                                      <input
                                          type="text"
                                          name="workExperience2company"
                                          onChange={handelChange}
                                          value={formData.workExperience2company}
                                          className="w-full xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial]react-scroll-parallax border-[1px] border-solid border-[#dfdfdf]"
                                          
                                        /> 
                                    </td>
                                    <td className="m-0 p-0">
                                      <input
                                          type="text"
                                          name="workExperience2side"
                                          onChange={handelChange}
                                          value={formData.workExperience2side}
                                          className="w-full xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial]react-scroll-parallax border-[1px] border-solid border-[#dfdfdf]"
                                          
                                        />
                                    </td>
                                    <td className="m-0 p-0">
                                      <input
                                          type="text"
                                          name="workExperience2workExperience"
                                          onChange={handelChange}
                                          value={formData.workExperience2workExperience}
                                          className="w-full xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial]react-scroll-parallax border-[1px] border-solid border-[#dfdfdf]"
                                          
                                        />
                                    </td>
                                    <td className="m-0 p-0">
                                      <input
                                          type="text"
                                          name="workExperience2income"
                                          onChange={handelChange}
                                          value={formData.workExperience2income}
                                          className="w-full xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial]react-scroll-parallax border-[1px] border-solid border-[#dfdfdf]"
                                          
                                        />
                                    </td>
                                    <td className="m-0 p-0">
                                      <input
                                          type="text"
                                          name="workExperience2leavingReason"
                                          onChange={handelChange}
                                          value={formData.workExperience2leavingReason}
                                          className="w-full xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial]react-scroll-parallax border-[1px] border-solid border-[#dfdfdf]"
                                          
                                        />
                                    </td>
                                    <td className="m-0 p-0">
                                      <input
                                          type="text"
                                          name="workExperience2address"
                                          onChange={handelChange}
                                          value={formData.workExperience2address}
                                          className="w-full xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial]react-scroll-parallax border-[1px] border-solid border-[#dfdfdf]"
                                          
                                        />
                                    </td>
                                    <td className="m-0 p-0">
                                      <input
                                          type="text"
                                          name="workExperience2phonNumber"
                                          onChange={handelChange}
                                          value={formData.workExperience2phonNumber}
                                          className="w-full xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial]react-scroll-parallax border-[1px] border-solid border-[#dfdfdf]"
                                          
                                        />
                                    </td>
                                  </tr>
                                  <tr className="even:bg-blue-gray-50/50">
                                    <td className="m-0 p-0">
                                      <input
                                          type="text"
                                          name="workExperience3company"
                                          onChange={handelChange}
                                          value={formData.workExperience3company}
                                          className="w-full xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial]react-scroll-parallax border-[1px] border-solid border-[#dfdfdf]"
                                          
                                        /> 
                                    </td>
                                    <td className="m-0 p-0">
                                      <input
                                          type="text"
                                          name="workExperience3side"
                                          onChange={handelChange}
                                          value={formData.workExperience3side}
                                          className="w-full xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial]react-scroll-parallax border-[1px] border-solid border-[#dfdfdf]"
                                          
                                        />
                                    </td>
                                    <td className="m-0 p-0">
                                      <input
                                          type="text"
                                          name="workExperience3workExperience"
                                          onChange={handelChange}
                                          value={formData.workExperience3workExperience}
                                          className="w-full xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial]react-scroll-parallax border-[1px] border-solid border-[#dfdfdf]"
                                          
                                        />
                                    </td>
                                    <td className="m-0 p-0">
                                      <input
                                          type="text"
                                          name="workExperience3income"
                                          onChange={handelChange}
                                          value={formData.workExperience3income}
                                          className="w-full xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial]react-scroll-parallax border-[1px] border-solid border-[#dfdfdf]"
                                          
                                        />
                                    </td>
                                    <td className="m-0 p-0">
                                      <input
                                          type="text"
                                          name="workExperience3leavingReason"
                                          onChange={handelChange}
                                          value={formData.workExperience3leavingReason}
                                          className="w-full xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial]react-scroll-parallax border-[1px] border-solid border-[#dfdfdf]"
                                          
                                        />
                                    </td>
                                    <td className="m-0 p-0">
                                      <input
                                          type="text"
                                          name="workExperience3address"
                                          onChange={handelChange}
                                          value={formData.workExperience3address}
                                          className="w-full xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial]react-scroll-parallax border-[1px] border-solid border-[#dfdfdf]"
                                          
                                        />
                                    </td>
                                    <td className="m-0 p-0">
                                      <input
                                          type="text"
                                          name="workExperience3phonNumber"
                                          onChange={handelChange}
                                          value={formData.workExperience3phonNumber}
                                          className="w-full xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial]react-scroll-parallax border-[1px] border-solid border-[#dfdfdf]"
                                          
                                        />
                                    </td>
                                  </tr> 
                              </tbody>
                            </table>
                        
                        <div className="grid xl:grid-cols-4 xs:grid-cols-2 gap-8 items-center justify-start ">
                    <div className="flex flex-col items-start justify-center">
                            <label className="mt-[18px] mb-[10px]">شغل مورد تقاضا<span className="text-[#fb4f58]"> * </span></label>
                            <input
                              id="demandedJob"
                              // onInvalid={() => {
                              //   document
                              //     .getElementById("demandedJob")
                              //     .setCustomValidity("لطفا این بخش را کامل کنید");
                              // }}
                              type="text"
                              name="demandedJob"
                              placeholder="شغل مورد تقاضا"
                              onChange={handelChange}
                              value={formData.demandedJob}
                              className="w-[14vw] xs:w-[30vw] py-[13px] px-[15px] text-md leading-[initial] border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                              required
                            /> 
                        </div>
                        <div className="flex flex-col items-start justify-center">
                            <label className="mt-[18px] mb-[10px]">میزان حقوق درخواستی (به ریال)<span className="text-[#fb4f58]"> * </span></label>
                            <input
                              id="salaryRequested"
                              // onInvalid={() => {
                              //   document
                              //     .getElementById("salaryRequested")
                              //     .setCustomValidity("لطفا این بخش را کامل کنید");
                              // }}
                              type="text"
                              name="salaryRequested"
                              placeholder="میزان حقوق درخواستی"
                              onChange={handelChange}
                              value={formData.salaryRequested}
                              className="w-[14vw] xs:w-[30vw] py-[13px] px-[15px] text-md leading-[initial] border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                              required
                            /> 
                        </div>
                        <div className="flex flex-col items-start justify-center">
                            <label className="mt-[18px] mb-[10px]">سایر مزایا مورد تقاضا</label>
                            <input
                              type="text"
                              name="requestExtraBenefits"
                              placeholder="توضیحات"
                              onChange={handelChange}
                              value={formData.requestExtraBenefits}
                              className="w-[14vw] xs:w-[30vw] py-[13px] px-[15px] text-md leading-[initial] border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                              
                            /> 
                        </div>
                        <div className="flex flex-col items-start justify-center">
                            <label className="mt-[18px] mb-[10px] text-[12px]">در صورت سابقه بیمه، شماره بیمه خود را بنویسید</label>
                            <input
                              type="text"
                              name="insuranceNumber"
                              placeholder="شماره بیمه"
                              onChange={handelChange}
                              value={formData.insuranceNumber}
                              className="w-[18vw] xs:w-[38vw] py-[13px] px-[15px] text-md leading-[initial] border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                              
                            /> 
                        </div>
                        <div className="flex flex-col items-start justify-center">
                            <label className="mt-[18px] mb-[10px] text-[12px]">درصورت شاغل بودن، <br />محل کار فعلی خود را بنویسید</label>
                            <input
                              type="text"
                              name="currentWorkPlace"
                              placeholder="محل کار"
                              onChange={handelChange}
                              value={formData.currentWorkPlace}
                              className="w-[14vw] xs:w-[38vw] py-[13px] px-[15px] text-md leading-[initial] border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                              
                            /> 
                        </div>
                        <div className="flex flex-col items-start justify-center">
                            <label className="mt-[18px] mb-[10px] text-[12px]">نحوه آشنایی با کاشی و سرامیک ستاره<span className="text-[#fb4f58]"> * </span></label>
                            <input
                              id="acquaintanceToSetareh"
                              // onInvalid={() => {
                              //   document
                              //     .getElementById("acquaintanceToSetareh")
                              //     .setCustomValidity("لطفا این بخش را کامل کنید");
                              // }}
                              type="text"
                              name="acquaintanceToSetareh"
                              placeholder="توضیحات"
                              onChange={handelChange}
                              value={formData.acquaintanceToSetareh}
                              className="w-[14vw] xs:w-[30vw] py-[13px] px-[15px] text-md leading-[initial] border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                              required
                            /> 
                        </div>
                        
                    </div>
                    <div>
                        {/* سوالات بله و خیر */}
                        <div className="flex items-center mt-8">
                            <label htmlFor="vehicle2"> آیا حاضر به انجام مامورت بعد از ساعات اداری و روز های تعطیل هستید؟<span className="text-[#fb4f58]"> * </span></label>
                            <input className="mr-8" onChange={handelChange} type="checkbox" id="vehicle3" name="missionOutsideWorkTime" value="بله"></input>
                            <label className="mr-1" htmlFor="vehicle2">بله</label>
                            
                            <input className="mr-8" onChange={handelChange} type="checkbox" id="vehicle3" name="missionOutsideWorkTime" value="خیر"></input>
                            <label className="mr-1" htmlFor="vehicle2">خیر</label>
                        </div>
                        <div className="flex items-center mt-8">
                            <label htmlFor="vehicle2"> آیا حاضرید شرکت شغل شما را تغییر دهد؟<span className="text-[#fb4f58]"> * </span></label>
                            <input className="mr-8" onChange={handelChange} type="checkbox" id="vehicle3" name="allowChangeSide" value="بله"></input>
                            <label className="mr-1" htmlFor="vehicle2">بله</label>
                            
                            <input className="mr-8" onChange={handelChange} type="checkbox" id="vehicle3" name="allowChangeSide" value="خیر"></input>
                            <label className="mr-1" htmlFor="vehicle2">خیر</label>
                        </div>
                        <div className="flex items-center mt-8">
                            <label htmlFor="vehicle2"> آیا سابقه کار در شرکت کاشی ستاره دارید؟<span className="text-[#fb4f58]"> * </span></label>
                            <input className="mr-8" onChange={handelChange} type="checkbox" id="vehicle3" name="experienceInSetareh" value="بله"></input>
                            <label className="mr-1" htmlFor="vehicle2">بله</label>
                            
                            <input className="mr-8" onChange={handelChange} type="checkbox" id="vehicle3" name="experienceInSetareh" value="خیر"></input>
                            <label className="mr-1" htmlFor="vehicle2">خیر</label>
                        </div>
                        
                        <div className="flex items-center mt-8">
                            <label htmlFor="vehicle2"> آیا حاضرید در سه شیفت کار کنید؟<span className="text-[#fb4f58]"> * </span></label>
                            <input className="mr-8" onChange={handelChange} type="checkbox" id="vehicle3" name="workThreeShiftes" value="بله"></input>
                            <label className="mr-1" htmlFor="vehicle2">بله</label>
                            
                            <input className="mr-8" onChange={handelChange} type="checkbox" id="vehicle3" name="workThreeShiftes" value="خیر"></input>
                            <label className="mr-1" htmlFor="vehicle2">خیر</label>
                        </div>
                        <div className="flex items-center mt-8">
                            <label htmlFor="vehicle2"> آیا مایل به انجام اضافه کاری هستید؟<span className="text-[#fb4f58]"> * </span></label>
                            <input className="mr-8" onChange={handelChange} type="checkbox" id="vehicle3" name="extraWork" value="بله"></input>
                            <label className="mr-1" htmlFor="vehicle2">بله</label>
                            
                            <input className="mr-8" onChange={handelChange} type="checkbox" id="vehicle3" name="extraWork" value="خیر"></input>
                            <label className="mr-1" htmlFor="vehicle2">خیر</label>
                        </div>
                        <div className="flex flex-col items-start justify-center">
                            <label className="mt-[18px] mb-[10px]">در صورت استخدام در شرکت قادر به انجام چه کارهایی هستید؟<span className="text-[#fb4f58]"> * </span></label>
                            <input
                              id="skillsAtWork"
                              // onInvalid={() => {
                              //   document
                              //     .getElementById("skillsAtWork")
                              //     .setCustomValidity("لطفا این بخش را کامل کنید");
                              // }}
                              type="text"
                              name="skillsAtWork"
                              placeholder="توضیحات"
                              onChange={handelChange}
                              value={formData.skillsAtWork}
                              className="w-[34vw] xs:w-[70vw] h-[150px] py-[13px] px-[15px] text-md leading-[initial] border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                              required
                            /> 
                        </div>
                    </div>
                    </div>
                    
                </div>

                {/* اطلاعات اعضای خانواده */}
                <p className="mr-[12vw] mt-12 mb-4 text-[20px]"><span className="ti-bag text-red ml-2"></span>اطلاعات اعضای خانواده</p>
                <div className="mx-24 flex flex-col items-center justify-center ">
                    <div className="grid xl:grid-cols-4 xs:grid-cols-2 gap-8 items-start justify-start bg-white boarder-2 box-shadow pb-12 pt-6 rounded-[5px] w-[80vw] px-20">
                        
                        <div className="flex flex-col items-start justify-center">
                            <label className="mt-[18px] mb-[10px]">نام پدر<span className="text-[#fb4f58]"> * </span></label>
                            <input
                              id="fatherName"
                              // onInvalid={() => {
                              //   document
                              //     .getElementById("fatherName")
                              //     .setCustomValidity("لطفا این بخش را کامل کنید");
                              // }}
                              type="text"
                              name="fatherName"
                              placeholder="نام پدر"
                              onChange={handelChange}
                              value={formData.fatherName}
                              className="w-[14vw] xs:w-[30vw] py-[13px] px-[15px] text-md leading-[initial] border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                              required
                            /> 
                        </div>
                        <div className="flex flex-col items-start justify-center">
                            <label className="mt-[18px] mb-[10px]">شغل پدر<span className="text-[#fb4f58]"> * </span></label>
                            <input
                              id="familyfathersJob"
                              // onInvalid={() => {
                              //   document
                              //     .getElementById("familyfathersJob")
                              //     .setCustomValidity("لطفا این بخش را کامل کنید");
                              // }}
                              type="text"
                              name="familyfathersJob"
                              placeholder="شغل پدر"
                              onChange={handelChange}
                              value={formData.familyfathersJob}
                              className="w-[14vw] xs:w-[30vw] py-[13px] px-[15px] text-md leading-[initial] border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                              required
                            /> 
                        </div>
                        <div className="flex flex-col items-start justify-center">
                            <label className="mt-[18px] mb-[10px]">نام مادر<span className="text-[#fb4f58]"> * </span></label>
                            <input
                              id="familymather"
                              // onInvalid={() => {
                              //   document
                              //     .getElementById("familymather")
                              //     .setCustomValidity("لطفا این بخش را کامل کنید");
                              // }}
                              type="text"
                              name="familymather"
                              placeholder="نام مادر"
                              onChange={handelChange}
                              value={formData.familymather}
                              className="w-[14vw] xs:w-[30vw] py-[13px] px-[15px] text-md leading-[initial] border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                              required
                            /> 
                        </div>
                        <div className="flex flex-col items-start justify-center">
                            <label className="mt-[18px] mb-[10px] text-[12px]">شغل مادر</label>
                            <input
                              type="text"
                              name="familymathersJob"
                              placeholder="شغل مادر"
                              onChange={handelChange}
                              value={formData.familymathersJob}
                              className="w-[14vw] xs:w-[38vw] py-[13px] px-[15px] text-md leading-[initial] border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                            /> 
                        </div>
                        <div className="flex flex-col items-start justify-center">
                            <label className="mt-[18px] mb-[10px] text-[12px]">نام همسر</label>
                            <input
                              type="text"
                              name="familyspouse"
                              placeholder="نام همسر"
                              onChange={handelChange}
                              value={formData.familyspouse}
                              className="w-[14vw] xs:w-[38vw] py-[13px] px-[15px] text-md leading-[initial] border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                              
                            /> 
                        </div>
                        <div className="flex flex-col items-start justify-center">
                            <label className="mt-[18px] mb-[10px] text-[12px]">شغل همسر</label>
                            <input
                              type="text"
                              name="familyspousesJob"
                              placeholder="شغل همسر"
                              onChange={handelChange}
                              value={formData.familyspousesJob}
                              className="w-[14vw] xs:w-[30vw] py-[13px] px-[15px] text-md leading-[initial] border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                              
                            /> 
                        </div>
                        <div className="flex flex-col items-start justify-center">
                            <label className="mt-[18px] mb-[10px] text-[12px]">تعداد خواهر</label>
                            <input
                              type="text"
                              name="familysisters"
                              placeholder="تعداد خواهر"
                              onChange={handelChange}
                              value={formData.familysisters}
                              className="w-[14vw] xs:w-[30vw] py-[13px] px-[15px] text-md leading-[initial] border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                              
                            /> 
                        </div>
                        <div className="flex flex-col items-start justify-center">
                            <label className="mt-[18px] mb-[10px] text-[12px]">تعداد برادر</label>
                            <input
                              type="text"
                              name="familybrathers"
                              placeholder="تعداد برادر"
                              onChange={handelChange}
                              value={formData.familybrathers}
                              className="w-[14vw] xs:w-[30vw] py-[13px] px-[15px] text-md leading-[initial] border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                              
                            /> 
                        </div>
                    </div>
                </div>

                {/* معرفین */}
                <p className="mr-[12vw] mt-12 mb-4 text-[20px]"><span className="ti-search text-red ml-2"></span>مشخصات معرفین</p>
                <div className="mx-24 flex flex-col items-center justify-center ">
                <div className="flex flex-col items-start justify-start bg-white boarder-2 box-shadow pb-12 pt-6 rounded-[5px] w-[80vw] px-20">
                <div>
                    <p className="xl:hidden xs:block "><span className="text-[#fb4f58]"> * </span>جهت پر کردن بهتر جدول، گوشی خود را بچرخانید </p>
                </div>
                <div>
                <Card className="h-full w-full rounded-[5px] mt-8">
                    <table className="w-[72vw] table-auto text-right ">
                      <thead>
                        <tr key={-1}>
                          <th key={`نام و نام خانوادگی معرف`} className="border-2 border-slate-950/10 bg-white p-2">
                            <p className="text-[14px] text-darkgray">نام و نام خانوادگی معرف</p>
                          </th>
                          <th key={`نسبت معرف`} className="border-2 border-slate-950/10 bg-white p-2">
                            <p className="text-[14px] text-darkgray">نسبت معرف</p>
                          </th>
                          <th key={`آدرس`} className="border-2 border-slate-950/10 bg-white p-2">
                            <p className="text-[14px] text-darkgray">آدرس</p>
                          </th>
                          <th key={`تلفن`} className="border-2 border-slate-950/10 bg-white p-2">
                            <p className="text-[14px] text-darkgray">تلفن</p>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                            <tr className="even:bg-blue-gray-50/50">
                            <td className="m-0 p-0">
                              <input
                                  type="text"
                                  name="introduceBy1fullName"
                                  onChange={handelChange}
                                  value={formData.introduceBy1fullName}
                                  className="w-full xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial] border-[1px] border-solid border-[#dfdfdf]"
                                  
                                /> 
                            </td>
                            <td className="m-0 p-0">
                              <input
                                  type="text"
                                  name="introduceBy1relationship"
                                  onChange={handelChange}
                                  value={formData.introduceBy1relationship}
                                  className="w-full xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial] border-[1px] border-solid border-[#dfdfdf]"
                                  
                                />
                            </td>
                            <td className="m-0 p-0">
                              <input
                                  type="text"
                                  name="introduceBy1address"
                                  onChange={handelChange}
                                  value={formData.introduceBy1address}
                                  className="w-full xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial] border-[1px] border-solid border-[#dfdfdf]"
                                  
                                />
                            </td>
                            <td className="m-0 p-0">
                              <input
                                  type="text"
                                  name="introduceBy1mobile"
                                  onChange={handelChange}
                                  value={formData.introduceBy1mobile}
                                  className="w-full xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial] border-[1px] border-solid border-[#dfdfdf]"
                                  
                                />
                            </td>
                          </tr>
                          <tr className="even:bg-blue-gray-50/50">
                            <td className="m-0 p-0">
                              <input
                                  type="text"
                                  name="introduceBy2fullName"
                                  onChange={handelChange}
                                  value={formData.introduceBy2fullName}
                                  className="w-full xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial] border-[1px] border-solid border-[#dfdfdf]"
                                  
                                /> 
                            </td>
                            <td className="m-0 p-0">
                              <input
                                  type="text"
                                  name="introduceBy2relationship"
                                  onChange={handelChange}
                                  value={formData.introduceBy2relationship}
                                  className="w-full xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial] border-[1px] border-solid border-[#dfdfdf]"
                                  
                                />
                            </td>
                            <td className="m-0 p-0">
                              <input
                                  type="text"
                                  name="introduceBy2address"
                                  onChange={handelChange}
                                  value={formData.introduceBy2address}
                                  className="w-full xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial] border-[1px] border-solid border-[#dfdfdf]"
                                  
                                />
                            </td>
                            <td className="m-0 p-0">
                              <input
                                  type="text"
                                  name="introduceBy2mobile"
                                  onChange={handelChange}
                                  value={formData.introduceBy2mobile}
                                  className="w-full xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial] border-[1px] border-solid border-[#dfdfdf]"
                                  
                                />
                            </td>
                          </tr>
                      </tbody>
                    </table>
                </Card>  
                </div>
                <div className="flex flex-col items-start justify-center mt-8">
                    <label className="mt-[18px] mb-[10px] text-[12px]">نام یک نفر از داستان و آشنایان خود را با ذکر دقیق مشخصات (آدرس، تلفن و محل کار) را ذکر کنید تا در صورت لزوم بتوان از طریق آنان به شما دسترسی پیدا کرد.<span className="text-[#fb4f58]"> * </span></label>
                    <input
                      id="acquaintancesInfo"
                      // onInvalid={() => {
                      //   document
                      //     .getElementById("acquaintancesInfo")
                      //     .setCustomValidity("لطفا این بخش را کامل کنید");
                      // }}
                      type="text"
                      name="acquaintancesInfo"
                      placeholder="توضیحات"
                      onChange={handelChange}
                      value={formData.acquaintancesInfo}
                      className="w-full h-[18vh] xs:w-[30vw] py-[13px] px-[15px] text-md leading-[initial]  border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                      required
                    /> 
                </div>
                </div>    
              </div>
              
              <div className="flex flex-col itams-center justify-start mx-[10vw] mt-8 mb-24">
                <p className="text-[12px]"><span className="text-[#fb4f58]"> * </span>لطفا قبل از ارسال از درستی اطلاعات وارد شده اطمینان حاصل کنید. پش از ارسال امکان ویرایش وجود ندارد.</p>
                {state === true ? <p className="text-[13px] mt-8">اطلاعات با موفقیت ارسال شد. با تشکر از وقت شما</p> : state === false ?  <p className="text-[13px] text-red mt-8">مشکلی در ارسال فرم پیش آمد. لطفا پس از بررسی بخش های مورد نیاز، دوباره جهت ارسال اقدام کنید.</p> : <></>}
                <input className="button-custom w-min mt-4" type="submit" value="ارسال" placeholder="ارسال" />
              </div>
            </form>
    </>
}

export default Recruitment