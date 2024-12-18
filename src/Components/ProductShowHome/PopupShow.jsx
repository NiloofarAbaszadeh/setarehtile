import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PopupShow = (props) => { 
  const host = useSelector(state => state.State.host)
  const language = useSelector(state => state.State.language)
  const [popup, setPopup] = useState(false)

  return <>
    {props.position[0] && <div className={`z-20 absolute`} style={{ left: `${props.position[0]}%`, top: `${props.position[1] + 5}%` }}>
    <div className="relative">
      <span className={`text-fastblue text-[16px] my-[2px] px-[7px] mx-[3px] bg-white rounded-[50%] cursor-pointer absolute left-[50%] z-30`} onClick={() => setPopup(pop => !pop)}>&#x2022;</span>
      <span className={`text-white text-[16px] py-[2px] px-[10px] bg-white rounded-[50%] cursor-pointer absolute left-[50%] animate-ping `} onClick={() => setPopup(pop => !pop)}>&#x2022;</span>
    </div>
    <div className={`z-20 absolute bg-white rounded-[5px] w-[200px] h-max left-[-85px] md:w-[150px] md:left-[-65px] sm:w-[100px] sm:left-[-35px] shadow-xl border-1 ${!popup && "invisible"} flex flex-col items-center justify-center`} style={{ top: `45px` }}>
      <div className="mt-2">
        <img className="" src={host + props.tile.tile.data.attributes.image.data.attributes.url} alt="tile" />
      </div>
      {popup && <div className={`flex item-center justify-start`}>
        <Link to={`./product-tilse/${props.tile.tile.data.attributes.name}`}><button className="button-custom rounded-[2px] w-[100%] text-[11px] my-4 bg-[#f8f6f4] sm:text-[8px] sm:px-4 ">{language === "fa-IR" ? "مشاهده کاشی" : language === "en" ? "Tile details" : ""}</button></Link>
      </div>}
    </div>
    </div>}
  </>
}

export default PopupShow