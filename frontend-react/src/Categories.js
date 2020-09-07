import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  Button,
  CardFooter,
  Container,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  FormRadio,
} from "shards-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptop } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Link, HashRouter } from "react-router-dom";

import logo from "./logo.png";
import "./Categories.css";
import { shortDescription } from "./utils";
import "./Hover.css";
import { useHistory } from "react-router-dom";

export default class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      jobs: [],
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      open: !this.state.open,
    });
  }

  async componentDidMount() {
    fetch("http://127.0.0.1:8000/api/jobs")
      .then((resp) => resp.json())
      .then((json) => {
        console.log(json);
        this.setState({ jobs: json });
      });
  }

  render() {
    const { open } = this.state;

    return (
      <div>
        <div className="Blue">
          <Row>
            {" "}
            <h1 className="HireHead">
              Hire the best freelancers for any job, online.
            </h1>
          </Row>
          <Row>
            <Button className="Btn-1" outline theme="light">
              Dark
            </Button>
            <Button className="Btn-2" outline theme="light">
              Dark
            </Button>
          </Row>
        </div>

        <Row>
          <Col>
            <div className="FilterDiv">
              {" "}
              <Row>
                <p className="mb-2 FilterHead">Filter By Categories:</p>
              </Row>
              <Row className="Filter">
                {" "}
                <FormRadio style={{ color: "black" }}>
                  Graphics and Design
                </FormRadio>{" "}
              </Row>
              <Row className="Filter">
                <FormRadio>Digital Marketing</FormRadio>
              </Row>
              <Row className="Filter">
                <FormRadio className="Filter">Legal</FormRadio>
              </Row>
              <Row className="Filter">
                {" "}
                <FormRadio style={{ color: "black" }}>
                  Programming and Tech
                </FormRadio>{" "}
              </Row>
              <Row className="Filter">
                <FormRadio>Business</FormRadio>
              </Row>
              <Row className="Filter">
                <FormRadio className="Filter">Lifestyle</FormRadio>
              </Row>
              <Row>
                <p className="mb-2 FilterHead">Sort By:</p>
              </Row>
              <Row className="Filter">
                {" "}
                <FormRadio style={{ color: "black" }}>
                  Lowest Price
                </FormRadio>{" "}
              </Row>
              <Row className="Filter">
                <FormRadio>Highest Price</FormRadio>
              </Row>
              <Row className="Filter">
                <FormRadio className="Filter">Number of Proposals</FormRadio>
              </Row>
              <Row className="Filter">
                {" "}
                <FormRadio style={{ color: "black" }}>Latest</FormRadio>{" "}
              </Row>
              <Row className="Filter">
                <FormRadio>Oldest</FormRadio>
              </Row>
              <Row className="Filter">
                <FormRadio className="Filter">Delivery Time</FormRadio>
              </Row>
            </div>
          </Col>
          <Col>
            <div>
              {this.state.jobs.length
                ? this.state.jobs.map((job, key) => (
                    <div
                      key={key}
                      className="Jobs hvr-underline-reveal"
                      onClick={() => {
                        this.props.history.push(`/job/${job.id}`);
                      }}
                    >
                      <Row>
                        <Col>
                          <h4 className="JobHeading">
                            <FontAwesomeIcon
                              icon={faLaptop}
                              style={{ marginRight: 7 }}
                            />
                            {job.title}
                          </h4>
                        </Col>

                        <Col>
                          <h4 className="JobHeading1">$25-$30/Hour</h4>
                        </Col>
                      </Row>
                      <Row>
                        <p className="JobPara">
                          {shortDescription(job.description)}
                        </p>
                      </Row>
                      <Row>
                        <p className="JobPara">
                          <b>Skills Required: </b>
                          {job.skills_required.join(", ")}
                        </p>
                      </Row>
                      <Row>
                        <img
                          width="3%"
                          height="2%"
                          className="SellerNameIcon"
                          src={logo}
                        />
                        <h6 className="SellName">Alison Grey</h6>
                      </Row>

                      {/* <Link
                        style={{ color: "white" }}
                        className="Link"
                        to={`/job/${job.id}`}
                      >
                        Read more &rarr;
                      </Link> */}
                    </div>
                  ))
                : null}
            </div>
          </Col>

          <Col></Col>
          <Col></Col>
        </Row>
      </div>
      // {/* {this.state.jobs.length
      //     ? this.state.jobs.map((job, key) => (
      //         <div key={key}>
      //           <Card
      //             className="CategoryCard"
      //             style={{ maxWidth: "300px" }}
      //           >
      //             <CardImg src="https://place-hold.it/300x200" />
      //             <CardBody>
      //               <CardTitle>{job.title}</CardTitle>
      //               <p>{shortDescription(job.description)}</p>
      //               <p>
      //                 <b>Skills Required: </b>
      //                 {job.skills_required.join(", ")}
      //               </p>
      //             </CardBody>
      //             <CardFooter>
      //               <Link
      //                 style={{ color: "white" }}
      //                 className="Link"
      //                 to={`/job/${job.id}`}
      //               >
      //                 Read more &rarr;
      //               </Link>
      //             </CardFooter>
      //           </Card>
      //         </div>
      //       ))
      //     : null} */}
    );
  }
}
