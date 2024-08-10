import React, { memo } from 'react'

const ImageGallery03 = (props) => {
  return (
    <>
      <img className="w-full h-full" src={props.data.src} alt="grid" />
      <div className="image-box-wrapper absolute w-full h-full left-0 top-0  flex items-center justify-center py-[50px]">
        <div className="feather-zoom-in  text-[28px] font-light	text-white"></div>
      </div>
    </>
  )
}

export default memo(ImageGallery03)