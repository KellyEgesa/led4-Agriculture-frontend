import React from "react";
import Form from "../common/Form";
import Joi from "joi-browser";
import Logo from "../common/logo";
import { resetLink } from "../service/user";
import { toast } from "react-toastify";

class Forgot extends Form {
  state = {
    data: {
      email: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string()
      .email()
      .label("Email")
      .error(() => {
        return {
          message: "Enter a valid Email",
        };
      }),
  };
  doSubmit = async () => {
    try {
      await resetLink(this.state.data).then((res) => {
        toast.success("A link has been sent to your email");
      });
      this.props.history.push("/login");
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toast.error(ex.response.data);
    }
  };
  render() {
    return (
      <div>
        <div className="m-2">
          <h6 style={{ textAlign: "center" }}>
            <Logo />
            FORGOT PASSWORD <br />
          </h6>
          Kindly input your email address
        </div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email:", "email")}
          {this.renderButton("Send Link")}
          <br />
          <hr className="my-4" />
          <p>A link will be sent to your email with further details</p>
        </form>
      </div>
    );
  }
}
export default Forgot;
