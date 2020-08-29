pragma solidity >=0.4.22 <0.7.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
contract UMO {
    using SafeMath for uint256;
    enum Status { WAITING, COMPLETED, DISPUTED }
    struct Proposal { 
       string uuid;
       uint256 amount;
       address creator;
       Status status;
    }
    IERC20 DAI = IERC20(0xaB54Dfe43BbfAD8D6DF5E9fc88C1b976101bEd07);
    address private owner;
    uint256 public totalBalance;
    event OwnerSet(address indexed oldOwner, address indexed newOwner);

    mapping (string => Proposal )public ProposalMapping;
    modifier executioner(string memory uuid){
        require(msg.sender == owner||msg.sender == ProposalMapping[uuid].creator, "Invalid User");
        _;
    }
    modifier checkStatus(string memory uuid){
        require(ProposalMapping[uuid].status == Status.WAITING, "Invalid Request");
        _;
    }
    constructor() public {
        owner = msg.sender;
        emit OwnerSet(address(0), owner);
    }
    function AddProposal(uint amount, string memory uuid)public{
        require(DAI.balanceOf(msg.sender)>=amount, "Insufficient balance");
        require(DAI.allowance(msg.sender, address(this))>amount, "Insufficient approved Tokens");
        Proposal memory proposal = Proposal({
            uuid : uuid,
            amount : amount,
            status : Status.WAITING,
            creator: msg.sender
        });
        
        DAI.transferFrom(msg.sender, address(this), amount);
        totalBalance = totalBalance.add(amount);
        ProposalMapping[uuid] = proposal;
        
        
    }
    function makePayout (string  memory uuid, address reciver) public executioner(uuid) checkStatus(uuid){
        ProposalMapping[uuid].status = Status.COMPLETED;
        totalBalance = totalBalance.sub(ProposalMapping[uuid].amount);
        if (msg.sender == owner){
            ProposalMapping[uuid].status = Status.DISPUTED;
        }
        DAI.transfer(reciver, ProposalMapping[uuid].amount);
    }
    
}