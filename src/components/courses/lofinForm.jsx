import React from "react";
import Joi from "joi-browser";
import Form from "../common/Form";
import { Link } from "react-router-dom";
import { loginUser } from "../service/user";
import { toast } from "react-toastify";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
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
    password: Joi.string()
      .required()
      .label("Password")
      .error(() => {
        return {
          message: "Enter a valid Password",
        };
      }),
  };

  doSubmit = async () => {
    try {
      const { data: jwt } = await loginUser(this.state.data);
      localStorage.setItem("token", jwt);
      window.location = "/load";
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toast.error(ex.response.data);
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "EMAIL:")}
          {this.renderInput("password", "PASSWORD", "password")}
          <Link to="/forgot" className="font-weight-bold">
            Forgotten Password?
          </Link>{" "}
          <br />
          {this.renderButton("Login")}
        </form>
        <hr className="my-4" />
        <Link to="/register" className="font-weight-bold mt-xl-5">
          Not yet registered?
        </Link>
      </div>
    );
  }
}

export default LoginForm;
