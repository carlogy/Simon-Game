// button colors 
let buttonColors = ["red", "blue", "green", "yellow"];

// game pattern
var gamePattern = [];

// user pattern
var userClickedPattern = [];

var level = 0;
var hasStarted = false;

// checks for keypress to start the game
$(document).keypress(function() {
    if (!hasStarted) {
        $('#level-title').text("Level " + level);
        nextSequence();
        hasStarted = true;
    }

});


// Click handler for buttons with class "btn"
$(".btn").click(function() {
    // Get the ID of the clicked button
    var userChosenColor = $(this).attr("id");

    // Add the ID to the userClickedPattern array
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    console.log(userClickedPattern);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

// validates wether users selected pattern matches computer's selected
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
       if (userClickedPattern.length === gamePattern.length) {
         setTimeout(function () {
            nextSequence();
         }, 1000);
        }        
    } else {
        // plays a sound if user selected doesn't match computer, flashes bg red and updates title
      playSound("wrong");
      $("body").addClass("game-over");
      $('#level-title').text("Game Over, Press Any Key to Restart");

      setTimeout(function() {
         $("body").removeClass("game-over");
        }, 200);

        

        startOver();    
   }
}

// Generates a random number between 1 and 3 assigns to randomChosenColor and appends gamePattern array with that number
function nextSequence() {
    userClickedPattern = [];
    level++
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    
    // Assigns the randome number in nextSequence function to a color
    var randomChosenColor = buttonColors[randomNumber];


    // appends the gamePattern arraty with the last chosen number
    gamePattern.push(randomChosenColor);  

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColor);   
}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
    
}

// resets values to restart the game
function startOver () {
    level = 0;
    gamePattern = [];
    hasStarted = false;
}





