import React, { memo } from 'react'
import { useSelector } from 'react-redux'

const TeamStyle04 = ({ item }) => {
    
    const host = useSelector(state => state.State.host)
    return (
        <figure>
            <div className='team-member-image'>
                <img className='w-[800px] h-[500px]' src={host +item.img.data.attributes.formats.custom.url} alt='images' />
                <div className='team-member-details'>
                    {item.title &&<span className='quote'><span>{item.title}</span></span>}
                    {item.subtitle &&<span className="text-center text-white opacity-90 w-[70%] md:w-full ">{item.subtitle}</span>}
                    {
                        item.social_links && (
                            <div className="social-icon">
                          {
                                item.social_links.map((item, i) => {
                                    return (
                                        <a aria-label="team" key={i} href={item.link} target="_blank" rel="noopener noreferrer"><i className={item.icon}></i></a>
                                    )
                                })
                            }
                            </div>
                        )
                    }
                </div>
            </div>
            <figcaption>
                <div className='title-bottom'>
                    <p className=' text-black text-xlg mb-2' >{item.name}</p>
                    <p className='text-gray text-[12px]'>{item.designation}</p>
                </div>
            </figcaption>
        </figure>
    )
}

export default memo(TeamStyle04)