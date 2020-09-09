import React, { Component } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { loadModuleId } from "../service/module";
import { reachUser } from "../service/user";
import _ from "lodash";
import ReactLoad from "../reactload";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class MainPage extends Component {
  state = {
    module: [],
    numPages: 1,
    pageNumber: 1,
    loaded: false,
  };

  async componentDidMount() {
    const { data: module } = await loadModuleId(this.props.match.params.id);
    this.setState({ module });
    const { user } = this.props;
    const data = { modules: this.state.module._id };
    const { data: users } = await reachUser(user._id, data);
    this.setState({ users });
    // const { pageNumber } = this.state.users;
    // this.setState({ pageNumber });
  }

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
    this.setState({ loaded: true });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { url } = this.state.module;
    const { numPages, loaded } = this.state;

    return (
      <div className="justify-content-center" id="root2">
        {!loaded ? (
          <div className="d-flex justify-content-center my-auto" id="root">
            <ReactLoad type={"bars"} color={"black"} />
          </div>
        ) : (
          <div></div>
        )}
        <div
          className="mxy-auto d-flex justify-content-center"
          style={{ visibility: !loaded ? "hidden" : "visible" }}
        >
          <div className="p-2">
            <i
              className="fa fa-arrow-left active fa-lg "
              style={{ cursor: "pointer" }}
              onClick={() => this.goBack()}
            >
              {" "}
              GO BACK
            </i>
          </div>
          <div className="card my-auto ">
            <Document file={url} onLoadSuccess={this.onDocumentLoad}>
              {_.times(numPages, (i) =>
                i >= 1 ? <Page size="A4" pageNumber={i} key={i} /> : <div></div>
              )}
            </Document>
            <div className="row m-3">
              <div className="col-sm my-auto">
                <button
                  className="btn btn-dark"
                  onClick={() =>
                    this.props.history.push(
                      "/test/" + this.props.match.params.id
                    )
                  }
                >
                  To Test
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
