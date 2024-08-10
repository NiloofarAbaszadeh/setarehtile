import React from "react";
import axios from "axios";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const UserInfo = () => {
    const token = useSelector(state => state.State.readToken)
    const host = useSelector(state => state.State.host)
    
    const [userData,setUserData] = useState()
    const [storeData,setStoreData] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const GetData = async () => {
            const username = localStorage.getItem("userInfo")
            // eslint-disable-next-line
            await axios.get(`${host}/api/karbrans?filters\[username]=${username}&populate=deep`, {
                headers: { Authorization: `Bearer ${token}` }
              })
              .then(res => {
                  setUserData(res.data.data[0].attributes)
                  res.data.data[0].attributes.role === "نماینده" && GetStoreData()
                  
                  setLoading(true) 

              })
               
              
        }
        GetData()
        const GetStoreData = async () => {
            const username = localStorage.getItem("userInfo")
            // eslint-disable-next-line
            await axios.get(`${host}/api/internal-agents-names?filters\[personeli]=${username}&populate=deep`, {
                headers: { Authorization: `Bearer ${token}` }
              })
              .then(res => {
                res.data.data.length !== 0 && setStoreData(res.data.data[0].attributes.store)
                  
              })
              // eslint-disable-next-line
              await axios.get(`${host}/api/external-agents?filters\[personeli]=${username}&populate=deep`, {
                headers: { Authorization: `Bearer ${token}` }
              })
              .then(res => {
                res.data.data.length !== 0 && setStoreData(res.data.data[0].attributes.store)
                  
              })
        }
    },[host, token])


    return <>
    {loading && 
    <div>
        <div className="mb-4 flex items-center">
            <span className="ti-id-badge text-[30px]  ml-4 mb-[3px]" ></span>
            <span className="text-[24px] font-semibold ">اطلاعات کاربری</span> 
        </div>
        <div className="flex items-start justify-center flex-col mr-4 box-shadow rounded-[15px] bg-white w-[50%] p-4">
            <div className="mb-2 text-[15px]"><span className=""></span><span>نام و نام خوانوادگی : </span> <span className="text-gray">{userData.fullName}</span></div>
            <div className="mb-2 text-[15px]"><span className=""></span><span>شماره پرسنلی : </span> <span className="text-gray">{userData.username}</span></div>
            <div className="mb-2 text-[15px]"><span className=""></span><span>ایمیل : </span> <span className="text-gray">{userData.email}</span></div>
        </div>
        {storeData && <><div className="mb-4 mt-12 flex items-center">
            <span className="ti-shopping-cart text-[30px]  ml-4 mb-[3px]" ></span>
            <span className="text-[24px] font-semibold ">فروشگاه ها</span> 
        </div>
        <div className="flex items-start justify-center flex-col mr-4 box-shadow bg-white rounded-[15px] w-[50%] p-4">
            {storeData.map((store,i) => {
                return (<div>
                    {i === 0 ? <div className="mb-2 text-[15px]"><span className=""></span><span>شعبه : </span> <span className="text-gray">{store.name}</span></div>
                    : <div className="mb-2 text-[15px] border-t-2 w-[25vw] pt-3"><span className=""></span><span>شعبه : </span> <span className="text-gray">{store.name}</span></div>}
                    <div className="mb-2 text-[15px]"><span className=""></span><span>آدرس فروشگاه : </span> <span className="text-gray">{store.address ? store.address : "-"}</span></div>
                </div>)
            })}
            </div></>}
    </div>
    }
    </>
}

export default UserInfo