import levelconstants from "../constants/levelconstant";
import { event, storage, tileEvent } from "../event/eventHandling";
import { removeTransition, setTransition } from "../event/transition";
import  gravityCheck  from "../generalfunctions/gravityCheck";
import endMove from "./endMove";


export default function move(caller, params) {
    /*-------------------------------------------
    if z passed in targetlocation we consider object "flying" and will calculate a descending or ascending flight. otherwise zdifference tile event will be triggered
    if the event passes no issues we use levelconstant fallspeed to descend or objects climbspeed to ascend. if climbspeed is null we cancel move

    1. check if target is new or we use target from caller
       a: if new create target for caller
    2. calc distance x,y,z
    3. calc step size based on distance and speed
    4. check if new step would enter new tile
    5. check if new tile is on different z (if z is not passed in targetlocation)
    6. add step
    7. trigger tile events if needed.

    */
   // if (params.eventType !== 'move') { return addTarget(createTargetDetails(caller, params),caller.id); }//reset targetDes if not move the event.
    //if paused don't move
    if (levelconstants.pause) { return []; }
    //check if targetlocation is already reached
    //const reached = reachedDestination(caller);
    //if (reached) { return addTarget(reached,caller.id); }

    //calc step
    return addTarget(step(caller,params), caller.id);
}
function addTarget(updates,id) {
    return [{
        target: { id: id },
        value:updates
    }]
}
function tileTransfer(caller,newPos) {
    const { x, y, z } = caller;
    //call tile transfer events
    tileEvent.call({ obj: caller, params: { tile: { x: Math.floor(x), y: Math.floor(y) } }, e: "tileleave" });
    tileEvent.call({ obj: caller, params: { tile: { x: Math.floor(newPos.x), y: Math.floor(newPos.y) } }, e: "tileenter" });
}
function collissionCheck(caller, params) {
    if (params.z === undefined && (!caller.flying || params.flying === false)) {
    const targetTile = storage.getObjects({ x: Math.floor(params.x), y: Math.floor(params.y), _type: 'tile' })[0];
        if (targetTile !== undefined) {
            //rising
            if (caller.z < targetTile.z) {
                tileEvent.call({ obj: caller, params: { tile: { x: Math.floor(params.x), y: Math.floor(params.y) } }, e: "tilerise" });
                //end move if higher the tile
                return endMove(caller, { tIndex: params.tIndex });
            }
        } else {
            tileEvent.call({ obj: caller, params: { tile: { x: Math.floor(params.x), y: Math.floor(params.y) } }, e: "outofbounds" });
            if (!caller.outofbounds) { return endMove(caller, { tIndex: params.tIndex }); }
        }
    }
    return [];
}
function step(caller, params) {
    const { x, y, z, eventType, tIndex } = params;
    const newPos = {
        x: x !== undefined ? x : caller.x,
        y: y !== undefined ? y : caller.y,
        z: z
    };
    const collission = collissionCheck(caller, newPos);
    if (collission.length) { return collission; }
    newPos.z = newPos.z === undefined ? caller.z : newPos.z;
    //set facing direction, if no y or x movement then don't change facing direction
    const orientation = params.y === undefined && params.x === undefined ? caller.orientation:Math.atan2(newPos.y - caller.y, newPos.x - caller.x) * (180 / Math.PI);
    const newPosUpdate = [{
        stat: "x",
        newValue: newPos.x
    }, {
        stat: "y",
        newValue: newPos.y 
    }, {
        stat: "z",
        newValue: newPos.z 
    }, {
        stat: "direction",
        newValue: orientation
        }];
    gravityCheck(caller, newPos);
    if (caller.z - newPos.z - caller.gravity <= 0 && !caller.falling) {
        tileEvent.call({ obj: caller, params: { tile: { x: Math.floor(x), y: Math.floor(y) } }, e: "falling" });
    }
    if (eventType !== 'tileenter' && eventType !== 'tileleave') {
        if (Math.floor(newPos.x) !== Math.floor(caller.x) || Math.floor(newPos.y) !== Math.floor(caller.y)) {
            tileTransfer(caller, newPos,tIndex);
        }
    }
    
    return newPosUpdate;
}
