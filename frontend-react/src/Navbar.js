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
import Web3Connect from "web3connect";
import Torus from "@toruslabs/torus-embed";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import {GetWeb3, SetWeb3, GetContract, Approve, GetProposal} from "./Utils/Web3Connector";
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
      <Navbar type="dark" theme="primary" expand="md">
        <NavbarToggler onClick={this.toggleNavbar} />
        <Nav navbar className="ml-auto">
          <InputGroup size="sm" className="Search" seamless>
            <InputGroupAddon type="prepend">
              <InputGroupText>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroupText>
            </InputGroupAddon>
            <FormInput className="border-0" placeholder="Search..." />
          </InputGroup>
        </Nav>
        <Collapse open={this.state.collapseOpen} navbar className="Nav-2">
          <Nav navbar>
            <NavItem>
              <NavLink
                onClick={this.toggle}
                className="NavItem"
                active
                href="#"
              >
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="NavItem">New Project</NavLink>
            </NavItem>
            <NavItem>
            <Web3Connect.Button
                network="kovan" // optional
                providerOptions={{
                  walletconnect: {
                    package: WalletConnectProvider, // required
                    options: {
                      infuraId: "311ef590f7e5472a90edfa1316248cff" // required
                    }
                  },
                  torus: {
                    package: Torus, // required
                    options: {
                      enableLogging: false, // optional
                      buttonPosition: "bottom-left", // optional
                      buildEnv: "production", // optional
                      showTorusButton: true, // optional
                      enabledVerifiers: { // optional
                        google: true // optional
                      }
                    }
                  },
                }}
                onConnect={async (provider) => {
                 await SetWeb3(provider);
                 console.log(GetWeb3());
                 console.log(await GetContract())
                 await Approve("100000")
                }}
                onClose={() => {
                  console.log("Web3Connect Modal Closed"); // modal has closed
                }}
              />;
            </NavItem>
            <Dropdown
              open={this.state.dropdownOpen}
              toggle={this.toggleDropdown}
            >
              <DropdownToggle nav caret className="NavItem">
                Dropdown
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another action</DropdownItem>
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <NavbarBrand className="NavItem" href="#">
              Shards React
            </NavbarBrand>
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
