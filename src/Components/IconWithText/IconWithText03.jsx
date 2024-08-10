import React, { memo } from 'react'

// Libraries
import { Row } from 'react-bootstrap';
import { m } from 'framer-motion';

// css
import "../../Assets/scss/components/_iconwithtext.scss"

const IconWithText03 = (props) => {
  return (
    <Row className={`${props.grid} justify-center`}>
      {
        // eslint-disable-next-line
        props.data.map((item, i) => {
          if (item !== false) {
            return (
              <m.div key={item.name} className={`col${props.theme ? ` ${props.theme}` : ""}${props.className ? ` ${props.className}` : ""}`} {...{ ...props.animation, transition: { delay: i * props.animationDelay, ease: props.animationTransition, duration: props.animationDuration } }}>
                <div key={item.name} className="rounded-md w-full container-test flex items-center justify-center flex-col">
                  {item.img && (<>
                    <img height={42} width={51} className="image inline-block items-center justify-center mb-[10px] w-[70px] " src={item.img} alt="featurebox"/>
                    <span className="tooltiptext2">{item.name}</span>
                    </>
                  )}  
                  <div className='flex items-center justify-center'>
                  {item.sideimg && ( item.sideimg.map((dat,i) => {
                    return <>
                      <img key={dat.name} height={42} width={51} className="image inline-block items-center justify-center mb-[10px] w-[70px]" src={dat.img} alt="featurebox" />
                      <span className="tooltiptext2 w-max">{dat.name}</span>
                      </> })
                  )}
                  </div>
                  <div className='feature-box-content mb-[45px]'>
                    {item.title && <span className="font-medium title text-black">{item.title}</span>}
                  </div>
                  </div>
              </m.div>
            )
          }
        })
      }
    </Row>
  )
}

IconWithText03.defaultProps = {
  animationDelay: 0.6,
  animationDuration: 0.8,
  animationTransition: "circOut",
  theme: "icon-with-text-01",
}




export default memo(IconWithText03)