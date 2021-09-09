const music = new Audio("./sonidos/uhSound.mp3");
var game = function(){
    let time = 55;
    let movement = Math.random() * (10 - 5) + 5;
    let movementBar = 25;
    let width = document.documentElement.clientWidth - movement;
    let height = document.documentElement.clientHeight - movement;
    let controlGame;
    let player1;
    let player2;

    function start(){
        init();
        controlGame = setInterval(play, time);
    }

    function init(){
        ball.style.left = 0;
        ball.state = 1;
        ball.direction = 1; // derecha 1, izquierda 2
        player1 = new Object();
        player2 = new Object();
        player1.keyPress = false;
        player1.keyCode = null;
        player2.keyPress = false;
        player2.keyCode = null;

    }

    function play(){
        moveBall();
        moveBar();
        checkIfLost();
    }

    function moveBall(){
        checkStateBall();
        switch(ball.state){
            case 1: //Derecha, abajo.
                ball.style.left = (ball.offsetLeft + movement * 2) + "px";
                ball.style.top = (ball.offsetTop + movement) + "px";
                break;

            case 2: //Derecha, arriba.
                ball.style.left = (ball.offsetLeft + movement) + "px";
                ball.style.top = (ball.offsetTop - movement*2) + "px";
                break;

            case 3: //Izquierda, abajo.
                ball.style.left = (ball.offsetLeft - movement*2) + "px";
                ball.style.top = (ball.offsetTop + movement) + "px";
                break;

            case 4: //Izquierda, arriba.
                ball.style.left = (ball.offsetLeft - movement*2) + "px";
                ball.style.top = (ball.offsetTop - movement) + "px";
                break;
        }
    }

    function checkIfLost(){
        if(ball.offsetLeft >= width - 20){
            stop();
            window.location = "Restart.html";
            console.log("Punto Player 1");
        }
        if(ball.offsetLeft <= 0){
            stop();
            window.location = "Restart.html";
            console.log("Punto Player 2");
        }
    }

    function stop(){
        clearInterval(controlGame);
        document.body.style.background = "#f00";
    }

    function moveBar(){
        if(player1.keyPress){
            if(player1.keyCode == 87 && bar1.offsetTop >= 0){
                bar1.style.top = (bar1.offsetTop - movementBar) + "px";
            }
            if(player1.keyCode == 83 && (bar1.offsetTop + bar1.clientHeight) <= height){
                bar1.style.top = (bar1.offsetTop + movementBar) + "px";
            }
        }
        if(player2.keyPress){
            if(player2.keyCode == 38 && bar2.offsetTop >= 0){
                bar2.style.top = (bar2.offsetTop - movementBar) + "px";
            }
            if(player2.keyCode == 40 && (bar2.offsetTop + bar2.clientHeight) <= height){
                bar2.style.top = (bar2.offsetTop + movementBar) + "px";
            }
        }
    }

    function checkStateBall(){

        if(collidePlayer2()){
            ball.direction = 2;
            music.play();
            music.loop = false;
            movement = Math.random() *  (10 - 5) + 5;
            if(ball.state == 1) ball.state = 3;
            if(ball.state == 2) ball.state = 4;
            
            
            
        }else if(collidePlayer1()){
            ball.direction = 1;
            music.play();
            music.loop = false;
            movement = Math.random() *  (10 - 5) + 5;
            if(ball.state == 3) ball.state = 1;
            if(ball.state == 4) ball.state = 2;
            
        }

        if(ball.direction === 1){
            if(ball.offsetTop >= height) ball.state = 2;
            else if(ball.offsetTop <= 0) ball.state = 1;
        }else{
            if(ball.offsetTop >= height) ball.state = 4;
            else if(ball.offsetTop <= 0) ball.state = 3;
        }
    }

    function collidePlayer1(){
        if(ball.offsetLeft <= bar1.clientWidth && ball.offsetTop >= bar1.offsetTop && ball.offsetTop <= (bar1.offsetTop + bar1.clientHeight)){
            return true;
        }
    }

    function collidePlayer2(){
        if(ball.offsetLeft >= (width - 40) && ball.offsetTop >= bar2.offsetTop && ball.offsetTop <= (bar2.offsetTop + bar2.clientHeight)){
            return true;
        }
    }

    document.onkeydown = function(e){
        e = e || window.event;
        switch(e.keyCode){
            
            case 87:    //Letra W.
                player1.keyCode = e.keyCode;
                player1.keyPress = true;
                break; 
            
            case 83:     //Letra S.
                player1.keyCode = e.keyCode;
                player1.keyPress = true;
                break;
            
            case 38:     //Flecha hacia arriba.
                player2.keyCode = e.keyCode;
                player2.keyPress = true;
                break;
            
            case 40:     //Flecha hacia abajo.
                player2.keyCode = e.keyCode;
                player2.keyPress = true;
                break;
        }
    }

    document.onkeyup = function(e){
        if(e.keyCode == 87 || e.keyCode == 83){
            player1.keyPress = false;
        }
        if(e.keyCode == 38 || e.keyCode == 40){
            player2.keyPress = false;
        }
    }

    start();
}();
