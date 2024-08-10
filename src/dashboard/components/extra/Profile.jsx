import React, {useState, useEffect} from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import { Link } from "react-router-dom"
import ChangePassword from "./ChangePassword"

const Profile = () => {

    const token = useSelector(state => state.State.readToken)
    const host = useSelector(state => state.State.host)
    
    const [data,setData] = useState()
    const [storeData, setStoreData] = useState()

    useEffect(() => {
        const GetData = async () => {
          const username = localStorage.getItem("userInfo")
          // eslint-disable-next-line
          await axios.get(`${host}/api/karbrans?filters\[username]=${username}&populate=deep`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(res => {
            localStorage.setItem("userId",res.data.data[0].id)
            setData(res.data.data[0])
          })
          // eslint-disable-next-line
          await axios.get(`${host}/api/external-agents?filters\[personeli]=${username}&populate=deep`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(res => {
            res.data.data.length !== 0 && setStoreData(res.data.data[0].attributes.store)
          })

          // eslint-disable-next-line
          await axios.get(`${host}/api/internal-agents-names?filters\[personeli]=${username}&populate=deep`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(res => {
            res.data.data.length !== 0 && setStoreData(res.data.data[0].attributes.store)  
          })
        }
        GetData()
      },[host,token])

      
    return <div className="flex justify-center items-center ml-24">
        {data && <div className="flex items-start flex-col w-[65vw] lg:w-[80vw] sm:mx-4">
            <div className="mb-4 flex items-center justify-between w-full">
                <div>
                    <span className="ti-id-badge text-[30px]  ml-4 mb-[3px]" ></span>
                    <span className="text-[24px] font-semibold ">اطلاعات کاربری</span> 
                </div>
                <div>
                    <Link to={"./edit-profile-image"} replace={true} >
                        <div className="flex button-custom items-center justify-center mt-0 mb-8 bg-red text-white hover:bg-red w-full">
                        <span>ویرایش عکس</span>
                        <span className="ti-pencil mr-2"></span>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="bg-white rounded-[10px] p-12 box-shadow grid grid-cols-4 sm:flex sm:flex-col sm:items-center w-full relative z-10 user-card">
                <div className="w-[15vw] h-full sm:w-[32vw] sm:flex sm:items-center sm:flex-col z-30">
                    <div className="flex items-center h-full">
                    <img className="rounded-[50%]  bg-white " width={450} height={450} src={host + data.attributes.profileImage.data.attributes.formats.custom.url} alt="عکس پروفایل" />
                    
                    </div>
                    {/* <Link to={"./edit-profile-image"} replace={true} >
                        <div className="flex button-custom items-center justify-center mt-8 w-full bg-[#1877f2] text-white hover:bg-[#1877f2]">
                            <span>ویرایش عکس</span>
                            <span className="ti-pencil mr-2"></span>
                        </div>
                    </Link> */}
                </div>
                <div className="grid grid-cols-1 bg-white p-6 col-span-3 sm:mt-8">
                    <div className="px-8 py-2">
                        {/* <span className="text-[16px] text-gray">نام و نام خانوادگی: </span> */}
                        <span className="text-[18px] font-semibold">{data.attributes.fullName}</span>
                    </div>
                    {data.attributes.role === "نماینده" && <div className="px-8 py-2">
                        <span className="text-[16px] text-gray">شماره پرسنلی:</span>
                        <span className="text-[16px] mr-1">{data.attributes.username !== null ? data.attributes.username : "---"}</span>
                    </div>}
                    <div className="px-8 py-2">
                        <span className="text-[16px] text-gray">ایمیل:</span>
                        <span className="text-[16px] mr-1">{data.attributes.email !== null ? data.attributes.email : "---"}</span>
                    </div>
                    <div className="px-8 py-2">
                        <span className="text-[16px] text-gray">سمت:</span>
                        <span className="text-[16px] mr-1">{data.attributes.role === "ادمین" ? "انفورماتیک" : data.attributes.role}</span>
                    </div>
                    <div className="px-8 py-2">
                        <span className="text-[16px] text-gray">شرکت:</span>
                        <span className="text-[16px] mr-1">{data.attributes.company}</span>
                    </div>
                </div>
                
            </div>

            {storeData && <><div className="mb-4 mt-12 flex items-center">
                <span className="ti-shopping-cart text-[30px]  ml-4 mb-[3px]" ></span>
                <span className="text-[24px] font-semibold ">فروشگاه ها</span> 
            </div>
            <div className="flex items-start justify-center flex-col  w-full ">
                {storeData.map((store,i) => {
                    return (<div key={i} className="w-full flex items-center justify-start sm:flex-col sm:items-start box-shadow bg-white rounded-[10px] mb-4 user-card2 p-0">
                        <div className=" user-card2 max-w-[30vw] lg:max-w-[40vw] sm:max-w-[100vw]">
                            <img className="rounded-tr-[10px] rounded-br-[10px] sm:rounded-br-[0px] " src={host + store.image.data.attributes.formats.custom.url} alt="عکس فروشگاه"/>
                        </div>    
                        <div className="z-10 mr-8">
                            {i === 0 ? <div className="mb-[8px] text-[16px]"><span className=""></span><span className="text-gray">شعبه {i + 1} : </span> <span>{store.name}</span></div>
                            : <div className="mb-[8px] text-[16px] w-100"><span className=""></span><span className="text-gray">شعبه {i + 1} : </span> <span>{store.name}</span></div>}
                            <div className="mb-[8px] text-[16px]"><span className=""></span><span className="text-gray">آدرس فروشگاه : </span> <span >{store.address ? store.address : "-"}</span></div>
                            <div className="mb-[8px] text-[16px]"><span className=""></span><span className="text-gray">شماره تماس : </span> <span >{store.StoreNumber ? store.StoreNumber : "-"}</span></div>
                            <div className="mb-[8px] text-[16px]"><span className=""></span><span className="text-gray">شماره فکس : </span> <span >{store.faxNumber ? store.faxNumber : "-"}</span></div>
                            <div className="mb-[8px] text-[16px]"><span className=""></span><span className="text-gray">ساعات کاری : </span> <span >{store.workHours ? store.workHours : "-"}</span></div>
                        </div>
                    </div>)
                })}
                </div></>}
            <ChangePassword />
        </div>}
    </div>
}

export default Profile