const c = document.getElementById("gameCanvas");
var ctx;
var ballX=c.width/2;
var ballspeedX=10;
var ballY=c.height/2;
var ballspeedY=10;
var paddleHeight =150;
var paddle1Y;
var paddle2Y=200;
var score = 0;
var scoreCount=0;
var aiP=2;
var pauseScreen = true;

window.onload = function() {
    ctx = c.getContext('2d');
    var fps;
    fps = 1000/50;
    setInterval(function() {
        toChange();
        toDrawAll();
    },fps);

    c.addEventListener('mousemove',
        function(evt) {
            var position = mouseMove(evt);
            paddle1Y = position.y - (paddleHeight/2);
        });
}

function mouseMove(evt) {
    var rect = c.getBoundingClientRect();
    var mouseX = evt.clientX - rect.left;
    var mouseY = evt.clientY - rect.top;
    return {
        x:mouseX,
        y:mouseY
    };
}

function ai() {
    // var paddle2YCenter = paddle2Y+paddleHeight/2;
    // if(paddle2YCenter < ballY-35){
    //     paddle2Y += 6
    // }else{
    //     paddle2Y -= 6
    // }
    paddle2Y = ballY- aiP; 
}

function ballReset() {
    ballspeedX = -ballspeedX;
    ballX = c.width/2;
    ballY = c.height/2;
    scoreCount=0;
    ballspeedY=10;
    pauseScreen = true;
    // paddleHeight=150;
}

function toChange() {

    if(pauseScreen){
        paddleHeight=150;
        ballspeedX = 10;
        return;
    }
    ballX = ballX + ballspeedX;
    if(ballX<10){
        if(ballY>=paddle1Y && ballY<=paddle1Y+paddleHeight){
            ballspeedX = -ballspeedX;
            var delltaY = ballY - (paddle1Y + paddleHeight/2);
            ballspeedY = delltaY * .25;
            scoreCount += 10;
            if(scoreCount % 50==0){
                ballspeedX += 2;
                paddleHeight -= 10;
            }
            if(score<scoreCount){
                score = scoreCount;
            }
            aiP = Math.floor(Math.random() * paddleHeight-1)+1;
        }else {
            ballReset();
        }
        // ballspeedX = -ballspeedX;
    }
    if(ballX>c.width-10){
        if(ballY>=paddle2Y && ballY<=paddle2Y+paddleHeight){
            ballspeedX = -ballspeedX;
            var delltaY = ballY - (paddle2Y + paddleHeight/2);
            ballspeedY = delltaY * .25;
        }else {
            ballReset();
            ballspeedY=10;
        }
        // ballspeedX = -ballspeedX;
    }

    ballY = ballY + ballspeedY;
    if(ballY>c.height-10||ballY<0){
        ballspeedY = -ballspeedY;
    }
    ai();
    
}

function toDrawAll() {
    toDraw(0,0,c.width,c.height,'#00203FFF'); //screen
    if(pauseScreen){
        ctx.fillStyle = 'white';
        ctx.font = "20px Georgia";
        ctx.fillText("Best = " + score,470,200);
        ctx.fillText("click to continue..." ,435,400);
        c.addEventListener('click',function(evt) {
            pauseScreen=false;
        });
        return;
    }
    ctx.font = "20px Georgia";
    toDrawBall (ballX,ballY,10,'red'); //ball
    toDraw(0,paddle1Y,10,paddleHeight,'white'); //player
    toDraw(c.width-10,paddle2Y,10,paddleHeight,'white');  //A I

    ctx.fillText("Best = " + score,280,50);
    ctx.fillText("Score = " + scoreCount,610,50);
}

function toDrawBall(centerX,centerY,radius,drawcolor){
    ctx.fillStyle = drawcolor;
    ctx.beginPath();
    ctx.arc(ballX,ballY,5,0,Math.PI*2,true);
    ctx.fill();
}

function toDraw(left,top,width,height,drawcolor){
    ctx.fillStyle = drawcolor;
    ctx.fillRect(left,top,width,height,drawcolor);
}

