import React, { memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
// Libraries
import { Link } from "react-router-dom";
import { m } from "framer-motion";


const BlogMasonry = (props) => {
  const blogWrapper = useRef();
  const [loading, setLoading] = useState(true);

  const host = useSelector(state => state.State.host)

  useEffect(() => {
    import("../../Functions/Utilities").then(module => {
      const grid = module.initializeIsotop(blogWrapper.current)
      grid.on('arrangeComplete', () => setLoading(false));
    })
  }, [])

  return (
    <div className="grid-wrapper">
      <ul ref={blogWrapper} className={`grid-container grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-double-extra-large mt-28 md:mt-[4.5rem] sm:mt-[-100px]`} >
        <li className="grid-sizer"></li>
        <li key={"85"} className={`grid-item grid-item-double`} >
              <m.div className=" "
                initial={{ opacity: 0 }}
                whileInView={!loading && { opacity: 1 }}
                viewport={{ once: true }}
                 >
                <div className="overflow-hidden relative">
                  <div className="py-24">

                  </div>
                </div>
              </m.div>
            </li>
            {/* item.attributes.GroupImage.data.attributes.formats.custom.url */}
        {props.data.map((item, i) => { 
          return (
            <li key={i} className={`grid-item grid-item-double`} >
              <Link to={`${props.link}${item.attributes.name}`} aria-label="link">
                <m.div
                    className="portfolio-boxed box-shadow  overflow-hidden"
                    initial={{ opacity: 0 }}
                    whileInView={!loading && { opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div className="portfolio-image relative ">
                        {item.attributes.GroupImage.data && <img className="rounded-[2px] w-full" src={host + item.attributes.GroupImage.data.attributes.formats.custom.url} height={447} width={550} alt="portfolio-boxed" />}
                        <div className="porfolio-hover absolute bg-white p-0 rounded-[3px]">
                            <div className="flex  px-[20px] py-[8px] text-left self-end items-center w-full landscape:xl:px-[20px]">
                                {(item.subtitle || item.attributes.name) && <div className="ml-auto">
                                    {/* {item.subtitle && <div className="mt-[5px] text-spanishgray text-sm uppercase">{item.subtitle}</div>} */}
                                    {item.attributes.name && <div className="font-medium text-darkgray uppercase text-[16px]">{item.attributes.name}</div>}
                                </div>}
                                <div className="mr-auto"><i className="line-icon-Arrow-OutLeft text-[32px] inline-block top-[3px] text-darkgray relative"></i></div>
                            </div>
                        </div>
                    </div>
                </m.div>
              </Link>
              
            </li>
          );
        })}
      </ul>
    </div>
  );
};

BlogMasonry.defaultProps = {
  filter: false,
  animationDelay: 0.2,
  link: "/product-groups/"
};



export default memo(BlogMasonry);