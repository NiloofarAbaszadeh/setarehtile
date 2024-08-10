import React, { memo, useState } from "react";
import { useSelector } from "react-redux";

// Libraries
import { Col, Row } from "react-bootstrap";
import { m } from "framer-motion";
import { Link } from "react-router-dom";

const ClientSwitch = (params, item, host) => {
      return (
        <Col key={item.id} className={params.className}>
          <m.div
            className="client-box relative w-full h-full inline-block" {...{ ...params.animation, transition: { delay: 1 / 4, duration: 0.8 } }}>
            <Link to={`../product-tilse/${item.id}`}>
              <img className="relative w-[auto]" width="148" height="43" src={`${host}${item.attributes.image.data.attributes.formats.custom.url}`} alt="tilse sample" />
            </Link>
          </m.div>
        </Col>
      )
  
}
const Clients = (props) => {
  const host = useSelector(state => state.State.host)
  const data = useState(props.data)
  
  return (
      <Row className={`${props.grid} client-logo-style-01`}>
        {data.map((item) => ClientSwitch(props, item, host))}
      </Row>)}

export default memo(Clients);