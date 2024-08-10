import React, { memo, useEffect, useRef } from 'react'

// Libraries
import { m } from 'framer-motion'
import PropTypes from "prop-types"

const MouseMove = ({ className, children, speed, enableOnHover }) => {
    const MouseRef = useRef(null)

    useEffect(() => {
        document.querySelectorAll(".moving-el").forEach(item => {
            //El follow mouse cursor
            if (enableOnHover === true) {
                document.addEventListener('mousemove', (e) => {

                    let x = e.clientX * speed / window.innerWidth + '%';
                    let y = e.clientY * speed / window.innerHeight + '%';

                    item.style.left = -x;
                    item.style.top = -y;
                    item.style.transform = 'translate(-' + x + ',-' + y + ')';
                })
            } else {
                item.addEventListener('mousemove', (e) => {

                    let x = e.clientX * speed / window.innerWidth + '%';
                    let y = e.clientY * speed / window.innerHeight + '%';

                    item.style.left = -x;
                    item.style.top = -y;
                    item.style.transform = 'translate(-' + x + ',-' + y + ')';
                })
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <m.div className={`moving-el${className ? ` ${className}` : ""}`} ref={MouseRef}>{children}</m.div>
    )
}

MouseMove.defaultProps = {
    speed: 2
}

MouseMove.propTypes = {
    speed: PropTypes.number
}

export default memo(MouseMove)