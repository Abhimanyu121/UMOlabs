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

export default class NewJob extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: null };
    this.toggle = this.toggle.bind(this);
    this.state = {
      open: false,
    };
  }
  toggle() {
    this.setState({ open: !this.state.open });
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
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
              <FormInput id="#name" placeholder="Name" />
            </FormGroup>
            <FormGroup>
              <label htmlFor="#password">Tell Us More About Your Project</label>
              <div>
                <FormTextarea onChange={this.handleChange} />
              </div>
            </FormGroup>
            <FormGroup>
              <label className="Lable" htmlFor="#choose">
                Upload File
              </label>
              <FormInput className="Choose" type="file" id="file" />
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
              <FormInput />
              <Dropdown
                addonType="prepend"
                open={this.state.open}
                toggle={this.toggle}
              >
                <DropdownToggle caret>INR</DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem>Another action</DropdownItem>
                  <DropdownItem>Something else here</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </InputGroup>
            
            <label>Are These Details Correct</label>

            <Button pill theme="warning">
              Warning
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}
