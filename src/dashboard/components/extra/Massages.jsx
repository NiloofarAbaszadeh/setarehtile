import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { Col } from 'react-bootstrap'
import moment from 'jalali-moment'

// export const MassagesLoader = () => {
//   if (localStorage.getItem("userRole") !== "نماینده") {
//     alert("شما اجازه دسترسی به این صفحه را ندارید.")
//     return redirect("/dashboard")
//   }
//   return null
// }

const Massages = () => {
    const token = useSelector(state => state.State.readToken)
    const host = useSelector(state => state.State.host)
    
    const [data,setData] = useState()
    const [loading, setLoading] = useState(false)
    const [seen, setSeen] = useState()

    useEffect(() => {
        const GetData = async () => {
          localStorage.getItem("userRole") === "نماینده" ?
            await axios.get(`${host}/api/egent-notices`, {
              headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
              setData(res.data.data)      
            }) :
            await axios.get(`${host}/api/employee-notices`, {
              headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                setData(res.data.data)
                
              })
            const username = localStorage.getItem("userInfo")
            // eslint-disable-next-line
            await axios.get(`${host}/api/karbrans?filters\[username]=${username}`, {
                headers: { Authorization: `Bearer ${token}` }
              })
              .then(res => {
                setSeen(res.data.data[0].attributes.seen.Massages)  
                setLoading(true)
              }) 
          }
        GetData()
    },[host ,token])

    return <>
    {loading && <div>
      {data[0] ? <> {data.reverse().map((item) => {
            // const date = item.createdAt
            return  <div key={item.attributes.title}>
            <Link to={`./${item.id}`} replace={true}>
            <Col xs={12} lg={10} className='mb-12 '>
              <div className="flex w-full md:w-[90vw] md:mx-12 sm:w-[80vw]">
                <div className="w-[75px] sm:w-[50px] sm:mb-[10px] ml-[15px]">
                  <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" width="" height="" className="rounded-full w-[75%] sm:w-full" alt="" />
                </div>
                <div className={`w-full relative custom-boarder rounded-[15px] pl-[25px] sm:pl-0 bg-white box-shadow pb-10`}>
                  <div className="flex items-center justify-between sm:flex-col sm:items-start">
                  <div className={`text-balck hover:text-fastblue font-semibold text-[18px] text-black ${seen.includes(item.id) ? "opacity-[50%]" : ""}`}>{item.attributes.title}</div>
                  <div className="text-md text-spanishgray mb-[16px] ml-6 flex items-center justify-center"> 
                    <span className={`text-[14px] mr-2 text-red ${seen.includes(item.id) ? "opacity-[50%]" : ""}`}>{moment(item.attributes.createdAt, 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD')} </span>
                  </div>
                  </div>
                  <div className="h-full max-h-[80px] overflow-hidden relative w-[90%]">
                    <div className="bg-gradient-to-t from-white w-full absolute z-10 h-full mt-8"></div>
                    <div className="bg-gradient-to-t from-white w-full absolute z-10 h-full mt-8"></div>
                    <div className="bg-gradient-to-t from-white w-full absolute z-10 h-full mt-8"></div>
                    {item.attributes.discraption.map((dis, i) => {
                      return <p key={i} className={`w-[98%] text-[13px] text-justify mt-2 text-black ${seen.includes(item.id) ? "opacity-[50%]" : ""}`}>{dis.children[0].text}</p>
                    })}
                  </div>
                  
                  {/* <div className="absolute z-10 left-[40px] md:left-[20px] bottom-[20px]" >
                  
                        <div className="flex button-custom items-center justify-center mt-2 bg-[#ff3030] text-white hover:bg-[#ff3030] w-full sm:text-[11px]">
                            <span className="text-[12px]">متن کامل پیام</span>
                        </div>
                    
                  </div> */}
                </div>
              </div>
            </Col>
            </Link>
          </div>
        })}
        </> :
        <div className="flex items-center justify-center">
          <p className="text-fastblue text-[20px] mt-[30vh]">موردی جهت مشاهده وجود ندارد</p>
        </div>}
           
    </div>
    }
    </>
}

export default Massages