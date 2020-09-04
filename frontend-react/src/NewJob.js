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
  Form,
  FormGroup,
  FormTextarea,
  CardSubtitle,
  InputGroup,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  FormCheckbox,
} from "shards-react";
import "./NewJob.css";
import { createJob } from "./services";

export default class NewJob extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      title: "",
      description: "",
      budget: "",
      skills_required: "",
      profile: {}
    };

    this.toggle = this.toggle.bind(this);
    this.createNewJob = this.createNewJob.bind(this);
  }

  toggle() {
    this.setState({ open: !this.state.open });
  }

  componentDidMount() {
    const loggedIn = localStorage.getItem('loggedIn')
    if(loggedIn) {
      const profile = localStorage.getItem('profile')
      console.log('profile', profile)
      const jsonProfile = JSON.parse(profile)
      console.log(jsonProfile)
      this.setState({ profile: jsonProfile })
      console.log(this.state);
    }
    else {
      this.toggle()
    }
  }

  async createNewJob() {
    try {
      const resp = await createJob(
        this.state.title,
        this.state.description,
        this.state.budget,
        this.state.skills_required,
        this.state.employer.id
      );
      if (resp) {
        console.log("resp", resp);
      }
    } catch (error) {
      console.log(error, "error");
    }
  }

  render() {
    const { value } = this.state;
    return (
      <div>
        <div className="Blue"></div>
        <div className="White">
          <Form>
            <FormGroup>
              <Row>
                <label className="Label" htmlFor="#name">
                  Choose A Name For Your Project {this.state.profile.eth_address}
                </label>
              </Row>
              <FormInput
                id="#name"
                placeholder="Name"
                className="Input"
                onChange={(e) => {
                  this.setState({ title: e.target.value });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Row>
                <label className="Label">
                  {" "}
                  Tell Us More About Your Project
                </label>
              </Row>
              <div>
                <FormTextarea
                  className="Input"
                  onChange={(e) => {
                    this.setState({ description: e.target.value });
                  }}
                />
              </div>
            </FormGroup>
            <FormGroup>
              <Row>
                <label className="Label" htmlFor="#choose">
                  Upload File
                </label>
              </Row>
              <FormInput className="Input" type="file" id="file" />
            </FormGroup>
            <FormGroup>
              <Row>
                <label className="Label" htmlFor="#password">
                  Skills Required
                </label>
              </Row>
              <div>
                <FormTextarea
                  className="Input"
                  onChange={(e) => {
                    this.setState({
                      skills_required: e.target.value.split(","),
                    });
                  }}
                />
              </div>
            </FormGroup>
            <FormGroup>
              <Row>
                <label className="Label">How Do You Want To Pay</label>
              </Row>
              <Row>
                <Card className="CardForm">
                  <CardBody>
                    <CardTitle>Pay Fixed Price</CardTitle>
                    Nunc quis nisl ac justo elementum sagittis in quis justo.
                  </CardBody>
                </Card>
                <Card className="CardForm1">
                  <CardBody>
                    <CardTitle>Pay By The Hour</CardTitle>
                    Nunc quis nisl ac justo elementum sagittis in quis justo.
                  </CardBody>
                </Card>
              </Row>
            </FormGroup>
            <InputGroup>
              <FormInput
                className="Input1"
                onChange={(e) => {
                  this.setState({ budget: e.target.value });
                }}
              />
              <Dropdown
                className="DD"
                addonType="prepend"
                theme="warning"
                open={this.state.open}
                toggle={this.toggle}
              >
                <DropdownToggle caret>DAI</DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>ETH</DropdownItem>
                  <DropdownItem>USDT</DropdownItem>
                  <DropdownItem>USDC</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </InputGroup>

            <Button
              className="Submit"
              onClick={this.createNewJob}
              pill
              theme="primary"
            >
              Submit Project
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}