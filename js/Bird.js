const Bird = function (x, y, ctx) {
    // this.scoreBoard = document.getElementById('score');
    // this.score = 0;
    this.flap = new Audio('./smw_jump.wav');
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.velY = 0;
    this.width = 80;
    this.height = 57;
    this.ticks = 0;
    this.spriteIndex = 0;
    this.sprites = [document.getElementById('bird1'),
    document.getElementById('bird2'),
    document.getElementById('bird3')];
    var self = this;
    window.addEventListener('keydown', function (e) {
        // console.log(e);
        if (e.keyCode === 32) {
            self.flap.currentTime =0;
            self.flap.play()
            self.velY = -12;
        }
    })
    window.addEventListener('mousedown', function (e) {
        if (e.button === 0) {
            self.flap.currentTime =0;
            self.flap.play();
            self.velY = -12;
        }    })
}
Bird.prototype.update = function () {
    this.ticks++;
    if (this.ticks % 15 === 0) this.spriteIndex = (this.spriteIndex+1) % this.sprites.length; 
    this.y += this.velY;
    this.velY += 1;
    // if(this.x < 0){
    //     console.log('score increase');
    //     this.score++;
    //     this.scoreBoard.innerHTML = 'Score:' + this.score;
    // }
}
Bird.prototype.render = function () {
    let renderX = this.x - this.width / 2;
    let renderY = this.y - this.height / 2;
    this.ctx.drawImage(this.sprites[this.spriteIndex], renderX, renderY);
}