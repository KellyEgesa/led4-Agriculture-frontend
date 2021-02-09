import React, { Component } from "react";
import { Carousel } from "react-bootstrap";

class pic extends Component {
  state = {};
  render() {
    return (
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require("./pictures/50020092201_ba8c376e50_k.jpg")}
            alt="First slide"
            href="LED4Agriculture"
            style={{ height: "34rem" }}
          />
          <Carousel.Caption className="justify-content-center">
            <p
              className="carousel-caption text-center"
              style={{
                fontSize: "35px",
              }}
            >
              There is need to bridge the gap by translating climate smart
              agriculture policies to actions
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require("./pictures/49156603556_915b3ef4cf_k.jpg")}
            alt="second slide"
            href="LED4Agriculture"
            style={{ height: "34rem" }}
          />

          <Carousel.Caption>
            <p className="carousel-caption" style={{ fontSize: "35px" }}>
              Enhancing capacity for low emission development is essential to
              sustain the gains made over the years
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require("./pictures/50189249892_964105f7af_b.jpg")}
            href="LED4Agriculture"
            alt="Third slide"
            style={{ height: "34rem" }}
          />

          <Carousel.Caption>
            <p className="carousel-caption" style={{ fontSize: "35px" }}>
              Collective responsibilities is needed to accelerate transition to
              climate-resilient, low emission, sustainable Agriculture
              development.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require("./pictures/50020346077_c16b822157_k.jpg")}
            href="LED4Agriculture"
            alt="Third slide"
            style={{ height: "34rem" }}
          />

          <Carousel.Caption>
            <p className="carousel-caption" style={{ fontSize: "35px" }}>
              The future needs climate-smart business models, including how the
              practices and business models may contribute to increased gender
              equity.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}

export default pic;
