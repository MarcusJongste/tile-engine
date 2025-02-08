import { actions, simpleactions } from "../../engine/blueprints/templates";
import cloneObj from "../generalfunctions/cloneObj";
import gameproperties from "../blueprints/gameproperties";
import relatedObjectStorage from "../classes/relatedObjectStorage";
import { applyParamModifiers, applyTargetModifiers } from "./modifiers";

export const storage = new relatedObjectStorage([{ name: "x", floor: true }, { name: "y", floor: true }, { name: "z", floor: true }, "_type", "pos","uiOpen", "animated","gravityAffected"]);
export const playerEvents = ["click", "mouseenter", "mouseleave", "keypress","keydown"];
export const keyDowns = { };
export const mouseDowns = [];
export const mouseHovers = [];

function triggerAction(obj, { f, params }) {
    const returnProp = f.call(null,obj, params);
    return returnProp ? returnProp : [];
}


export function keyEvent(e) {
    const keyCode = e.keyCode;
    if (e.type === 'keydown') {
        if (!e.repeat) {
            keyDowns[keyCode] = true;
            triggerKeyEvent(keyCode, 'keypress');
        } 
        triggerKeyEvent(keyCode, 'keydown');
    }
    if (e.type === 'keyup') {
        keyDowns[keyCode] = false;
        triggerKeyEvent(keyCode, 'keyrelease');
    }
}
export function triggerKeyEvent(keyCode, keyevent) {
    const a = gameproperties._keyEvents[keyevent][keyCode];
    if (a) {
        a.forEach(aObj => {
            const target = storage.getObject(aObj.target);
            if(target) {
                event.call({ obj: target, action: target.action[keyevent+'_'+keyCode], e: keyevent });
            }
        });
    }
}
export function tileEvent() {
    const tile = storage.getObjects(this.params.tile);
    if (tile.length === 1) {
        if (tile[0].action[this.e]) {
            event.call({ obj: tile[0], action: tile[0].action[this.e], e: this.e, params: { obj: this.obj } })
        }
    } else {
        if (this.obj.action.outofbounds) {
            event.call({ obj: this.obj, e: "outofbounds", action: this.obj.action.outofbounds });
        }
    }
    if (this.obj.action[this.e]) {
        event.call({obj:this.obj,e:this.e,action:this.obj.action[this.e],params:this.params})
    }
}
export function mouseEvents(e) {
    const mDownIndex = mouseDowns.findIndex((i) => i === this.id);
    const mHoverIndex = mouseHovers.findIndex((i) => i === this.id);
    const obj = storage.getObject(this);
    if (this.e === 'mousewheel') {
        this.e = e.deltaY > 0 ? 'mousewheeldown' : 'mousewheelup'
    }
    if (obj.action[this.e]) { event.call({obj:obj,e:this.e,action:obj.action[this.e]}) }
    if (this.e === 'click') {
        if (mDownIndex === -1) {
            mouseDowns.push(this.id);
        }
    }
    if (this.e === 'mouseup') {
        if (mDownIndex !== -1) {
            mouseDowns.splice(mDownIndex, 1);
        }
    }
    if (this.e === 'mouseover') {
        if (mHoverIndex === -1) {
            mouseHovers.push(this.id);
        }
    }
    if (this.e === 'mouseleave') {
        if (mHoverIndex !== -1) {
            mouseHovers.splice(mHoverIndex,1);
        }
    }
}
export function event() {//start trigger
    const caller = this.obj ? this.obj : storage.getObject({ id: this.id });
    getActionList(this.action,this.e, caller);
}
function getActionList(action,e,caller) {//gets and starts the list of simple actions
    const actionList = returnAllActions(action);
    for (let a = 0; a < actionList.length; a++) {
        actionList[a].target = applyTargetModifiers(caller,actionList[a]);
        if (!getExecuteTargets( actionList[a], e, caller)) {
            break;
        }
    }
}
function getExecuteTargets({ target, f, params,modifiers },event, caller) {//gets the targets for simple action and triggers simple action
    const targets = storage.getObjects(target, caller);
    const p = Object.assign(params, { eventType: event });
    for (let t = 0; t < targets.length; t++) {
        if (!executeAction(targets[t], applyParamModifiers(caller, { target: targets[t], f: f, modifiers: modifiers, params: p }))) {// modifiers,targets[t],caller)}, caller)) {
            return false;
        }
    }
    return true;
}
export function executeAction(target,action,caller) {
    const changes = triggerAction(target, action);
    for (let c = 0; c < changes.length; c++) {
        if (changes[c].continue !== undefined && !changes[c].continue) {
            if (caller.action.onactionfail) { event.call({ obj: caller, action: caller.action.onactionfail, e: "onactionfail", params: { failedAction: action, failedTarget: target } }); }
            return false;
        }
        executeChange(changes[c], caller);
    }
    return true;

}
export function executeChange({ target, value },caller) {
    if (target) { return storage.updateObjects(target, value, caller) }
    return false;
}
function returnAllActions(actionArr) {//returns one array containing all actions simple actions
    const returnArr = [];
    actionArr.forEach(action => {
        if (action) {
            const actionList = typeof action ==='string'? cloneObj(actions[action].actions):action;//possibility to trigger single simple actions
            if (actionList && actionList.length > 0) {
                actionList.forEach(a => returnArr.push(simpleactions[a]));
            }
        }
    });
    return returnArr;
}


