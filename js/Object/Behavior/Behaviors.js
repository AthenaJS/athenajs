import GroundMove from 'Object/Behavior/GroundMove';
import SimpleFall from 'Object/Behavior/SimpleFall';
import PlayerMove from 'Object/Behavior/PlayerMove';
import InOut from 'Object/Behavior/InOut';
import Path from 'Object/Behavior/Path';
import WeaponMove from 'Object/Behavior/WeaponMove';
 
    /*jshint devel: true, bitwise: false*/   
    let behaviors = {};

    class Behaviors {
        constructor() {}
        
        addBehavior(behaviorName, moveFn) {
            behaviors[behaviorName] = moveFn;
        }

        getBehavior(behaviorName) {
            return behaviors[behaviorName];
        }
    };
    
    let inst = new Behaviors();

    inst.addBehavior('ground', GroundMove);
    inst.addBehavior('inout', InOut);
    inst.addBehavior('simplefall', SimpleFall);
    inst.addBehavior('weapon', WeaponMove);
    inst.addBehavior('player', PlayerMove);
    inst.addBehavior('path', Path);

    export default inst;
