// Selecting  Element
const selectBox = document.querySelector('.select-box'),
selectXBtn = selectBox.querySelector('.playerX'),
selectOBtn = selectBox.querySelector('.playerO'),
board = document.querySelector('.board'),
allBox = document.querySelectorAll('section span'),
players = document.querySelector('.players'),
resultBox = document.querySelector('.result-box'),
winText = resultBox.querySelector('.win-text'),
replayBtn = resultBox.querySelector('.replay-btn');



window.onload = () => {
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute('onclick', 'clickedBox(this)');
    }

    selectXBtn.onclick = () => {
        selectBox.classList.add('hide');
        board.classList.add('show'); 
    }

    selectOBtn.onclick = () => {
        selectBox.classList.add('hide');
        board.classList.add('show'); 
        players.setAttribute('class', 'players active player');
    }
}

// Variable store class name for X and O and boolean flag to control bot's turn
let playerXIcon = "fa-solid fa-x";
let playerOIcon = "fa-regular fa-circle";
let playerSign = 'X'; 
let runBot = true; 


// User click function
function clickedBox(element) {
    // This will check if the player element has the class 'player'
   if(players.classList.contains('player')) {
        element.innerHTML = `<i class='fa-regular fa-circle o-icon'></i>`; 
        players.classList.remove('active');
        playerSign = 'O'; 
        element.setAttribute('id', playerSign);
    }else{
    element.innerHTML = `<i class='fa-solid fa-x x-icon'></i>`;
    players.classList.add('active');
    element.setAttribute('id', playerSign);
   }

   selectWinner();
   players.style.pointerEvents = 'none'; // Disable user clicks on players element
   element.style.pointerEvents = 'none'; // Disable user clicks on the clicked box

   // Delay time for computer
   let randomDelayTime = ((Math.random() * 1000) + 200).toFixed(); 
   setTimeout(() => {
    bot(runBot); // calling bot function
   }, randomDelayTime);
}   

// Computer click function
function bot (runBot) {
    // Function to simulate the bot's turn
    if (runBot){
        playerSign = 'O';
        let array = [];  // Create an empty array to store unselected boxes
        for (let i = 0; i < allBox.length; i++) {
            if(allBox[i].childElementCount === 0) { // if span has no child element
                array.push(i); // insert unselected box inside array
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)]; // bot will select random box
        if(array.length > 0) {
            if(players.classList.contains('player')) {
                allBox[randomBox].innerHTML = `<i class='${playerXIcon}'></i>`; // changing turn icon
                players.classList.add('active');
                playerSign = 'X';
                allBox[randomBox].setAttribute('id', playerSign);
            }else{
                allBox[randomBox].innerHTML = `<i class='${playerOIcon}'></i>`; // changing turn icon
                players.classList.remove('active');
                allBox[randomBox].setAttribute('id', playerSign);
           }
           selectWinner();
        }
        allBox[randomBox].style.pointerEvents = 'none'; // Disable user clicks on the selected box
        board.style.pointerEvents = 'auto'; // Enable user clicks on the board
        playerSign = 'X';
    }
}

// Results
function getClass(className) {
    return document.querySelector('.box' + className).id; // returning id name
}

function checkClasses(val1, val2, val3, sign) {
    if (getClass(val1) === sign && getClass(val2) === sign && getClass(val3) === sign){
    return true;
    }
}

function selectWinner () {
    if (checkClasses(1,2,3,playerSign) || 
    checkClasses(4,5,6,playerSign) || 
    checkClasses(7,8,9,playerSign) || 
    checkClasses(1,4,7,playerSign) || 
    checkClasses(2,5,8,playerSign) || 
    checkClasses(3,6,9,playerSign) || 
    checkClasses(1,5,9,playerSign) || 
    checkClasses(3,5,7,playerSign)
    ) {
        runBot = false;
        bot(runBot);
        setTimeout(() => {
            board.classList.remove('show');
            resultBox.classList.add('show');
        }, 700);

        winText.innerHTML = `Player <p>${playerSign}</p> win the game!`;
    }else{
        if(getClass(1) != '' && 
        getClass(2) != '' && 
        getClass(3) != '' && 
        getClass(4) != '' && 
        getClass(5) != '' && 
        getClass(6) != '' && 
        getClass(7) != '' && 
        getClass(8) != '' && 
        getClass(9) != '') {
            runBot = false;
            bot(runBot);
            setTimeout(() => {
            board.classList.remove('show');
            resultBox.classList.add('show');
        }, 700);

        winText.textContent = `This Match is Draw`;
        }
    }
}

replayBtn.onclick = () => {
    window.location.reload();
}
