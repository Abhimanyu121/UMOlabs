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
import { login } from "./services";
import { defaultAddress, SetWeb3 } from "./utils/Web3Connector";

export default class NavExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      collapseOpen: false,
      email: "",
      password: "",
      userAddress: "",
      loggedIn: false,
    };

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = { open: false };
    this.toggle = this.toggle.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.logout = this.logout.bind(this);
    this.getWeb3 = this.getWeb3.bind(this);
  }

  async getWeb3() {
    await SetWeb3();
    const userAddress = await defaultAddress();

    this.setState({
      userAddress: userAddress,
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

  async loginUser() {
    try {
      const resp = await login(this.state.email, this.state.password);
      if (resp) {
        console.log(resp);
        this.toggle();

        localStorage.setItem("loggedIn", true);
        localStorage.setItem("profile", resp);

        this.setState({ loggedIn: true });
      }
    } catch (error) {
      console.log("eroor", error);
    }
  }

  logout() {
    try {
      localStorage.setItem("loggedIn", false);
      localStorage.setItem("profile", {});

      this.setState({ loggedIn: false });
    } catch (error) {
      console.log("eroor", error);
    }
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
      <HashRouter>
      
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
                className="NavItem"
                active
                href="#"
              ><Link to='/'>
              Home
            </Link>
              </NavLink>
            </NavItem>
            {this.state.loggedIn ? (
              <div>
                <NavItem>
                  <NavLink
                    style={{ color: "black", paddingRight: 10 }}
                    onClick={this.logout} 
                    className="NavItem"
                    active
                    href="#"
                  >
                    Logout
                  </NavLink>
                </NavItem>
              </div>
            ) : (
              <div>
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
              </div>
            )}
            <NavItem>
              <NavLink
                style={{ color: "black", paddingRight: 30 }}
                className="NavItem"
              >
                <Link to='/new-job'>
                  New
                </Link>
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
            {this.state.userAddress ? (
              <Button pill theme="success">
                Connected
              </Button>
            ) : (
              <Button pill theme="warning" onClick={this.getWeb3}>
                Wallet
              </Button>
            )}
            <Modal open={open} toggle={this.toggle}>
              <ModalHeader>Login</ModalHeader>
              <ModalBody>
                <Form>
                  <FormGroup>
                    <label htmlFor="#username">Username</label>
                    <FormInput
                      id="#username"
                      placeholder="Username"
                      onChange={(e) => {
                        this.setState({ email: e.target.value });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="#password">Password</label>
                    <FormInput
                      type="password"
                      id="#password"
                      placeholder="Password"
                      onChange={(e) => {
                        this.setState({ password: e.target.value });
                      }}
                    />
                  </FormGroup>
                  <Button pill theme="warning" onClick={this.loginUser}>
                    Login
                  </Button>
                </Form>
              </ModalBody>
            </Modal>
          </Nav>
        </Collapse>
      </Navbar>
      </HashRouter>
    );
  }
}
