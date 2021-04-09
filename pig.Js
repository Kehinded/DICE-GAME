var scores, roundScores, activePlayer, lifes;
document.querySelector('.btn-new').disabled = true ;
document.querySelector('.btn-roll').disabled = true;
document.querySelector('.btn-hold').disabled = true;
document.querySelector('.btn-reset-0').style.display = 'none';
document.querySelector('.btn-reset-1').style.display = 'none';
document.querySelector('#dice1').style.display = 'none';
document.querySelector('#dice2').style.display = 'none';
document.querySelector('#score-0').textContent = '0';
document.querySelector('#score-1').textContent = '0';
document.querySelector('#current-0').textContent = '0';
document.querySelector('#current-1').textContent = '0';
document.querySelector('.show-active').style.display = 'none';
document.querySelector('.player-0-page').classList.remove('active');
scores = [0,0];
lifes = [1,1]
roundScores = 0;
activePlayer = 0;
let winningValue;
document.querySelector('.life-0').textContent = lifes[0];
document.querySelector('.life-1').textContent = lifes[1];
//load event listeners
function setEventlisteners(){
//reset game
document.querySelector('.btn-reset-0').addEventListener('click', function(e){
    e.preventDefault();
    lifes[0] -= 1
    init();
    document.querySelector('.life-0').textContent = lifes[0];
})
document.querySelector('.btn-reset-1').addEventListener('click', function(e){
    e.preventDefault();
    lifes[1] -= 1
    init();
document.querySelector('.life-1').textContent = lifes[1];
})
//btn-hold
document.querySelector('.btn-hold').addEventListener('click', function(){
    holdPlay();
    changePlayer();
    
})
document.addEventListener('keypress', function(e){
    if(e.keyCode === 104 ){
        holdPlay();
        changePlayer();
    }
})
//add event lisstener to roll dice
document.querySelector('.btn-roll').addEventListener('click', function(){
   rollDice();
})
document.addEventListener('keypress', function(e){
    if(e.keyCode === 100){
        rollDice();
    }
})
//reload or restart game
document.querySelector('.btn-new').addEventListener('click', function(){
    window.location.reload(confirm('are you sure'));
})

}
  // start game
  document.querySelector('.play-game').addEventListener('click', function(e){
    e.preventDefault();
    playGame();
    
})
document.addEventListener('keypress', function(e){
    if(e.keyCode === 13){playGame();}
})
function playGame(){
    const firstPlay =   document.querySelector('.playername1').value;
    const secondPlay =   document.querySelector('.playername2').value;
    const winningVal = document.querySelector('.winning-values').value;
    if(firstPlay === '' || secondPlay === '' ){
        showMessage('Please input player name(s)')
    }
    else{
        //set winning value
    if(winningVal){
        winningValue = winningVal;
    }
    else{ winningValue = 100};
    //end of winning value set
        document.querySelector('#name-0').textContent = firstPlay;
        document.querySelector('#name-1').textContent = secondPlay;
        document.querySelector('.playername1').disabled = true;
         document.querySelector('.playername2').disabled = true;
         document.querySelector('.playername1').value = '';
         document.querySelector('.playername2').value = '';
        document.querySelector('.btn-new').disabled = false;
        document.querySelector('.btn-reset-0').disabled = false;
        document.querySelector('.btn-new').innerHTML = ` NEW GAME`;
        document.querySelector('.btn-roll').disabled = false;
        document.querySelector('.btn-hold').disabled = false;
        document.querySelector('.details').style.display = 'none';
        document.querySelector('.show-active').style.display = 'block';
        document.querySelector('.player-' + activePlayer + '-page').classList.toggle('active');
         const activeName = document.querySelector('#name-' + activePlayer).textContent;
        document.querySelector('.title').textContent = `first player to get ${winningValue} points win`;
        document.querySelector('.title').style.color = 'white';
        document.querySelector('.title').classList.toggle('title-move');
        document.querySelector('.title').classList.toggle('display-3');
        document.querySelector('.title').classList.toggle('display-5');
        document.querySelector('.btn-reset-0').style.display = 'block';
        // document.querySelector('.btn-reset-1').style.display = 'block';
        document.querySelector('.go-up').style.display = 'none';
        document.querySelector('.show-active').textContent = `${activeName} is active`;
        document.querySelector('.header-dice').classList.toggle('black');
        document.querySelector('.details').classList.toggle('black');
        document.querySelector('.col-md-2').classList.toggle('heightAttain');
        document.querySelector('form').style.display = 'none';
        setEventlisteners();
    }
}

