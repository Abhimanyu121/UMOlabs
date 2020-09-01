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
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  FormTextarea,
} from "shards-react";
import "./Proposal.css";
import Patent from "./PatentImage.png";
import logo from "./logo.png";
import { getProfile } from "./services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

import { AddProposal } from "./utils/Web3Connector";

export default class Job extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      job: { employer: "" },
      proposals: [],
    };

    this.approveProposer = this.approveProposer.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      open: !this.state.open,
    });
  }

  async componentDidMount() {
    // Fetch Job
    console.log(this.props.match.params.jobid);
    var url1 =
      "http://127.0.0.1:8000/api/jobs/" + this.props.match.params.jobid;

    fetch(url1)
      .then((resp) => resp.json())
      .then(async (json) => {
        const profile = await getProfile(json.employer);
        json.employer = profile;
        console.log("json", json);
        this.setState({ job: json });

        var url2 =
          "http://127.0.0.1:8000/api/proposals/" +
          this.props.match.params.jobid;

        fetch(url2)
          .then((resp) => resp.json())
          .then((json) => {
            console.log(json);
            json.forEach(async (j) => {
              const profile = await getProfile(j.proposer);
              console.log("profile", profile);
              j.proposer = profile;
            });

            console.log(json);

            this.setState({ proposals: json });
          });
      });
  }

  async approveProposer(proposerId, proposerAddress) {
    console.log(this.state.job.id, proposerAddress);

    let currentJob = this.state.job;
    currentJob.employer = this.state.job.employer.id;
    currentJob.approved = "True";
    currentJob.awarded_to = proposerId;

    console.log("currentJob", currentJob);

    fetch("http://127.0.0.1:8000/api/jobs/" + this.state.job.id, {
      method: "put",
      body: JSON.stringify(currentJob),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((json) => {
        console.log("json", json);
      });
    // await AddProposal(this.state.job.id, proposerAddress)
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <div className="JobProfile">
              <h3 className="Heading">{this.state.job.title}</h3>
              <Row>
                <h5 className="Heading">Description</h5>
              </Row>
              <Row>
                {" "}
                <p className="Description">{this.state.job.description}</p>
              </Row>
              <Row>
                <h5 className="Heading1">About the seller</h5>
              </Row>
              <Row>
                <img width="8%" height="8%" className="Avatar" src={logo} />
                <h6 className="ComHead1">
                  {this.state.job.employer.first_name +
                    " " +
                    this.state.job.employer.last_name}
                </h6>
                {/* <Button className="ContactButton" outline theme="dark">
                  Contact Me
                </Button>{" "} */}
              </Row>

              <div className="Seller">
                <Row>
                  {" "}
                  <Col> From</Col>
                  <Col>Last Delivery</Col>
                  <Col>Avg. response time</Col>
                </Row>

                <Row>
                  {" "}
                  <Col className="Respond"> Germany</Col>
                  <Col className="Respond">2 Days Ago</Col>
                  <Col className="Respond">1 Hour</Col>
                </Row>
                <p className="SellerInfo">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                {/* <p>
                  <div>
                    <Row>
                      {" "}
                      <Col> From</Col>
                      <Col>Last Delivery</Col>
                    </Row>
                  </div>
                  <div>
                    <Row>
                      {" "}
                      <Col> Germany</Col>
                      <Col>2 Days Ago</Col>
                    </Row>
                  </div>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p> */}
              </div>

              <Row>
                <h5 className="Heading1">Proposals</h5>
              </Row>

              {this.state.proposals
                ? this.state.proposals.map((proposal, key) => (
                    <div key={key}>
                      <Row className="NameJob">
                        <img
                          width="4%"
                          height="5%"
                          className="Avatar"
                          src={logo}
                        />
                        <h5 className="ComHead">
                          {proposal.proposer.first_name +
                            " " +
                            proposal.proposer.last_name}
                        </h5>
                      </Row>
                      <Row>
                        <h6 className="EthDesc">
                          Eth Address: {proposal.proposer.eth_address}
                        </h6>
                      </Row>
                      <div className="PatentComment">
                        <p>{proposal.description}</p>
                      </div>
                      <Button
                        className="ApproveProposal"
                        onClick={() =>
                          this.approveProposer(
                            proposal.id,
                            this.state.job.budget
                          )
                        }
                      >
                        <FontAwesomeIcon
                          icon={faThumbsUp}
                          style={{ marginRight: 7 }}
                        />{" "}
                        Approve Proposal
                      </Button>
                    </div>
                  ))
                : null}
            </div>
          </Col>
          <Col>
            <div className="SubPat">
              <CardHeader>Card header</CardHeader>

              <CardBody>
                <CardTitle>Lorem Ipsum</CardTitle>
                <p>Lorem ipsum dolor sit amet.</p>
                <Button onClick={this.toggle}>Read more &rarr;</Button>
              </CardBody>
              <CardFooter>Card footer</CardFooter>
            </div>
          </Col>
        </Row>

        <Modal size="lg" open={this.state.open} toggle={this.toggle}>
          <ModalHeader>
            Please Enter the Following Details about your Proposal
          </ModalHeader>
          <Form>
            <FormGroup>
              <label>Title</label>
              <FormInput placeholder="Input" />
            </FormGroup>
            <FormGroup>
              <label>Description</label>
              <div>
                <FormTextarea
                  onChange={(e) => {
                    this.setState({ description: e.target.value });
                  }}
                />
              </div>
            </FormGroup>
            <Button pill theme="warning">
              Warning
            </Button>
          </Form>
        </Modal>
      </div>
    );
  }
}
