import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { m } from 'framer-motion'
import { fadeIn } from '../../Functions/GlobalAnimations';
import PortfolioBoxed02 from '../../Components/Portfolio/PortfolioBoxed02';

const tileColor = ['آبی', 'صورتی', 'مشکی', 'خاکستری', 'سفید', 'کرم', 'قهوه ای']
const tileSize = ['60x120', '30x60', '33x100', '30x90', '40x100', '62/5x62/5', '30x80', '30x30', '60x60']

const Groups = (props) => {
    const [dataType, setDataType] = useState("groups")
    const [filteredData, setFilteredData] = useState(props.data)

    const [filterColor, setfilterColor] = useState([])
    const [filterSize, setfilterSize] = useState([])

    const FilterColor = (data) => {
        var temp = null
        if (filterColor.length !== 0){
            filterColor.map(color => {
                temp = data.filter(item => item.attributes.tiles.data[0].attributes.baseInfo.color_themes.data.map(item => item.attributes.color).includes(color))
                return color
            })
            return temp
        } else {
            return data
        }
    }

    const FilterSize = (data) => {
        var temp = null
        if (filterSize.length !== 0){
            filterSize.map(size => {
                temp = data.filter(item => item.attributes.tiles.data[0].attributes.baseInfo.size.data && item.attributes.tiles.data[0].attributes.baseInfo.size.data.attributes.size === size)
                return size
            })
            return temp
        } else {
            return data
        }
    }

    useEffect(() => {

        if (filterColor.length + filterSize.length >= 1) {
            // eslint-disable-next-line
            setFilteredData((FilterSize(FilterColor(filteredData))))}
        // eslint-disable-next-line
    },[filterColor, filterSize])


    const handelChange = (event) => {
        if ("active" === event.target.name) {
            event.target.name = "disabeld"
            event.target.className = "p-2 border-[1px] bg-none rounded-full relative border-gray-500 z-10"
            setFilteredData(props.data)
            if (event.target.value === "تم رنگی") {
                // eslint-disable-next-line
                tileColor.map(color => {
                    if (color !== event.target.id) {
                        document.getElementById(color).className = "p-2 border-[1px] bg-white rounded-full relative border-gray-500 z-10"
                    }
                })
                setfilterColor(pertyp => [...pertyp, event.target.id])}
            if (event.target.value === "ابعاد") {
                // eslint-disable-next-line
                tileSize.map(size => {
                    if (size !== event.target.id) {
                        document.getElementById(size).className = "p-2 border-[1px] bg-white rounded-full relative border-gray-500 z-10"
                    }
                })
                setfilterSize(pertyp => [...pertyp, event.target.id])}
        } else {
            event.target.name = "active"
            event.target.className = "p-2 border-[1px] bg-white rounded-full relative border-gray-500 z-10"
            setFilteredData(props.data)
            if (event.target.value === "تم رنگی")
                setfilterColor(per => per.filter(item => item !== event.target.id))
            if (event.target.value === "ابعاد")
                setfilterSize(per => per.filter(item => item !== event.target.id))
        }
    }

    const UpdateState = (event) => {
        setDataType(event.target.value)
    }

    if (dataType === "collections") {
        return (<Navigate to="/product-collection" replace={true} />)
    }
    else if (dataType === "tiles") {
        return (<Navigate to="/product-tilse" replace={true} />)
    }
    return (<>
        {props.data && <section className="shopping-right-left-sidebar pt-0 py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
                <Container>
                    <Row>
                        
                        <Col lg={9} md={8} className="pl-[55px] md:pl-[15px] sm:mb-[30px] order-md-2 order-1 sm:px-0">
                            <div className='flex justfy-start items-center text-black text-xlg mb-4'>
                                <div className='p-[3px]'>
                                    نمایش بر اساس:
                                </div>
                                <div className='mr-[10px] border p-[2px]'>
                                <select
                                    className='p-1 text-[16px]'
                                  id="data-Type"
                                  name="data-type"
                                  value={dataType}
                                  onChange={UpdateState}
                                >
                                  <option value="collections">کلکسیون ها</option>
                                  <option value="groups">گروه ها</option>
                                  <option value="tiles">کاشی ها</option>

                                </select>
                                </div>
                            </div>
                            <PortfolioBoxed02
                                grid="grid grid-3col xl-grid-3col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-large text-center"
                                data={filteredData}
                              />
                        </Col>
                        <m.aside className="col col-lg-3 col-md-4 shopping-sidebar inline-block order-md-1 order-2" {...fadeIn}>
                            <div className="custom-border box-shadow bg-white pt-3 mb-8 relative rounded-[4px] pb-6">
                            <span className="shop-title relative pr-8 pb-3 font-medium text-darkgray block mb-[20px] text-xlg border-b-2 border-fastblue">تم رنگی</span>
                                <ul className="list-style filter-category">
                                    {console.log(tileColor)}
                                    {tileColor.length !== 0 && tileColor.map((item,i) => {
                                        return (<>
                                            {item !== null && <li key={item + i}><div className='flex items-center justify-between relative'><p className='text-black text-xmd'>{item}</p><button className='p-2 border-[1px] bg-white rounded-full relative border-gray-500 z-10' id={item} name="active" value='تم رنگی' onClick={handelChange}></button><span className='absolute p-[5px] bg-red rounded-full top-[7px] left-[2.5px]'></span></div></li>} 
                                        </>)
                                    })}
                                </ul>
                            </div>
                            <div className="custom-border box-shadow bg-white pt-3 mb-8 relative rounded-[4px] pb-6">
                            <span className="shop-title relative pr-8 pb-3 font-medium text-darkgray block mb-[20px] text-xlg border-b-2 border-fastblue">ابعاد</span>
                                <ul className="list-style filter-category">
                                {tileSize.length !== 0 && tileSize.map(item => {
                                        return (<>
                                            {item !== null && <li key={item}><div className='flex items-center justify-between relative'><p className='text-black text-xmd'>{item}</p><button className='p-2 border-[1px] bg-white rounded-full relative border-gray-500 z-10' id={item} name="active" value='ابعاد' onClick={handelChange}></button><span className='absolute p-[5px] bg-red rounded-full top-[7px] left-[2.5px]'></span></div></li>} 
                                        </>)
                                    })}
                                </ul>
                            </div>
                            <div>
                                <span className="shop-title relative   font-medium text-darkgray block mb-[10px]">تگ های محصولات</span>
                                <div className="tag-cloud d-inline-block margin-10px-top">
                                <Link className='bg-white' aria-label="product-tags-link" to="#">زیبایی</Link>
                                    <Link className='bg-white' aria-label="product-tags-link" to="#">مدرن</Link>
                                    <Link className='bg-white' aria-label="product-tags-link" to="#">خلاقیت</Link>
                                    <Link className='bg-white' aria-label="product-tags-link" to="#">ابتکاری جدید</Link>
                                </div>
                            </div> 
                        </m.aside>
                    </Row>
                </Container>
            </section>}
        </>    
    )
}

export default Groups