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
export default class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    const { open } = this.state;

    return (
      <div>
        <Container>
          <Row>
            <Card className="CategoryCard" style={{ maxWidth: "300px" }}>
              <CardHeader>Card header</CardHeader>
              <CardImg src="https://place-hold.it/300x200" />
              <CardBody>
                <CardTitle>Lorem Ipsum</CardTitle>
                <p>Lorem ipsum dolor sit amet.</p>
                <Button>
                  <Link className="Link" to="/proposal">
                    Read more &rarr;
                  </Link>{" "}
                </Button>
              </CardBody>
              <CardFooter>Card footer</CardFooter>
            </Card>
            <Card className="CategoryCard" style={{ maxWidth: "300px" }}>
              <CardHeader>Card header</CardHeader>
              <CardImg src="https://place-hold.it/300x200" />
              <CardBody>
                <CardTitle>Lorem Ipsum</CardTitle>
                <p>Lorem ipsum dolor sit amet.</p>
                <Button onClick={this.toggle}>Read more &rarr;</Button>
              </CardBody>
              <CardFooter>Card footer</CardFooter>
            </Card>
            <Card className="CategoryCard" style={{ maxWidth: "300px" }}>
              <CardHeader>Card header</CardHeader>
              <CardImg src="https://place-hold.it/300x200" />
              <CardBody>
                <CardTitle>Lorem Ipsum</CardTitle>
                <p>Lorem ipsum dolor sit amet.</p>
                <Button>Read more &rarr;</Button>
              </CardBody>
              <CardFooter>Card footer</CardFooter>
            </Card>
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
