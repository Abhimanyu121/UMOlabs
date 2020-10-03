import React from "react";
import {
  Row,
  Col,
  Button,
  FormInput,
  CardBody,
  CardHeader,
  Modal,
  ModalHeader,
  Form,
  FormGroup,
  FormTextarea,
  Badge, Container
} from "shards-react";
import "./Proposal.css";
import Patent from "./PatentImage.png";
import logo from "./logo.png";
import { getProfile, createProposal } from "./services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import "./Hover.css";

import {
  AddProposal,
  Approve,
  MakePayout,
  GetWeb3,
} from "./utils/Web3Connector";
import * as BigNumber from "bignumber.js";

export default class Job extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      job: { employer: "", skills_required: [] },
      proposals: [],
      proposalSubmit: false,
      title: "",
      description: "",
      profile: {},
      approvedProposal: {
        proposer: {},
      },
    };

    this.approveProposer = this.approveProposer.bind(this);
    this.toggle = this.toggle.bind(this);
    this.submitProposal = this.submitProposal.bind(this);
  }

  toggle() {
    this.setState({
      open: !this.state.open,
    });
  }

  async submitProposal() {
    if (!this.state.profile) {
      alert("Please Log In");
    }
    const loggedIn = localStorage.getItem("loggedIn");
    console.log("loggedIn", loggedIn);
    if (loggedIn) {
      const profile = localStorage.getItem("profile");
      this.setState({ profile });
    } else {
      alert("Please Login To Submit Proposal");
      return;
    }
    try {
      console.log("this is state", this.state);
      const resp = await createProposal(
        this.state.title,
        this.state.description,
        this.state.profile.profile.id,
        this.state.job.id
      );
      if (resp) {
        this.setState({ proposalSubmit: true });
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  async componentDidMount() {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === "true") {
      const profile = localStorage.getItem("profile");
      console.log("profile", profile);
      const jsonProfile = JSON.parse(profile);
      console.log(jsonProfile);
      this.setState({ profile: jsonProfile });
      console.log(this.state);
    }
    // Fetch Job
    console.log(this.props.match.params.jobid);
    var url1 =
      "http://127.0.0.1:8000/api/jobs/" + this.props.match.params.jobid;

    fetch(url1)
      .then((resp) => resp.json())
      .then(async (json) => {
        getProfile(json.employer).then((resp) => {
          json.employer = resp;
          console.log("json", json);
          this.setState({ job: json });

          var url2 =
            "http://127.0.0.1:8000/api/proposals/" +
            this.props.match.params.jobid;

          fetch(url2)
            .then((resp) => resp.json())
            .then(async (json) => {
              console.log(json);

              for (var i = 0; i < json.length; i++) {
                const profile = await getProfile(json[i].proposer);
                json[i].proposer = profile;
              }

              this.setState({ proposals: json });

              console.log("job", this.state.job);

              if (this.state.job.approved) {
                const proposal = this.state.proposals.find(
                  (proposal) => this.state.job.awarded_to === proposal.id
                );

                console.log(proposal);

                this.setState({ approvedProposal: proposal });
              }
            });
        });
      });
  }

  async approveProposer(proposerId, proposerAddress) {
    const web3 = await GetWeb3();
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn) {
      const profile = localStorage.getItem("profile");
      this.setState({ profile });
    } else {
      alert("Please Login To Approve");
      return;
    }
    const amountBig = new BigNumber(
      new BigNumber(this.state.job.budget) * new BigNumber(10 ** 18)
    ).toString();
    console.log("amountB", amountBig);
    await Approve(amountBig);
    await AddProposal(this.state.job.id, amountBig);
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
        this.setState({ currentJob: json });
        console.log("json", json);
      });

    // const amountBig = new BigNumber(new BigNumber(this.state.job.budget) * new BigNumber(10 ** 18))
  }

  async makePayout() {
    await MakePayout(
      this.state.job.id,
      this.state.approvedProposal.proposer.eth_address
    );

    let currentJob = this.state.job;
    currentJob.employer = this.state.job.employer.id;
    currentJob.payout_released = "True";

    console.log("currentJob", currentJob.id);

    fetch("http://127.0.0.1:8000/api/jobs/" + currentJob.id, {
      method: "put",
      body: JSON.stringify(currentJob),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((json) => {
        console.log("json", json);
        this.setState({ currentJob: json });
      });

    // const amountBig = new BigNumber(new BigNumber(this.state.job.budget) * new BigNumber(10 ** 18))
  }

  async raiseDispute() {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn) {
      const profile = localStorage.getItem("profile");
      this.setState({ profile });
    } else {
      alert("Please Login To Raise Dispute");
      return;
    }
    let currentJob = this.state.job;
    currentJob.employer = this.state.job.employer.id;
    currentJob.job_disputed = "True";

    console.log("currentJob", currentJob);

    fetch("http://127.0.0.1:8000/api/jobs/" + currentJob.id, {
      method: "put",
      body: JSON.stringify(currentJob),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((json) => {
        console.log("json", json);
        this.setState({ currentJob: json });
      });

    // const amountBig = new BigNumber(new BigNumber(this.state.job.budget) * new BigNumber(10 ** 18))
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
                <p className="Description JustifyContent">
                  {this.state.job.description}
                </p>
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
                <p className="SellerInfo JustifyContent">
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
            </div>
          </Col>
          <Col>
            <div>
              {this.state.job.approved ? (
                <div className="SubPat">
                  {
                    <div>
                      <h4 style={{ marginBottom: 25, paddingTop: 20 }}>
                        Manage Project
                      </h4>
                      <Row className="NameJob">
                        <img
                          width="4%"
                          height="5%"
                          className="Avatar"
                          src={logo}
                        />
                        <h5 className="ComHead">
                          {this.state.approvedProposal.proposer.first_name +
                            " " +
                            this.state.approvedProposal.proposer.last_name}
                        </h5>
                      </Row>
                      <Row>
                        <h6 className="EthDesc">
                          Eth Address:{" "}
                          {this.state.approvedProposal.proposer.eth_address}
                        </h6>
                      </Row>
                      {this.state.job.payout_released ? (
                        <div>
                          <h4>Job Successfully Completed</h4>
                        </div>
                      ) : (
                        <Row>
                          <Col>
                            <Button
                              className="ApproveProposal hvr-icon-bounce"
                              onClick={() => this.makePayout()}
                            >
                              <FontAwesomeIcon
                                icon={faThumbsUp}
                                style={{ marginRight: 7 }}
                                className="hvr-icon"
                              />{" "}
                              Release Payout
                            </Button>
                          </Col>
                          <Col>
                            <Button
                              className="ApproveProposal hvr-icon-bounce"
                              onClick={() => this.raiseDispute()}
                            >
                              <FontAwesomeIcon
                                icon={faThumbsDown}
                                style={{ marginRight: 7 }}
                                className="hvr-icon"
                              />{" "}
                              Raise Dispute
                            </Button>
                          </Col>
                        </Row>
                      )}
                    </div>
                  }
                </div>
              ) : (
                <div className="SubPat">
                  <CardHeader></CardHeader>

                  <CardBody>
                    <h4 style={{ marginBottom: 25 }}>Project Details</h4>
                    <Row>
                      <h5 className="SideCard1">Budget </h5>{" "}
                      {this.state.job.budget}
                    </Row>
                    <Row className="JobSkills">
                      {this.state.job.skills_required.map((skill) => (
                        <Badge className="Skills" outline theme="info">
                          {skill}
                        </Badge>
                      ))}
                    </Row>
                    <Button onClick={this.toggle} style={{ marginTop: 20 }}>
                      Apply
                    </Button>
                  </CardBody>
                </div>
              )}
            </div>
            
          </Col>
        </Row>
        <hr/>
        <center>
          <div>
          {this.state.job.approved ? null : (
            <div>
              <h5 className="Heading1">Proposals</h5>
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
                      <div className="PatentComment JustifyContent">
                        <p>{proposal.description}</p>
                      </div>
                      <Button
                        className="ApproveProposal hvr-icon-bounce"
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
                          className="hvr-icon"
                        />{" "}
                        Approve Proposal
                      </Button>
                    </div>
                  ))
                : null}
            </div>
          )}
        </div>

        </center>
        <Modal size="lg" open={this.state.open} toggle={this.toggle}>
          {this.state.proposalSubmit ? (
            <div>
              <CardBody>
                <p>Proposal Submitted ! Wait for the Employer to Approve.</p>
              </CardBody>
            </div>
          ) : (
            <div>
              <ModalHeader>
                Please Enter the Following Details about your Proposal
              </ModalHeader>
              <Form className="ProposalForm">
                <FormGroup>
                  <label>Title</label>
                  <FormInput
                    placeholder="Eg- I will create a website"
                    onChange={(e) => {
                      this.setState({ title: e.target.value });
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Description</label>
                  <div>
                    <FormTextarea
                      onChange={(e) => {
                        this.setState({ description: e.target.value });
                      }}
                      placeholder="Enter What You Will Do In Detail"
                    />
                  </div>
                </FormGroup>
                <Button pill theme="success" onClick={this.submitProposal}>
                  Submit Proposal
                </Button>
              </Form>
            </div>
          )}
        </Modal>
      </div>
    );
  }
}
