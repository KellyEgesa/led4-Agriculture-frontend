import React, { Component } from "react";

class Contact extends Component {
  state = {};
  open(a) {
    window.open(a);
  }
  render() {
    return (
      <div className="p-3 container-fluid justify-content-center" id="what">
        <h3 style={{ textAlign: "center" }} className="m-3">
          CONTACT US
        </h3>
        <div className="row d-flex justify-content-center">
          <div className="col-sm m-1 d-flex justify-content-center">
            <div className="container-fluid justify-content-center">
              <div
                className="card mx-auto"
                style={({ width: "18rem" }, { border: 0, cursor: "pointer" })}
                onClick={() => this.open("tel:+254-721- 541 257")}
              >
                <div className="card-title mx-auto m-2">
                  <i className="fa fa-phone fa-4x" aria-hidden="true"></i>
                </div>
                <div className="card-body mx-auto">
                  <p style={{ textAlign: "center" }}>
                    Call: +254-721- 541 257 <br /> Monday-Friday (8:00am-5:00pm)
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="container-fluid justify-content-center">
              <div
                className="card mx-auto"
                style={({ width: "18rem" }, { border: 0, cursor: "pointer" })}
                onClick={() => this.open("mailto:led4agriculture@gmail.com")}
              >
                <div className="card-title mx-auto m-2">
                  <i className="fa fa-envelope fa-4x" aria-hidden="true"></i>
                </div>
                <div className="card-body mx-auto">
                  <p style={{ textAlign: "center" }}>
                    Email: led4agriculture@gmail.com <br /> Website:
                    www.led4agriculture.co.ke
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="container-fluid justify-content-center">
              <div
                className="card mx-auto"
                style={({ width: "18rem" }, { border: 0, cursor: "pointer" })}
                onClick={() =>
                  this.open(
                    "https://www.google.com/maps/place/Elysee+Plaza,+Shan+Decor/@-1.2986891,36.7761945,17z/data=!3m1!4b1!4m5!3m4!1s0x182f1a75cafbfd25:0xd5a3d1acbb34d55a!8m2!3d-1.2986891!4d36.7783832"
                  )
                }
              >
                <div className="card-title mx-auto m-2">
                  <i className="fa fa-map-marker fa-4x" aria-hidden="true"></i>
                </div>
                <div className="card-body mx-auto">
                  <p style={{ textAlign: "center" }}>
                    Location: 4th Floor, Elysee Plaza, Kilimani Road P.O. BOX
                    6790 - 00100, NAIROBI
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
