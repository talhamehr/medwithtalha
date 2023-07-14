var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

$(document).keypress(function(){
    if (!gameStarted){
    nextSequence()
    gameStarted = true
    $("#level-title").text("Level " + level);
    }
})

$(".btn").click(function(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor)
    playSound(userChosenColor)
    animatePress(userChosenColor)
    checkAnswer(userClickedPattern.length - 1)
})


function playSound(name){
    var audio = new Audio('sounds/'+ name + '.mp3');
    audio.play();
}

function animatePress(currentColor){
    setTimeout(function(){
        $("#" + currentColor).toggleClass("pressed");
    }, 100)
    $("#" + currentColor).toggleClass("pressed");
}

function nextSequence(){
    userClickedPattern = []
    var randomNumber = Math.floor(Math.random()* 4)
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor)
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor)
    ++level
    $("#level-title").text("Level " + level);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }else{
        playSound("wrong")
        setTimeout(function(){
            $("body").toggleClass("game-over")
        }, 200)
        $("body").toggleClass("game-over")
        $("#level-title").text("Game Over, Press Any Key to Restart")
        startOver()
    }
}

function startOver(){
    level = 0;
    gamePattern = []
    gameStarted = false;
}