class Conexao{
    constructor(bodyA, bodyB){
        var ultimaconexao = bodyA.body.bodies.length-2;
        this.link = Constraint.create({
            bodyA: bodyA.body.bodies[ultimaconexao],
            pointA:{x:0,y:0},
            bodyB: bodyB,
            pointB:{x:0,y:0},
            length: -10,
            stiffness:0.01
        })
        World.add(world,this.link);
    }

    break()  { 
        World.remove(engine.world, this.link);
        
      }
}
