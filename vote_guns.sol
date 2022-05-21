pragma solidity 0.4.26;
contract Voting {
    address[] VoterAddrs;
    uint[16] Votes_mas;
	
    function ClearVoters() public {
        delete VoterAddrs;
        delete Votes_mas;
    }
    
    function ViewResults() public view returns(uint[16]){
        return Votes_mas;
    }
    
    function Vote(uint _GunId, bool flag) public{
        if (flag){
            for (uint i=0; i<VoterAddrs.length; i++) {
                require(msg.sender != VoterAddrs[i],"You have already Voted");
            }
            Votes_mas[_GunId] = Votes_mas[_GunId] + 1;
            VoterAddrs.push(msg.sender);
        } 
        else {
            Votes_mas[_GunId] = Votes_mas[_GunId] + 1;
            VoterAddrs.push(msg.sender);
        }
    }
    
    function ViewVoters() public view returns(address[]){
        return VoterAddrs;
    }
    
    function ViewWinner() public view returns(uint, uint, bool){
        uint max = 0;
        uint id;
        bool flag = true;
        for (uint i=0; i<Votes_mas.length; i++) {
            if (max < Votes_mas[i]){
                max = Votes_mas[i];
                id = i;
            }
        }
        for (i=0; i<Votes_mas.length; i++) {
            if (max == Votes_mas[i] && i != id){
                flag = false;
            }
        }
        return (id, max, flag);
    }
}