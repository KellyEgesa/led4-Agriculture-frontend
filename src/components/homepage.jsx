import React, { Component } from "react";
import { Helmet } from "react-helmet";

import Carousel1 from "./carousel";
import Whatwedo from "./whatwedo";
import Partners from "./partners";
import Contact from "./contact";

class HomePage extends Component {
  state = {};
  render() {
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>LED4Agriculture</title>
          <meta name="description" content="LED4Agriculture" />
          <meta name="keywords" content="Learn Agriculture" />
        </Helmet>

        <Carousel1 id="carousel" />
        <section id="section-1">
          <Whatwedo id="aboutus" />
        </section>
        <section id="section-2">
          <Partners id="partners" />
        </section>
        <section id="section-3">
          <Contact id="contact" />
        </section>
      </div>
    );
  }
}

export default HomePage;
