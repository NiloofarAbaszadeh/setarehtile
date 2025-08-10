import React, { memo } from "react";
import { Link } from "react-router-dom"
import { m } from "framer-motion"
import { useSelector } from "react-redux"

const BlogSimple = (props) => {
  const host = useSelector(state => state.State.host)
    const language = useSelector(state => state.State.language)

  const style = { "--overlay-color": typeof (props.overlay) === "object" ? `linear-gradient(to right top, ${props.overlay.map((item, i) => item)})` : props.overlay }

  return (
    <div className="mt-12">
      <div className={`grid grid-cols-2 md:grid-cols-1 gap-[35px]`}>
        {props.data.map((item) => {
          return (
            <div key={item.id}  >
              {item.attributes && <m.div className="blog-Simple xs:block h-[550px] xs:h-full" style={style}
                initial={{ opacity: 0 }}
                whileInView={true && { opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }} >
                 <div className="blog-post-image xs:h-[250px] w-full" style={{ backgroundImage: `url(${host}${item.attributes.mainImage.data.attributes.url})` }} >
                  <Link aria-label="link" to={`/research/${item.attributes.title}`}></Link>
                </div>
                <div className="post-details">
                  <Link aria-label="link" to={`/research/${item.attributes.title}`} className="blog-category rounded-[10px]">
                    <div className={`text-md ${language === "fa-IR" && "iran-sans"}`}>
                    {item.attributes.subject}
                    </div>
                  </Link>
                  <Link aria-label="link" to={`/research/${item.attributes.title}`} className="blog-title ">
                    <div className="text-xlg font-bold"> 
                    {item.attributes.title}
                    </div>
                  </Link>
                  <p className="mt-[10px] mb-[25px] xl:mb-[25px] md:mb-[20px] xs:mb-[15px] text-gray text-justify line-clamp-[6] xs:line-clamp-[3] text-[14px]">{item.attributes.discraption}</p>
                  <div className="c-c-red font-lg">
                    {item.attributes.author.data.attributes.fullName}
                  </div>
                </div>
              </m.div>}
            </div>
          )
        })}
      </div>
    </div>
  );
};
export default memo(BlogSimple);