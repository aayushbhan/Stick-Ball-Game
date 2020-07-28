var canvas = document.getElementById("game");

var c  = canvas.getContext('2d');


const 	GAME_WIDTH = 800;
const   GAME_HEIGHT = 600;
var score = 0;
var life = 3;



class Game {
	constructor(gamewidth,gameheight){
		this.gamewidth = gamewidth;
		this.gameheight = gameheight;	
	}
	start(){
		this.stick =  new Stick(this);
		this.blackball = new Blackball(this);
		this.greenball = new Greenball(this);
		this.redball = new Redball(this);
		this.blueball = new Blueball(this);

		var blackballs = [];
	


		this.gameObject = [
			this.blackball ,
			this.greenball,
			this.redball,
			this.blueball,
			this.stick,
			
		];


		new InputHandler(this.stick);

	}
	draw(c){
	
		this.gameObject.forEach(object => object.draw(c));	
		

	}
	update(game){
	
		this.gameObject.forEach(object => object.update(game));	
	
	}
}


class Blackball{
	constructor(game){
	    this.image = document.getElementById('blackball');

        this.x=1000;
        this.y=Math.random()*500;
        this.width=20;
        this.height=20;
        this.gravtiy=2;
	
	}

	draw(c){
     c.drawImage(this.image, this.x, this.y, this.width, this.height);
     

	}

	update(){
        this.x -=this.gravtiy;
        if(this.x<0){
			this.x=1000;
            this.y=Math.random()*500;
		}
	}
}

// Green ball


class Greenball{
	constructor(game){
		this.image = document.getElementById('greenball');

        this.x=900;
        this.y=Math.random()*500;
        this.width=20;
        this.height=20;
        this.gravtiy=4;
	}

	draw(c){

        c.drawImage(this.image, this.x, this.y, this.width, this.height);
        
		
	}

	update(){
		
       this.x -=this.gravtiy;
        if(this.x<0){
			this.x=900;
            this.y=Math.random()*500;
		}	

	}
}



class Redball{
	constructor(game){
		this.image = document.getElementById('redball');
		
        this.x=950;
        this.y=Math.random()*500;
        this.width=20;
        this.height=20;
        this.gravtiy=5;
       
	}

	draw(c){
		c.drawImage(this.image, this.x, this.y, this.width, this.height);
        
		
	}

	update(){
        this.x -=this.gravtiy;
        if(this.x<0){
			this.x=950;
            this.y=Math.random()*500;
		}
    
	}
}
// blue ball

class Blueball{
	constructor(game){
		this.image = document.getElementById('blueball'); 
		this.x=800;
        this.y=Math.random()*500;
        this.width=20;
        this.height=20;
        this.gravtiy=7;
	}

	draw(c){
       // c.clearRect(0, 0, canvas.width, canvas.height);
		c.drawImage(this.image, this.x, this.y, this.width, this.height);
        

	}

	update(){
     	this.x -=this.gravtiy;
        if(this.x<0){
			this.x=800;
            this.y=Math.random()*500;
		}
	}
}



class Stick{
    constructor(game){
	 //Specifying the dimensions and position of the stick
	 this.width = 16;
	 this.height = 60;
	 this.x = 10;
	 this.y = 120;
	 this.speed = 25;

	}
	
	moveUp(){
		if(this.y<this.width/2)
			this.y-=0;
		else
			this.y -= this.speed;
	}
	moveDown(){
		if(this.y+this.width/2>530)
			this.y -=0;
		else
			this.y += this.speed;


	}

    draw(c){
		//Drawing the stick
		c.fillStyle = "black";
		c.fillRect(this.x,this.y,this.width,this.height);

	}
	update(change) {

	  c.font = 'italic 20px sans-serif';

	  var lv = "Lives "+life;
	  c.fillText(lv,20,20);

	  var sc = "Score "+score;
	  c.fillText(sc,700,20);


	  var black_x = game.blackball.x;
	  var black_y = game.blackball.y;

	  var blue_x = game.blueball.x;
	  var blue_y = game.blueball.y;

	  var green_x = game.greenball.x;
	  var green_y = game.greenball.y;

	  var red_x = game.redball.x;
	  var red_y = game.redball.y;

	  var stick_x = this.x+(this.width/2);
	  var stick_y1 = this.y-(this.height/2+2);
	  var stick_y2 = this.y+(this.height/2+2);

	  if((stick_x+3 >= black_x) && (stick_x+1 < black_x) && (black_y >= stick_y1 && black_y <= stick_y2)){
		score += 5;
	  }

	  if((stick_x+5 >= blue_x) && (stick_x+1 < blue_x) && (blue_y > stick_y1 && blue_y < stick_y2)){
		score += 5;
	}

	if((stick_x+5 >= green_x) && (stick_x+1 < green_x) && (green_y > stick_y1 && green_y < stick_y2)){
		score += 5;
	}

	if((stick_x+5 >= red_x) && (stick_x+1 < red_x) && (red_y > stick_y1 && red_y < stick_y2)){
		life -= 1;
	}

	if(life == 0){
		var msg = "You Lose, Score is: "+score+". Press Ok then Cancel to play again";
		if (confirm(msg)) {
			window.location.reload();
		  } 
		return;
	}

	}
}

	
class InputHandler{
	constructor(stick){

	document.addEventListener('keydown', (event) =>{
	
		switch(event.keyCode){
			case 38:
				stick.moveUp();
				break;
			case 40:
				stick.moveDown();
				break;
		}
	}
	
	);

	}
}


var previous =0;

var game = new Game(GAME_WIDTH,GAME_HEIGHT);
game.start();

function gameLoop(position){
	var change = position - previous;
	previous = position;
	c.clearRect(0,0,innerWidth,innerHeight);
	
	game.draw(c);
	game.update(change);

	requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
































