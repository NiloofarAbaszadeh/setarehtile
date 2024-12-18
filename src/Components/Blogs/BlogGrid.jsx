import React, { useState, useEffect, useRef, memo } from "react";

// Libraries
import { Link } from "react-router-dom";
import { m } from "framer-motion";
import { useSelector } from "react-redux";

// Components
import Filter from "../Portfolio/Filter";

const BlogGrid = (props) => {
  const language = useSelector(state => state.State.language)
  const blogWrapper = useRef();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import("../../Functions/Utilities").then(module => {
      const grid = module.initializeIsotop(blogWrapper.current)
      grid.on('arrangeComplete', () => setLoading(false));
    })
  }, [props.data])

  const handleFilterChange = () => {
    blogWrapper.current.querySelectorAll("li").forEach(item => item.childNodes[0]?.classList.add("appear"))
  }
  const host = useSelector(state => state.State.host)
  
  return (
    <div className="grid-wrapper">
      {/* Filter Start */}
      <Filter title={props.title} filterData={props.filterData} onFilterChange={handleFilterChange} />
      {/* Filter End */}
      

      {/* Grid Start */}
      <ul ref={blogWrapper} className={`grid-container${props.grid ? ` ${props.grid}` : ""}${props.filter === false ? "" : " mt-28 md:mt-[4.5rem] sm:mt-8"}`}>
        <li className="grid-sizer"></li>
        {props.data.collections.length !== 0 && props.data.collections.map((item, i) => {
          return (
            <li className={`grid-item${item.double_col ? " grid-item-double" : ""}`} key={i} >
              <m.div className="blog-grid rounded-[5px] overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={!loading && { opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              >
                <div className="blog-post relative overflow-hidden bg-darkslateblue py-3">
                  <Link aria-label="link" to={`../../product-collection/${[item.attributes.name]}`}>
                    <img loading="lazy" height={245} width={350} src={host + item.attributes.profileImage.data.attributes.formats.custom.url} alt="blog" />
                  </Link>
                  <Link aria-label="link"
                    to={`../../product-collection`}
                    className="blog-grid-catagory bg-red text-white text-md uppercase px-[13px] py-[6px] rounded-[2px] absolute top-[23px] right-[23px]">
                    <span>{language === "fa-IR" ? "کلکسیون" : language === "en" ? "Collection" : ""}</span>
                  </Link>
                </div>
                <div className="px-12 py-10 bg-white sm:px-8 xs:px-12">
                  <Link aria-label="link" to={`../../product-collection/${[item.attributes.name]}`} className="mb-[15px] text-xlg block font-medium text-darkgray hover:text-basecolor" > <span>{item.attributes.name}</span> </Link>
                  <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]"> {item.attributes.discraption} </p>
                  <div className="flex items-center">
                  <span className=" text-sm mr-auto">
                    {language === "fa-IR" ? "نوشته شده توسط " : language === "en" ? "Written by" : ""} <span className="text-red">{language === "fa-IR" ? "ادمین ستاره" : language === "en" ? "Setareh admin" : ""}</span>
                  </span>     
                  </div>
                </div>
              </m.div>
            </li>
          );
        })}
        {props.data.groups.length !== 0 && props.data.groups.map((item, i) => {
          return (
            <li className={`grid-item${item.double_col ? " grid-item-double" : ""}`} key={i} >
              <m.div className="blog-grid rounded-[5px] overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={!loading && { opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              >
                <div className="blog-post relative overflow-hidden bg-darkslateblue">
                  <Link aria-label="link" to={`../product-groups/${[item.attributes.name]}`}>
                    <img loading="lazy" height={245} width={350} src={host + item.attributes.GroupImage.data.attributes.formats.custom.url} alt="blog" />
                  </Link>
                  <Link aria-label="link"
                    to={`../../product-groups`}
                    className="blog-grid-catagory bg-red text-white text-md uppercase px-[13px] py-[6px] rounded-[2px] absolute top-[23px] right-[23px]">
                    <span>{language === "fa-IR" ? "گروه" : language === "en" ? "Group" : ""}</span>
                  </Link>
                </div>
                <div className="px-12 py-10 bg-white sm:px-8 xs:px-12">
                  <Link aria-label="link" to={`../../product-groups/${[item.attributes.name]}`} className="mb-[15px] text-xlg block font-medium text-darkgray hover:text-basecolor" > <span>{item.attributes.name}</span> </Link>
                  <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]"> {item.attributes.discraption} </p>
                  <div className="flex items-center">
                  <span className=" text-sm mr-auto">
                    {language === "fa-IR" ? "نوشته شده توسط " : language === "en" ? "Written by" : ""} <span className="text-red">{language === "fa-IR" ? "ادمین ستاره" : language === "en" ? "Setareh admin" : ""}</span>
                  </span>     
                  </div>
                </div>
              </m.div>
            </li>
          );
        })}
        {props.data.tails.length !== 0 && props.data.tails.map((item, i) => {
          return (
            <li className={`grid-item${item.double_col ? " grid-item-double" : ""}`} key={i} >
              <m.div className="blog-grid rounded-[5px] overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={!loading && { opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              >
                <div className="blog-post relative overflow-hidden py-4 bg-darkslateblue">
                  <Link className="" aria-label="link" to={`../../product-tilse/${[item.attributes.name]}`}>
                    <img loading="lazy" height={245} width={350} src={host + item.attributes.image.data.attributes.formats.custom.url} alt="blog" />
                  </Link>
                  <Link aria-label="link"
                    to={`../../product-tilse`}
                    className="blog-grid-catagory bg-red text-white text-md uppercase px-[13px] py-[6px] rounded-[2px] absolute top-[23px] right-[23px]">
                    <span>{language === "fa-IR" ? "کاشی" : language === "en" ? "Tile" : ""}</span>
                  </Link>
                </div>
                <div className="px-12 py-10 bg-white sm:px-8 xs:px-12">
                  <Link aria-label="link" to={`../../product-tilse/${[item.attributes.name]}`} className="mb-[15px] text-xlg block font-medium text-darkgray hover:text-basecolor" > <span>{item.attributes.name}</span> </Link>
                  <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]"> {item.attributes.discraption}  </p>
                  <div className="flex items-center">
                  <span className=" text-sm mr-auto">
                    {language === "fa-IR" ? "نوشته شده توسط " : language === "en" ? "Written by" : ""} <span className="text-red">{language === "fa-IR" ? "ادمین ستاره" : language === "en" ? "Setareh admin" : ""}</span>
                  </span>     
                  </div>
                </div>
              </m.div>
            </li>
          );
        })}
      </ul>
      {/* Grid End */}
    </div>
  );
};

BlogGrid.defaultProps = {
  filter: false,
};


export default memo(BlogGrid);