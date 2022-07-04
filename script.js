var deadSound = new Audio("dead.mp3");
var runSound = new Audio("run.mp3");
var jumpSound = new Audio("jump.mp3");


function KeyCheck(event) {
    var k = event.which;

    if (k == 32) { //Space
        if (runWorkerNumber == 0) {
            runWorkerNumber = setInterval(run, 100);
            backgroundWorker = setInterval(background, 100);
            runSound.play();
        }
    }

    if (k == 38) { //Up Arrow Key
        if (jumpWorkerNumber == 0) {
            clearInterval(runWorkerNumber);
            runImageNumber = 1;
            jumpWorkerNumber = setInterval(jump, 100);
            runSound.pause();
            jumpSound.play();
            
        }
    }

}



var backgroundWorker = 0;
var runImageNumber = 1;
var runWorkerNumber = 0;

var score = 0;


function run() {

    for (var i = 0; i < 20; i++) {
        var box = document.getElementById("box" + i);
        var boxCurrentMarginLeft = getComputedStyle(box).marginLeft;
        var newBoxMarginLeft = parseInt(boxCurrentMarginLeft) - 20;
        box.style.marginLeft = newBoxMarginLeft + "px";
        //40px - 160px
        if (newBoxMarginLeft >= 40 & newBoxMarginLeft <= 160) {
            clearInterval(runWorkerNumber);
            runSound.pause();
            clearInterval(backgroundWorker);
            jumpWorkerNumber = -1;
            deadWorkerNumber = setInterval(dead, 200);
            deadSound.play();
        }
    }


  


    score = score + 1;
    document.getElementById("score").innerHTML = score;

    runImageNumber = runImageNumber + 1;


    if (runImageNumber == 9) {
        runImageNumber = 1;
    }
    document.getElementById("boy").src = "Run (" + runImageNumber + ").png";
}





var backgroundMargin = 0;

function background() {
    backgroundMargin = backgroundMargin - 20;

    document.getElementById("mainBox").style.backgroundPositionX = backgroundMargin + "px";
}











var jumpImageNumber = 1;
var jumpWorkerNumber = 0;
var boyMarginTop = 350;

function jump() {

    for (var i = 0; i < 20; i++) {
        var box = document.getElementById("box" + i);
        var boxCurrentMarginLeft = getComputedStyle(box).marginLeft;
        var newBoxMarginLeft = parseInt(boxCurrentMarginLeft) - 20;
        box.style.marginLeft = newBoxMarginLeft + "px";
        //327px < boyMarginTop 
        if (newBoxMarginLeft >= 40 & newBoxMarginLeft <= 160) {
            if (boyMarginTop > 327) {
                clearInterval(jumpWorkerNumber);
                clearInterval(backgroundWorker);
                jumpSound.pause();
                jumpWorkerNumber = -1;
                deadWorkerNumber = setInterval(dead, 200);
                deadSound.play();
            }
        }
    }





    score = score + 1;
    document.getElementById("score").innerHTML = score;

    if (jumpImageNumber <= 6) {
        boyMarginTop = boyMarginTop - 20;
        document.getElementById("boy").style.marginTop = boyMarginTop + "px";
    }

    if (jumpImageNumber >= 7) {
        boyMarginTop = boyMarginTop + 20;
        document.getElementById("boy").style.marginTop = boyMarginTop + "px";
    }

    jumpImageNumber = jumpImageNumber + 1;

    if (jumpImageNumber == 13) {
        clearInterval(jumpWorkerNumber);
        jumpWorkerNumber = 0;
        jumpImageNumber = 1;
        runWorkerNumber = setInterval(run, 100);
        runSound.play();

    }
    document.getElementById("boy").src = "Jump (" + jumpImageNumber + ").png";
}








var boxMarginLeft = 600;

function createBox() {
    for (var i = 0; i < 20; i++) {
        var box = document.createElement("div");
        box.className = "box";
        box.id = "box" + i;

        if (i < 3) {
            boxMarginLeft = boxMarginLeft + 800;
        }
        if (i >= 7) {
            boxMarginLeft = boxMarginLeft + 400;
        }
       

        box.style.marginLeft = boxMarginLeft + "px";
        document.getElementById("mainBox").appendChild(box);
    }
}






var deadImageNumber = 1;
var deadWorkerNumber = 0;

function dead() {
    deadImageNumber = deadImageNumber + 1;

    if (deadImageNumber == 11) {
        deadImageNumber = 10;
        document.getElementById("boy").style.marginTop = "350px";
        clearInterval(deadWorkerNumber);
        document.getElementById("endGame").style.visibility = "visible";
        document.getElementById("endScore").innerHTML = score;
    }
    document.getElementById("boy").src = "Dead (" + deadImageNumber + ").png";
}

function newGame(){
    location.reload();
}

function Level(){
 location.replace("Level_2");
}

function theme(){
    location.replace("dark");
   }