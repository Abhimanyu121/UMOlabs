import React from "react";
import {
  Row,
  Col,
  Container,
  Button,
  FormInput,
  Collapse,
  Card,
  CardFooter,
  CardBody,
  CardTitle,
  CardHeader,
  CardImg,
  ListGroup,
  ListGroupItem,
} from "shards-react";
import "./Proposal.css";
import Patent from "./PatentImage.png";
import logo from "./logo.png";
export default class Proposal extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <h3 className="Heading">
              I will do chinese trademark registration for you
            </h3>
            <img src={Patent} />
          </Col>
          <Col>
            <Card className="SubPat" style={{ maxWidth: "600px" }}>
              <CardHeader>Card header</CardHeader>

              <CardBody>
                <CardTitle>Lorem Ipsum</CardTitle>
                <p>Lorem ipsum dolor sit amet.</p>
                <Button>Read more &rarr;</Button>
              </CardBody>
              <CardFooter>Card footer</CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <h3 className="Heading">Description</h3>
          <p className="Description">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </Row>
        <Row>
          <h3 className="Heading">About the seller</h3>
        </Row>
        <Row>
          <img width="5%" className="Avatar" src={logo} />
          <h4 className="ComHead1"> Alison</h4>
        </Row>
        <Row>
          <Button className="ContactButton" outline theme="dark">
            Contact Me
          </Button>
        </Row>
        <div className="Seller">
          <p>
            <CardHeader>Information</CardHeader>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>

        <Row>
          <h3 className="Heading">Patent</h3>
        </Row>
        <Row>
          <img width="3%" className="Logo" src={logo} />
          <h5 className="ComHead">Seller Name</h5>
        </Row>

        <div className="PatentComment">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </div>
        <Row>
          <img width="3%" className="Logo" src={logo} />
          <h5 className="ComHead">Seller Name</h5>
        </Row>

        <div className="PatentComment">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </div>
        <Row>
          <img width="3%" className="Logo" src={logo} />
          <h5 className="ComHead">Seller Name</h5>
        </Row>

        <div className="PatentComment">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </div>
      </div>
    );
  }
}
