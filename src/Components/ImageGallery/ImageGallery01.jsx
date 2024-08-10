import React, { memo } from 'react'

const ImageGallery01 = (props) => {

    return (
        <div className='flex items-center justify-center h-full'>
            <img className="w-auto h-full" src={props.data.src} alt="grid" />
            <div className="image-box-wrapper absolute w-full h-full left-0 top-0 flex items-center justify-center">
                <div className="feather-zoom-in text-[28px] font-light text-white drop-shadow"></div>
            </div>
        </div>
    )
}
export default memo(ImageGallery01)