//show message
function showMessage(msg){
    //create element
    const msgPop = document.createElement('div');
    msgPop.className = 'msg-pop alert alert-warning lead text-white';
    msgPop.style.backgroundColor = 'red';
    msgPop.appendChild(document.createTextNode(msg));
    const parent = document.querySelector('.parent');
    const child = document.querySelector('.child');
    parent.insertBefore(msgPop, child);
    setTimeout(function(){document.querySelector('.msg-pop').remove();}, 4000)
}

//function roll dice
function rollDice(){
    //random number for dice
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
//display dice value
    var diceDOM1 = document.querySelector('#dice1');
    var diceDOM2 = document.querySelector('#dice2');
    diceDOM1.style.display = 'block';
    diceDOM2.style.display = 'block';
    diceDOM1.src = "/Img/dice-" + dice1 + '.png';
    diceDOM2.src = "/Img/dice-" + dice2 + '.png';
    //double 6 comming in
// if(dice1 && dice2 !== 6 || dice2 && dice1 !== 6){
//     scores[activePlayer] = 0;
//     document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
//     changePlayer();
// }
// add to lifes
//add to lifes with double 6
if(dice1 === 6 && dice2 === 6){
    lifes[activePlayer] += 1;
    document.querySelector('.life-' + activePlayer).textContent = lifes[activePlayer];
    document.querySelector('.btn-reset-' + activePlayer).disabled = false;
    const winnerName = document.querySelector('#name-' + activePlayer).textContent;
    document.querySelector('.msgpop-main').style.display = 'block';
    document.querySelector('.msgpop-main').textContent = `YUPPY!! DOUBLE 6, ONE LIFE ADDED TO ${winnerName} LIFE(S)`
        //color of display warning
    if(activePlayer === 0){document.querySelector('.msgpop-main').style.color = 'blue'}
    else{document.querySelector('.msgpop-main').style.color = 'red'}
}
//update round score
if(dice1 !== 1 && dice2 !== 1){
    roundScores = roundScores + dice1 + dice2;
    document.querySelector('#current-' + activePlayer). textContent = roundScores;
}
else{ 
    changePlayer();
}
}

