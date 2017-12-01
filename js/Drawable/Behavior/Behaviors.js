import GroundMove from './GroundMove';
import SimpleFall from './SimpleFall';
import PlayerMove from './PlayerMove';
import InOut from './InOut';
import Path from './Path';
import WeaponMove from './WeaponMove';

/*jshint devel: true, bitwise: false*/
let behaviors = {};

/**
 * This class keeps track of all behaviors available for the game.
 */
class Behaviors {
    /**
     * Creates the Behaviors class
     */
    constructor() { }

    /**
     * Adds a new behavior which will be available for the game
     * 
     * @param {String} behaviorName The name of the behavior.
     * @param {Function} BehaviorClass The Behavior Class to add.
     */
    addBehavior(behaviorName, BehaviorClass) {
        behaviors[behaviorName] = BehaviorClass;
    }

    /**
     * Retrieves a behavior using its name
     * 
     * @param {String} behaviorName The name of the behavior to get.
     * 
     * @returns {Behavior} The Behavior Class or undefined.
     */
    getBehavior(behaviorName) {
        return behaviors[behaviorName];
    }
}

let inst = new Behaviors();

/*
By default these are the built in Behaviors: a game can add any number
of behaviors that can be re-used by all Drawables.
*/
inst.addBehavior('ground', GroundMove);
inst.addBehavior('inout', InOut);
inst.addBehavior('simplefall', SimpleFall);
inst.addBehavior('weapon', WeaponMove);
inst.addBehavior('player', PlayerMove);
inst.addBehavior('path', Path);

export default inst;
