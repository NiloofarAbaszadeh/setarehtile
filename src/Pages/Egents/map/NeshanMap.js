import React, { useEffect, useRef, useState } from "react";
import neshan_map_loader from "./loaders/neshan_map_loader";
import "./NeshanMap.css";

const NeshanMap = (props) => {
  const { style, options, onInit } = props;
  const mapEl = useRef(null);
  const [load,setLoad] = useState(true)

  const defaultStyle = {
    width: "full",
    height: "720px",
    margin: 0,
    padding: 0,
  };

  const defaultOptions = {
    key: "web.d2b585cb7d9347b0826270d62d933e16",
    maptype: "dreamy",
    poi: true,
    traffic: false,
    center: [35.699739, 51.338097],
    zoom: 14,
  };

  useEffect(() => {
    neshan_map_loader(load && {
      onLoad: () => {
        setLoad(false)
        let map = new window.L.Map(mapEl.current, { ...defaultOptions, ...options });
        if (onInit) onInit(window.L, map);
      },
      onError: () => {
        console.error("Neshan Maps Error: This page didn't load Neshan Maps correctly");
      },
    });
  });
  return <div className="-z-0" ref={mapEl}  style={{ ...defaultStyle, ...style }} />;
};

export default NeshanMap;
