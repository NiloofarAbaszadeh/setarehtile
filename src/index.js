import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Store from "./Store/Store";

import { Provider } from "react-redux";
// Libraries
import { ParallaxProvider } from "react-scroll-parallax";
import { LazyMotion, domMax } from "framer-motion";
// css
import "./Assets/css/icons.css"
import "./Assets/css/global.css"
import "./Assets/css/pages.css"
import './Assets/css/custom-color.css'
import './font.css'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LazyMotion features={domMax}>
    <ParallaxProvider>
      <Provider store={Store}>
        <App />
      </Provider>  
    </ParallaxProvider>
  </LazyMotion>
)