import React, { useEffect, useState, useRef } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import moment from 'jalali-moment'
import { useLocation, redirect, Link } from "react-router-dom"
import { useReactToPrint } from 'react-to-print';
import logo from "../../../Assets/images/logo.png"

export const ResumePageLoader = () => {
    if (localStorage.getItem("userRole") !== "امور اداری") {
      alert("شما اجازه دسترسی به این صفحه را ندارید.")
      return redirect("/dashboard")
    }
    return null
  }

const ResumePage = () => {
    const url = useLocation().pathname.split("/")
    const token = useSelector(state => state.State.readToken)
    const host = useSelector(state => state.State.host)
    const [data, setData] = useState()
    const contentToPrint = useRef();
    const handlePrint = useReactToPrint({
      documentTitle: data && data.fullName,
    //   onBeforePrint: () => console.log("before printing..."),
    //   onAfterPrint: () => console.log("after printing..."),
      removeAfterPrint: true,
    });

    useEffect(() => {
        const GetData = () => {
            axios.get(`${host}/api/recruitment-forms/${url[3]}?populate=deep`, {
                headers: { Authorization: `Bearer ${token}` }
              }).then(res => {
                setData(res.data.data.attributes)
              })
        }
        GetData()
    }, [host, token, url])

    // useEffect(() => {
    //     console.log("test") 
    //     handlePrint(null, () => contentToPrint.current);
    // }, [contentToPrint])

    return <div className="ml-24 sm:ml-0">
        <div className="flex items-center justify-between mx-8">
            <Link to={"/dashboard/resume"} replace={true} >          
              <div className="flex button-custom items-center justify-center bg-[#ff3030] text-white hover:bg-[#ff3030] w-full sm:text-[11px] rounded-[5px] mb-4 py-[15px]">
                  <span className="ti ti-arrow-right"></span>
              </div>
            </Link>
            <button
            className="button-custom bg-[#ff3030] text-white rounded-[5px] hover:bg-[#ff3030] w-auto mt-0 flex items-center"
            onClick={() => {
                handlePrint(contentToPrint.current, () => contentToPrint.current);
            }}>
                <span className="ti ti-printer py-[5px]"></span>
            </button>
        </div>
        {data && <><div ref={contentToPrint} onLayout={() => {}} className="p-8 pt-0 dir-rtl">
            <div className="flex items-center justify-between border-[3px] px-12">
                <div className="w-[75px] py-2">
                    <img src={logo} alt="Logo" />
                </div>
                <div>
                    <p className="text-[20px] px-12 text-red">فرم درخواست کار</p>
                </div>
                <div>
                    <p className="mb-2">تاریخ: {moment(data.createdAt.split("T")[0], 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD')}</p>
                    <p>شماره: </p>
                </div>
            </div>
            <div className="bg-[#a8b9e2] border-[3px] border-t-0">
                <p className="pr-4">مشخصات متقاضی</p>
            </div>  
            <div className="border-[3px] border-t-0 grid grid-flow-col">
                <div className="grid grid-flow-col">
                    <div>
                        <p className="p-2 pb-0">نام و نام خانوادگی: {data.fullName}</p>
                        <p className="p-2 pb-0">شماره شناسنامه: {data.personId}</p>
                        <p className="p-2 pb-0">تاریخ تولد: {data.birthDay}</p>
                        <p className="p-2 pb-0">وزن: {data.weight}</p>
                        <p className="p-2 pb-0">وضعیت تاهل: {data.maritalStatus}</p>
                        <p className="p-2">وضعیت جسمانی: {data.physicalCondition}</p>
                    </div>
                    <div>
                        <p className="p-2 pb-0">نام پدر: {data.fatherName}</p>
                        <p className="p-2 pb-0">کد ملی: {data.nationalCode}</p>
                        <p className="p-2 pb-0">محل تولد: {data.birthPlace}</p>
                        <p className="p-2 pb-0">قد: {data.height}</p>
                        <p className="p-2">تعداد فرزندان: {data.children}</p>
                    </div>
                </div>
                <div className="border-r-[3px]">
                    <p className="p-2 pb-0">نشانی کامل محل سکونت فعلی: {data.address}</p>
                    <p className="p-2 pb-0">وضعیت مسکن: {data.addressState}</p>
                    <p className="p-2 pb-0">تلفن ثابت: {data.phone}</p>
                    <p className="p-2">تلفن همراه: {data.mobile}</p>
                </div>
            </div>  
            <div className="bg-[#ffabab] border-[3px] border-t-0">
                <p className="pr-4">وضعیت نظام وضیفه</p>
            </div>  
            <div className="border-[3px] border-t-0">
                <div className="grid grid-flow-col">
                    <div className="p-2">
                        <p>وضعیت سربازی: {data.militaryService}</p>
                    </div>
                    <div className="p-2"> {data.militaryService !== "" ? (data.militaryService === "معاف") ? <p>علت معافی: {data.remissionState}</p> : <p>یگان خدمتی: {data.serviceUnit}</p> : <></>}
                        {/* {(data.militaryService === "معاف") ? <p>علت معافی: {data.remissionState}</p> : <p>یگان خدمتی: {data.serviceUnit}</p>} */}
                    </div>
                </div>
                <div className="p-2">
                    <p>علت معافیت پزشکی و غیره: {data.remissionReason}</p>
                </div>
            </div>
            <div className="bg-[#a8b9e2] border-[3px] border-t-0">
                <p className="pr-4">وضعیت تحصیلی</p>
            </div> 
            <div className="border-[3px] border-t-0 grid p-2 pt-0 grid-cols-4">
                <p className="pt-2">آخرین مدرک تحصیلی: {data.lastEducationalCertificate}</p>
                <p className="pt-2">رشته تحصیلی: {data.fieldOfStudy}</p>
                <p className="pt-2">دانشگاه: {data.university}</p>
                <p className="pt-2">گواهینامه تخصصی: {data.specializedCertificate}</p>
                <p className="pt-2">سابقه کارآموزی: {data.internshipHistory}</p>
                <p className="pt-2">آشنایی با زبان: {data.language}</p>
                <p className="pt-2">میزان تسلط: {data.languageState}</p>
            </div>
            <div className="bg-[#ffabab] border-[3px] border-t-0 border-b-0">
                <p className="pr-4">سوابق کاری</p>
            </div> 
            <div className="border-b-2 border-r-3">
                <div className="grid grid-cols-7 items-center justify-center divide-x-2 divide-y-2" >
                <p className="w-full h-full p-2 border-2 border-b-0">شرکت</p>
                <p className="w-full h-full p-2">سمت</p>
                <p className="w-full h-full p-2">سابقه کار </p>
                <p className="w-full h-full p-2">حقوق دریافتی «ریال» </p>
                <p className="w-full h-full p-2">علت ترک کار</p>
                <p className="w-full h-full p-2">آدرس </p>
                <p className="w-full h-full p-2">شماره تلفن </p>
                </div>

                <div className="grid grid-cols-7 items-center justify-center divide-x-2 divide-y-2" >
                <p className="w-full h-full p-2  border-2 border-b-0">{data.workExperience1company}</p>
                <p className="w-full h-full p-2">{data.workExperience1side}</p>
                <p className="w-full h-full p-2">{data.workExperience1workExperience}</p>
                <p className="w-full h-full p-2">{data.workExperience1income}</p>
                <p className="w-full h-full p-2">{data.workExperience1leavingReason}</p>
                <p className="w-full h-full p-2">{data.workExperience1address}</p>
                <p className="w-full h-full p-2">{data.workExperience1phonNumber}</p>
                </div>

                <div className="grid grid-cols-7 items-center justify-center divide-x-2 divide-y-2" >
                <p className="w-full h-full p-2  border-2 border-b-0">{data.workExperience2company}</p>
                <p className="w-full h-full p-2">{data.workExperience2side}</p>
                <p className="w-full h-full p-2">{data.workExperience2workExperience}</p>
                <p className="w-full h-full p-2">{data.workExperience2income}</p>
                <p className="w-full h-full p-2">{data.workExperience2leavingReason}</p>
                <p className="w-full h-full p-2">{data.workExperience2address}</p>
                <p className="w-full h-full p-2">{data.workExperience2phonNumber}</p>
                </div>

                <div className="grid grid-cols-7 items-center justify-center divide-x-2 divide-y-2" >
                <p className="w-full h-full p-2  border-2 border-b-0">{data.workExperience3company}</p>
                <p className="w-full h-full p-2">{data.workExperience3side}</p>
                <p className="w-full h-full p-2">{data.workExperience3workExperience}</p>
                <p className="w-full h-full p-2">{data.workExperience3income}</p>
                <p className="w-full h-full p-2">{data.workExperience3leavingReason}</p>
                <p className="w-full h-full p-2">{data.workExperience3address}</p>
                <p className="w-full h-full p-2">{data.workExperience3phonNumber}</p>
                </div>
            </div>
            <div className="border-[3px] border-t-0 border-b-0 grid grid-cols-3 p-2 py-0">
                <p className="pt-2">شغل مورد تقاضا: {data.demandedJob}</p>
                <p className="pt-2">میزان حقوق درخواستی: {data.salaryRequested}</p>
                <p className="pt-2">آیا حاضرید شرکت شغل شما را تغییر دهد؟{data.allowChangeSide === true ? "بله" : "خیر"}</p>
            </div>
            <div className="border-[3px] border-t-0 border-b-0 grid grid-cols-2 p-2 py-0">
                <p className="pt-2">آیا سابقه کار در کاشی ستاره دارید؟{data.experienceInSetareh}</p>
                <p className="pt-2">نحوه آشنایی با کاشی و سرامیک ستاره: {data.acquaintanceToSetareh}</p> 
            </div>
            <div className="border-[3px] border-t-0 grid grid-cols-1 p-2 pt-0">
                <p className="pt-2">آیا حاضر به انجام ماموریت بعد از ساعات اداری و روزهای تعطیل هستید؟ {data.missionOutsideWorkTime === true ? "بله" : "خیر"}</p>
                <p className="pt-2">آیا حاضرید در سه شیفت کار کنید؟ {data.workThreeShiftes === true ? "بله" : "خیر"}</p>
                <p className="pt-2">سایر مزایا مورد تقاضا: {data.requestExtraBenefits}</p>
                <p className="pt-2">آیا در حال حاضر شاغل هستید؟ «با ذکر نام محل کار» {data.currentWorkPlace}</p>
                <p className="pt-2">درصورت سابقه بیمه، شماره بیمه خود را بنویسید. {data.insuranceNumber}</p>
                <p className="pt-2">درصورت استخدام در شرکت قادر هستید چه کارهایی را انجام دهید؟ {data.skillsAtWork}</p>
                <p className="pt-2">آیا تمایل به انجام اضافه کاری دارید؟ {data.extraWork === true ? "بله" : "خیر"}</p> 
            </div>
            <div className="bg-[#a8b9e2] border-[3px] border-t-0">
                <p className="pr-4">مشخصات اعضای خانواده</p>
            </div> 
            <div className=" grid grid-cols-2 ">
                <div className="border-[3px] border-t-0 grid grid-cols-2 p-2">
                    <p>نام پدر: {data.fatherName}</p>
                    <p>شغل: {data.familyfathersJob}</p>
                </div>
                <div className="border-[3px] border-t-0 border-r-0 grid grid-cols-2 p-2">
                    <p>نام مادر: {data.familymather}</p>
                    <p>شغل: {data.familymathersJob}</p>
                </div>
                <div className="border-[3px] border-t-0 grid grid-cols-2 p-2">
                    <p>نام همسر: {data.familyspouse}</p>
                    <p>شغل: {data.familyspousesJob}</p>
                </div>
                <div className="border-[3px] border-t-0 border-r-0 grid grid-cols-2 p-2">
                    <p>تعداد برادر: {data.familybrathers}</p>
                    <p>تعداد خواهر: {data.familysisters}</p>
                </div>
            </div>
            <div className="bg-[#ffabab] border-x-[3px]">
                <p className="pr-4">مشخصات معرفین</p>
            </div> 
            <div className="border-b-[2px] items-center justify-center">
                <div className="grid grid-cols-4 divide-x-2 divide-y-2">
                <p className="p-2 border-2 border-b-0">نام و نام خانوادگی معرف</p>
                <p className="p-2">نسبت معرف</p>
                <p className="p-2">آدرس </p>
                <p className="p-2">تلفن </p>
                </div>

                <div className="grid grid-cols-4 divide-x-2 divide-y-2">
                <p className="p-2 border-2 border-b-0">{data.introduceBy1fullName}</p>
                <p className="p-2">{data.introduceBy1relationship}</p>
                <p className="p-2">{data.introduceBy1address}</p>
                <p className="p-2">{data.introduceBy1mobile}</p>
                </div>

                <div className="grid grid-cols-4 divide-x-2 divide-y-2">
                <p className="p-2 border-2 border-b-0">{data.introduceBy2fullName}</p>
                <p className="p-2">{data.introduceBy2relationship}</p>
                <p className="p-2">{data.introduceBy2address}</p>
                <p className="p-2">{data.introduceBy2mobile}</p>
                </div>
            </div>
            <div className="border-[3px] border-t-0 border-b-0 grid grid-cols-1 items-center justify-center">
                <p className="p-2">نام یک نفر از دوستان و یا آشنایان خود را باذکر دقیق مشخصات «آدرس، تلفن همراه و محل کار» را ذکر نمایید تا در صورت لزوم بتوان از طریق آنان به شما دسترسی پیدا کرد.</p>    
                <p className="border-b-[3px] p-2"> 1- {data.acquaintancesInfo} </p>
            </div>
            <div className="bg-[#a8b9e2] border-[3px] border-t-0">
                <p className="pr-4">توجه: تحویل و تکمیل این فرم هیچگونه تعهدی برای شرکت کاشی و سرامیک ستاره میبد جهت استخدام ایجاد نمی نماید.</p>
            </div> 
                          
        </div></>}
    </div>
}

export default ResumePage