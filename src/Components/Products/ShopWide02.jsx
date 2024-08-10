import React, { useState, useEffect, memo } from 'react'

// Libraries
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from 'axios';

const ShopWide02 = (props) => {
    const host = useSelector(state => state.State.host)
    const token = useSelector(state => state.State.readToken)
    const [data, setData] = useState()
    
    useEffect(() => {
        const GetData = async () => {
            
            if (props.data[0]) {
                // eslint-disable-next-line
                await axios.get(`${host}/api/products?filters\[baseInfo\][size]=${props.data[0]}&filters\[baseInfo\][color_themes]=${props.data[1]}&populate=*&pagination[pageSize]=4`, {
                    headers: { Authorization: `Bearer ${token}` }
                  }).then(res => {
                    setData(res.data.data)
                  })
            } else {
                // eslint-disable-next-line
                await axios.get(`${host}/api/products?filters\[baseInfo\][color_themes]=${props.data[1]}&populate=*&pagination[pageSize]=4`, {
                    headers: { Authorization: `Bearer ${token}` }
                  }).then(res => {
                    setData(res.data.data)
                  })
            }
            
          }
          GetData()
    }, [host, token, props.data])

    return (
    <>
        {data && <div className='flex items-center justify-center flex-row'>
            {
               data.map((item, i) => {
                   return (
                       <div key={i}
                           className="product-box w-[280px] relative overflow-hidden w-full mb-[45px] xs:mb-0 m-4">
                           <Link aria-label="link" to={`/product-tilse/${item.attributes.name}`} target="_blank">
                               <div className="product-image p-5 relative overflow-hidden rounded-md bg-[#EAE9E9] rounded-[15px]">
                                   <img width={600} height={765} className="default-image w-full h-[150px]" src={host + item.attributes.image.data.attributes.formats.custom.url} alt="" />
                                   <img width={600} height={765} className="hover-img w-full" src={host + item.attributes.image.data.attributes.formats.custom.url} alt="" />
                                   <div className="product-overlay absolute top-0 left-0 w-full h-full"></div>
                               </div>
                           </Link>
                           <div className="product-footer text-center py-[25px] xs:py-[10px]">
                               <Link aria-label="link" to={`/product-tilse/${item.attributes.name}`} className="text-darkgray hover:text-red font-medium inline-block">{item.attributes.name}</Link>
                           </div>
                       </div>
                   )
               })}
            </div>}
        </>
    )
}

export default memo(ShopWide02)