
var player1 = {
  name: window.sessionStorage.getItem("playerOne"),
  score: 0,
}

var player2 = {
  name: window.sessionStorage.getItem("playerTwo"),
  score: 0,
}

$("#player1Name").text(player1.name + ": ");
$("#player1Score").text(player1.score);
$("#player2Name").text(player2.name + ": ");
$("#player2Score").text(player2.score);

var soundNumbers = [];
var memoryCards = 16;
var soundNum = 8;
var chosenCards = [];
var cardCount = 0;
var gameCount = Math.floor(Math.random() * 2 + 1);

// Assign Sounds
function assignSounds(){

  while (soundNumbers.length < memoryCards) {
    var newNum = Math.floor(Math.random() * soundNum + 1);
    if (soundNumbers.includes(newNum) === false) {
      soundNumbers.push(newNum);
      soundNumbers.push(newNum);
    }
  }

  while (soundNumbers.length < memoryCards) {
    var newNum = Math.floor(Math.random() * soundNum + 1);
    if (soundNumbers.includes(newNum) === false) {
      soundNumbers.push(newNum);
      soundNumbers.push(newNum);
    }
  }

  for (var i = 1; i <= memoryCards; i++) {
    var randIndex = Math.floor(Math.random() * soundNumbers.length);
    $("#" + i).attr("name", "sound" + soundNumbers[randIndex]);
    soundNumbers.splice(randIndex, 1);
  }

}


function turn() {

  gameCount++;

  if (gameCount === 3) {
    gameCount = 1;
  }

  if (gameCount === 1) {
    $("#player1").removeClass("player").addClass("turn");
    $("#player2").removeClass("turn").addClass("player");
  } else {
    $("#player2").removeClass("player").addClass("turn");
    $("#player1").removeClass("turn").addClass("player");
  }
}

turn();
assignSounds();

function compareCards(card1, card2) {
  if (card1 === card2) {
    $("div[name='" + card1 + "']").removeClass("cardPending").addClass("cardOut");
    $("div[name='" + card2 + "']").removeClass("cardPending").addClass("cardOut");

    if (gameCount === 1) {
      player1.score++;
      $("#player1Score").text(player1.score);
    } else {
      player2.score++;
      $("#player2Score").text(player2.score);
    }

    cardCount = 0;
    chosenCards = [];

  } else {
    setTimeout(function() {
      $("div[name='" + card1 + "']").removeClass("cardPending").addClass("memoryCard");
      $("div[name='" + card2 + "']").removeClass("cardPending").addClass("memoryCard");
      turn();
    }, 500);

    cardCount = 0;
    chosenCards = [];
  }

}

function gameEnds() {
  if (player1.score === player2.score){
    $("#player1Score").text("Wins!");
    $("#player2Score").text("Wins!");
  } else if (player1.score > player2.score) {
    $("#player1Score").text("Wins!");
    $("#player2Score").text("");
  } else {
    $("#player2Score").text("Wins!");
    $("#player1Score").text("");
  }
}

function restart() {
  $(".cardOut").removeClass("cardOut").addClass("memoryCard");
  player1.score = 0;
  player2.score = 0;
  $("#player1Score").text(player1.score);
  $("#player2Score").text(player2.score);
  var gameCount = Math.floor(Math.random() * 2 + 1);
  assignSounds();
}


$(".memoryCard").click(function() {
  var chosenCard = $(this);
  var cardName = $(this).attr("name");

  var audio = new Audio("sounds/"+ cardName +".mp3");
  audio.play();

  if (chosenCard.hasClass("memoryCard")) {
    chosenCard.removeClass("memoryCard").addClass("cardPending");
    chosenCards.push(cardName);
    cardCount++
    if (cardCount === 2) {
      compareCards(chosenCards[0], chosenCards[1]);
    }
  }

  if (player1.score + player2.score === 8) {
    gameEnds();
  }

});

$("button").click(function() {
  restart();
});
