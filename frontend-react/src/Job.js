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
  FormTextarea
} from "shards-react";
import "./Proposal.css";
import Patent from "./PatentImage.png";
import logo from "./logo.png";
import { getProfile } from "./services";
import { AddProposal } from "./Utils/Web3Connector";

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
        console.log('json', json)
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
            <h3 className="Heading">{this.state.job.title}</h3>
            <img src={Patent} />
          </Col>
          <Col>
            <Card className="SubPat" style={{ maxWidth: "600px" }}>
              <CardHeader>Card header</CardHeader>

              <CardBody>
                <CardTitle>Lorem Ipsum</CardTitle>
                <p>Lorem ipsum dolor sit amet.</p>
                <Button onClick={this.toggle}>Read more &rarr;</Button>
              </CardBody>
              <CardFooter>Card footer</CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <h3 className="Heading">Description</h3>
          <p className="Description">{this.state.job.description}</p>
        </Row>
        <Row>
          <h3 className="Heading">About the seller</h3>
        </Row>
        <Row>
          <img width="5%" className="Avatar" src={logo} />
          <h4 className="ComHead1">
            {this.state.job.employer.first_name +
              " " +
              this.state.job.employer.last_name}
          </h4>
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
          <h3 className="Heading">Proposals</h3>
        </Row>

        {this.state.proposals
          ? this.state.proposals.map((proposal, key) => (
              <div key={key}>
                <Row>
                  <img width="3%" className="Logo" src={logo} />
                  <h5 className="ComHead">
                    {proposal.proposer.first_name +
                      " " +
                      proposal.proposer.last_name}
                  </h5>
                </Row>
                <Row>
                  <p>Eth Address: {proposal.proposer.eth_address} </p>
                </Row>
                <div className="PatentComment">
                  <p>{proposal.description}</p>
                </div>
                <Button
                  onClick={() =>
                    this.approveProposer(proposal.id, this.state.job.budget)
                  }
                >
                  Approve Proposal
                </Button>
              </div>
            ))
          : null}
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
                <FormTextarea onChange={(e) => {this.setState({description: e.target.value})}} />
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
