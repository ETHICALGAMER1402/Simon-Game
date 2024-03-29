var buttonColours = ["red", "blue", "green", "yellow", "orange", "pink"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;

$(document).ready(function() {
    $(".btn").click(function() {
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        animatePress(userChosenColor);
        playSound(userChosenColor);
        checkAnswer();
    });

    $(document).keypress(function() {
        if (!gameStarted) {
            $("#level-title").text("Level " + level);
            nextSequence();
            gameStarted = true;
        }
    });
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").html("Level " + level);

    var randomNumber = Math.floor(Math.random() * buttonColours.length);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    animatePress(randomChosenColour);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(color) {
    $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#" + color).addClass("pressed");
    setTimeout(function() {
        $("#" + color).removeClass("pressed");
    }, 100);
}

function checkAnswer() {
    var lastIndex = userClickedPattern.length - 1;
    if (userClickedPattern[lastIndex] === gamePattern[lastIndex]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
            $("#level-title").html("Game Over, Press Any Key to Restart");
        }, 200);
        restartGame();
    }
}

function restartGame() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    gameStarted = false;
}
