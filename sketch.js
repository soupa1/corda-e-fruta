const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var chao;
var rope;
var fruta;
var conexao;
var backgroundImg, watermelon, coelho;
var coelhoSpr;
var botao;
var blink;
var eat;
var sad;
var musicaDeFundo;
var cut;
var sadS;
var eatS;
var air;
var balao;
var muteBotao;

function preload()  {
  backgroundImg = loadImage("background.png");
  watermelon = loadImage("melon.png");
  coelho = loadImage("Rabbit-01.png");
  blink = loadAnimation("blink_1.png","blink_1.png","blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png", "sad_3.png");
  musicaDeFundo = loadSound("sound1.mp3");
  cut = loadSound("rope_cut.mp3");
  sadS = loadSound("sad.wav");
  eatS = loadSound("eating_sound.mp3");
  air = loadSound("air.wav");

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;


  blink.looping = true;
  eat.looping = false;
  sad.looping = false;
}

function setup() {
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;
 
  musicaDeFundo.play();
  musicaDeFundo.setVolume(0.2);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50);

  blink.frameDelay = 4;
  eat.frameDelay = 10;

  coelhoSpr = createSprite(420, 590, 100, 100);
  coelhoSpr.addImage(coelho);
  coelhoSpr.scale = 0.3;
  coelhoSpr.addAnimation("piscando", blink);
  coelhoSpr.addAnimation("comendo", eat);
  coelhoSpr.addAnimation("triste", sad);
  coelhoSpr.changeAnimation("piscando");

  botao = createImg("cut_button.png");
  botao.position(220, 30);
  botao.size(50, 50);
  botao.mouseClicked(Break);

  balao = createImg("balloon.png");
  balao.position(10, 210);
  balao.size(150, 100);
  balao.mouseClicked(Assoprar);

  muteBotao = createImg("mute.png");
  muteBotao.position(450, 20);
  muteBotao.size(50, 50);
  muteBotao.mouseClicked(Mute);

  chao = new Chao(200,690,600,20);
  rope = new Rope(6,{x: 245, y: 30});

  fruta = Bodies.circle(300,300,15);
  Matter.Composite.add(rope.body, fruta);

  conexao = new Conexao(rope, fruta);
}

function draw() {
  background(51);
  image(backgroundImg, width/2, height/2, 500, 700);

  Engine.update(engine);
   
  chao.draw();
  rope.show();

  drawSprites();

  if (fruta !== null) {
    image(watermelon,fruta.position.x, fruta.position.y, 65, 65);
  }

  if (Collision(coelhoSpr, fruta) === true) {
    coelhoSpr.changeAnimation("comendo");
    eatS.play()
  }

  if (fruta !== null && fruta.position.y >= 650) {
    coelhoSpr.changeAnimation("triste");
    sadS.play();
    musicaDeFundo.stop();
    fruta = null;
  }
}


function Break() {
  conexao.break();
  rope.break();
  conexao = null;
  cut.play();
}

function Collision(coelho, corpo) {
  if (corpo !== null) {
    var distancia = dist(coelho.position.x, coelho.position.y, corpo.position.x, corpo.position.y);

    if (distancia <= 80) {
      World.remove(engine.world, fruta);
      fruta = null;
      return true;
    }
    else { 
      return false;
    }
  }


}

function Assoprar() {
  Matter.Body.applyForce(fruta, {x: 0, y: 0}, {x: 0.01, y: 0});
  air.play();
}

function Mute() {
  if (musicaDeFundo.isPlaying()) {
    musicaDeFundo.stop();
  }
  else {
    musicaDeFundo.play();
  }
}