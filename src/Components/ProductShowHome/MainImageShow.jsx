import React from "react";
import PopupShow from "./PopupShow";
import { useSelector } from "react-redux";

const MainImageShow = (props) => {
  const host = useSelector(state => state.State.host)
   
  return <div className="w-full h-full my-12">
    <div className="relative">
      <img className="z-10" src={host + props.data.MainImage.data.attributes.url} alt={props.data.Name} />
      {props.data.ShowPins.map((pin, i) => {
        return <PopupShow keys={i} position={[pin.left / props.data.MainImage.data.attributes.width * 100 , pin.top / props.data.MainImage.data.attributes.height * 100]} tile={pin} />
      })}
    </div>
  </div>
}

export default MainImageShow