import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"

const ChangeProfileInfo = () => {
    const token = useSelector(state => state.State.readToken)
    const host = useSelector(state => state.State.host)
    const [state, setState] = useState(null)

    const [userData, setUserData] = useState({
        name: "",
        prsoneli: "",
        email: "",
        role: "",
        company: "",
    })

    const handelChange = (event) => {
        setState(null)
        const { name, value } = event.target
        setUserData(pervFormData => {
            return {
              ...pervFormData,
              [name]: value
        }})}

        const handelSubmmit = async (event) => {
            event.preventDefault()
              await axios.put(`${host}/api/karbrans/${userData.id}`, {
                data: {
                  fullName: userData.name,
                  username: userData.prsoneli,
                  email: userData.email,
                  role: userData.role,
                  company: userData.company
                }
              }).then(res => {
                setState(true)
              }).catch(res => {
                setState(false)
              })}

    useEffect(() => {

        const GetData = async () => {
                const username = localStorage.getItem("userInfo")
              // eslint-disable-next-line
              await axios.get(`${host}/api/karbrans?filters\[username]=${username}&populate=deep`, {
                headers: { Authorization: `Bearer ${token}` }
              })
              .then(res => {
                setUserData({
                    id: res.data.data[0].id,
                    name: res.data.data[0].attributes.fullName,
                    prsoneli: res.data.data[0].attributes.username,
                    email: res.data.data[0].attributes.email,
                    role: res.data.data[0].attributes.role,
                    company: res.data.data[0].attributes.company,
                })
              })
        }

        GetData()
    }, [host, token])

    return <div>
        {userData && <div className="ml-12 sm:m-8">
                <div className="mb-4 flex items-center justify-between ml-8">
                    <div>
                        <p className="text-[18px]">ویرایش اطلاعات کاربری</p>
                    </div>
                    <div className="flex items-end flex-col">
                        
                        <div className="flex button-custom items-end mt-0 bg-[#ff3030] text-white hover:bg-[#ff3030] w-max "
                        onClick={handelSubmmit}>   
                            <span>ویرایش</span>
                        </div>
                        <div className="">
                            {state === true ? <p className="text-[13px] mt-4">ویرایش با موفقیت انجام شد</p> : state === false ?  <p className="text-[13px] text-red mt-8">مشکلی پیش آمد. لطفا دوباره تلاش نمایید.</p> : <></>}
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-4 bg-white p-8  sm:mt-8 bg-white rounded-[15px] p-16 box-shadow w-full">
                    <div className="flex flex-col items-start justify-center">
                        <label className="mt-[18px] mb-[10px]">نام و نام خانوادگی<span className="text-[#fb4f58]"> * </span></label>
                        <input
                          // onInvalid={() => {
                          //   document
                          //     .getElementById("weight")
                          //     .setCustomValidity("لطفا این بخش را کامل کنید");
                          // }}
                          type="text"
                          name="name"
                          placeholder="نام و نام خانوادگی"
                          onChange={handelChange}
                          value={userData.name}
                          className="w-[14vw] xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial]  border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                          required
                        /> 
                    </div>
                    <div className="flex flex-col items-start justify-center">
                        <label className="mt-[18px] mb-[10px]">شماره پرسنلی<span className="text-[#fb4f58]"> * </span></label>
                        <input
                          // onInvalid={() => {
                          //   document
                          //     .getElementById("weight")
                          //     .setCustomValidity("لطفا این بخش را کامل کنید");
                          // }}
                          type="text"
                          name="prsoneli"
                          placeholder="پرسنلی"
                          onChange={handelChange}
                          value={userData.prsoneli}
                          className="w-[14vw] xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial]  border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                          required
                        /> 
                    </div>
                    <div className="flex flex-col items-start justify-center">
                        <label className="mt-[18px] mb-[10px]">ایمیل<span className="text-[#fb4f58]"> * </span></label>
                        <input
                          // onInvalid={() => {
                          //   document
                          //     .getElementById("weight")
                          //     .setCustomValidity("لطفا این بخش را کامل کنید");
                          // }}
                          type="text"
                          name="email"
                          placeholder="ایمیل"
                          onChange={handelChange}
                          value={userData.email}
                          className="w-[14vw] xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial]  border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                          required
                        /> 
                    </div>
                    <div className="flex flex-col items-start justify-center">
                        <label className="mt-[18px] mb-[10px]">سمت<span className="text-[#fb4f58]"> * </span></label>   
                        <select name="role" 
                        // onInvalid={() => {
                        //   document
                        //     .getElementById("maritalStatus")
                        //     .setCustomValidity("لطفا این بخش را کامل کنید");
                        // }}
                        onChange={handelChange}
                        value={userData.role}
                        className="w-[14vw] xs:w-[25vw] py-[13px] boarder-none px-[15px] text-md leading-[initial]  border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                        required>
                            <option className="text-[14px]" value="فروش">فروش</option>
                            <option className="text-[14px]" value="امور اداری">امور اداری</option>
                        </select>
                    </div>
                    <div className="flex flex-col items-start justify-center">
                        <label className="mt-[18px] mb-[10px]">شرکت<span className="text-[#fb4f58]"> * </span></label>
                        <input
                          // onInvalid={() => {
                          //   document
                          //     .getElementById("weight")
                          //     .setCustomValidity("لطفا این بخش را کامل کنید");
                          // }}
                          type="text"
                          name="company"
                          placeholder="نام شرکت"
                          onChange={handelChange}
                          value={userData.company}
                          className="w-[14vw] xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial]  border-[1px] border-solid border-[#dfdfdf] rounded-[2px]"
                          required
                        /> 
                    </div>
                </div>
            </div>}
    </div>
}

export default ChangeProfileInfo