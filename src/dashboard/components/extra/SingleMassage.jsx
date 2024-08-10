import React, { useState, useEffect } from "react"
import { useLocation, redirect, Link } from "react-router-dom"
import { useSelector } from "react-redux"
import axios from "axios"
import moment from "jalali-moment"

export const SingleMassagesLoader = () => {
    if (localStorage.getItem("userRole") !== "نماینده") {
      alert("شما اجازه دسترسی به این صفحه را ندارید.")
      return redirect("/dashboard")
    }
    return null
  }


const SingleMassage = () => {

    const url = useLocation().pathname.split("/")[3]

    const token = useSelector(state => state.State.readToken)
    const host = useSelector(state => state.State.host)
    
    const [data,setData] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const GetData = async () => {
            await axios.get(`${host}/api/egent-notices/${url}`, {
                headers: { Authorization: `Bearer ${token}` }
              }).then(res => {
                setData(res.data.data.attributes)
                setLoading(true)
              })
        }
        GetData()
    },[host, token, url])


    return <div className="flex flex-col items-start mx-12"> 

        <div className="left-[40px] md:left-[20px] mb-4 bottom-[20px]" >
            <Link to={"/dashboard/massages"} replace={true} >          
              <div className="flex button-custom items-center justify-center my-2 bg-[#ff3030] text-white hover:bg-[#ff3030] w-full sm:text-[11px]">
                  <span className="ti ti-arrow-right ml-2"></span>
                  <span className="text-[12px]">بازگشت</span>
              </div>
              </Link>
        </div>
        {loading && <div className="flex items-start flex-col custom-boarder rounded-[15px] w-[85%] bg-white box-shadow">
            <div>
                <p className="text-balck hover:text-fastblue font-semibold text-[20px] text-black"> {data.title}</p>
            </div>
            <div className="mb-2">
                <span className="text-[14px] text-red">{moment.utc(`T${data.createdAt}.00-03:30`, "THH:mm:ss.SSZ").format("HH:mm:ss")} </span>
                <span className="text-[14px] mr-2 text-red">{moment(data.createdAt, 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD')} </span>
            </div>
            <div>
                {data.discraption.map((dis, i) => {
                    return <p key={i} className="w-[98%] text-[14px] text-justify mt-2 text-black">{dis.children[0].text}</p>
                })}
            </div>

        </div>}
    </div>
}

export default SingleMassage