import React, { useState, useEffect, useRef, memo } from "react";
import { useSelector } from "react-redux";

// Libraries
import { Link } from "react-router-dom";
import { m } from 'framer-motion'

// Components
import Pagination from "./HelperComponents/Pagination";
import Filter from "../Portfolio/Filter";


const BlogClean = (props) => {
  const host = useSelector(state => state.State.host)

  const blogWrapper = useRef();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import("../../Functions/Utilities").then(module => {
      const grid = module.initializeIsotop(blogWrapper.current)
      grid.on('arrangeComplete', () => setLoading(false));
    })
  }, [])

  // const style = { "--overlay-color": typeof (props.overlay) === "object" ? `linear-gradient(to right top, ${props.overlay.map((item, i) => item)})` : props.overlay }

  const handleFilterChange = () => {
    blogWrapper.current.querySelectorAll("li").forEach(item => item.childNodes[0]?.classList.add("appear"))
  }

  return (
    <div className="grid-wrapper">
      {/* Filter Start */}
      <Filter title={props.title} filterData={props.filterData} onFilterChange={handleFilterChange} />
      {/* Filter End */}

      {/* Grid Start */}
      <ul ref={blogWrapper} className={`blog-clean grid-container text-center${props.grid ? ` ${props.grid}` : ""}${loading ? " loading" : ""}${props.filter === false ? "" : " mt-28 md:mt-[4.5rem] sm:mt-8"}`}>
        <li className="grid-sizer"></li>
        {props.data.map((item) => {
          return (
            <li key={item.id} className={`grid-item${item.double_col ? " grid-item-double" : ""} `} >
              { <m.div className="blog-post rounded-[6px] overflow-hidden h-[320px] bg-white flex-fix"
                initial={{ opacity: 0 }}
                whileInView={!loading && { opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }} >
                <div className="blog-post-img relative overflow-hidden h-[200px]" >
                  <div className="h-max ">
                    <img className="w-full h-[200px]"  width={350} src={host + item.attributes.mainImage.data.attributes.formats.custom.url} alt="blog-clean" />
                    <div className="blog-rounded-icon bg-white">
                      <Link to={`news/${[item.attributes.title]}`}  ><i className="feather-arrow-right text-darkgray text-lg"></i></Link>
                    </div>
                  </div>
                </div>
                <div className="post-details p-[30px] pt-[5px] sm:px-[25px] bg-white">
                  <span className="text-md uppercase"> {item.attributes.date} </span>
                  <Link aria-label="link" to={`news/${[item.attributes.title]}`} className="font-medium text-darkgray line-clamp-[1]" > {item.attributes.title} </Link>
                </div>
              </m.div>}
            </li>
          );
        })}
      </ul>
      {/* Grid end */}

      {/* Pagination Start */}
      {
        props.pagination === true && (
          <div className="flex justify-center mt-[7.5rem] md:mt-20">
            <Pagination />
          </div>)
      }
      {/* Pagination End */}
    </div>
  );
};

export default memo(BlogClean);
