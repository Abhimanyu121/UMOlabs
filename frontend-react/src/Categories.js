import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  CardFooter,
  Button,
  Container,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
} from "shards-react";
import { BrowserRouter as Router, Link, HashRouter } from "react-router-dom";

import "./Categories.css";
import { shortDescription } from "./utils";
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
        <Container>
          <Row>
            {this.state.jobs.length
              ? this.state.jobs.map((job, key) => (
                  <div key={key}>
                    <Card
                      className="CategoryCard"
                      style={{ maxWidth: "300px" }}
                    >
                      <CardImg src="https://place-hold.it/300x200" />
                      <CardBody>
                        <CardTitle>{job.title}</CardTitle>
                        <p>{shortDescription(job.description)}</p>
                        <p>
                          <b>Skills Required: </b>
                          {job.skills_required.join(", ")}
                        </p>
                      </CardBody>
                      <CardFooter>
                        <Link
                          style={{ color: "white" }}
                          className="Link"
                          to={`/job/${job.id}`}
                        >
                          Read more &rarr;
                        </Link>
                      </CardFooter>
                    </Card>
                  </div>
                ))
              : null}
          </Row>
        </Container>
        <Modal size="lg" open={open} toggle={this.toggle}>
          <ModalHeader>Header</ModalHeader>
          <ModalBody>Hello there!</ModalBody>
        </Modal>
      </div>
    );
  }
}
