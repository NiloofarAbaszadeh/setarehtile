import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import moment from 'jalali-moment'
import { Link, redirect } from "react-router-dom"

export const ResumeLoader = () => {
    if (localStorage.getItem("userRole") !== "امور اداری") {
      alert("شما اجازه دسترسی به این صفحه را ندارید.")
      return redirect("/dashboard")
    }
    return null
  }

const Resume = () => {
    const token = useSelector(state => state.State.readToken)
    const host = useSelector(state => state.State.host)
    const [data, setData] = useState()
    const [seen, setSeen] = useState()

  useEffect(() => {
    const GetData = () => {
      axios.get(`${host}/api/recruitment-forms?populate=deep&sort[0]=id:asc`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        setData(res.data.data)
      })
      const username = localStorage.getItem("userInfo")
      // eslint-disable-next-line
      axios.get(`${host}/api/karbrans?filters\[username]=${username}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        setSeen(res.data.data[0].attributes.seen.Resume)  
      })   
    }
    GetData()
  }, [host, token])


  return <>{data && seen && 
    <div className="flex items-center justify-center flex-col">
      {data[0] ? data.reverse().map(item => {
        const date = item.attributes.createdAt.split("T")
        return (
          <div className={`bg-white w-[65vw] sm:w-[85vw] m-18 rounded-[10px] box-shadow p-8 flex justify-between items-end mb-8`}>
            <div className={`${seen.includes(item.id) ? "opacity-[60%]" : ""}`}>
              <p className="text-[16px] font-semibold">{item.attributes.fullName}</p>
              <p className={`text-[13px] text-red mb-2 ${seen.includes(item.id) ? "text-black" : ""}`}>{moment(date[0], 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD')} </p>
              <p className="text-gray">شغل مورد تقاضا: {item.attributes.demandedJob}</p>
              <p className="text-gray">شماره تماس: {item.attributes.phone}</p>
              <p className="text-gray">...</p>
            </div>
            <div className="flex items-center justify-end">
              <Link to={`./${item.id}`}><button className={`button-custom bg-[#ff3030] text-white rounded-[5px] hover:bg-[#ff3030] w-auto mt-0 ${seen.includes(item.id) ? "opacity-[70%]" : ""}`}><p className="w-max">مطالعه کامل</p></button></Link>
            </div>
          </div>)
        }) : 
      <div className="flex items-center justify-center">
        <p className="text-red text-[28px] mt-[30vh] ">موردی جهت نمایش وجود ندارد</p>
      </div>}
    </div>}
  </>
}

export default Resume