import React from "react";
import "@neshan-maps-platform/mapbox-gl-react/dist/style.css";
import NeshanMap from "./map/NeshanMap";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios"; 
import { Helmet } from 'react-helmet-async'; 
import marker from './map marker.png';
import shadow from './marker-shadow.png';
import * as L from "leaflet"
import { ScaleLoader } from 'react-spinners'

const External = () => {
  const token = useSelector(state => state.State.readToken)
  const host = useSelector(state => state.State.host)
  const [data, setData] = useState(null)
  const [loading, setLoading] =useState(false)
  const [select, setSelect] = useState(false)
  const [activeAgent, setActiveAgent] = useState(null)

  var redMarker = L.icon({
    iconUrl: marker,
    shadowUrl: shadow,
    iconSize:     [25, 35], // size of the icon
    shadowSize:   [25, 30], // size of the shadow
    iconAnchor:   [10, 30], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 25],  // the same for the shadow
    popupAnchor:  [3, -32] // point from which the popup should open relative to the iconAnchor 
});
   
  useEffect(() => {
    const GetData = async () => {
      await axios.get(`${host}/api/external-agents?populate=deep`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      .then(res => {
        setData(res.data.data)
        setLoading(true)
      })
    }
    GetData()
  },[host, token])

  const handelClose = () => {
    setSelect(false)
  } 

  return (
    <>
    <Helmet>
        <title> نمایندگان خارجی | کاشی و سرامیک ستاره  </title>
      </Helmet>
      {!loading && !data && <div className='flex justify-center items-center bg-white w-full h-[100vh] fixed top-0 fix z-50 top-[-25px]'>
        <ScaleLoader
          color={"#db1010"}
          loading={!data}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"/></div>}
      {loading && <div className="z-0 relative">
      {select && <div className="absolute top-0 left-0 h-[100vh] w-[350px] bg-[#010000cc]  z-10">
          <p onClick={handelClose} className="text-white mr-4 mt-3 text-[20px] ti-close"></p>
          <div className="flex-fix items-center justify-center opacity-100">
            <div className="flex items-center bg-white rounded-[50%] p-7 h-[180px] w-[180px] mt-12 mb-4">
              <img className="h-[100px]" src={host + activeAgent.store.image.data.attributes.formats.small.url} alt="agent"></img>
            </div>
          </div>
          <div className="flex flex-col justify-center items-start mt-8">
              <ul className="m-4">
              {activeAgent.egent.attributes.fullName ? 
                <li className="mb-8 flex items-center"><span className="ml-4 ti-shopping-car text-white text-[20px]"></span><span className="text-white text-[24px]">{activeAgent.egent.attributes.fullName}</span> </li> :
                <li className="mb-8 flex items-center"><span className="text-white text-[35px]">----------</span><span className="ml-4 ti-shopping-cart text-white text-[20px]"></span> </li>}

                {activeAgent.store.address ? 
                <li className="mb-2 flex items-center"><span className="ml-4 ti-pin text-white text-[20px]"></span><span className="text-white text-[17px]">{activeAgent.store.address}</span> </li> :
                <li className="mb-2 flex items-center"><span className="text-white text-[25px]">----------</span><span className="ml-4 ti-pin text-white text-[20px]"></span> </li>}

                {activeAgent.store.workHours ? <li className="mb-2 flex items-center"><span className="ti-time text-[20px] text-white"></span><span className=" mr-4 text-white text-[17px]">{activeAgent.store.workHours}</span></li> : 
                <li className="mb-2 flex items-center"><span className="ml-4 ti-time text-[20px] text-white"></span><span className=" text-white text-[25px]">----------</span></li>}
                
                {activeAgent.store.StoreNumber ? <li className="mb-2 flex items-center"><span className="ti-headphone-alt text-[20px] text-white"></span><span className="mr-4 text-white text-[17px]">{activeAgent.store.StoreNumber}</span></li> :
                <li className="mb-2 flex items-center"><span className="ml-4 ti-headphone-alt text-[20px] text-white"></span><span className="text-white text-[25px]">----------</span></li>}
                
                {activeAgent.store.faxNumber ? <li className="mb-2 flex items-center"><span className="ti-printer text-[20px] text-white"></span><span className="mr-4 text-white text-[17px]">{activeAgent.store.faxNumber}</span></li> :
                <li className="mb-2 flex items-center"><span className=" ti-printer text-[20px] text-white"></span><span className="mr-4 text-white text-[25px]">----------</span></li>}
              </ul>
            </div>
        </div>}
        <NeshanMap
          options={{
            key: "web.190d1e6563104d71873a7eb749cc2d2d",
            maptype: "dreamy",
            poi: true,
            traffic: false,
            center: [31.874446863056157, 54.33401026695205],
            zoom: 5,
          }}
          onInit={(L, myMap) => {
            // eslint-disable-next-line
            {data && data.map(egent => {
              const elements = egent.attributes.store.map(store => {
                const location = store.location.split(",");
                const image = host + store.image.data.attributes.formats.small.url
                return L.marker([location[0], location[1]], {
                  icon: redMarker,
                  fillOpacity: 0.5,
                  radius: 500,
                }).addTo(myMap)
                .bindPopup(`<div class="flex-fix"><img src="${image}" /><b>${egent.attributes.fullName}</b>${store.name}</div>`)
                .on('click', () => {setSelect(true)
                  setActiveAgent({egent, store})})
              })
              return elements
            })}
          }}/></div>}</>)}

export default External