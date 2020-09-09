import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import NavBar from "./components/navbar";
import Login from "./components/courses/login";
import Registerform from "./components/courses/register";
import MainPage from "./components/courses/landing";
import HomePage from "./components/homepage";
import Load from "./components/courses/Load";
import Eresource from "./components/eresources";
import Whatwedo from "./components/whatwedo";
import Partners from "./components/partners";
import Contact from "./components/contact";
import Module from "./components/courses/modules";
import Test from "./components/courses/test";
import Admin from "./components/admin";
import Forgotform from "./components/courses/forgotview";
import ResetPassword from "./components/courses/resetpassword";
import Booked from "./components/Book";
import Confimed from "./components/confirmed";
import viewEresource from "./components/e-resourcesview";
import Logout from "./components/logout";
import NavFooter from "./components/footer";

class App extends Component {
  state = { user: "" };

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user });
    } catch (ex) {}
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <main className="container-fluid p-0" id="main">
          <NavBar user={user} />
          <Switch>
            <Route
              path="/Dashboard"
              render={(props) => {
                const jwt = localStorage.getItem("token");
                const users = jwtDecode(jwt);
                if (!users.editor) {
                  return <Redirect to="login" />;
                }
                return <Admin {...props} user={user} />;
              }}
            />
            <Route
              path="/test/:id"
              render={(props) => {
                if (!localStorage.getItem("token")) {
                  return <Redirect to="login" />;
                }
                return <Test {...props} user={user} />;
              }}
            />
            <Route
              path="/modules/:id"
              render={(props) => {
                if (!localStorage.getItem("token")) {
                  return <Redirect to="login" />;
                }
                return <Module {...props} />;
              }}
            />
            <Route
              path="/confirmed/:id"
              render={(props) => {
                if (!localStorage.getItem("token")) {
                  return <Redirect to="login" />;
                }
                return <Confimed {...props} />;
              }}
            />
            <Route
              path="/load"
              render={(props) => {
                if (!localStorage.getItem("token")) {
                  return <Redirect to="login" />;
                }
                return <Load {...props} />;
              }}
            />
            <Route
              path="/MainPage/:id"
              render={(props) => {
                if (!localStorage.getItem("token")) {
                  return <Redirect to="/login" />;
                }
                return <MainPage {...props} user={user} />;
              }}
            />
            <Route path="/reset/:token" exact component={ResetPassword} />
            <Route
              path="/login"
              render={(props) => {
                if (localStorage.getItem("token")) {
                  return <Redirect to="load" />;
                }
                return <Login />;
              }}
            />
            <Route path="/logout" component={Logout} />
            <Route path="/booked" component={Booked} />
            <Route path="/forgot" component={Forgotform} />
            <Route path="/register" component={Registerform} />
            <Route path="/eresource/:name" exact component={viewEresource} />
            <Route path="/eresource" component={Eresource} />
            <Route path="/aboutus" component={Whatwedo} />
            <Route path="/partners" component={Partners} />
            <Route path="/contactus" component={Contact} />
            <Route path="/" exact component={HomePage} />
          </Switch>
          <NavFooter />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
