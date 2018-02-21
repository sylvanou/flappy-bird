window.onload = function () {
    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = 600;

    const ctx = canvas.getContext('2d');

    let speedUp = 2000;
    const flap = new Audio('./smw_jump.wav');
    let scoreBoard = document.getElementById("score");
    let score = 0;
    const environment = new Environment(canvas, ctx);
    environment.bgImg.style.overflow = 'hidden';
    const bird = new Bird(100, 300, ctx);
    const pipes = [];
    setInterval(function () {        
        score++;
        scoreBoard.innerHTML = `Time: ${score}`;
        if (score % 29 === 0){
            setInterval(function () {
                let pipeSet = generateTightPipes(ctx, canvas.width, canvas.height);
                pipes.push(pipeSet.top, pipeSet.bottom);
            }, speedUp)
        }
    }, 1000)
    setInterval(function () {
        let pipeSet = generateTightPipes(ctx, canvas.width, canvas.height);
        pipes.push(pipeSet.top, pipeSet.bottom);
    }, 2000)

    gameLoop();

    ctx.fillStyle = '#FFFFFF';

    /*
        Main Game Loop
    */

    function gameLoop() {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        environment.update();
        environment.render();
        pipes.forEach(function (pipes) {
            pipes.update();
            pipes.render();
        });
        bird.update();
        bird.render();
        if (score > 60) {
            alert(`Great job! You got a score of ${score-1}!`);
            window.location = '';
        }
        if (detectCollisions(bird, pipes)) {
            alert("Nice try! You lasted " + score + ' seconds!');
            window.location = '';
        }
        window.requestAnimationFrame(gameLoop);
    }
};

function generateRandomPipes(ctx, canvasWidth, canvasHeight) {
    let lengthTop = Math.round(Math.random() * 200 + 70);
    let lengthBottom = canvasHeight - 300 - lengthTop;
    let returnVal = {};
    returnVal.top = new Pipe(canvasWidth, -5, lengthTop, 4, ctx);
    returnVal.bottom = new Pipe(canvasWidth, canvasHeight + 5 - lengthBottom, lengthBottom, 4, ctx);
    return returnVal;
}
function generateTightPipes(ctx, canvasWidth, canvasHeight) {
    let lengthTop = Math.round(Math.random() * 200 + 100);
    let lengthBottom = canvasHeight - 200 - lengthTop;
    let returnVal = {};
    returnVal.top = new Pipe(canvasWidth, -5, lengthTop, 4, ctx);
    returnVal.bottom = new Pipe(canvasWidth, canvasHeight + 5 - lengthBottom, lengthBottom, 4, ctx);
    return returnVal;
}

function detectCollisions(bird, pipes) {
    let collisionDetected = false;
    if(bird.y < 20 || bird.y > canvas.height){
        return true;
    }
    for (let i = 0; i < pipes.length; i++) {
        let e = pipes[i];
        let highPipe = e.ypos <= 0;
        let x0 = e.xpos, x1 = e.xpos + e.width;
        if (highPipe) {
            let y0 = e.ypos + e.length;
            let alpha = bird.x;
            let beta = bird.y - bird.height / 2;
            if (alpha > x0 && alpha < x1 && beta < y0) {
                return true;
            }
        }
        else {
            let y2 = e.ypos;
            let a = bird.x;
            let b = bird.y + bird.height / 2;
            if (a > x0 && a < x1 && b > y2) {
                return true;
            }
        }
    }
    return false;
}



