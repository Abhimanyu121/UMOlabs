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
import "./Proposal.css";
import Patent from "./PatentImage.png";
import logo from "./logo.png";
export default class Proposal extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <h2>I will do chinese trademark registration for you</h2>
          <img src={Patent} />
        </Row>
      </div>
    );
  }
}
