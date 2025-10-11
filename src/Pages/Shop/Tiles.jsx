import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { m } from 'framer-motion'
import { fadeIn } from '../../Functions/GlobalAnimations';
import PortfolioBoxed03 from '../../Components/Portfolio/PortfolioBoxed03';
import axios from 'axios';
import { useSelector } from 'react-redux';

// const tileType = ['کاشی دیوار', 'کاشی کف']
// const tileSize = ['60x120', '30x60', '33x100', '30x90', '40x100', '62/5x62/5', '30x80', '30x30', '60x60']
// const tileDesign = ['سنگ', 'ترکیبی', 'گل و طبیعت', 'چوب', 'آجر']
// const tileShape = ['مستطیلی', 'مربعی', 'شش ضلعی']
// const tileColor = ['آبی', 'صورتی', 'مشکی', 'خاکستری', 'سفید', 'کرم', 'قهوه ای']
// const tileBakeType = ["پخت اول", "پخت سوم"]
// const tilespecial = ["چند فیس", "کالیبره"]
// const tileGlazeType = ["براق", "مات"]
// const tileUsePlace = ["داخلی", "بیرونی"]

const Tiles = (props) => {
    const token = useSelector(state => state.State.readToken)  
    const host = useSelector(state => state.State.host)
    const language = useSelector(state => state.State.language)

    const [filteredData, setFilteredData] = useState(props.data)

    const [tileSize, setSize] = useState()
    const [tileDesign, setDesign] = useState()
    const [tileShape, setShape] = useState()
    const [tileColor, setColor] = useState()
    const [tileBakeType, setBake] = useState()
    const [tilespecial, setSpecial] = useState()
    const [tileGlazeType, setGlaze] = useState()
    const [tileUsePlace, setUsePalac] = useState()
    
    const [dataType, setDataType] = useState("tiles")
    const [filterType, setfilterType] = useState([])
    const [filterSize, setfilterSize] = useState([])
    const [filterDesign, setfilterDesign] = useState([])
    const [filterShape, setfilterShape] = useState([])
    const [colorTheme, setColorTheme] = useState([])
    const [bakeType, setBakeType] = useState([])
    const [glazeType, setGlazeType] = useState([])
    const [specialTypes, setSpecialTypes] = useState([])
    const [usePlaces, setUsePlaces] = useState([])

    useEffect(() => {
        const GetData = () => {
          axios.get(`${host}/api/abeads?populate=*&locale=${language}`, {
              headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                setSize(res.data.data) 
            })
          
          axios.get(`${host}/api/color-themes?populate=*&locale=${language}`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                setColor(res.data.data) 
            })

            axios.get(`${host}/api/special-featuress?populate=*&locale=${language}`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                setSpecial(res.data.data) 
            })
            
            axios.get(`${host}/api/glaze-types?populate=*&locale=${language}`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                setGlaze(res.data.data) 
            })

            axios.get(`${host}/api/design-types?populate=*&locale=${language}`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                setDesign(res.data.data) 
            })
            
            axios.get(`${host}/api/shape-types?populate=*&locale=${language}`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                setShape(res.data.data) 
            })
            axios.get(`${host}/api/baking-types?populate=*&locale=${language}`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                setBake(res.data.data) 
            })
            
            axios.get(`${host}/api/usage-places?populate=*&locale=${language}`, {
                  headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                setUsePalac(res.data.data) 
            })  
        }
            GetData()
    },[host,token,language])

    // const FilterType = (data) => {
    //     var temp = null
    //     if (filterType.length !== 0){
    //         filterType.map(type => {
    //             temp = data.filter(item => item.attributes.baseInfo.type.data.map(item => item.attributes.type).includes(type))
    //             // .map(item => item.attributes.type).includes(type)
    //             return type
    //         })
    //         return temp
    //     } else {
    //         return data
    //     }
    // }

    const FilterSize = (data) => {
        var temp = null
        if (filterSize.length !== 0){
            filterSize.map(size => {
                temp = data.filter(item => item?.attributes?.baseInfo?.size?.data?.attributes?.size === size)
                return size
            })
            return temp
        } else {
            return data
        }
    }

    const FilterDesign = (data) => {
        var temp = null
        if (filterDesign.length !== 0){
            filterDesign.map(design => {
                temp = data.filter(item => item?.attributes?.baseInfo?.design?.data?.attributes?.design === design)
                return design
            })
            return temp
        } else {
            return data
        }
    }

    const FilterShape = (data) => {
        var temp = null
        if (filterShape.length !== 0){
            filterShape.map(shape => {
                temp = data.filter(item => item?.attributes?.baseInfo?.shape?.data?.attributes?.shape === shape)
                return shape
            })
            return temp
        } else {
            return data
        }
    }

    const FilterColor = (data) => {
        var temp = null
        if (colorTheme.length !== 0){
            colorTheme.map(color => {
                temp = data.filter(item => item?.attributes?.baseInfo?.color?.data?.map(item => item?.attributes?.color).includes(color))
                return color
            })
            return temp
        } else {
            return data
        }
    }

    const FilterSpecial = (data) => {
        var temp = null
        if (specialTypes.length !== 0){
            specialTypes.map(feature => {
                temp = data.filter(item => item?.attributes?.baseInfo?.special_types?.data?.map(item => item?.attributes?.feature).includes(feature))
                return feature
            })
            return temp
        } else {
            return data
        }
    }

    const FilterUsePlaces = (data) => {
        var temp = null
        if (usePlaces.length !== 0){
            usePlaces.map(place => {
                temp = data.filter(item => item?.attributes?.baseInfo?.use_places?.data?.map(item => item?.attributes?.place).includes(place))
                return place
            })
            return temp
        } else {
            return data
        }
    }

    const FilterGlaze = (data) => {
        var temp = null
        if (glazeType.length !== 0){
            glazeType.map(glaze => {
                temp = data.filter(item => item?.attributes?.baseInfo?.glazeType?.data?.attributes?.glaze === glaze)
                return glaze
            })
            return temp
        } else {
            return data
        }
    }

    const FilterBake = (data) => {
        var temp = null
        if (bakeType.length !== 0){
            bakeType.map(bake => {
                temp = data.filter(item => item?.attributes?.baseInfo?.bakeType?.data?.attributes?.bakeType === bake)
                return bake
            })
            return temp
        } else {
            return data
        }
    }

    useEffect(() => {
        if (colorTheme.length + bakeType.length + glazeType.length + specialTypes.length + usePlaces.length + filterType.length + filterSize.length + filterDesign.length + filterShape.length >= 1) {
            // eslint-disable-next-line
            setFilteredData(FilterUsePlaces(FilterGlaze(FilterBake(FilterSpecial(FilterColor(FilterShape(FilterDesign(FilterSize(filteredData)))))))))}
        // eslint-disable-next-line
    },[filterType, filterSize, filterDesign, filterShape, colorTheme, bakeType, glazeType, specialTypes, usePlaces])

    const handelChange = (event) => {
        if ("active" === event.target.name) {
            event.target.name = "disabeld"
            setFilteredData(props.data)
            if (event.target.value === "نوع محصول") {
                setfilterType(pertyp => [...pertyp, event.target.id])}
            if (event.target.value === "ابعاد") {
                // eslint-disable-next-line
                tileSize.map(size => {
                    if (size !== event.target.id && event.target.name === "active") {
                        document.getElementById(size.attributes.size).className = "p-2 border-[1px] bg-white rounded-full relative border-gray-500 z-10"
                    }
                })
                setfilterSize(pertyp => [...pertyp, event.target.id])}
            if (event.target.value === "نوع طراحی") {
                // eslint-disable-next-line
                tileDesign.map(design => {
                    if (design !== event.target.id && event.target.name === "active") {
                        document.getElementById(design.attributes.design).className = "p-2 border-[1px] bg-white rounded-full relative border-gray-500 z-10"
                    }
                })
                setfilterDesign(pertyp => [...pertyp, event.target.id])}
            if (event.target.value === "نوع شکل") {
                // eslint-disable-next-line
                tileShape.map(shape => {
                    if (shape !== event.target.id && event.target.name === "active") {
                        document.getElementById(shape.attributes.shape).className = "p-2 border-[1px] bg-white rounded-full relative border-gray-500 z-10"
                    }
                })
                setfilterShape(pertyp => [...pertyp, event.target.id])}  
            if (event.target.value === "تم رنگی") {
                // eslint-disable-next-line
                tileColor.map(color => {
                    if (color !== event.target.id && event.target.name === "active") {
                        document.getElementById(color.attributes.color).className = "p-2 border-[1px] bg-white rounded-full relative border-gray-500 z-10"
                    }
                })
                setColorTheme(pertyp => [...pertyp, event.target.id])}  
            if (event.target.value === "مکان استفاده") {
                // eslint-disable-next-line
                tileUsePlace.map(place => {
                    if (place !== event.target.id && event.target.name === "active") {
                        document.getElementById(place.attributes.place).className = "p-2 border-[1px] bg-white rounded-full relative border-gray-500 z-10"
                    }
                })
                setUsePlaces(pertyp => [...pertyp, event.target.id])}  
            if (event.target.value === "ویژگی های خاص") {
                // eslint-disable-next-line
                tilespecial.map(special => {
                    if (special !== event.target.id && event.target.name === "active") {
                        document.getElementById(special.attributes.feature).className = "p-2 border-[1px] bg-white rounded-full relative border-gray-500 z-10"
                    }
                })
                setSpecialTypes(pertyp => [...pertyp, event.target.id])}  
            if (event.target.value === "نوع لعاب") {
                // eslint-disable-next-line
                tileGlazeType.map(glaze => {
                    if (glaze !== event.target.id && event.target.name === "active") {
                        document.getElementById(glaze.attributes.glaze).className = "p-2 border-[1px] bg-white rounded-full relative border-gray-500 z-10"
                    }
                })
                setGlazeType(pertyp => [...pertyp, event.target.id])}  
            if (event.target.value === "نوع پخت") {
                // eslint-disable-next-line
                tileBakeType.map(bake => {
                    if (bake !== event.target.id && event.target.name === "active") {
                        document.getElementById(bake.attributes.bakeType).className = "p-2 border-[1px] bg-white rounded-full relative border-gray-500 z-10"
                    }
                })
                setBakeType(pertyp => [...pertyp, event.target.id])}   
            event.target.className = "p-2 border-[1px] bg-none rounded-full relative border-gray-500 z-10"  
        } else {
            event.target.name = "active"
            event.target.className = "p-2 border-[1px] bg-white rounded-full relative border-gray-500 z-10"
            setFilteredData(props.data)
            if (event.target.value === "نوع محصول")
                setfilterType(per => per.filter(item => item !== event.target.id))
            if (event.target.value === "نوع شکل")
                setfilterShape(per => per.filter(item => item !== event.target.id))
            if (event.target.value === "نوع طراحی")
                setfilterDesign(per => per.filter(item => item !== event.target.id))
            if (event.target.value === "ابعاد")
                setfilterSize(per => per.filter(item => item !== event.target.id))
            if (event.target.value === "تم رنگی") {
                setColorTheme(per => per.filter(item => item !== event.target.id))}  
            if (event.target.value === "مکان استفاده") {
                setUsePlaces(per => per.filter(item => item !== event.target.id))}  
            if (event.target.value === "ویژگی های خاص") {
                setSpecialTypes(per => per.filter(item => item !== event.target.id))}  
            if (event.target.value === "نوع لعاب") {
                setGlazeType(per => per.filter(item => item !== event.target.id))}  
            if (event.target.value === "نوع پخت") {
                setBakeType(per => per.filter(item => item !== event.target.id))}  
        }
    }

    const UpdateState = (event) => {
        setDataType(event.target.value)
    }

    if (dataType === "collections") {
        return (<Navigate to="/product-collection" replace={true} />)
    }
    else if (dataType === "groups") {
        return (<Navigate to="/product-groups" replace={true} />)
    }
    return (<>
            {props.data && <section className="shopping-right-left-sidebar pt-0 py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
                <Container>
                    <Row>
                        <Col lg={9} md={8} className="pl-[55px] md:pl-[15px] sm:mb-[30px] order-md-2 order-1 sm:px-0">
                        <div className='flex justfy-start items-center text-black text-xlg mb-4'>
                                <div className='p-[3px]'>
                                    {language === "fa-IR" ? "نمایش بر اساس: " : language === "en" ? "Show based on: " : "نمایش بر اساس: "}
                                </div>
                                <div className='mr-[10px] border p-[2px]'>
                                <select
                                    className='p-1 text-[16px]'
                                  id="data-Type"
                                  name="data-type"
                                  value={dataType}
                                  onChange={UpdateState}
                                >
                                  <option value="collections">{language === "fa-IR" ? "کلکسیون ها" : language === "en" ? "Collections" : "کلکسیون ها"}</option>
                                  <option value="groups">{language === "fa-IR" ? "گروه ها" : language === "en" ? "Groups" : "گروه ها"}</option>
                                  <option value="tiles">{language === "fa-IR" ? "کاشی ها" : language === "en" ? "Tiles" : "کاشی ها"}</option>
                                </select>
                                </div>
                            </div>
                            {filteredData.length === 0 ? <div className='flex items-center justify-center mt-36 mr-24'>
                                {language === "fa-IR" ? <p className='text-red text-[24px]'>موردی جهت مشاهده وجود ندارد</p> :
                                language === "en" ? <p className='text-red text-[24px]'>There is no item to view</p> :
                                <p className='text-red text-[24px]'>موردی جهت مشاهده وجود ندارد</p>}
                            </div>: 
                            <PortfolioBoxed03
                            grid="grid grid-3col xl-grid-3col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-large text-center"
                            data={filteredData}
                          />}
                        </Col>
                        <m.aside className="col col-lg-3 col-md-4 shopping-sidebar inline-block order-md-1 order-2" {...fadeIn}>
                            {/* <div className="custom-border box-shadow bg-white pt-3 mb-8 relative rounded-[4px] pb-6">
                            <span className="shop-title relative pr-8 pb-3 font-medium text-darkgray block mb-[20px] text-xlg border-b-2 border-fastblue">نوع محصول</span>
                                <ul className="list-style filter-category">
                                    {tileType.length !== 0 && tileType.map((item,i) => {
                                        return (<>
                                            {item !== null && <li key={item + i}><div className='flex items-center justify-between relative'><p className='text-black text-xmd'>{item}</p><button className='p-2 border-[1px] bg-white rounded-full relative border-gray-500 z-10' id='تم رنگی' name="active" value={item} onClick={handelChange}></button><span className='absolute p-[6px] bg-red rounded-full top-[6px] left-[2.5px]'></span></div></li>} 
                                        </>)
                                    })}
                                </ul>
                            </div> */}
                            <div className="custom-border box-shadow bg-white pt-3 mb-8 relative rounded-[4px] pb-6">
                            <span className="shop-title relative px-8 pb-3 font-medium text-darkgray block mb-[20px] text-xlg border-b-2 border-fastblue">{language === "fa-IR" ? "ابعاد" : language === "en" ? "Size" : "ابعاد"}</span>
                                <ul className="list-style filter-category">
                                {tileSize && tileSize.length !== 0 && tileSize.map(item => {
                                        return (<>
                                            {item !== null && <li key={item.attributes.size}><div className='flex items-center justify-between relative'><p className='text-black text-xmd '>{item.attributes.size}</p><button className='p-2 border-[1px] bg-white rounded-full relative border-gray-500 z-10' id={item.attributes.size} name="active" value='ابعاد' onClick={handelChange}></button><span className={`absolute p-[6px] bg-red rounded-full top-[6px] ${language === "fa-IR" ? "left-[2.5px]" : language === "en" ? "right-[2.5px]" : "left-[2.5px]"}`}></span></div></li>} 
                                        </>)
                                    })}
                                </ul>
                            </div>
                            <div className="custom-border box-shadow bg-white pt-3 mb-8 relative rounded-[4px] pb-6">
                            <span className="shop-title relative px-8 pb-3 font-medium text-darkgray block mb-[20px] text-xlg border-b-2 border-fastblue">{language === "fa-IR" ? "نوع طراحی" : language === "en" ? "Design" : "نوع طراحی"}</span>
                                <ul className="list-style filter-category">
                                {tileDesign && tileDesign.length !== 0 && tileDesign.map(item => {
                                        return (<>
                                            {item !== null && <li key={item.attributes.design}><div className='flex items-center justify-between relative'><p className='text-black text-xmd'>{item.attributes.design}</p><button className='p-2 border-[1px] bg-white rounded-full relative border-gray-500 z-10' id={item.attributes.design} name="active" value='نوع طراحی' onClick={handelChange}></button><span className={`absolute p-[6px] bg-red rounded-full top-[6px] ${language === "fa-IR" ? "left-[2.5px]" : language === "en" ? "right-[2.5px]" : "left-[2.5px]"}`}></span></div></li>} 
                                        </>)
                                    })}
                                </ul>
                            </div>
                            <div className="custom-border box-shadow bg-white pt-3 mb-8 relative rounded-[4px] pb-6">
                            <span className="shop-title relative px-8 pb-3 font-medium text-darkgray block mb-[20px] text-xlg border-b-2 border-fastblue">{language === "fa-IR" ? "نوع شکل" : language === "en" ? "Shape" : "نوع شکل"}</span>
                                <ul className="list-style filter-category">
                                {tileShape && tileShape.length !== 0 && tileShape.map(item => {
                                        return (<>
                                            {item !== null && <li key={item.attributes.shape}><div className='flex items-center justify-between relative'><p className='text-black text-xmd'>{item.attributes.shape}</p><button className='p-2 border-[1px] bg-white rounded-full relative border-gray-500 z-10' id={item.attributes.shape} name="active" value='نوع شکل' onClick={handelChange}></button><span className={`absolute p-[6px] bg-red rounded-full top-[6px] ${language === "fa-IR" ? "left-[2.5px]" : language === "en" ? "right-[2.5px]" : "left-[2.5px]"}`}></span></div></li>} 
                                        </>)
                                    })}
                                </ul>
                            </div>
                            <div className="custom-border box-shadow bg-white pt-3 mb-8 relative rounded-[4px] pb-6">
                            <span className="shop-title relative px-8 pb-3 font-medium text-darkgray block mb-[20px] text-xlg border-b-2 border-fastblue">{language === "fa-IR" ? "تم رنگی" : language === "en" ? "Color" : "تم رنگی"}</span>
                                <ul className="list-style filter-category">
                                {tileColor && tileColor.length !== 0 && tileColor.map(item => {
                                        return (<>
                                            {item !== null && <li key={item.attributes.color}><div className='flex items-center justify-between relative'><p className='text-black text-xmd'>{item.attributes.color}</p><button className='p-2 border-[1px] bg-white rounded-full relative border-gray-500 z-10' id={item.attributes.color} name="active" value='تم رنگی' onClick={handelChange}></button><span className={`absolute p-[6px] bg-red rounded-full top-[6px] ${language === "fa-IR" ? "left-[2.5px]" : language === "en" ? "right-[2.5px]" : "left-[2.5px]"}`}></span></div></li>} 
                                        </>)
                                    })}
                                </ul>
                            </div>
                            <div className="custom-border box-shadow bg-white pt-3 mb-8 relative rounded-[4px] pb-6">
                            <span className="shop-title relative px-8 pb-3 font-medium text-darkgray block mb-[20px] text-xlg border-b-2 border-fastblue">{language === "fa-IR" ? "نوع پخت" : language === "en" ? "Bake" : "نوع پخت"}</span>
                                <ul className="list-style filter-category">
                                {tileBakeType && tileBakeType.length !== 0 && tileBakeType.map(item => {
                                        return (<>
                                            {item !== null && <li key={item.attributes.bakeType}><div className='flex items-center justify-between relative'><p className='text-black text-xmd'>{item.attributes.bakeType}</p><button className='p-2 border-[1px] bg-white rounded-full relative border-gray-500 z-10' id={item.attributes.bakeType} name="active" value='نوع پخت' onClick={handelChange}></button><span className={`absolute p-[6px] bg-red rounded-full top-[6px] ${language === "fa-IR" ? "left-[2.5px]" : language === "en" ? "right-[2.5px]" : "left-[2.5px]"}`}></span></div></li>} 
                                        </>)
                                    })}
                                </ul>
                            </div>
                            <div className="custom-border box-shadow bg-white pt-3 mb-8 relative rounded-[4px] pb-6">
                            <span className="shop-title relative px-8 pb-3 font-medium text-darkgray block mb-[20px] text-xlg border-b-2 border-fastblue">{language === "fa-IR" ? "نوع لعاب" : language === "en" ? "Glaze" : "نوع لعاب"}</span>
                                <ul className="list-style filter-category">
                                {tileGlazeType && tileGlazeType.length !== 0 && tileGlazeType.map(item => {
                                        return (<>
                                            {item !== null && <li key={item.attributes.glaze}><div className='flex items-center justify-between relative'><p className='text-black text-xmd'>{item.attributes.glaze}</p><button className='p-2 border-[1px] bg-white rounded-full relative border-gray-500 z-10' id={item.attributes.glaze} name="active" value='نوع لعاب' onClick={handelChange}></button><span className={`absolute p-[6px] bg-red rounded-full top-[6px] ${language === "fa-IR" ? "left-[2.5px]" : language === "en" ? "right-[2.5px]" : "left-[2.5px]"}`}></span></div></li>} 
                                        </>)
                                    })}
                                </ul>
                            </div>
                            <div className="custom-border box-shadow bg-white pt-3 mb-8 relative rounded-[4px] pb-6">
                            <span className="shop-title relative px-8 pb-3 font-medium text-darkgray block mb-[20px] text-xlg border-b-2 border-fastblue">{language === "fa-IR" ? "ویژگی های خاص" : language === "en" ? "Special Features" : "ویژگی های خاص"}</span>
                                <ul className="list-style filter-category">
                                {tilespecial && tilespecial.length !== 0 && tilespecial.map(item => {
                                        return (<>
                                            {item !== null && <li key={item.attributes.feature}><div className='flex items-center justify-between relative'><p className='text-black text-xmd'>{item.attributes.feature}</p><button className='p-2 border-[1px] bg-white rounded-full relative border-gray-500 z-10' id={item.attributes.feature} name="active" value='ویژگی های خاص' onClick={handelChange}></button><span className={`absolute p-[6px] bg-red rounded-full top-[6px] ${language === "fa-IR" ? "left-[2.5px]" : language === "en" ? "right-[2.5px]" : "left-[2.5px]"}`}></span></div></li>} 
                                        </>)
                                    })}
                                </ul>
                            </div>
                            <div className="custom-border box-shadow bg-white pt-3 mb-8 relative rounded-[4px] pb-6">
                            <span className="shop-title relative px-8 pb-3 font-medium text-darkgray block mb-[20px] text-xlg border-b-2 border-fastblue">{language === "fa-IR" ? "مکان مورد استفاده" : language === "en" ? "Use Places" : "مکان مورد استفاده"}</span>
                                <ul className="list-style filter-category">
                                {tileUsePlace && tileUsePlace.length !== 0 && tileUsePlace.map(item => {
                                        return (<>
                                            {item !== null && <li key={item.attributes.place}><div className='flex items-center justify-between relative'><p className='text-black text-xmd'>{item.attributes.place}</p><button className='p-2 border-[1px] bg-white rounded-full relative border-gray-500 z-10' id={item.attributes.place} name="active" value='مکان استفاده' onClick={handelChange}></button><span className={`absolute p-[6px] bg-red rounded-full top-[6px] ${language === "fa-IR" ? "left-[2.5px]" : language === "en" ? "right-[2.5px]" : "left-[2.5px]"}`}></span></div></li>} 
                                        </>)
                                    })}
                                </ul>
                            </div>
                            <div>
                                {language === "fa-IR" ? <>
                                    <span className="shop-title relative font-medium text-darkgray block mb-[10px]">تگ های محصولات</span>
                                    <div className="tag-cloud d-inline-block margin-10px-top">
                                        <Link className='bg-white' aria-label="product-tags-link" to="#">زیبایی</Link>
                                        <Link className='bg-white' aria-label="product-tags-link" to="#">مدرن</Link>
                                        <Link className='bg-white' aria-label="product-tags-link" to="#">خلاقیت</Link>
                                        <Link className='bg-white' aria-label="product-tags-link" to="#">ابتکاری جدید</Link>
                                    </div>
                                </> : language === "en" ? <>
                                    <span className="shop-title relative font-medium text-darkgray block mb-[10px]">Product Tags</span>
                                    <div className="tag-cloud d-inline-block margin-10px-top">
                                        <Link className='bg-white' aria-label="product-tags-link" to="#">Beauty</Link>
                                        <Link className='bg-white' aria-label="product-tags-link" to="#">Modern</Link>
                                        <Link className='bg-white' aria-label="product-tags-link" to="#">Creativity</Link>
                                        <Link className='bg-white' aria-label="product-tags-link" to="#">New initiative</Link>
                                    </div>
                                </> : <>
                                    <span className="shop-title relative font-medium text-darkgray block mb-[10px]">تگ های محصولات</span>
                                    <div className="tag-cloud d-inline-block margin-10px-top">
                                        <Link className='bg-white' aria-label="product-tags-link" to="#">زیبایی</Link>
                                        <Link className='bg-white' aria-label="product-tags-link" to="#">مدرن</Link>
                                        <Link className='bg-white' aria-label="product-tags-link" to="#">خلاقیت</Link>
                                        <Link className='bg-white' aria-label="product-tags-link" to="#">ابتکاری جدید</Link>
                                    </div>
                                </>}
                            </div> 
                        </m.aside>
                    </Row>
                </Container>
            </section>}
        </>    
    )
}

export default Tiles