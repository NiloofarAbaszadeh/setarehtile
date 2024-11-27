import React, { memo } from 'react'
import { m } from "framer-motion"
import LazyLoad from 'react-lazyload'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ScaleLoader } from 'react-spinners';

const PortfolioBoxed03 = (props) => {
    const host = useSelector(state => state.State.host)
    const language = useSelector(state => state.State.language)
    
    return (<>
    {!props.data && <div className='flex justify-center items-center bg-white w-full h-[100vh] fixed top-0 fix z-50'>
        <ScaleLoader
        color={"#db1010"}
        loading={!props.data}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>}
        <div className='custom-grid'>
            {/* {props.data.map(item => {
                console.log(item.id)
                console.log(item.attributes.baseInfo.bodyColor.data.attributes.color)
            })} */}
            {props.data.map((item, i) => {
                return (
                    <div key={i}>
                        <LazyLoad>
                            <div key={i} className={`grid-item  ${item.double_col ? " grid-item-double" : ""} ${item.category ? item.category.toString().split(",").join(" ").toLowerCase() : ""}`}>
                                <Link to={`./${item.attributes.name}`} aria-label="link">
                                    <m.div
                                        className="portfolio-boxed box-shadow  overflow-hidden"
                                        initial={{ opacity: 0 }}
                                        whileInView={true && { opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                    >
                                        <div className="portfolio-image relative bg-white h-full w-full ">
                                            {item.attributes.image.data.attributes.formats.medium.url && <img className="rounded-[2px] p-6" src={host + item.attributes.image.data.attributes.formats.medium.url} height={447} width={550} alt="portfolio-boxed" />}
                                            <div className="porfolio-hover absolute bg-white p-0 rounded-[3px]">
                                                <div className="flex px-[10px] py-[4px] text-left self-end items-center w-full landscape:xl:px-[20px]">
                                                {(item.subtitle || item.attributes.name) && <div className="ml-auto">
                                                    {item.attributes.name && <div className="font-medium text-darkgray uppercase">{item.attributes.name}</div>}
                                                    </div>}
                                                    {language === "fa-IR" ? <>
                                                        <div className="mr-auto"><i className="line-icon-Arrow-OutLeft text-fastblue font-semibold text-[32px] inline-block top-[3px] relative"></i></div>
                                                    </> : language === "en" ? <>
                                                        <div className="ml-auto"><i className="line-icon-Arrow-OutRight text-fastblue font-semibold text-[32px] inline-block top-[3px] relative"></i></div>
                                                    </> : <>
                                                        <div className="mr-auto"><i className="line-icon-Arrow-OutLeft text-fastblue font-semibold text-[32px] inline-block top-[3px] relative"></i></div>
                                                    </>}
                                                </div>
                                            </div>
                                        </div>
                                    </m.div>
                                </Link>
                            </div>
                        </LazyLoad>
                    </div>
                )
            })}
        </div>
        </>
    )
}
export default memo(PortfolioBoxed03)