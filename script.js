const rulesButton = document.querySelector(".rules-btn");
const rulesBoard = document.querySelector(".rules-board");
const crossButton = document.querySelector(".cross-button");

rulesButton.addEventListener('click',() =>{
    rulesBoard.style.display = 'block';
});

crossButton.addEventListener('click',() => {
    rulesBoard.style.display = 'none';
});


const handOpt = {
    "rock": "./images/rockImg.svg",
    "scissors": "images/scissorsImg.svg" ,
    "paper": "images/paperImg.svg"
}


const pickUserHand = (hand) =>{
    let hands = document.querySelector(".hands");
    hands.style.display = "none";   

    let contest = document.querySelector(".contest");
    contest.style.display = "flex";

    document.getElementById("you-picked").src = handOpt[hand];

    if(hand == "rock"){
      document.querySelector(".border").style.border = "10px solid #0074B6";
    }

    if(hand == "paper"){
        document.querySelector(".border").style.border = "10px solid #FFA943";
    }

    if(hand == "scissors"){
        document.querySelector(".border").style.border = "10px solid #BD00FF";
    }

    let cpHand =  pickComputerHand();
    result(hand,cpHand);

}



const pickComputerHand = () => {
   let hands = ["rock" , "paper", "scissors"  ]
   let cpHand = hands[Math.floor(Math.random() * 3)]

   if (cpHand === "rock") {
   document.querySelector(".cpborder").style.border = "10px solid #0074B6";
  } else if (cpHand === "paper") {
    document.querySelector(".cpborder").style.border = "10px solid #FFA943";
  } else if (cpHand === "scissors") {
    document.querySelector(".cpborder").style.border = "10px solid #BD00FF";
  }

   document.getElementById("pc-picked").src = handOpt[cpHand];

   return cpHand;
}


const result = (userHand, cpHand ) => {

  document.querySelectorAll(".blink").forEach(hand => {
    hand.classList.remove("blink");
  });

    if (userHand == "paper" && cpHand == "scissors") {
        setDecision("YOU LOST");
        updateScores(false);
        document.querySelector("#pc-picked").classList.add("blink");
      }
      if (userHand == "paper" && cpHand == "rock") {
        setDecision("YOU WIN");
        updateScores(true); 
        document.querySelector("#you-picked").classList.add("blink");
      }
      if (userHand == "paper" && cpHand == "paper") {
        setDecision("TIE UP");
      }
      if (userHand == "rock" && cpHand == "scissors") {
        setDecision("YOU WIN");
        updateScores(true); 
        document.querySelector("#you-picked").classList.add("blink");
      }
      if (userHand == "rock" && cpHand == "paper") {
        setDecision("YOU LOST"); 
        updateScores(false);
        document.querySelector("#pc-picked").classList.add("blink");
      }
      if (userHand == "rock" && cpHand == "rock") {
        setDecision("TIE UP");
      }
      if (userHand == "scissors" && cpHand == "scissors") {
        setDecision("TIE UP");
      }
      if (userHand == "scissors" && cpHand == "rock") {
        setDecision("YOU LOST"); 
        updateScores(false);
        document.querySelector("#pc-picked").classList.add("blink");
      }
      if (userHand == "scissors" && cpHand == "paper") {
        setDecision("YOU WIN");
        updateScores(true); 
        document.querySelector("#you-picked").classList.add("blink");
      }
} 

const restartGame = () => {
    let hands = document.querySelector(".hands");
    hands.style.display = "flex";   

    let contest = document.querySelector(".contest");
    contest.style.display = "none";
}

const setDecision = (decision) =>{
    document.querySelector(".win").innerHTML = decision;
    if(decision == "YOU WIN"){
        document.querySelector(".next-btn").style.display = 'block';
    }
    else{
        document.querySelector(".next-btn").style.display = 'none';
    }
    if(decision == "TIE UP"){
        document.querySelector(".against-pc").style.display = 'none';
        document.querySelector(".newGame").innerHTML = "REPLAY"
    }
    else{
        document.querySelector(".against-pc").style.display = "block";
        document.querySelector(".newGame").innerHTML = "PLAY AGAIN"
    }
}

let scores = {
  user: 0,
  computer: 0
};

const updateScores = (isUserWin) => {
  if (isUserWin) {
    scores.user += 1;  
  } else {
    scores.computer += 1;  
  }
  setScore(scores.user, scores.computer);

  localStorage.setItem('score', JSON.stringify(scores));
}

const setScore = (userScore, computerScore) => {
  document.getElementById("your-score").innerText = userScore;
  document.getElementById("computer-score").innerText = computerScore;
}

scores = JSON.parse(localStorage.getItem('score')) || scores;
setScore(scores.user, scores.computer);  
