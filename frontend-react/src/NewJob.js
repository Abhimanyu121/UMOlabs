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
} from "shards-react";
import "./NewJob.css";
import { createJob } from "./services";

export default class NewJob extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      open: false,
      title: '',
      description: '',
      budget: '',
      skills_required: '',
      employer: {
        id: '961908c1-0ea4-4413-9345-86d1e434e09c'
      }
    };

    this.toggle = this.toggle.bind(this)
    this.createNewJob = this.createNewJob.bind(this)
  }

  toggle() {
    this.setState({ open: !this.state.open });
  }

  async createNewJob() {
    try {
      const resp = await createJob(this.state.title, this.state.description, this.state.budget, this.state.skills_required, this.state.employer.id)
      if (resp) {
        console.log('resp', resp)
      }
    } catch (error) {
      console.log(error, 'error')
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
              <label htmlFor="#name">Choose A Name For Your Project</label>
              <FormInput id="#name" placeholder="Name" onChange={(e) => {this.setState({title: e.target.value})}}/>
            </FormGroup>
            <FormGroup>
              <label htmlFor="#password">Tell Us More About Your Project</label>
              <div>
                <FormTextarea onChange={(e) => {this.setState({description: e.target.value})}} />
              </div>
            </FormGroup>
            <FormGroup>
              <label className="Lable" htmlFor="#choose">
                Upload File
              </label>
              <FormInput className="Choose" type="file" id="file" />
            </FormGroup>
            <FormGroup>
              <label htmlFor="#password">Skills Required</label>
              <div>
                <FormTextarea onChange={(e) => {this.setState({skills_required: e.target.value.split(',')})}} />
              </div>
            </FormGroup>
            <FormGroup>
              <label>How Do You Want To Pay</label>
              <Row>
                <Card>
                  <CardBody>
                    <CardTitle>Pay Fixed Price</CardTitle>
                    <CardSubtitle>Card subtitle</CardSubtitle>
                    Nunc quis nisl ac justo elementum sagittis in quis justo.
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <CardTitle>Pay By The Hour</CardTitle>
                    <CardSubtitle>Card subtitle</CardSubtitle>
                    Nunc quis nisl ac justo elementum sagittis in quis justo.
                  </CardBody>
                </Card>
              </Row>
            </FormGroup>
            <InputGroup>
              <FormInput onChange={(e) => {this.setState({budget: e.target.value})}} />
              <Dropdown
                addonType="prepend"
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
            
            <label>Are These Details Correct</label>

            <Button onClick={this.createNewJob} pill theme="warning">
              Submit Project
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}
