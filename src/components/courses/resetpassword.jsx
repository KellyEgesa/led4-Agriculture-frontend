import React from "react";
import Form from "../common/Form";
import Joi from "joi-browser";
import Logo from "../common/logo";
import { changePassword } from "../service/user";
import { toast } from "react-toastify";
import axios from "axios";
import { apiUrl } from "../service/config.json";

class ResetPassword extends Form {
  state = {
    data: {
      password: "",
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
    password: Joi.string()
      .min(8)
      .max(1024)
      .label("Password")
      .error(() => {
        return {
          message: "Password should more than 8 characters long",
        };
      }),
  };

  async componentDidMount() {
    try {
      const { data: user } = await axios.get(
        apiUrl + "/user/reset/" + this.props.match.params.token
      );
      const data = { ...this.state.data };
      data["email"] = user.email;
      this.setState({ data });
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toast.error(ex.response.data);
    }
  }

  confirmPassword = ({ currentTarget: input }) => {
    this.setState({ confirmError: "" });
    this.setState({ confirmPassword: input.value });
  };

  doSubmit = async () => {
    const { confirmPassword, data } = this.state;
    if (confirmPassword === data.password) {
      try {
        const { data: jwt } = await changePassword(data);
        localStorage.setItem("token", jwt);
        window.location = "/load";
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          toast.error(ex.response.data);
        } else toast.error("something went wrong");
      }
    } else {
      this.setState({ confirmError: "Doesnt match password" });
    }
  };

  render() {
    return (
      <div className="container-fluid d-flex justify-content-center" id="root1">
        <div className="card my-auto rounded-lg" style={{ width: "20rem" }}>
          <div className="card-body">
            <div className="m-2">
              <h6 style={{ textAlign: "center" }}>
                <Logo />
                <br />
                RESET PASSWORD <br />
              </h6>
              Kindly input your your new password
            </div>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("password", "Password", "password")}
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
              {this.renderButton("RESET PASSWORD")}
              <br />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default ResetPassword;
