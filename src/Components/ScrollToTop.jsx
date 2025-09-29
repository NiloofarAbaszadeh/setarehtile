import React, { memo, useState, useEffect } from 'react';
import { m } from "framer-motion";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

      setScrollProgress(progress);
      setVisible(scrollTop > 300);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Circle details for progress ring
  const radius = 18; // radius of the circle
  const circumference = 2 * Math.PI * radius;

  // Calculate strokeDashoffset for progress animation
  const strokeDashoffset = circumference * (1 - scrollProgress);

  return (
    visible ? (
      <m.div
        className="scroll-top-arrow cursor-pointer bottom-[45px] right-[45px] top-auto z-[20] fixed"
        initial={{ opacity: 0, y: 50 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <div
  onClick={scrollToTop}
  className="relative rounded-full w-[45px] h-[45px] flex justify-center items-center bg-white hover:text-white hover:bg-red shadow-[0_0_20px_rgba(23,23,23,0.25)] hover:-translate-y-[2px] hover:shadow-[0_0_30px_rgba(23,23,23,0.40)] transition-default"
>
  {/* Remove base circle or set to transparent */}
  <svg
    className="absolute top-0 left-0 "
    width="45"
    height="45"
    viewBox="0 0 40 40"
    fill="none"
  >

    <circle
      cx="20"
      cy="20"
      r={radius}
      stroke="#ff0000" // red progress color
      strokeWidth="4"
      fill="transparent"
      strokeDasharray={circumference}
      strokeDashoffset={strokeDashoffset}
      strokeLinecap="round"
      style={{ transition: "stroke-dashoffset 0.3s ease" }}
      transform="rotate(-90 20 20)" // Rotate start point to top
    />
  </svg>

  <i className="feather-arrow-up text-[18px] relative z-10 text-black " />
</div>

      </m.div>
    ) : null
  );
};

export default memo(ScrollToTopButton);
