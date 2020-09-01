import React from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
  Collapse,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
} from "shards-react";

import "./Navbar.css";
import { BrowserRouter as Router, Link, HashRouter } from "react-router-dom";

export default class NavExample extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = { open: false };
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      collapseOpen: false,
    };
  }
  toggle() {
    this.setState({
      open: !this.state.open,
    });
  }
  toggleDropdown() {
    this.setState({
      ...this.state,
      ...{
        dropdownOpen: !this.state.dropdownOpen,
      },
    });
  }

  toggleNavbar() {
    this.setState({
      ...this.state,
      ...{
        collapseOpen: !this.state.collapseOpen,
      },
    });
  }

  render() {
    const { open } = this.state;

    return (
      <Navbar type="dark" className="NavBar" expand="md">
        <NavbarToggler onClick={this.toggleNavbar} />
        <Nav navbar className="ml-auto">
          <InputGroup size="sm" className="Search" seamless>
            <InputGroupAddon type="prepend">
              <InputGroupText>
                <FontAwesomeIcon style={{ color: "black" }} icon={faSearch} />
              </InputGroupText>
            </InputGroupAddon>
            <FormInput
              className="border-0 SearchPlace"
              placeholder="Search..."
            />
          </InputGroup>
        </Nav>
        <Collapse open={this.state.collapseOpen} navbar className="Nav-2">
          <Nav navbar>
            <NavItem>
              <NavLink
                style={{ color: "black", paddingRight: 10 }}
                onClick={this.toggle}
                className="NavItem"
                active
                href="#"
              >
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ color: "black", paddingRight: 30 }}
                className="NavItem"
              >
                New Job
              </NavLink>
            </NavItem>
            {/* <Dropdown
              open={this.state.dropdownOpen}
              toggle={this.toggleDropdown}
            >
              <DropdownToggle
                style={{ color: "black" }}
                nav
                caret
                className="NavItem"
              >
                Dropdown
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another action</DropdownItem>
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </Dropdown> */}
            <NavbarBrand
              style={{ color: "black" }}
              className="NavItem"
              href="#"
            >
              Shards React
            </NavbarBrand>
            <Button pill theme="warning">
              Warning
            </Button>
            <Modal open={open} toggle={this.toggle}>
              <ModalHeader>Header</ModalHeader>
              <ModalBody>
                <Form>
                  <FormGroup>
                    <label htmlFor="#username">Username</label>
                    <FormInput id="#username" placeholder="Username" />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="#password">Password</label>
                    <FormInput
                      type="password"
                      id="#password"
                      placeholder="Password"
                    />
                  </FormGroup>
                  <Button pill theme="warning">
                    Warning
                  </Button>
                </Form>
              </ModalBody>
            </Modal>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
