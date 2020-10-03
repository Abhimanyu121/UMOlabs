import React from "react";
import { faSearch, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
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
import {
  faHome,
  faPlus,
  faWallet,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

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
      open: false,
    };

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.toggle = this.toggle.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
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

  loginUser() {
    login(this.state.email, this.state.password).then((resp) => {
      console.log(resp);
      this.toggle();
      if(JSON.parse(resp).profile != undefined) {
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("profile", resp);
        this.setState({ loggedIn: true });
      }
      else {
        alert('Incorrect Details')
      }
    }).catch((error) => {
      alert('Incorrect Details')
    })
  }

  logoutUser() {
    try {
      localStorage.setItem("loggedIn", false);
      localStorage.setItem("profile", null);
      console.log("Loggin out");
      console.log(localStorage.getItem("loggedIn"));
      console.log(localStorage.getItem("profile"));
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

  componentDidMount() {
    const isLoggedIn = localStorage.getItem("loggedIn");
    console.log("isLoggedIn", isLoggedIn);
    if (isLoggedIn == "true") {
      console.log("true", localStorage.getItem("loggedIn"));
      this.setState({ loggedIn: true });
    } else {
      console.log("false", localStorage.getItem("loggedIn"));
      this.setState({ loggedIn: false });
    }
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
              {this.state.loggedIn ? (
                <div>
                  <NavItem>
                    <NavLink
                      style={{ color: "black", paddingRight: 10 }}
                      onClick={this.logoutUser}
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
                      style={{ color: "black", paddingRight: 20 }}
                      onClick={this.toggle}
                      className="NavItem"
                      active
                      href="#"
                      className="hvr-icon-pop"
                    >
                      Login{" "}
                      <FontAwesomeIcon
                        icon={faUser}
                        style={{ marginLeft: 3 }}
                        className="hvr-icon"
                      />
                    </NavLink>
                  </NavItem>
                </div>
              )}
              <NavItem>
                <NavLink className="NavItem" active href="#">
                  <Link
                    style={{
                      color: "black",
                      paddingRight: 20,
                      textDecorationLine: "none",
                    }}
                    className="NavItem hvr-icon-pop"
                    to="/"
                  >
                    Home{" "}
                    <FontAwesomeIcon
                      icon={faHome}
                      style={{ marginLeft: 3 }}
                      className="hvr-icon"
                    />
                  </Link>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink className="NavItem hvr-icon-pop">
                  <Link
                    style={{
                      color: "black",
                      paddingRight: 20,
                      textDecorationLine: "none",
                    }}
                    to="/new-job"
                    className="NavItem hvr-icon-pop"
                  >
                    New Project
                    <FontAwesomeIcon
                      icon={faPlus}
                      style={{ marginLeft: 3 }}
                      className="hvr-icon"
                    />
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
                <Button pill theme="warning" className="hvr-icon-pop">
                  Connected{" "}
                  <FontAwesomeIcon
                    className="hvr-icon"
                    icon={faUserCircle}
                    style={{ marginLeft: 3 }}
                  />
                </Button>
              ) : (
                <Button
                  pill
                  theme="warning"
                  className="hvr-icon-pop"
                  onClick={this.getWeb3}
                >
                  Wallet{" "}
                  <FontAwesomeIcon
                    className="hvr-icon"
                    icon={faWallet}
                    style={{ marginLeft: 3 }}
                  />
                </Button>
              )}
              <Modal size="lg" backdrop="false" open={open} toggle={this.toggle}>
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
