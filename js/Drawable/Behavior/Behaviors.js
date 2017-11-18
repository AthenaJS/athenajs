import GroundMove from './GroundMove';
import SimpleFall from './SimpleFall';
import PlayerMove from './PlayerMove';
import InOut from './InOut';
import Path from './Path';
import WeaponMove from './WeaponMove';

/*jshint devel: true, bitwise: false*/
let behaviors = {};

class Behaviors {
    constructor() { }

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
