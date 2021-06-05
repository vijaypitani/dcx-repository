// import './css/style.css';
import { Link } from "react-router-dom";
import React from "react";
import DeveloperService from "../services/DeveloperService";
import { Button } from "reactstrap";
import Header from "./Header";

const INITIAL_STATE = {
  name: "",
  phone: "",
  email: "",
  location: "",
  budget: "",
  website: "",
  nameError: "",
  phoneError: "",
  emailError: "",
  locationError: "",
  budgetError: "",
  websiteError: "",
  message1: "",
};
class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
    this.stopSubmission = this.stopSubmission.bind(this);
  }

  changeNameHandler = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  changePhoneHandler = (e) => {
    this.setState({
      phone: e.target.value,
    });
  };
  changeEmailHandler = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  validate = () => {
    let nameError = "";
    let phoneError = "";
    let emailError = "";
    let locationError = "";
    let budgetError = "";
    let websiteError = "";
    if (!this.state.name) {
      nameError = "Name cannot be empty";
    } else if (!this.state.name.match(/^[a-zA-Z\s]+$/)) {
      nameError = "Name must include only alphabets";
    }
    if (!this.state.email) {
      emailError = "Email cannot be empty";
    } else if (!this.state.email.match("\\S+?@\\S+?\\.com")) {
      emailError = "Invalid email";
    }
    if (!this.state.phone.match("^[6-9]\\d{9}$")) {
      phoneError = "Invalid phone number";
    }
    if (!this.state.location) {
      locationError = "Please choose a location";
    }
    if (!this.state.budget) {
      budgetError = "Please select your budget";
    }
    if (!this.state.website) {
      websiteError = "Website cannot be empty";
    } else if (!this.state.website.match("\\S+?\\S+?\\.com")) {
      websiteError = "Invalid website url";
    }
    if (
      emailError ||
      nameError ||
      phoneError ||
      locationError ||
      budgetError ||
      websiteError
    ) {
      this.setState({
        emailError,
        nameError,
        phoneError,
        locationError,
        budgetError,
        websiteError,
      });
      return false;
    }
    return true;
  };

  stopSubmission = (e) => {
    e.preventDefault();
    const data = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      location: this.state.location,
      budget: this.state.budget,
      website: this.state.website,
    };

    const isValid = this.validate();
    if (isValid) {
      DeveloperService.submitContactForm(data)
        .then((res) => {
          this.setState({
            message1: "Data Submitted Successfully",
          });
        })
        .catch((err) => console.log(err));
      console.log("Contact Info:", this.state);
      this.setState(INITIAL_STATE);
    }
    if (isValid) {
      DeveloperService.sendMail(data)
        .then((res) => {
          window.location.href = "https://mailthis.to/confirm";
          console.log(res);
        })
        .catch((err) => console.log(err));
      console.log("Contact Info:", this.state);
      this.setState(INITIAL_STATE);
    }
  };

  render() {
    let status = "";
    if (this.state.message1) {
      status = (
        <div className="alert alert-success" role="alert">
          {this.state.message1}
        </div>
      );
    }
    return (
      <div>
        <div id="container">
          <Header />
        </div>
        <div id="container">
          <nav id="leftMenu">
            <h3>Links</h3>
            <ul>
              <li>
                <Link to="/dashboard">SEO</Link>
              </li>
              <li>
                <Link to="/dashboard">PHP</Link>
              </li>
              <li>
                <Link to="/dashboard">Ajax</Link>
              </li>
              <li>
                <Link to="/dashboard">jQuery</Link>
              </li>
              <li>
                <Link to="/dashboard">Web design</Link>
              </li>
              <li>
                <Link to="/dashboard">Web Programming</Link>
              </li>
              <li>
                <Link to="/dashboard">Content Creation</Link>
              </li>
              <li>
                <Link to="/dashboard">Internet Marketing</Link>
              </li>
              <li>
                <Link to="/dashboard">XHTML Templates</Link>
              </li>
            </ul>
          </nav>

          <section>
            <h2>Contact Us</h2>
            <div>
              Please use this form to contact a member of our website team
            </div>
            <br></br>
            <form method="POST" onSubmit={this.stopSubmission}>
              {status}
              <div>
                <label>Full Name:</label>
                <input
                  title="name"
                  value={this.state.name}
                  name="name"
                  className="form-control"
                  placeholder="eg. John Doe"
                  onChange={this.changeNameHandler}
                />
              </div>
              <div className="text-danger" title="nameError">
                {this.state.nameError}
              </div>
              <br></br>

              <div>
                <label>Email:</label>
                <input
                  title="email"
                  name="email"
                  value={this.state.email}
                  className="form-control"
                  placeholder="eg. john.doe@gmail.com"
                  onChange={this.changeEmailHandler}
                />
              </div>
              <div className="text-danger" title="emailError">
                {this.state.emailError}
              </div>
              <br></br>

              <div>
                <label>Phone Number:</label>
                <input
                  title="phone"
                  value={this.state.phone}
                  name="phone"
                  className="form-control"
                  placeholder="eg. 9234578914"
                  onChange={this.changePhoneHandler}
                />
              </div>
              <div className="text-danger" title="phoneError">
                {this.state.phoneError}
              </div>
              <br></br>
              <label>Location:</label>
              <div>
                <select
                  className="form-control"
                  name="location"
                  value={this.state.location}
                  onChange={(e) => this.setState({ location: e.target.value })}
                >
                  <option
                    value=""
                    disabled={true}
                    defaultValue={true}
                    title="location"
                  >
                    Select location
                  </option>

                  <option>Boston</option>
                  <option>Miami</option>
                  <option>New York</option>
                </select>
              </div>
              <div className="text-danger" title="locationError">
                {this.state.locationError}
              </div>
              <br></br>

              <label htmlFor="budget">Budget: </label>
              <div>
                <select
                  className="form-control"
                  name="budget"
                  value={this.state.budget}
                  onChange={(e) => this.setState({ budget: e.target.value })}
                >
                  <option
                    value=""
                    disabled={true}
                    defaultValue={true}
                    title="budget"
                  >
                    Select budget
                  </option>
                  <option value="100-500">$100 - $500</option>
                  <option value="500-1000">$500 - $1000</option>
                  <option value="1000-2000">$1000 - $2000</option>
                  <option value="2000+">$2000+</option>
                  <option value="not sure">Not Sure</option>
                </select>
              </div>
              <div className="text-danger" title="budgetError">
                {this.state.budgetError}
              </div>
              <br></br>

              <label>Current Website:</label>
              <div>
                <input
                  className="form-control"
                  title="website"
                  name="website"
                  placeholder="gadgetskey.com"
                  value={this.state.website}
                  onChange={(e) => this.setState({ website: e.target.value })}
                />
              </div>
              <div className="text-danger" title="websiteError">
                {this.state.websiteError}
              </div>
              <br></br>

              <div>
                {" "}
                <Button
                  outline
                  color="success"
                  title="sign"
                  className="btn btn-sm"
                  disabled={!this.state.website}
                >
                  Submit
                </Button>
              </div>
              <br></br>
              <div>
                <Link to="/dashboard">
                  <Button outline color="secondary" className="btn btn-sm">
                    Go Back
                  </Button>
                </Link>
              </div>
            </form>
          </section>
        </div>
        <div style={{ clear: "both" }}></div>
        <footer>Copyright 2017. DCX Developer Directory.</footer>
      </div>
    );
  }
}

export default Contact;
