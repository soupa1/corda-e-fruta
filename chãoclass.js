class Chao {
    constructor(posx,posy,l,a) { 
        var config = {isStatic : true};
        this.body = Bodies.rectangle(posx,posy,l,a,config);
        this.l = l;
        this.a = a;
        World.add(world, this.body);
    }

    draw() {
        var pos = this.body.position;
        push();
        rectMode(CENTER);
        noStroke();
        fill(148,127,146);
        rect(pos.x,pos.y,this.l,this.a);
        pop();

    }
}