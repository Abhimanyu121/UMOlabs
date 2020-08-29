import UmoContract from "../contracts/UMO.json";
import IERC20 from "../contracts/IERC20.json";
import Web3 from "web3";
var web3;
var instance;
export const SetWeb3 = async (provider)=>{
    try {
        // const provider = await Web3Connect.ConnectToInjected();
        // Get network provider and web3 instance.
        const _web3 = new Web3(provider);
        web3 = _web3
        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        console.log(web3)
        return web3;
        
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
}
export const GetWeb3 = () =>{
    return web3;
}

export const GetContract = async () =>{
    try {
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = UmoContract.networks[networkId];
        instance = new web3.eth.Contract(
          UmoContract.abi,
          deployedNetwork && deployedNetwork.address,
        );
  
        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        return instance;
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
}
export const GetProposal = async (uuid) => {
  const _web3 = new  Web3(new Web3.providers.WebsocketProvider("wss://kovan.infura.io/ws/v3/311ef590f7e5472a90edfa1316248cff"));
  const networkId = await _web3.eth.net.getId();
  const deployedNetwork = UmoContract.networks[networkId];
  const instance = new _web3.eth.Contract(
    UmoContract.abi,
    deployedNetwork && deployedNetwork.address,
  );
  let proposal = await instance.methods.ProposalMapping(uuid).call();
  console.log(proposal);
  return proposal;
}
export const GetBalance = async (uuid) => {
  const _web3 = new  Web3(new Web3.providers.WebsocketProvider("wss://kovan.infura.io/ws/v3/311ef590f7e5472a90edfa1316248cff"));
  const networkId = await _web3.eth.net.getId();
  const deployedNetwork = UmoContract.networks[networkId];
  const instance = new _web3.eth.Contract(
    UmoContract.abi,
    deployedNetwork && deployedNetwork.address,
  );
  let balance = await instance.methods.totalBalance().call();
  console.log(balance);
  return balance;
}

export const AddProposal = async (uuid,amount) => {
  const accounts = await web3.eth.getAccounts();
  let resp = await instance.methods.AddProposal(amount, uuid).send({from:accounts[0]});
  console.log(resp);
  return resp;
}
export const MakePayout = async (uuid,address) => {
  const accounts = await web3.eth.getAccounts();
  let resp = await instance.methods.makePayout(uuid , address).send({from:accounts[0]});
  console.log(resp);
  return resp;
}
export const Approve = async (amount) => {
  const accounts = await web3.eth.getAccounts();
  const erc20 = new web3.eth.Contract(
    IERC20.abi,
    42 && "0xaB54Dfe43BbfAD8D6DF5E9fc88C1b976101bEd07",
  );
  console.log(web3.utils.toChecksumAddress(instance._address));
  let resp = await erc20.methods.approve(web3.utils.toChecksumAddress(instance._address),amount).send({from:accounts[0]});
  console.log(resp);
  return resp;
}