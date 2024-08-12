import React, { useState } from "react";
import { useSelector } from "react-redux";
import uploadImage from "../../../Assets/images/upload.png"
import fileIcon from "../../../Assets/images/file-icon.svg"
import trashCan from "../../../Assets/images/trash-can.png"
import axios from "axios";
import { redirect } from "react-router-dom";

export const UploadLoader = () => {
    if (localStorage.getItem("userRole") !== "فروش") {
      alert("شما اجازه دسترسی به این صفحه را ندارید.")
      return redirect("/dashboard")
    }
    return null
  }

const Upload = () => {
    const host = useSelector(state => state.State.host)
    const [state, setState] = useState(null)
    const [image, setImage] = useState(null)
    const [fileName, setFileName] = useState(null)
    const [name, setName] = useState("")

    
    const handelSubmmit = async (event) => {
        event.preventDefault()
        var id = null

        const formData = new FormData();
        formData.append('files', image, name);

        await axios.post(`${host}/api/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          }).then(res => {
          id = res.data[0].id
        }).catch(res => {
        })

        await axios.post(`${host}/api/mwjwdy-kashy-has`,
            {
                data: {
                    name: name,
                    file: {
                        id: id
                    }
                }
            }
        ).then(res => {
          setState(true)
        }).catch(res => {
          setState(false)
        })
    }
  
    return <div>
        <div className="flex items-center justify-center mb-12 font-semibold">
            <p className="text-[22px]">بارگذاری موجودی کاشی ها</p>
        </div>
        <form className="mx-32 lg:mx-24 sm:mx-12">
            <div className="flex flex-col items-start justify-start mb-8">
                <label className="mt-[18px] mb-[10px]" name="name">نام فایل بارگذاری شده</label>
                <input
                    type="text"
                    className="w-[15vw] xs:w-[25vw] py-[13px] px-[15px] text-md leading-[initial]  border-[2px] border-solid border-[#0a467e] rounded-[5px]"
                    placeholder="نام فایل"
                    value={name}
                    onChange={({ target : {value}}) => {
                        value && setName(value)
                    }}
                    />
            </div>
            <label className=" mb-[10px]" name="name">بارگذاری فایل</label>
            <div className="custom-form bg-white" onClick={() => document.querySelector(".input-file").click()}>
                <input
                className="input-file"
                type="file"
                name="files"
                hidden
                onChange={({ target : {files}}) => {
                    files[0] && setFileName(files[0].name)
                    if (files[0]){
                        setImage(files[0])
                    }
                }}
                />
                {image ? 
                    <div className="flex items-center justify-center">
                        <img src={fileIcon} width={20} height={30} alt="فایل"/>
                        <p className="mr-2">{fileName}</p>
                    </div> :
                <>
                    <img src={uploadImage} width={150} height={150} alt={fileName}  /> 
                    <p>فایل مورد نظر را انتخاب کنید.</p>
                </>}
            </div>
            <div >
            <div className="flex items-center justify-start mt-6 bg-[#e9f0ff] rounded-[5px] py-[15px] px-[20px]">
                <img className="cursor-pointer" src={trashCan} alt="حذف فایل" width={20} height={30} onClick={() => {
                    setFileName("هیچ فایلی انتخاب نشده است")
                    setImage(null)
                }}/>
                <p className="mr-2">{fileName}</p>
            </div>
        </div>
        <div className="flex items-center justify-end mt-8 ">
            {state ? <p>فایل با موفقیت بارگذاری شد.</p> : <></>}
            {state === false ? <p>مشکلی در بارگذاری فایل پیش آمد.</p> : <></>}
        </div>
        <div className="flex items-center justify-end mt-2 ">
            <button className="button-custom bg-[#ff3030] text-white rounded-[5px] hover:bg-[#ff3030] w-auto mt-0" onClick={handelSubmmit}>بارگذاری</button>
        </div>
        </form>
    </div>
}

export default Upload