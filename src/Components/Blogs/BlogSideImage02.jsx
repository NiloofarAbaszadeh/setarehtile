import React, { memo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Libraries
import { m } from "framer-motion";

const BlogSideImage = (props) => {
  const host = useSelector(state => state.State.host)

  return (
    <div>
      {
        props.data.map((item, i) => {
          return (
            <m.div key={i} className={`blog-sideimage shadow-none bg-white py-0 `} {...props.animation}>
              <div className="blog-post-image p-[25px] relative h-full">
                <div className="w-[230px] h-[230px] bg-[#f1edea] rounded-full mr-[25%] mt-[5%] md:w-[170px] md:h-[170px] md:mr-[20%] xxs:w-[150px] xxs:h-[150px]">
                </div>
                <div className="z-[5] h-full xlg:w-[92%] lg:w-[78%] sm:w-[65%] xxs:w-[75%] absolute top-[25px] right-[10%] left-[10%]">
                  <Link aria-label="link" to={`${props.link}${[item.attributes.name]}`}>
                    <img height="" width="" alt="" src={host + item.attributes.image.data.attributes.formats.custom.url} />
                  </Link>
                </div>
              </div>
              <div className="post-details">
                <Link aria-label="link" to={`${props.link}${[item.attributes.name]}`}> <p className="text-[25px] font-semibold text-red mb-4 mr-2">{item.attributes.name}</p> </Link>
                {item.attributes.discraption && <p className="text-xmd text-justify text-gray sm:p-[5%]">{item.attributes.discraption}</p>}
              </div>
              
            </m.div>
          );
        })
      }
    </div>
  );
};

BlogSideImage.defaultProps = {
  link: "/product-tilse/"
};
export default memo(BlogSideImage);
