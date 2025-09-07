import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PopupShow = (props) => { 
  const host = useSelector(state => state.State.host)
  const [popup, setPopup] = useState(false)
  const language = useSelector(state => state.State.language)

  return <>
    {props.position[0] && <div className={`z-20 absolute`} style={{ left: `${props.position[0]}%`, top: `${props.position[1] + 5}%` }} key={props.keys} >
    <div className="relative">
      <div
      className={`icon-container ${popup ? 'active' : ''} absolute left-[5px]`}
      onClick={() => setPopup(!popup)}
    >
      <span className="line vertical z-30" />
      <span className="line horizontal z-30" />
      <span className={`text-white text-[20px] py-[2px] px-[12px] bg-white rounded-[50%] cursor-pointer absolute left-[-8.5px] top-[-8px] opacity-70 z-10 animate-ping`} onClick={() => setPopup(pop => !pop)}>&#x2022;</span>
      <span className={`text-white text-[19px] py-[2px] px-[12px] bg-white rounded-[50%] cursor-pointer absolute left-[-8.5px] top-[-8px] opacity-80 z-20`} onClick={() => setPopup(pop => !pop)}>&#x2022;</span>
    
    </div>
    </div>
    <div className={`z-20 absolute bg-white rounded-[5px] w-[200px] h-max left-[-85px] md:w-[150px] md:left-[-65px] sm:w-[100px] sm:left-[-35px] shadow-xl border-1 ${!popup && "invisible"} flex flex-col items-center justify-center`} style={{ top: `45px` }}>
      <div className="mt-2">
        <img className="" src={host + props.tile.tile.data.attributes.image.data.attributes.url} alt="tile" />
      </div>
      {popup && <div className={`flex item-center justify-center flex-col`}>
        <span className="flex items-center justify-center mt-2 text-red text-[18px]">{props.tile.tile.data.attributes.baseInfo.size.data.attributes.size}</span>
        <Link to={`./product-tilse/${props.tile.tile.data.attributes.name}`}><button className="button-custom rounded-[8px] w-[100%] text-[11px] mt-2 mb-4 sm:text-[8px] sm:px-4 flex items-center"> {props.tile.tile.data.attributes.name} <span className={`line-icon-Arrow-Out${language === "fa-IR" ? "Left mr-1 " : language === "en" && "Right ml-1 "}text-[18px]font-medium`}></span></button></Link>
      </div>}
    </div>
    </div>}
  </>
}

export default PopupShow