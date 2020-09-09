import React from "react";
import Form from "../common/Form";
import Joi from "joi-browser";
import Logo from "../common/logo";
import { saveUser } from "../service/user";
import { toast } from "react-toastify";

class Register extends Form {
  state = {
    data: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    firstname: Joi.string()
      .min(3)
      .max(25)
      .required()
      .label("Firstname")
      .error(() => {
        return {
          message: "Enter a valid FirstName",
        };
      }),
    lastname: Joi.string()
      .min(3)
      .max(25)
      .required()
      .label("Lastname")
      .error(() => {
        return {
          message: "Enter a valid LastName",
        };
      }),
    email: Joi.string()
      .email()
      .required()
      .label("Email")
      .error(() => {
        return {
          message: "Enter a valid Email",
        };
      }),
    password: Joi.string()
      .min(8)
      .max(1024)
      .required()
      .label("Password")
      .error(() => {
        return {
          message: "Password should more than 8 characters long",
        };
      }),
  };
  confirmPassword = ({ currentTarget: input }) => {
    this.setState({ confirmError: "" });
    this.setState({ confirmPassword: input.value });
  };
  doSubmit = async () => {
    const { confirmPassword, data } = this.state;
    if (confirmPassword === data.password) {
      try {
        await saveUser(data);
        window.location = "/booked";
      } catch (ex) {
        if (ex.response && ex.response.status === 400)
          toast.error(ex.response.data);
      }
    } else {
      this.setState({ confirmError: "Doesnt match password" });
    }
  };
  render() {
    return (
      <div>
        <div className="m-2">
          <h6 style={{ textAlign: "center" }}>
            <Logo />
            REGISTER FORM <br />
          </h6>
          Kindly fill in the details
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="col">
              {this.renderInput("firstname", "First Name")}
            </div>
            <div className="col">
              {this.renderInput("lastname", "Last Name")}
            </div>
          </div>
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "PASSWORD", "password")}
          <div className="form-group">
            <label htmlFor="confirm">Confirm Password</label>
            <input
              type="password"
              name="confirm"
              id=""
              className="form-control"
              onChange={this.confirmPassword}
            />
            {this.state.confirmError && (
              <div className="alert alert-danger">
                {this.state.confirmError}
              </div>
            )}
          </div>
          {this.renderButton("REGISTER")}
        </form>
      </div>
    );
  }
}
export default Register;
