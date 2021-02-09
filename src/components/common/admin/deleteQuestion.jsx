import React, { Component } from "react";
import QuestionTable from "../QuestionTable";
import ListGroup from "../listGroup";
import Pagination from "../pagination";
import { paginate } from "../paginate";
import { deleteQuestion } from "../../service/questions";
import { toast } from "react-toastify";
import _ from "lodash";
import { getModule } from "../../service/topic";
import { getTestId } from "../../service/test";
import ReactLoad from "../../reactload";

class Question extends Component {
  state = {
    topic: [],
    question: [],
    modules: [],
    currentPage: 1,
    selectedModule: null,
    pageSize: 10,
    sortColumn: { path: "module", order: "asc" },
  };

  async handleTopicSelect(topic) {
    const { data } = await getModule(topic._id);
    const modules = [...data];
    this.setState({ modules });
  }
  handleDelete = async (questions) => {
    const originalQuestion = this.state.question;
    const question = originalQuestion.filter((s) => s._id !== questions._id);
    this.setState({ question });
    try {
      await deleteQuestion(questions._id);
      toast.success("The Question has been deleted");
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This Question has been already deleted");
      if (ex.response && ex.response.status === 400)
        toast.error(ex.response.data);
      this.setState({ question: originalQuestion });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleModuleSelect = async (item) => {
    const { data: question } = await getTestId(item._id);
    this.setState({ question });
    this.setState({ selectedModule: item, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedModule,
      question: allQuestions,
    } = this.state;

    const filtered =
      selectedModule && selectedModule._id
        ? allQuestions.filter((m) => m.modules === selectedModule._id)
        : allQuestions;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const question = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: question };
  };

  render() {
    const { length: count } = this.state.question;
    const { pageSize, currentPage, sortColumn, topic } = this.state;

    if (count === 0 && topic.length < 0)
      return <p>There are no Questions in this module.</p>;

    const { totalCount, data: question } = this.getPagedData();

    return (
      <div>
        <h5 className="text-center m-2 p-2">DELETE A QUESTION</h5>
        <div className="row p-1">
          <div className="col-4">
            <label>CHOOSE A TITLE</label>
            {!this.props.topic ? (
              <div className="d-flex justify-content-center">
                <ReactLoad type={"bars"} color={"black"} />
              </div>
            ) : (
              this.props.topic.map((item) => (
                <div className="form-check" key={item._id}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="option1"
                    onClick={() => this.handleTopicSelect(item)}
                  />
                  <label className="form-check-label">{item.topic}</label>
                </div>
              ))
            )}
          </div>
          <div className="col">
            {this.state.modules ? (
              <ListGroup
                items={this.state.modules}
                selectedItem={this.state.selectedModule}
                onItemSelect={this.handleModuleSelect}
              />
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className="p-3">
          <p>Showing {totalCount} questions in the database.</p>
          <QuestionTable
            question={question}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Question;
