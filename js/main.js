'use require'
cardList =[];
const res = fetch('https://gist.githubusercontent.com/darthneel/00e8966f45ef2b64652985d78d11443f/raw/c0935c96ae64d23c2b3cf4501f26a30a3027a35d/deck_of_cards.json')
.then( res=> res.json())
.then(res => {cardList = res})
.then(res => addScore())
players = document.querySelectorAll('.players');
let numberOfPlayers;
playerList = [];
gamestate = true;

while (typeof(numberOfPlayers)!='number'||isNaN(numberOfPlayers)||parseInt(numberOfPlayers)<2||parseInt(numberOfPlayers)>4) {
  numberOfPlayers = parseInt(prompt('Type numbe of players:'));
}

class Player {
  constructor(name,id) {
    this.name = name;
    this.id = id;
    this.score = 0;
  }
  cards=[];
}

for (var i = 0; i < numberOfPlayers; i++) {
  players[i].classList.remove('hidden');
  while (document.querySelectorAll('.playername')[i].innerText == 'Playername'||document.querySelectorAll('.playername')[i].innerText == '') {
    document.querySelectorAll('.playername')[i].innerText = prompt('Type player '+[i+1]+' name:')
  }
  playerList.push(new Player(document.querySelectorAll('.playername')[i].innerText,i+1))
}

currentPlayer = playerList[0];
currentPlayerDOM = document.querySelector('.currentplayer');
currentPlayerDOM.innerText = 'Current player: ' + currentPlayer['name'];
playerHand = currentPlayer['cards'];

function addScore(){
for (var i = 0; i < cardList.length; i++) {
  if(!isNaN(parseInt(cardList[i]['value']))){
    cardList[i]['score'] = cardList[i]['value'];
  }else if (cardList[i]['value'] == 'A') {
cardList[i]['score'] = 11
}else  {
cardList[i]['score'] = 10;
}}
}

function hit() {
  if (gamestate) {
    if (playerHand.length<10&&currentPlayer['score']<21) {
      chosenCard = Math.floor(Math.random()*cardList.length);
      playerHand.push(cardList[chosenCard]);
      currentPlayer['score'] += cardList[chosenCard]['score'];
      cardList.splice(chosenCard,1);
    }
    drawCards();
  }
}

function drawCards(){
  let src = document.querySelector('.player'+currentPlayer['id']);
while (src.children.length>2) {
  src.removeChild(src.children[src.children.length-1])
}

  for (var i = 0; i < playerHand.length; i++) {
    let img = document.createElement('img');
    img.src = 'img/'+playerHand[i]['value']+'_of_'+playerHand[i]['suit']+'.svg';
    img.classList.add('cardsof'+currentPlayer['id'])
    src.appendChild(img);
  }
document.querySelector('.player'+currentPlayer['id']).children[1].innerText = currentPlayer['score']
nextPlayer();
}

function nextPlayer(){
  if (gamestate) {
    typeWinner();
  if (playerList.length>1) {
    if (currentPlayer['id']<playerList.length) {
      currentPlayer = playerList[currentPlayer['id']]
    }
    else if (currentPlayer['id']==playerList.length) {
      currentPlayer = playerList[0]
    }
    currentPlayerDOM.innerText = 'Current player: ' + currentPlayer['name'];
    playerHand = currentPlayer['cards'];
  }else {
    currentPlayer = playerList[0]
  }
  }
  }

function typeWinner(){
  let currentWinner = new Player('adam',99);
potentialWinners = playerList.filter((a)=>a['score']<22)
console.log(potentialWinners);
if (potentialWinners.length==0) {
  console.log('no winner');
  gamestate = false;
}else if (potentialWinners.length==1) {
  currentWinner = potentialWinners[0];
  console.log('Winner is: '+potentialWinners[0]['name']);
  gamestate = false;
}else{
for (var i = 0; i < potentialWinners.length; i++) {

  if (potentialWinners[i]['score']==21) {
    currentWinner=potentialWinners[i];
    gamestate = false;
    console.log('winner is '+currentWinner['name']);

  }
  if (potentialWinners[i]['score']>currentWinner['score']) {
    currentWinner=potentialWinners[i];
  }
}
}
}
