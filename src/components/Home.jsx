import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import About from "./About";
import Dashboard from "./Dashboard";
import Register from "./Register";
import Browse from "./Browse";
import Contact from "./Contact";
import Login from "./Login";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import NewPassword from "./NewPassword";
import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import Not_Found from "./Not_Found";

export const UserContext = React.createContext();

function Home() {
  const [role, setRole] = useState("");
  const [auth, setAuth] = useState(false);

  const LoginGuardRoute = ({ component: Component, ...props }) => (
    <Route
      {...props}
      render={(routeProps) => {
        return localStorage.getItem("login") ? (
          <Component {...routeProps} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );

  const roleAuth = useCallback(async () => {
    let loginInstance = JSON.parse(localStorage.getItem("login"));
    if (loginInstance) {
      //console.log(loginInstance.token);
      if (loginInstance.token) {
        await axios
          .get(
            `https://dcx-server.herokuapp.com/api/verify/data?token=${loginInstance.token}`
          )
          .then((res) => {
            if (res) {
              // console.log("MESSAGE", res.data.message);
              // console.log("DATA", res.data.data);
              // console.log("GROUP", res.data.data.group);
              setRole(res.data.data.group);
              setAuth(true);
            }
          })
          .catch((err) => {
            //console.log(err.response.data.message);
            setRole("");
            setAuth(false);
          });
      }
    }
  }, []);

  useEffect(() => {
    roleAuth();
  }, [roleAuth]);

  // if (role === "" && auth === false) {
  //   return <div>Verifying...</div>;
  // }

  return (
    <UserContext.Provider value={{ Role: role, Auth: auth }}>
      <Router>
        <div>
          <Switch>
            <LoginGuardRoute exact path="/" component={Dashboard} />
            <LoginGuardRoute exact path="/dashboard" component={Dashboard} />
            <LoginGuardRoute exact path="/browse" component={Browse} />
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/signup" component={SignUp}></Route>
            <Route exact path="/reset" component={ForgotPassword}></Route>
            <Route exact path="/reset/:token" component={NewPassword}></Route>
            <LoginGuardRoute exact path="/about" component={About} />
            <LoginGuardRoute path="/register" component={Register} />
            <LoginGuardRoute path="/contact" component={Contact} />
            <Route component={Not_Found} />
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default Home;
