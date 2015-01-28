/**
 * Created by Joy on 2015/1/27.
 */
var snakeCanvas = document.getElementById("snake-canvas");//画布准备
var canvasContext = snakeCanvas.getContext("2d");
var button = document.getElementById("div-begin");
button.addEventListener('click', begin, false);
function begin() {
    canvasContext.clearRect(0, 0, 300, 150);
    button.removeEventListener('click', begin, false);
    button.style.display = "none";
    button.addEventListener('click', pause, false);
    snakeCanvas.addEventListener('click', pause, false);
    game = new Game();
    game.iniGame();//游戏准备
    game.status = 1;//游戏处于开始的状态
    try{
        Timer();
    }//进入游戏循环
    catch (error) {
        alert(error);
    }
}
function pause() {
    if (game.status == 1) {
        button.style.display = "";
        game.status = 0;
    } else {
        button.style.display = "none";
        game.status = 1;
        Timer();
    }
}
function createPoint(x, y) {
    this.x = x;
    this.y = y;
}
function Snake() {
    this.cnt = 0;
    this.direct = 1;
    this.body = null;
}
function Game() {
    this.size = 20;
    this.snake1 = new Snake();
    this.snake2 = new Snake();
    this.time = 0;
    this.status = 0;
    this.score1 = 0;
    this.score2 = 0;
    this.aim = new createPoint(100,100);
    this.redisplay = function(x, y){
        canvasContext.clearRect(x,y,5,5);
    }
    this.iniAim = function() {
        var ux, uy;
        while(1) {
            ux = Math.round(Math.random() * 295);
            uy = Math.round(Math.random() * 145);
            ux = ux - ux % 5;
            uy = uy - uy % 5;
            var flag = 0;
            for (var i = 0; i <= this.snake1.cnt + 2; i ++) {
                if (this.snake1.body[i].x == ux && this.snake1.body[i].y == uy) {
                    flag = 1;
                    break;
                }
            }
            for (var i = 0; i <= this.snake2.cnt + 2; i ++) {
                if (this.snake2.body[i].x == ux && this.snake2.body[i].y == uy) {
                    flag = 1;
                    break;
                }
            }
            if (flag == 0) {
                break;
            }

        }
        this.aim.x = ux;
        this.aim.y = uy;
    }
    this.iniGame = function(){
        this.body = null;
        this.snake1 = new Snake();
        this.snake2 = new Snake();
        this.size = 20;
        this.time = 0;
        this.status = 0;
        this.aim = new createPoint(100,100);
        this.snake1.direct = 1;
        this.snake1.body = new Array();
        this.snake1.body[0] = new createPoint(20, 10);
        this.snake1.body[1] = new createPoint(15, 10);
        this.snake1.body[2] = new createPoint(10, 10);
        this.snake2.direct = 2;
        this.snake2.body = new Array();
        this.snake2.body[0] = new createPoint(280, 10);
        this.snake2.body[1] = new createPoint(275, 10);
        this.snake2.body[2] = new createPoint(270, 10);
        this.iniAim();
    }
}
function whichKeyPressed(event) {//响应按键消息，改变蛇的方向
    switch (event.keyCode) {
        case 38://up
            if (game.snake1.direct == 3) break;
            game.snake1.direct = 4;
            break;
        case 40://down
            if (game.snake1.direct == 4) break;
            game.snake1.direct = 3;
            break;
        case 37://left
            if (game.snake1.direct == 1) break;
            game.snake1.direct = 2;
            break;
        case 39://right
            if (game.snake1.direct == 2) break;
            game.snake1.direct = 1;
            break;

        case 87://up
            if (game.snake2.direct == 3) break;
            game.snake2.direct = 4;
            break;
        case 83://down
            if (game.snake2.direct == 4) break;
            game.snake2.direct = 3;
            break;
        case 65://left
            if (game.snake2.direct == 1) break;
            game.snake2.direct = 2;
            break;
        case 68://right
            if (game.snake2.direct == 2) break;
            game.snake2.direct = 1;
            break;
    }
}
function move(snake) {
    var flag = 0;
    var point = new createPoint(snake.body[0].x, snake.body[0].y);
    if (snake.direct == 1) {
        point.x += 5;
        if (point.x > 295) {
            flag = 1;
        }
    } else if (snake.direct == 2) {
        point.x -= 5;
        if (point.x < 0) {
            flag = 1;
        }
    } else if (snake.direct == 3) {
        point.y += 5;
        if (point.y > 145) {
            flag = 1;
        }
    } else if (snake.direct == 4) {
        point.y -= 5;
        if (point.y < 0) {
            flag = 1;
        }
    }
    if (flag == 0) {
        for (var i = 0; i < snake.body.size; i ++) {
            if (snake.body[i].x == point.x && snake.body[i].y == point.y) {
                flag = 1;
                break;
            }
        }
    }
    if (flag == 0) {
        if (snake.body[0].x == game.aim.x && snake.body[0].y == game.aim.y) {
            snake.cnt++;
            snake.body[snake.cnt + 2] = new createPoint();
            game.redisplay(game.aim.x, game.aim.y);
            try{
                game.iniAim();
                console.log(game.aim.x);
            } catch(error) {
                console.log(error);
            }
        }
        var tempPoint = new createPoint(snake.body[snake.cnt + 2].x, snake.body[snake.cnt + 2].y);
        for (var i = snake.cnt + 2; i > 0; i--) {
            snake.body[i].x = snake.body[i - 1].x;
            snake.body[i].y = snake.body[i - 1].y;
        }
        snake.body[0].x = point.x;
        snake.body[0].y = point.y;
        game.redisplay(tempPoint.x, tempPoint.y);
    }
    return flag;
}
function Timer() {
    var flag = 0;
    try {
        if (move(game.snake1)) flag = 1;
        else if (move(game.snake2)) flag = 2;
    } catch(error) {
        alert(error);
    }

    if (game.snake1.body[0].x == game.snake2.body[0].x && game.snake1.body[0].y == game.snake2.body[0].y) flag = 3;
    if (flag == 0) {
        var i = 0;
        var j = 0;
        for (j in game.snake2.body) {
            if (game.snake1.body[i].x == game.snake2.body[j].x && game.snake1.body[i].y == game.snake2.body[j].y) {
                flag = 1;
                break;
            }
        }
    }
    if (flag == 0) {
        var i = 0;
        var j = 0;
        for (i in game.snake1.body) {
            if (game.snake1.body[i].x == game.snake2.body[j].x && game.snake1.body[i].y == game.snake2.body[j].y) {
                flag = 2;
                break;
            }
        }
    }
    if (flag == 0) {
        canvasContext.beginPath();
//目标
        canvasContext.fillStyle = "blue";
        canvasContext.fillRect(game.aim.x, game.aim.y, 5, 5);
//蛇
        canvasContext.fillStyle = "red";
        var i = 0;
        for (i in game.snake1.body) {
            canvasContext.fillRect(game.snake1.body[i].x, game.snake1.body[i].y, 5, 5);
        }
        canvasContext.fillStyle = "yellow";
        var i = 0;
        for (i in game.snake2.body) {
            canvasContext.fillRect(game.snake2.body[i].x, game.snake2.body[i].y, 5, 5);
        }
    } else {
        game.status = 0;
        var str;
        if (flag == 1) {
            str = "player2 win!";
            game.score1 ++;
        }
        else if (flag == 2) {
            str = "player1 win!";
            game.score2 ++;
        }
        else
            str = "draw!"
        if (confirm(str+" Again?")) {
            canvasContext.clearRect(0,0,300,150);
            game.iniGame();
            game.status = 1;
        } else {
            //window.close();
        }
    }
    game.time += 0.2;
    var Time = document.getElementById("snake-time");
    Time.innerText = Math.round(game.time);
    document.getElementById("snake1-score").innerText = game.score1;
    document.getElementById("snake1-length").innerText = (game.snake1.cnt + 3).toString();
    document.getElementById("snake2-score").innerText = game.score2;
    document.getElementById("snake2-length").innerText = (game.snake2.cnt + 3).toString();
    if (game.status) {
        setTimeout("Timer()", 200);
    }
}
