import React, { useEffect } from "react";
import axios from "axios";

import { useState } from "react";
import { useSelector } from "react-redux"


const ChangePassword = () => {
    const token = useSelector(state => state.State.readToken)
    const host = useSelector(state => state.State.host)
    const send = useSelector(state => state.State.sendToken)
    
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [err,setErr] = useState(false)
    const [err2,setErr2] = useState(false)
    const [sec, setSec] = useState(false)

    const [formData, setFormData] = useState(
        {
          oldpassword: "",
          newpassword1: "",
          newpassword2: "",
        }
      );

    const handelChange = (event) => {
      setErr(false)
      setErr2(false)
      setSec(false)
        const { name, value } = event.target
        setFormData(pervFormData => {
          return {
            ...pervFormData,
            [name]: value
          }
        })                                
    }

    const handelSubmmit = async (event) => {
        event.preventDefault()
        const username = localStorage.getItem("userInfo")
        if (data.password === formData.oldpassword) {
          if (formData.newpassword1 === formData.newpassword2) {
            try {
              // eslint-disable-next-line
              await axios.put(`${host}/api/karbrans?filters\[username]=${username}&filters\[password]=${formData.oldpassword}`,{
                "data" : {
                "password" : formData.newpassword2,
                }},{
                  headers: { Authorization: `Bearer ${send}` }
                }).then(res => {
                  setSec(true)
              })
            } catch (e) {
            }
          } else {
            setErr2(true)
          }
          
        } else {
          setErr(true)
        }
        
        
    }
        

      useEffect(() => {
        const GetUser = async () => {
            const username = localStorage.getItem("userInfo")
            try {
              // eslint-disable-next-line
                await axios.get(`${host}/api/karbrans?filters\[username]=${username}`, {
                  headers: { Authorization: `Bearer ${token}` }
                })
                .then(res => {
                    setData({
                        id: res.data.data[0].id,
                        username: res.data.data[0].attributes.username,
                        password: res.data.data[0].attributes.password
                    })
                    setLoading(true)
                })
              } catch (e) {
                console.log(e)
              }
        }
        GetUser()
      },[host,token])

    
    return <>
        {loading && 
        <div className="flex flex-col items-start justify-center w-full mt-12">
                <div className="mb-8">
                  <span className="ti-unlock ml-2 text-[18px]"></span>
                  <span className="text-[22px] mb-6">تغییر کلمه عبور</span>
                </div>
                <div className="box-shadow bg-white p-8 rounded-[15px] w-full">
                
                <div className="flex items-center justify-between xs:flex-col">
                    <div className="w-[20vw] xs:w-[60vw]">
                      <div className="mt-[5px] text-darkgray mb-[10px]">رمز عبور فعلی<span className="text-[#fb4f58]"> * </span></div>
                      <input
                        type="text"
                        name="oldpassword"
                        placeholder="رمز فعلی"
                        onChange={handelChange}
                        value={formData.user}
                        className="py-[13px] px-[15px] text-md leading-[initial] w-full border-[1px] border-solid border-[#dfdfdf] rounded-[8px]"
                        required
                      /> 
                    </div>
                    <div className="w-[20vw] xs:w-[60vw]">
                      <div className="mt-[5px] mb-[10px]">رمز عبور جدید<span className="text-[#fb4f58]"> * </span></div>
                      <input
                        type="password"
                        name="newpassword1"
                        placeholder="رمز جدید"
                        onChange={handelChange}
                        value={formData.password}
                        className="py-[13px] px-[15px] text-md leading-[initial] w-full border-[1px] border-solid border-[#dfdfdf] rounded-[8px]"
                        required
                      />
                    </div>
                    <div className="w-[20vw] xs:w-[60vw]">
                      <div className="mt-[5px] mb-[10px]">تکرار رمز عبور جدید<span className="text-[#fb4f58]"> * </span></div>
                      <input
                        type="password"
                        name="newpassword2"
                        placeholder="تکرار رمز جدید"
                        onChange={handelChange}
                        value={formData.password}
                        className="py-[13px] px-[15px] text-md leading-[initial] w-full border-[1px] border-solid border-[#dfdfdf] rounded-[8px]"
                        required
                      />
                    </div>
                </div>
                <div className="flex items-center justify-end">
                  <div className="mt-4">
                    {err ? <span className='pt-4 ml-4 c-c-red'>لطفا رمز عبور فعلی را به درستی وارد کنید</span> : <></>}
                    {err2 ? <span className='pt-4 ml-4 c-c-red'>لطفا تکرار رمز عبور جدید را به درستی وارد کنید</span> : <></>}
                    {sec ? <span className='pt-4 ml-4 c-c-red'>رمز عبور با موفقیت تغییر یافت !</span> : <></>}
                  </div>
                <div>
                    <button className="button-custom w-auto mt-[20px] bg-red text-white hover:bg-red" onClick={handelSubmmit}> تایید </button>
                </div>  
                </div>  
            </div>
        </div>}
    </>
}

export default ChangePassword 