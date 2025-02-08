
import move from "../simpleActions/move";
import { keyDowns, mouseDowns, mouseHovers, mouseEvents, triggerKeyEvent, storage, executeAction, tileEvent } from "./eventHandling";
import { removeTransition, runTransition } from "./transition";
import levelconstants from '../constants/levelconstant';

export const interval = 25;
export const transitionList = [];
export const engineTickList = [checkTransition, checkHoldAction, applyGravity];
export const engineTick = setInterval(triggerTick, interval);
export let fps = 0;
let end = new Date().getTime();
function triggerTick() {
    engineTickList.forEach(f =>
        f.call(null)
    );
    getfps();
}
function getfps() {
    const newEnd = new Date().getTime();
    fps = Math.round(1000 / (newEnd - end)); 
    end = newEnd;
    
}
function applyGravity() {
    const affected = storage.getObjects({ gravityAffected: true });
    const { gravity } = levelconstants;
    affected.forEach(obj => {
        const newGravity = obj.gravity * (gravity / 100 + 1);
        const newZ = obj.z - newGravity;
        const currentGroundTile = storage.getObjects({ x: Math.floor(obj.x), y: Math.floor(obj.y), _type: 'tile' })[0];
        if (newZ > currentGroundTile.z) {
            executeAction.call({}, obj, { f: move, params: { z: newZ } });
            storage.updateObject(obj, {
                stat: 'gravity',
                newValue: newGravity
            });
        } else {
            storage.updateObject(obj, [{
                stat: 'gravityAffected',
                newValue: false
            }, {
                stat: 'gravity',
                newValue: 0,
            }, {
                stat: 'falling',
                newValue: false,
                }]);
            tileEvent.call({ obj: obj, params: { tile: { x: Math.floor(obj.x), y: Math.floor(obj.y) } }, e: "landed" });
        }
    });
}
export function toggleTransition(val) {
    const toggle = val ? val : engineTickList.includes(checkTransition);
    if (toggle) {
        engineTickList.splice(engineTickList.indexOf(checkTransition), 1);
    } else {
        engineTickList.push(checkTransition);
    }
}
function checkTransition() {
    transitionList.forEach((trans,i) => {
        const [p, step,reached] = runTransition(trans)
        trans.params = p;
        trans.step = step;
        if (reached) { removeTransition(i); }// transitionList.splice(i, 1); }
    });
}
function checkHoldAction() {
    Object.keys(keyDowns).forEach(keyCode => {
        if (keyDowns[keyCode]) { triggerKeyEvent(keyCode, 'keydown'); }
    });
    mouseDowns.forEach(objId => {
        mouseEvents.call({ id: objId, e: 'mousehold'});
    });
    mouseHovers.forEach(objId => {
        mouseEvents.call({ id: objId, e: 'hover' });
    });
}
/*function checkMove() {
    const toMove = storage.getObjects({ moving: true });
    toMove.forEach(obj => executeAction.call(null,obj,{ f: move, params: { eventType: "move" } },obj));
}*/