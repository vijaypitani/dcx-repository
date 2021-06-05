import React, { Component } from "react";
import DeveloperService from "../services/DeveloperService";
import { Link } from "react-router-dom";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      errorMessage: "",
      successMessage: "",
    };

    this.emailHandler = this.emailHandler.bind(this);
    this.sendMail = this.sendMail.bind(this);
  }

  emailHandler = (event) => {
    this.setState({ email: event.target.value });
  };

  sendMail = (event) => {
    event.preventDefault();
    const data = {
      email: this.state.email,
    };

    DeveloperService.sendPasswordResetLink(data)
      .then((res) => {
        console.log(res.data.message);
        this.setState({
          email: "",
          errorMessage: "",
          successMessage: res.data.message,
        });
      })
      .catch((err) => {
        console.log(err.response.data.message);
        this.setState({
          email: "",
          successMessage: "",
          errorMessage: err.response.data.message,
        });
      });
  };

  render() {
    let error = "";
    let success = "";
    let postMail = "";

    if (this.state.errorMessage) {
      error = (
        <div className="alert alert-danger text-center" role="alert">
          {this.state.errorMessage}
        </div>
      );
    }
    if (this.state.successMessage) {
      success = (
        <div className="alert alert-success text-center" role="alert">
          {this.state.successMessage}
        </div>
      );
      postMail = (
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
                <form>
                  <h2 className="text-center mb-md-4">Reset Password</h2>
                  {error}
                  {success}
                  <div className="form-group">
                    <label htmlFor="empEmail" className="font-weight-bold">
                      Email Address
                    </label>
                    <input
                      type="text"
                      placeholder="eg. john.doe@gmail.com"
                      id="empEmail"
                      name="empEmail"
                      className="form-control"
                      value={this.state.email}
                      onChange={this.emailHandler}
                    />
                  </div>
                  <div className="text-center">
                    <button
                      className="btn btn-success mr-3 btn-md"
                      onClick={this.sendMail}
                      disabled={!this.state.email}
                    >
                      SEND RESET LINK
                    </button>
                  </div>
                  <br />
                  {postMail}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
