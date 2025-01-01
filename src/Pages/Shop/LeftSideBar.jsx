import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Col, Container, Row } from 'react-bootstrap'
import { Parallax } from 'react-scroll-parallax';
import axios from 'axios';
import { Helmet } from 'react-helmet-async'; 
import { ScaleLoader } from 'react-spinners';
import Collections from './Collections';

const LeftSidebar = (props) => {
    const token = useSelector(state => state.State.readToken)  
    const host = useSelector(state => state.State.host)
    const language = useSelector(state => state.State.language)

    const [boardData, setBoardData] = useState(null)
    const [iniData, setIniData] = useState()

    // get data
    useEffect(() => {
        const GetData = () => {
          axios.get(`${host}/api/collectionss?populate=deep,5&sort[0]=id:desc&locale=${language}`, {
              headers: { Authorization: `Bearer ${token}` }
            })
          .then(res => {
          setIniData(res.data.data) 
          })
          axios.get(`${host}/api/coll-page?populate=*&locale=${language}`, {
              headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
              setBoardData(res.data.data.attributes)
            })
        }
            GetData()
    },[host,token,language])
    

  return (
    <>
      {!iniData && (
        <div className="flex justify-center items-center bg-white w-full h-[100vh] fixed top-0 fix z-50">
          <ScaleLoader
            color={"#db1010"}
            loading={!iniData}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      <div style={props.style} className="bg-[#f7f7f7]">
        <Helmet>
          <title>
            {language === "fa-IR"
              ? "کلکسیون ها | کاشی و سرامیک ستاره  "
              : language === "en"
              ? "Collection | Setareh Tiles & Ceramic"
              : "کلکسیون ها | کاشی و سرامیک ستاره  "}
          </title>
        </Helmet>
        {boardData && (
          <div className="h-[400px] lg:h-[580px] md:h-[550px] sm:h-[500px] xs:h-[380px] overflow-hidden relative mb-24">
            <div className="absolute top-0 left-0 w-full h-full bg-darkgray opacity-70 z-[1]"></div>
            <Parallax
              className="lg-no-parallax bg-cover absolute -top-[50px] left-0 w-full h-[100vh] z-0 lg:-top-[70px] md:h-[600px] md:-top-[50px] xs:h-[450px]"
              translateY={[-40, 40]}
              style={{
                backgroundImage: `url(${host}${boardData.collectionImage.data.attributes.formats.custom.url})`,
              }}
            ></Parallax>
            <Container className="h-full relative z-[2]">
              <Row className="justify-center h-full">
                <Col
                  xl={6}
                  lg={7}
                  md={8}
                  className="relative  text-center flex justify-center flex-col"
                >
                  <h2 className="text-white font-sans -tracking-[1px] mb-0 text-[50px]">
                    {boardData.collectionTitle}
                  </h2>
                </Col>
              </Row>
            </Container>
          </div>
        )}

        {iniData && <Collections data={iniData} />}
      </div>
    </>
  );
}

export default LeftSidebar
