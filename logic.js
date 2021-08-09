var choosen = [];
var userClickedPattern = [];
var colors = ["green","red","yellow","blue"];
var started = false;
var level = 0;

$(document).keypress(function(){
    
    if(!started){
        $("#level-title").text("level "+level);
        nextSequence();
        
        started = true;
    }

});


$(".btn").on("click",function(){

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    // animatePress()
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});



function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("level "+level);
    var rand = Math.random();
    rand = Math.floor(rand*4);
    var col = colors[rand];
    choosen.push(col);
    $("#"+col).fadeOut(250).fadeIn(250);
    playSound(col);
}




function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColor){
        $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==choosen[currentLevel]){
        console.log("success");
        if(userClickedPattern.length==choosen.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press any key to restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    started = false;
    choosen = [];
}




// if(col == "green"){
//     $("#green").on("click",function(){
//         $("#green").addClass('pressed');   
//        });
// }
// setTimeout(function(){
//     $("#green").removeClass('pressed');
// }, 3000); 
// for(var i=0;i<colors.length;i++){
//     $("#green").on("click",function(){
//         $("#green").addClass('pressed');   
//        });
// }

// $("#"+colors[0]).on("click",function(){("#"+colors[0]).addClass("pressed");});