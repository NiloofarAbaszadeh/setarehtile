import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
// Libraries
import { Col, Container, Row } from 'react-bootstrap'
// Components
import { Parallax } from 'react-scroll-parallax';
import { ScaleLoader } from 'react-spinners';
import Tiles from './Tiles';
import axios from 'axios';
import { Helmet } from 'react-helmet-async'; 

const LeftSideBarTilse = (props) => {
    const token = useSelector(state => state.State.readToken)  
    const host = useSelector(state => state.State.host)

    const [boardData, setBoardData] = useState(null)

    const [data, setData] = useState([])
    // get data
    useEffect(() => {
        const GetData = () => {
                axios.get(`${host}/api/products?populate=deep`, {
                    headers: { Authorization: `Bearer ${token}` }
                  })
                .then(res => {
                    setData(res.data.data)
                })
                axios.get(`${host}/api/coll-page?populate=deep`, {
                    headers: { Authorization: `Bearer ${token}` }
                  }).then(res => {
                    setBoardData(res.data.data.attributes)
                  })
        }
        GetData()
    },[host,token])


    return (<>
        {!data[100] && !boardData && <div className='flex justify-center items-center bg-white w-full h-[100vh] fixed top-0 fix z-50 top-[-25px]'>
        <ScaleLoader
        color={"#db1010"}
        loading={!data[100]}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>}
        <div style={props.style} className='c-bg-lightgray'>
            <Helmet>
                <title> کاشی ها | کاشی و سرامیک ستاره  </title>
            </Helmet>
        <>
            {boardData && <div className="h-[400px] lg:h-[580px] md:h-[550px] sm:h-[500px] xs:h-[380px] overflow-hidden relative">
                <div className='absolute top-0 left-0 w-full h-full bg-darkgray opacity-70 z-[1]'></div>
                <Parallax className="lg-no-parallax bg-cover absolute -top-[50px] left-0 w-full h-[100vh] z-0 lg:-top-[70px] md:h-[600px] md:-top-[50px] xs:h-[450px]" translateY={[-40, 40]} style={{ backgroundImage: `url(${host}${boardData.tileImage.data.attributes.formats.custom.url})` }}></Parallax>
                <Container className="h-full relative z-[2]">
                  <Row className="justify-center h-full">
                    <Col xl={6} lg={7} md={8} className="relative font-serif text-center flex justify-center flex-col">
                      <h2 className="text-white font-medium -tracking-[1px] mb-0 text-[50px]">{boardData.tileTitle}</h2>
                    </Col>
                  </Row>
                </Container>
            </div>}
            <br />
            <br />
            <br />
            <br />
            <br />    

            {data[0] && <Tiles data={data} />}
        </>
            
        </div></>
    )
}

export default LeftSideBarTilse