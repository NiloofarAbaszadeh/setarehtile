import React, { memo } from 'react'
import { useEffect , useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

// Libraries
import { Row } from 'react-bootstrap';
import { m } from 'framer-motion';


// css
import "../../Assets/scss/components/_iconwithtext.scss"

const IconWithText = (props) => {
  const token = useSelector(state => state.State.readToken)
  const host = useSelector(state => state.State.host)

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const getData = async () => {
      await axios.get(`${host}/api/about?populate[values][populate]=*`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setData(res.data.data)
        setLoading(true)
      })
    }
    getData()
  }, [host, token])
  
  return (
    <Row className={`${props.grid} md:justify-center`}>
      {loading &&
        data.attributes.values.valu.map((item) => {
          return (
            <m.div key={item.id} className={`col${props.theme ? ` ${props.theme}` : ""} rounded-[5px] ${props.className ? ` ${props.className}` : ""}`} {...{ ...props.animation, transition: { delay: item.id * props.animationDelay, ease: props.animationTransition, duration: props.animationDuration } }}>
              <div className="rounded-[5px] w-full">
                <div className='feature-box-content flex-fix'>
                  {item.valueName && <p className="font-medium title text-balck text-xlg">{item.valueName}</p>}
                  {item.valueDiscraption && <p className='text-balck'>{item.valueDiscraption}</p>}
                </div>
              </div>
            </m.div>
          )
        })
      }
    </Row>
  )
}

IconWithText.defaultProps = {
  animationDelay: 0.6,
  animationDuration: 0.8,
  animationTransition: "circOut",
  theme: "icon-with-text-01",
}


export default memo(IconWithText)