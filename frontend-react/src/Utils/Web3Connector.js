import UmoContract from "../contracts/UMO.json";
import IERC20 from "../contracts/IERC20.json";
import Onboard from "bnc-onboard";
import Web3 from "web3";

let web3;
var instance;
const rpcUrl = "https://kovan.infura.io/v3/8b8d0c60bfab43bc8725df20fc660d15";

const onboard = Onboard({
  dappId: "052b3fe9-87d5-4614-b2e9-6dd81115979a", // [String] The API key created by step one above
  networkId: 42, // [Integer] The Ethereum network ID your Dapp uses.
  subscriptions: {
    wallet: (wallet) => {
      web3 = new Web3(wallet.provider);
    },
  },
  darkMode: true,
  walletSelect: {
    wallets: [
      { walletName: "metamask" },
      {
        walletName: "portis",
        apiKey: "d7d72646-709a-45ab-aa43-8de5307ae0df",
      },
      {
        walletName: "trezor",
        appUrl: "https://reactdemo.blocknative.com",
        email: "aaron@blocknative.com",
        rpcUrl,
      },
      { walletName: "coinbase" },
      {
        walletName: "ledger",
        rpcUrl,
      },
      {
        walletName: "walletConnect",
        infuraKey: "d5e29c9b9a9d4116a7348113f57770a8",
        // rpc: {
        //   [networkId]: rpcUrl,
        // },
      },
      { walletName: "dapper" },
      { walletName: "status" },
      { walletName: "walletLink", rpcUrl },
      { walletName: "fortmatic", apiKey: "pk_test_886ADCAB855632AA" },
      { walletName: "unilogin" },
      { walletName: "torus" },
      { walletName: "squarelink", apiKey: "87288b677f8cfb09a986" },
      { walletName: "authereum", disableNotifications: true },
      { walletName: "trust", rpcUrl },
      { walletName: "opera" },
      { walletName: "operaTouch" },
      { walletName: "imToken", rpcUrl },
    ],
  },
});



export const SetWeb3 = async (provider) => {
  try {
    await onboard.walletSelect();
    await onboard.walletCheck();
    await GetContract()
  } catch (error) {
    // Catch any errors for any of the above operations.
    alert(
      `Failed to load web3, accounts, or contract. Check console for details.`
    );
    console.error(error);
  }
};

export const defaultAddress = async () => {
  if (!web3) {
    await SetWeb3();
  }
  const currentState = onboard.getState();
  return currentState.address;
};

export const getBalance = (address) => {
  return web3.eth.getBalance(address);
};

export const GetWeb3 = async () => {
  if (!web3) {
    await SetWeb3();
  }
  return web3;
};

export const GetContract = async () => {
  try {
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = UmoContract.networks[networkId];
    instance = new web3.eth.Contract(
      UmoContract.abi,
      deployedNetwork && deployedNetwork.address
    );

    // Set web3, accounts, and contract to the state, and then proceed with an
    // example of interacting with the contract's methods.
    return instance;
  } catch (error) {
    // Catch any errors for any of the above operations.
    alert(
      `Failed to load web3, accounts, or contract. Check console for details.`
    );
    console.error(error);
  }
};

export const GetProposal = async (uuid) => {
  const _web3 = new Web3(
    new Web3.providers.WebsocketProvider(
      "wss://kovan.infura.io/ws/v3/311ef590f7e5472a90edfa1316248cff"
    )
  );
  const networkId = await _web3.eth.net.getId();
  const deployedNetwork = UmoContract.networks[networkId];
  const instance = new _web3.eth.Contract(
    UmoContract.abi,
    deployedNetwork && deployedNetwork.address
  );
  let proposal = await instance.methods.ProposalMapping(uuid).call();
  console.log(proposal);
  return proposal;
};

export const GetBalance = async (uuid) => {
  const _web3 = new Web3(
    new Web3.providers.WebsocketProvider(
      "wss://kovan.infura.io/ws/v3/311ef590f7e5472a90edfa1316248cff"
    )
  );
  const networkId = await _web3.eth.net.getId();
  const deployedNetwork = UmoContract.networks[networkId];
  const instance = new _web3.eth.Contract(
    UmoContract.abi,
    deployedNetwork && deployedNetwork.address
  );
  let balance = await instance.methods.totalBalance().call();
  console.log(balance);
  return balance;
};

export const AddProposal = async (uuid, amount) => {
  if(!web3){
    await GetWeb3()
  }
  const accounts = await web3.eth.getAccounts();
  let resp = await instance.methods
    .AddProposal(amount, uuid)
    .send({ from: accounts[0] });
  console.log(resp);
  return resp;
};

export const MakePayout = async (uuid, address) => {
  const accounts = await web3.eth.getAccounts();
  let resp = await instance.methods
    .makePayout(uuid, address)
    .send({ from: accounts[0] });
  console.log(resp);
  return resp;
};

export const Approve = async (amount) => {
  const accounts = await web3.eth.getAccounts();
  const erc20 = new web3.eth.Contract(
    IERC20.abi,
    42 && "0xaB54Dfe43BbfAD8D6DF5E9fc88C1b976101bEd07"
  );

  let resp = await erc20.methods
    .approve(web3.utils.toChecksumAddress(instance._address), amount)
    .send({ from: accounts[0] });
  console.log(resp);
  return resp;
};
