import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/not-found.component.css";

class Not_Found extends Component {
  render() {
    return (
      <div className="container mt-md-4">
        <section class="page_404">
          <div class="container">
            <div class="row">
              <div class="col-sm-12 ">
                <div class="col-sm-10 col-sm-offset-1  text-center">
                  <div class="four_zero_four_bg">
                    <h1 class="error_code text-center">Oops</h1>
                  </div>

                  <div className="contant_box_404">
                    <h3 class="h2 text-center text-primary">
                      Look like you're lost
                    </h3>

                    <p className="text-center text-secondary">
                      the page you are looking for is not available!
                    </p>

                    <div className="text-center">
                      <Link to="/dashboard" class="link_404">
                        Go to Home
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Not_Found;
