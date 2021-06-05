import { Link } from "react-router-dom";
import React, { Component } from "react";
import DeveloperService from "../services/DeveloperService";

class NewPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resetToken: this.props.match.params.token,
      password: "",
      confirmPassword: "",
      successMessage: "",
      errrorMessage: "",
    };

    this.stopSubmission = this.stopSubmission.bind(this);
  }

  validate = () => {
    let error = "";

    if (!this.state.password) {
      error = "Password cannot be empty";
    } else if (!this.state.password.match("(?=.*[@#$]).{8,}")) {
      error =
        "Password must be at least 8 characters with at least one lowercase,uppercase and two special characters";
    }

    if (error) {
      this.setState({
        errrorMessage: error,
      });
      return false;
    }
    return true;
  };

  stopSubmission = (e) => {
    e.preventDefault();
    const data = {
      password: this.state.password,
      token: this.state.resetToken,
    };

    const isValid = this.validate();
    if (isValid) {
      /* DeveloperService.registerUser(data)
        .then((res) => {
          this.setState({
            message1: "Signed Up Successfully",
          });
        })
        .catch((err) => {
          this.setState({
            message2: err.response.data.message,
          });
        });
      console.log("Developer Details:", this.state);
      this.setState(INITIAL_STATE); */
      DeveloperService.setNewPassword(data)
        .then((res) => {
          console.log(res.data.message);
          this.setState({
            password: "",
            confirmPassword: "",
            errorMessage: "",
            successMessage: res.data.message,
          });
        })
        .catch((err) => {
          console.log(err.response.data.message);
          this.setState({
            password: "",
            confirmPassword: "",
            successMessage: "",
            errorMessage: err.response.data.message,
          });
        });
    }
  };

  render() {
    let error = "";
    let success = "";
    let postSubmit = "";

    if (this.state.errorMessage) {
      error = (
        <div className="alert alert-danger text-center" role="alert">
          {this.state.errorMessage}
        </div>
      );
    }
    if (this.state.successMessage) {
      success = (
        <div class="alert alert-success text-center" role="alert">
          {this.state.successMessage}
        </div>
      );
      postSubmit = (
        <div className="text-center">
          <Link to="/login">
            <p className="text-secondary text-center">Go to Login</p>
          </Link>
        </div>
      );
    }

    return (
      <div>
        <div className="container">
          <h3 className="text-center mb-md-4">
            <pre> </pre>
          </h3>
          <div className="row">
            <div
              className="card col-md-6 offset-md-3 offset-md-3"
              style={{ borderRadius: "10px" }}
            >
              <div className="card-body">
                <form method="POST" onSubmit={this.stopSubmission}>
                  <h2 className="text-center mb-md-4">Set new password</h2>
                  {error}
                  {success}
                  <div>
                    <label className="font-weight-bold">Password</label>
                    <input
                      name="password"
                      type="password"
                      className="form-control"
                      placeholder="Choose a new password"
                      value={this.state.password}
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
                    />
                  </div>
                  <div className="text-danger">{this.state.passwordError}</div>
                  <br></br>

                  <div>
                    <label className="font-weight-bold">Confirm Password</label>
                    <input
                      name="password"
                      type="password"
                      className="form-control"
                      placeholder="Confirm new password"
                      value={this.state.confirmPassword}
                      onChange={(e) =>
                        this.setState({ confirmPassword: e.target.value })
                      }
                    />
                  </div>
                  <div className="text-danger">{this.state.passwordError}</div>
                  <br></br>

                  <div className="text-center">
                    <button
                      className="btn btn-success mr-3 btn-md"
                      onClick={this.sendMail}
                      disabled={!this.state.confirmPassword}
                    >
                      Update Password
                    </button>
                  </div>
                  <br />
                  {postSubmit}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewPassword;
