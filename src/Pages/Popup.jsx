import React, { useEffect, useState } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"

function CircularProgress({ progress }) {
  const circleLength = useTransform(progress, [0, 100], [0, 1])
  const checkmarkPathLength = useTransform(progress, [0, 95, 100], [0, 0, 1])
  const circleColor = useTransform(
    progress,
    [0, 95, 100],
    ["#FFCC66", "#FFCC66", "#66BB66"]
  )

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 258 258"
    >
      {/* Check mark  */}
      <motion.path
        transform="translate(60 85)"
        d="M3 50L45 92L134 3"
        fill="transparent"
        stroke="#7BB86F"
        strokeWidth={8}
        style={{ pathLength: checkmarkPathLength }}
      />
      {/* Circle */}
      <motion.path
        d="M 130 6 C 198.483 6 254 61.517 254 130 C 254 198.483 198.483 254 130 254 C 61.517 254 6 198.483 6 130 C 6 61.517 61.517 6 130 6 Z"
        fill="transparent"
        strokeWidth="8"
        stroke={circleColor}
        style={{
          pathLength: circleLength
        }}
      />
    </motion.svg>
  )
}

const Popup = ({setIsPopupOpen, state}) => {
  let progress = useMotionValue(90)
  const [isPopupClose, setIsPopupClose] = useState(false)

  useEffect(() => {
    if (isPopupClose) {
      setIsPopupOpen(false)
    }
    // eslint-disable-next-line
  }, [isPopupClose])

  return <div
  onClick={() =>{setIsPopupClose(true)}}
  className="z-20"
  style={{
    position: "fixed",
    background: "rgba(0,0,0,0.6)",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
  >
    <div style={{
      background: "white",
      borderRadius: "5px",
      width: "250px",
      padding: "20px 10px",
      animation: "dropTop .3s linear"
    }}>
      <div className="flex flex-col items-center justify-center px-6">
        <div className="py-6">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: 100 }}
            style={{ x: progress }}
            transition={{ duration: 1 }}
          />
          <CircularProgress progress={progress} />
        </div>
        <div className="flex flex-col items-center">
          <p>روزمه شما با موفقیت ارسال شد.</p>
          <p>با تشکر از وقت شما.</p>
        </div>
        <button
        className="button-custom mt-4 bg-[#ff3030] text-white rounded-[5px] hover:bg-[#ff3030] w-auto flex items-center"
        onClick={() => {setIsPopupClose(true)}}
        >
          <span className="px-[5px]">بستن</span>
        </button>
      </div>

    </div>

  </div>
}

export default Popup