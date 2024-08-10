import React, { memo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Libraries
import { m } from "framer-motion";

const BlogSideImage = (props) => {
  const host = useSelector(state => state.State.host)

  useEffect(() => {

  }, [props.data])
  
  return (
    <div>
      {
        props.data.map((item) => {
          return (
            <m.div key={item.id} className={`blog-sideimage py-0 px-0 rounded-[3px]`} {...props.animation}>
              <div className="blog-post-image w-full">
                <Link aria-label="link" to={`${props.link}${[item.attributes.title]}`}>
                  {/* main image */}
                  <img loading="lazy" height="" width="sm:w-full" alt="" src={`${host}${item.attributes.mainImage.data.attributes.formats.large.url}`} />
                </Link>
              </div>
              <div className=" p-8 sm:pt-0 max-w-[55%] sm:max-w-full">
                <div className="flex flex-col justify-start">
                  <span className="c-c-red text-[13px]"> {item.attributes.date} </span>
                  <Link aria-label="link" to={`${props.link}${[item.attributes.title]}`} className="blg-post-title my-[10px] text-[18px]"><span> {item.attributes.title} </span></Link>
                </div>
                <p className="text-[14px] text-justify text-gray mb-4 w-[92%]">{item.attributes.summery}</p>
                <div className="blog-author">
                  {/* <img loading="lazy" height="" width="" className="blog-author-img" src={`${host}${item.attributes.mainImage.data.attributes.formats.large.url}`} /> */}
                  <span>
                    <span className="text-gray">
                      نوشته شده توسط <span className="c-c-red"> {item.attributes.author.data.attributes.fullName}</span>  
                    </span>
                  </span>
                </div>
              </div>
            </m.div>
          );
        })
      }
      
    </div>
  );
};


export default memo(BlogSideImage);