//function hold
function holdPlay(){
    scores[activePlayer] += roundScores;
    const winnerName = document.querySelector('#name-' + activePlayer).textContent;
    //display in scores
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    if(scores[activePlayer] >= 50/100 * winningValue){
        document.querySelector('.msgpop-main').style.display = 'block';
        //const winnerName = document.querySelector('#name-' + activePlayer).textContent;
        document.querySelector('.msgpop-main').textContent = `${winnerName} points is above half of ${winningValue} points`
        //color of display warning
    if(activePlayer === 0){document.querySelector('.msgpop-main').style.color = 'blue'}
    else{document.querySelector('.msgpop-main').style.color = 'red'}
    }
    //notify 2/3 0f value
    if(scores[activePlayer] >= 75/100 * winningValue){
        document.querySelector('.msgpop-main').style.display = 'block';
       // const winnerName = document.querySelector('#name-' + activePlayer).textContent;
        document.querySelector('.msgpop-main').textContent = `${winnerName} points is above 3/4 0f ${winningValue} points`
        //color of display warning
    if(activePlayer === 0){document.querySelector('.msgpop-main').style.color = 'blue'}
        else{document.querySelector('.msgpop-main').style.color = 'red'}
    }
     //notify almost win
     if(scores[activePlayer] >= winningValue - 10){
        document.querySelector('.msgpop-main').style.display = 'block';
        //const winnerName = document.querySelector('#name-' + activePlayer).textContent;
        document.querySelector('.title').textContent = `Great, ${winnerName} about to get ${winningValue} points`
        if(activePlayer === 0){document.querySelector('.title').style.color = 'blue'}
        else{document.querySelector('.title').style.color = 'red'}
    }
    //declare winner
     if(scores[activePlayer] >= winningValue){
         const winningPoint = document.querySelector('#score-' + activePlayer).textContent;
        //const winnerName = document.querySelector('#name-' + activePlayer).textContent;
        document.querySelector('.title').textContent = winnerName + ` won with ${winningPoint} points`;
        document.querySelector('.title').style.color = 'white';
        document.querySelector('#name-' + activePlayer).textContent += ' WON';
        document.querySelector('#name-' + activePlayer).style.color = 'white';
        document.querySelector('.btn-roll').disabled = true;
        document.querySelector('.btn-hold').disabled = true;
        document.querySelector('.btn-new').style.backgroundColor = 'navy';
        document.querySelector('.parent').style.display = 'none';
        document.querySelector('.btn-new').classList.toggle('attract')
        document.querySelector('.show-active').style.display = 'none';
        document.querySelector('.msgpop-main').style.display = 'none';
        document.querySelector('.title').classList.toggle('display-3');
        document.querySelector('.player-' + activePlayer + '-page').classList.toggle('active');
        document.querySelector('.btn-reset-0').disabled  = true;
        document.querySelector('.btn-reset-1').disabled  = true;
        document.querySelector('.col-md-2').classList.toggle('heightAttain');
        if(activePlayer === 0){
            document.querySelector('#name-0').style.background = 'blue';
            document.querySelector('.header-dice').style.background = 'blue';
            document.querySelector('.middle-part').style.background = 'blue';
            document.querySelector('.down-part').style.background = 'blue';
            document.querySelector('.title').style.background = 'blue';}
        else{document.querySelector('.header-dice').style.background = 'red';
        document.querySelector('.middle-part').style.background = 'red';
        document.querySelector('.down-part').style.background = 'red';
        document.querySelector('.title').style.background = 'red';
        document.querySelector('#name-1').style.background = 'red';
    }
    }
}
// start new game by reset
function init(){
    const winnerName = document.querySelector('#name-' + activePlayer).textContent;
    document.querySelector('.msgpop-main').textContent = `${winnerName} reset the game but still racing to ${winningValue} points`
    document.querySelector('.title').textContent = '!! GAME RESET BY ' + winnerName + ' !!';
    document.querySelector('.title').style.color = 'white';
    if(activePlayer === 0){document.querySelector('.msgpop-main').style.color = 'blue'}
        else{document.querySelector('.msgpop-main').style.color = 'red'}
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    scores = [0,0]; 
    roundScores = 0;
    document.querySelector('#dice1').style.display = 'none';
document.querySelector('#dice2').style.display = 'none';
document.querySelector('#score-0').textContent = '0';
document.querySelector('#score-1').textContent = '0';
document.querySelector('#current-0').textContent = '0';
document.querySelector('#current-1').textContent = '0';
const activeName = document.querySelector('#name-' + activePlayer).textContent;
document.querySelector('.show-active').textContent = `${activeName} is active`;
document.querySelector('.player-0-page').classList.toggle('active');
document.querySelector('.player-1-page').classList.toggle('active');
if(activePlayer === 0){document.querySelector('.attract1').style.color = 'blue'}
    else{document.querySelector('.attract1').style.color = 'red'}
    // disable reset button
if(lifes[0] <= 0 ){document.querySelector('.btn-reset-0').disabled = true;}
if(lifes[1] <= 0 ){document.querySelector('.btn-reset-1').disabled = true;}
 //show reset for each player
 if(activePlayer === 0){document.querySelector('.btn-reset-0').style.display = 'block'}
 else {document.querySelector('.btn-reset-1').style.display = 'block';}
 if(activePlayer === 0){document.querySelector('.btn-reset-1').style.display = 'none'}
 else {document.querySelector('.btn-reset-0').style.display = 'none';}
}
//change to next player
function changePlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; 
roundScores = 0;
 document.querySelector('#current-0').textContent = '0';
 document.querySelector('#current-1').textContent = '0';
 document.querySelector('.player-0-page').classList.toggle('active');
 document.querySelector('.player-1-page').classList.toggle('active');
 setTimeout(function(){
    document.querySelector('#dice1').style.display = 'none';
    document.querySelector('#dice2').style.display = 'none';
 }, 100)
   const activeName = document.querySelector('#name-' + activePlayer).textContent;
        document.querySelector('.show-active').textContent = `${activeName} is active`
        //show reset for each player
        if(activePlayer === 0){document.querySelector('.btn-reset-0').style.display = 'block'}
        else {document.querySelector('.btn-reset-1').style.display = 'block';}
        if(activePlayer === 0){document.querySelector('.btn-reset-1').style.display = 'none'}
        else {document.querySelector('.btn-reset-0').style.display = 'none';}
        //set color for active player display
    if(activePlayer === 0){document.querySelector('.attract1').style.color = 'blue'}
    else{document.querySelector('.attract1').style.color = 'red'}
}

// document.addEventListener('keypress', function(e){
//     console.log(e);
// })
