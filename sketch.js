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

function preload()  {
  backgroundImg = loadImage("background.png");
  watermelon = loadImage("melon.png");
  coelho = loadImage("Rabbit-01.png");
}

function setup() {
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;
 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50);

  coelhoSpr = createSprite(250, 590, 100, 100);
  coelhoSpr.addImage(coelho);
  coelhoSpr.scale = 0.3;

  botao = createImg("cut_button.png");
  botao.position(220, 30);
  botao.size(50, 50);
  botao.mouseClicked(Break);

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
  image(watermelon,fruta.position.x, fruta.position.y, 65, 65);

  drawSprites();
}


function Break() {
  conexao.break();
  rope.break();
  conexao = null;
}
