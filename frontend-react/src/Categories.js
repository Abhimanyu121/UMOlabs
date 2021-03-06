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
  Badge,
} from "shards-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptop, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Link, HashRouter } from "react-router-dom";

import logo from "./logo.png";
import "./Categories.css";
import { shortDescription } from "./utils";
import "./Hover.css";
import { useHistory } from "react-router-dom";
import { getProfile, createProposal } from "./services";

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
      .then(async (json) => {
        console.log(json);

        for (var i = 0; i < json.length; i++) {
          console.log("This is i", i);
          const resp = await getProfile(json[i].employer);
          console.log("This isasdasd i", i);
          json[i].employer = resp;
          console.log("json", json);
          this.setState({ jobs: json });
        }
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
            <Button
              className="Btn-1"
              className="hvr-icon-pop Btn-1"
              outline
              theme="light"
            >
              Browse Jobs{" "}
              <FontAwesomeIcon
                icon={faBriefcase}
                className="hvr-icon"
                style={{ marginLeft: 7 }}
              />
            </Button>
            <Button
              className="Btn-2"
              className="hvr-icon-pop Btn-2"
              outline
              theme="light"
              onClick={() => {
                this.props.history.push(`/new-job`);
              }}
            >
              Create Job
              <FontAwesomeIcon
                icon={faBriefcase}
                className="hvr-icon"
                style={{ marginLeft: 7 }}
              />
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
                      class="JobsContainer"
                      key={key}
                      onClick={() => {
                        this.props.history.push(`/job/${job.id}`);
                      }}
                    >
                      <div class="Jobs">
                        <div class="JobsInfo">
                          <h4 className="JobHeading">
                            <FontAwesomeIcon
                              icon={faLaptop}
                              style={{ marginRight: 7 }}
                            />
                            {job.title}
                          </h4>
                          <p className="JobPara">
                            {shortDescription(job.description)}
                          </p>
                          <p className="JobPara">
                            {job.skills_required.map((skill) => (
                              <Badge className="Skills" outline theme="info">
                                {skill}
                              </Badge>
                            ))}
                          </p>
                        </div>
                        <div class="JobsPreview">
                          <h4 className="JobHeading1">${job.budget}/Hour</h4>
                          <img
                            width="20%"
                            height="20%"
                            className="SellerNameIcon"
                            src={logo}
                          />
                          <h6 className="SellName">
                            {job.employer.first_name +
                              " " +
                              job.employer.last_name}
                          </h6>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </Col>

          <Col></Col>
          <Col></Col>
        </Row>
      </div>
    );
  }
}
