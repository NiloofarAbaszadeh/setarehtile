import React, { useState, useEffect, useRef, memo } from "react";

// Libraries
import { Link } from "react-router-dom";
import { m } from "framer-motion";

// Components
import Pagination from "./HelperComponents/Pagination";
import { useSelector } from "react-redux";

// Data
import { blogData } from "./BlogData";

// Filter the blog data category wise
const blogMetroData = blogData.filter((item) => item.blogType === "metro");

const BlogMetro = (props) => {
  const host = useSelector(state => state.State.host)


  const blogWrapper = useRef();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import("../../Functions/Utilities").then(module => {
      const grid = module.initializeIsotop(blogWrapper.current)
      grid.on('arrangeComplete', () => setLoading(false));
    })
  }, [])

  const style = { "--overlay-color": typeof (props.overlay) === "object" ? `linear-gradient(to right top, ${props.overlay.map((item, i) => item)})` : props.overlay }


  return (<>
    {props.data && <div className="grid-wrapper flex items-center justify-center">

      {/* Grid Start */}
      <ul ref={blogWrapper} className={`grid-container  w-[92%] ${props.grid ? ` ${props.grid}` : ""}${loading ? " loading" : ""}${props.filter === false ? "" : " mt-28 md:mt-[4.5rem] sm:mt-8"}`} >
        <li className="grid-sizer"></li>
        {props.data.map((item, i) => {
          return (
            <li key={i} className={`grid-item${item.double_col ? " grid-item-double" : ""} `} >
              <m.div className="blog-metro "
                initial={{ opacity: 0 }}
                whileInView={!loading && { opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }} >
                <div className="relative">
                <div className="blog-post-image rounded-[5px] box-shadow  h-[300px]" style={style}>
                  <img className="h-full" height={353} width={353} src={host + item.attributes.mainImage.data.attributes.url} alt="blog-post" />
                </div>
                <div className=" absolute bottom-2 right-6">
                  <span className="post-date">
                    <p className="text-lightgray">{item.attributes.date}</p>
                  </span>
                  <Link aria-label="link" to={`./news/${[item.attributes.title]}`} className="post-title ml-2">
                    <p className="text-white text-[18px]">{item.attributes.title}</p>
                  </Link>
                </div>
                </div>
              </m.div>
            </li>
          );
        })}
      </ul>
      {/* Grid End */}

      {/* Pagination Start */}
      {
        props.pagination === true && (
          <div className="flex justify-center mt-[7.5rem] md:mt-20">
            <Pagination />
          </div>)
      }
      {/* Pagination End */}
    </div>}
    </>
  );
};

BlogMetro.defaultProps = {
  filter: false,
  data: blogMetroData,
  link: "blog-types/blog-standard-post/"
}


export default memo(BlogMetro);
