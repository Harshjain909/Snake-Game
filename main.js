let Direction = {x:0 , y:0};

const eatingSound = new Audio("./music/food.mp3");
const gameOver = new Audio("./music/gameover.mp3");
const moveSound= new Audio("./music/move.mp3");
const backgroundSound = new Audio("./music/music.mp3");

let speed = 6;
let lastpaintTime=0;
let score=0;

let snakeArr = [
    {x:13,y:15}
];

let food = {x:14,y:13};

const main = (currTime)=>{
    window.requestAnimationFrame(main);
    if(((currTime-lastpaintTime)/1000)<1/speed){
        return;
    } else {
        lastpaintTime = currTime;
        gameEngine();
    }
}

const isCollide = (snake)=>{
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
    return false;
}

const gameEngine = ()=>{
    if(isCollide(snakeArr)){
        gameOver.play();
        backgroundSound.pause();
        Direction = {x:0 , y:0};
        alert("Game Over, Press any key to Start again!")
        snakeArr = [
            {x:13,y:15}
        ];
        speed= 6;
        backgroundSound.play(); 
        score=0;
    }

    if(snakeArr[0].y=== food.y && snakeArr[0].x === food.x){
        eatingSound.play();
        score++;
        if(score>1){
            speed+=0.1;
        }
        document.getElementById("scoreBox").innerText = "Score: " + score;
        snakeArr.unshift({x:snakeArr[0].x + Direction.x, y: snakeArr[0].y + Direction.y});
        let a=1;
        let b=17;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    for(let i=snakeArr.length-2; i>=0; i--){
        snakeArr[i+1]= {...snakeArr[i]};
    }

    snakeArr[0].x +=Direction.x;
    snakeArr[0].y +=Direction.y;

    const zone = document.querySelector(".zone");
    zone.innerHTML = "";
    
    snakeArr.forEach((e,index)=>{
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index==0){
            snakeElement.classList.add('snakeHead');
        } else {
            snakeElement.classList.add('snake');
        }
        zone.appendChild(snakeElement);
    })

    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('foodColor');
    zone.appendChild(foodElement);
}

window.requestAnimationFrame(main);

window.addEventListener('keydown',e=>{
     // Start background music on first interaction
    if (backgroundSound.paused) {
        backgroundSound.play();
    }

    Direction = {x:0,y:1};
    moveSound.play();
    
    switch (e.key) {
        case "ArrowUp":
            Direction.x = 0;
            Direction.y =  -1;
            break;
        case "ArrowDown":
            Direction.x = 0;
            Direction.y =1;
            break;
        case "ArrowLeft":
            Direction.x = -1;
            Direction.y =  0;
            break;
        case "ArrowRight":
            Direction.x = 1;
            Direction.y =  0;
            break;
        default:
            break;
    }
});
