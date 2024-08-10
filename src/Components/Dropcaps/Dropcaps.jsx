import React, { memo } from 'react'

// Library
import { m } from 'framer-motion'

const Dropcaps = (props) => {
    return (
        <m.div className={`${props.theme} ${props.className} contents text-justify`} {...props.animation}>
            <p className="contents text-justify">{props.content}</p>
        </m.div>
    )
}

Dropcaps.defaultProps = {
    theme: 'dropcaps-style01'
}
export default memo(Dropcaps)