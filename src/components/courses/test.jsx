import React, { Component } from "react";
import { getTestId } from "../service/test";
import { reachUser } from "../service/user";
import { markUser } from "../service/user";

class Test extends Component {
  state = { questions: [], answer: [], errors: [], marked: false };
  async componentDidMount() {
    const { data: questions } = await getTestId(this.props.match.params.id);
    this.setState({ questions });
  }
  handleChoiceSelect(choice, pick) {
    const answerBuff = { question: choice._id, choice: pick };
    const ty = this.state.answer;
    ty.map((items) => {
      if (items.question === answerBuff.question) {
        var index = ty.indexOf(items);
        ty.splice(index, 1);
      }
      return null;
    });
    this.setState({ answer: [...ty, answerBuff] });
  }
  handleResponse(a, b) {
    if (a === b) {
      return (
        <div className="alert alert-danger" key={a}>
          {a}
        </div>
      );
    }
  }
  onSubmit() {
    const { questions, answer } = this.state;
    answer.map((items) => {
      const a = questions.find((item) => {
        if (item._id === items.question) {
          return item;
        }
        return null;
      });
      if (a.answer !== items.choice) {
        const ty = this.state.errors;
        ty.splice(0, 0, a.description);
        this.setState({ errors: [...ty] });
      }
      return null;
    });
    this.setState({ marked: true });
    this.marks();
  }
  async handleModule(id) {
    const data = { modules: this.props.match.params.id };
    const { data: users } = await reachUser(id, data);
    this.setState({ users });
  }
  async marks() {
    const { user } = this.props;
    this.handleModule(user._id);
    const { errors, questions } = this.state;
    const mark = questions.length - errors.length;
    this.setState({ mark });
    const marks = mark + "/" + questions.length;
    const data = { modules: this.props.match.params.id, marks: marks };
    const { data: users } = await markUser(user._id, data);
    this.setState({ users });
  }
  disableBtn() {
    const { answer, questions, marked } = this.state;
    if (!marked) {
      if (answer.length !== questions.length) return true;
      else return false;
    } else {
      return true;
    }
  }
  render() {
    const { mark, questions, marked } = this.state;
    return (
      <div className="container-fluid p-3 " id="root2">
        <div className="jumbotron mxy-auto">
          <h1 className="display-4 text-center">TEST</h1>
          <p className="lead">
            Kindly answer the questions below to the best of your ability. The
            questions are from the module that you just read
          </p>
          <hr className="my-4" />
          {this.state.questions.map((items) => (
            <div className="card p-2 my-2 " key={items._id}>
              {items.question}?
              <br />
              Select one:
              <div className="mx-3 p-1">
                <input
                  className="form-check-input"
                  type="radio"
                  name={items._id}
                  id={"exampleRadios1"}
                  value="option1"
                  onClick={() => this.handleChoiceSelect(items, "A")}
                />
                <label className="form-check-label">A. {items.A}</label>
              </div>
              <div className="mx-3 p-1">
                <input
                  className="form-check-input"
                  type="radio"
                  name={items._id}
                  id="exampleRadios1"
                  value="option1"
                  onClick={() => this.handleChoiceSelect(items, "B")}
                />
                <label className="form-check-label">B. {items.B}</label>
              </div>
              <div className="mx-3 p-1">
                <input
                  className="form-check-input"
                  type="radio"
                  name={items._id}
                  id="exampleRadios1"
                  value="option1"
                  onClick={() => this.handleChoiceSelect(items, "C")}
                />
                <label className="form-check-label">C. {items.C}</label>
              </div>
              <div className="mx-3 p-1">
                <input
                  className="form-check-input"
                  type="radio"
                  name={items._id}
                  id="exampleRadios1"
                  value="option1"
                  onClick={() => this.handleChoiceSelect(items, "D")}
                />
                <label className="form-check-label">D. {items.D}</label>
              </div>
              {this.state.errors.map((items1) =>
                this.handleResponse(items1, items.description)
              )}
            </div>
            // {error && <div className="alert alert-danger">{error}</div>}
          ))}
          <p className="lead">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => this.onSubmit()}
              disabled={this.disableBtn()}
            >
              Submit
            </button>
            {marked && (
              <span className="m-2">
                Your score is : {mark}/{questions.length}
              </span>
            )}
          </p>

          {marked && (
            <button
              className="btn btn-primary btn-lg"
              onClick={() => {
                this.props.history.goBack();
                this.props.history.goBack();
              }}
            >
              FINISH
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Test;
