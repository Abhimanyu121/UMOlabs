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
} from "shards-react";
import Web3Connect from "web3connect";
import Torus from "@toruslabs/torus-embed";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import {GetWeb3, SetWeb3, GetContract, Approve, GetProposal} from "./Utils/Web3Connector";
import "./Navbar.css";
export default class NavExample extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);

    this.state = {
      dropdownOpen: false,
      collapseOpen: false,
    };
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
              <NavLink className="NavItem" active href="#">
                Active
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="NavItem" href="#">
                Disabled
              </NavLink>
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
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
