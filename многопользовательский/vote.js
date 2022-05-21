web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

web3.eth.defaultAccount = web3.eth.accounts[0];
web3.eth.handleRevert = true;

var VotingContract = web3.eth.contract([
	{
		"constant": true,
		"inputs": [],
		"name": "ViewWinner",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "ClearVoters",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "ViewVoters",
		"outputs": [
			{
				"name": "",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "ViewResults",
		"outputs": [
			{
				"name": "",
				"type": "uint256[16]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_GunId",
				"type": "uint256"
			},
			{
				"name": "flag",
				"type": "bool"
			}
		],
		"name": "Vote",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]);

var Voting = VotingContract.at('0xAB66016813D1214C69e3dEDEF73fD39B505EEb06');
document.addEventListener("DOMContentLoaded", function(event) {
	var button = document.createElement("button");
	button.innerHTML = "Обнулить результаты";
	var body = document.getElementById("maincontainer");
	body.appendChild(button);
	button.addEventListener ("click", function() {
		Voting.ClearVoters(function(error, result){
			if(!error){
				console.log(result);
				window.location.reload();
			}
			else
				console.error(error);
		})
	});
});

document.addEventListener("DOMContentLoaded", function(event) {
	var button = document.createElement("button");
	button.innerHTML = "Посмотреть голосовавших";
	var body = document.getElementById("maincontainer");
	body.appendChild(button);
	button.addEventListener ("click", function() {
		Voting.ViewVoters(function(error, result){
			if(!error){
				
				var list = document.createElement('p');
				li = document.createElement('h1');
				li.innerHTML = 'Список Голосовавших';
				li.ondblclick = function(){this.parentNode.removeChild(this);}
				list.appendChild(li);       
				for (i=0; i<result.length; i++){
					li = document.createElement('li');
					li.innerHTML = i+1 + '. ' + result[i];
					li.ondblclick = function(){this.parentNode.removeChild(this);}
					list.appendChild(li);       
				}
				body.appendChild(list);
				console.log(result);
			}
			else
				console.error(error);
		})
	});
});

document.addEventListener("DOMContentLoaded", function(event) {
	var button = document.createElement("button");
	button.innerHTML = "Победитель голосования";
	var body = document.getElementById("maincontainer");
	body.appendChild(button);
	button.addEventListener ("click", function() {
		Voting.ViewWinner(function(error, result){
			if(!error){
				let flag = result[2];
				if (flag){
					let id = result[0];
					id = Number(id['c']) + 1;
					let max = result[1];
					let winner = document.getElementById(id).textContent;
					alert("Победитель: " + winner + " с количеством голосов: " + max['c']);
					console.log(result);
					window.location.reload();
				}
				else
					alert("Победитель не найден! Нужно больше голосов");
			}
			else
				console.error(error);
		})
	});
});

Voting.ViewResults(function(error, result){
	if(!error){
		let vote_places = [...document.getElementById("valuerow1").children, ...document.getElementById("valuerow2").children,...document.getElementById("valuerow3").children];
		let arr = result.map(res => res.c[0])
		for(let i = 0; i < vote_places.length; i++){
			vote_places[i].innerHTML = arr[i];
		}
	}
	else
		console.error(error);
});

function voteBTN() {
	var flag = false;
	//alert("Клавиша нажата!");
	var gun = document.getElementById("selectgun").value;
	Voting.Vote(gun, flag, function(error, result){
		if(!error){
			alert("Спасибо за Ваш голос");
			console.log(result);
			window.location.reload();
		}
		else
			alert("Вы уже голосовали!");
			console.error(error);
	});
}