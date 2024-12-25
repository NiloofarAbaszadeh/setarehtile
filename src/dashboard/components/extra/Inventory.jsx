import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from 'jalali-moment'
import { Card, Typography } from "@material-tailwind/react"
import { redirect  } from "react-router-dom";
 
export const InventoryLoader = () => {
  if (localStorage.getItem("userRole") !== "نماینده") {
    alert("شما اجازه دسترسی به این صفحه را ندارید.")
    return redirect("/dashboard")
  }
  return null
}

const TABLE_HEAD = ["ردیف", "نام فایل", "تاریخ", "فرمت", "حجم", "دانلود"];

const Inventory = () => {
  const token = useSelector(state => state.State.readToken)
  const host = useSelector(state => state.State.host)
  // const url = useLocation().pathname.split("/")[2]
  // upload-inventory
  const [data, setData] = useState()

  useEffect(() => {
    const GetData = async () => {
      await axios.get(`${host}/api/mwjwdy-kashy-has?populate=deep`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          setData(res.data.data)
        })
    }
    GetData()
  },[host, token])
  
    return <>
    {data && 
        <div className="flex items-center justify-center m-12 iran-sans">
            {data[0] ? 
                <Card className="h-full w-full rounded-[5px]">
                <table className="w-full min-w-max table-auto text-right iran-sans">
                  <thead>
                    <tr key={-1}>
                      {TABLE_HEAD.map((head) => (
                        <th key={head} className="border-b-2 bg-[#ff3030] p-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="leading-none"
                          >
                            <p className="text-[14px] iran-sans text-white">{head}</p>
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.reverse().map((data , index) => {
                        return <>
                        {(index % 2 === 0) ? <tr key={index} className="even:bg-blue-gray-50/50">
                        <td className="p-3">
                          <Typography variant="small" color="blue-gray" className="">
                            <p className="text-[12px] iran-sans">{index + 1}</p>
                          </Typography>
                        </td>
                        <td className="p-3">
                          <Typography variant="small" color="blue-gray" className="">
                            <p className="text-[12px] iran-sans">{data.attributes.name}</p>
                          </Typography>
                        </td>
                        <td className="p-3">
                          <Typography variant="small" color="blue-gray" className="">
                          <p className="text-[12px] iran-sans">{moment(data.attributes.file.data.attributes.createdAt, 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD')}</p>
                          </Typography>
                        </td>
                        <td className="p-3">
                          <Typography variant="small" color="blue-gray" className="">
                            <p className="text-[12px] iran-sans">{data.attributes.file.data.attributes.ext.split(".")[1]}</p>
                          </Typography>
                        </td>
                        <td className="p-3">
                          <Typography variant="small" color="blue-gray" className="">
                            <p className="text-[12px] iran-sans">{data.attributes.file.data.attributes.size}kb</p>
                          </Typography>
                        </td>
                        <td className="p-3">
                          <Typography variant="small" color="blue-gray" className="">
                            <p className="text-[12px] iran-sans"><a href={host + data.attributes.file.data.attributes.url}> <span className="ti-import text-[18px] font-semibold"></span></a></p>
                          </Typography>
                        </td>
                      </tr> : 
                      <tr key={index} className="even:bg-blue-gray-50/50 bg-slate-200/50">
                      <td className="p-3 ">
                        <Typography variant="small" color="blue-gray" className="">
                          <p className="text-[12px] iran-sans">{index + 1}</p>
                        </Typography>
                      </td>
                      <td className="p-3">
                        <Typography variant="small" color="blue-gray" className="">
                          <p className="text-[12px] iran-sans">{data.attributes.name}</p>
                        </Typography>
                      </td>
                      <td className="p-3">
                        <Typography variant="small" color="blue-gray" className="">
                        <p className="text-[12px] iran-sans">{moment(data.attributes.file.data.attributes.createdAt, 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD')}</p>
                        </Typography>
                      </td>
                      <td className="p-3">
                        <Typography color="blue-gray" className="">
                          <p className="text-[12px] iran-sans">{data.attributes.file.data.attributes.ext.split(".")[1]}</p>
                        </Typography>
                      </td>
                      <td className="p-3">
                        <Typography color="blue-gray" className="">
                          <p className="text-[12px] iran-sans">{data.attributes.file.data.attributes.size}kb</p>
                        </Typography>
                      </td>
                      <td className="p-3">
                        <Typography color="blue-gray" className="">
                          <p className="text-[12px] iran-sans"><a href={host + data.attributes.file.data.attributes.url}> <span className="ti-import text-[18px] font-semibold"></span></a></p>
                        </Typography>
                      </td>
                    </tr>}
                    </>
                    })}
                  </tbody>
                </table>
              </Card> : 
                <div>
                    <p className="text-fastblue text-[20px] mt-[30vh] iran-sans">موردی جهت مشاهده وجود ندارد</p>
                </div>}
        </div>}
    </>
}

export default Inventory