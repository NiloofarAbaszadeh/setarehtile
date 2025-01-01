import React, { useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import uploadImage from "../../../Assets/images/upload.png"

const ChangeProfileImage = (props) => {
    const host = useSelector(state => state.State.host)
    const [state, setState] = useState(null)
    const [image, setImage] = useState(null)
    const [fileName, setFileName] = useState("")

    
    const handelSubmmit = async (event) => {
        event.preventDefault()
        var id = null
        const userId = localStorage.getItem("userId")
        console.log(userId)

        const formData = new FormData();
        formData.append('files', image, fileName);

        await axios.post(`${host}/api/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          }).then(res => {
          id = res.data[0].id
        }).catch(res => {
        })

        await axios.put(`${host}/api/karbrans/${userId}`,
            {
                data: {
                    profileImage: {
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
  
    return (
      <div>
        <div className="flex items-center justify-center mt-12">
          <div className="w-[80%] md:w-[90%] sm:w-[95%]">
            <form className="mx-32 lg:mx-24 sm:mx-12 bg-white custom-boarder rounded-[5px] box-shadow pb-8">
              <div
                className="custom-form bg-white"
                onClick={() => document.querySelector(".input-file").click()}
              >
                <input
                  className="input-file"
                  type="file"
                  name="files"
                  hidden
                  onChange={({ target: { files } }) => {
                    files[0] && setFileName(files[0].name);
                    if (files[0]) {
                      setImage(files[0]);
                    }
                  }}
                />
                {image ? (
                  <div className="flex items-center justify-center flex-col p-12">
                    <img
                      src={URL.createObjectURL(image)}
                      width={170}
                      height={250}
                      alt="فایل"
                    />
                  </div>
                ) : (
                  <>
                    <img
                      src={uploadImage}
                      width={150}
                      height={150}
                      alt={fileName}
                    />
                    <p>فایل مورد نظر را انتخاب کنید.</p>
                  </>
                )}
              </div>
              <div>
                <div className="flex items-center justify-start mt-6 bg-[#e9f0ff] rounded-[5px] py-[15px] px-[20px]">
                  <span
                    className="cursor-pointer ti ti-trash"
                    alt="حذف فایل"
                    width={20}
                    height={30}
                    onClick={() => {
                      setFileName("هیچ فایلی انتخاب نشده است");
                      setImage(null);
                    }}
                  />
                  <p className="mr-2">{fileName}</p>
                </div>
              </div>
              <div className="flex items-center justify-end mt-4 ">
                {state ? <p>فایل با موفقیت بارگذاری شد.</p> : <></>}
                {state === false ? (
                  <p>مشکلی در بارگذاری فایل پیش آمد.</p>
                ) : (
                  <></>
                )}
              </div>
              <div className="flex items-center justify-end mt-2 ">
                <button
                  className="button-custom bg-[#ff3030] text-white rounded-[5px] hover:bg-[#ff3030] w-auto mt-0"
                  onClick={handelSubmmit}
                >
                  بارگذاری
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}

export default ChangeProfileImage