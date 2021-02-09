import React, { Component } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { loadModuleId } from "../service/module";
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
  }

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
    this.setState({ loaded: true });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  increment = () => {
    this.setState((prevState) => ({ pageNumber: prevState.pageNumber + 1 }));
  };
  decrement = () => {
    this.setState((prevState) => ({ pageNumber: prevState.pageNumber - 1 }));
  };
  pagination(a) {
    this.setState({ pageNumber: a });
  }
  render() {
    const { url } = this.state.module;
    const { numPages, loaded, pageNumber } = this.state;
    return (
      <div className="justify-content-center" id="root2">
        {!loaded ? (
          <div
            className="d-flex justify-content-center my-auto"
            id="root"
            style={{ cursor: "progress" }}
          >
            <ReactLoad type={"bars"} color={"black"} />
          </div>
        ) : (
          <div></div>
        )}
        <div
          className="mxy-auto"
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

          <div className="d-flex justify-content-center">
            <div className="card p-2">
              <Document
                file={url}
                onLoadSuccess={this.onDocumentLoad}
                loading={<ReactLoad type={"bars"} color={"black"} />}
              >
                <Page
                  style={{ margin: "0" }}
                  pageNumber={pageNumber}
                  key={pageNumber}
                />
              </Document>
            </div>
          </div>
          <div className="m-auto" style={{ width: "40rem" }}>
            <div className="card p-2 d-flex justify-content-center">
              <div className="row">
                <div className="col-sm d-flex justify-content-center ">
                  <button
                    className="btn btn-dark"
                    onClick={this.decrement}
                    disabled={pageNumber === 1 ? "true" : ""}
                  >
                    PREVIOUS PAGE
                  </button>
                </div>
                <div className="col-sm-6 d-flex justify-content-center p-2 m-0 jumbotron">
                  <nav
                    aria-label="Page navigation"
                    style={{ overflowY: "auto" }}
                  >
                    <ul className="pagination pagination-sm m-0">
                      {_.times(numPages, (page) => (
                        <li
                          className={
                            pageNumber === page + 1
                              ? "page-item active "
                              : "page-item "
                          }
                          key={page + 1}
                        >
                          <a
                            className="page-link"
                            onClick={() => this.pagination(page + 1)}
                            style={{ cursor: "pointer" }}
                          >
                            {page + 1}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
                <div className="col-sm d-flex justify-content-center">
                  {pageNumber !== numPages ? (
                    <button className="btn btn-dark" onClick={this.increment}>
                      NEXT PAGE
                    </button>
                  ) : (
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
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
