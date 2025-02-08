import cloneObj from "../../engine/generalfunctions/cloneObj";
import { basic } from "../../engine/blueprints/blueprints";
import typeIndex from "../../engine/blueprints/typeIndex";
import actionObjectTemplate from "./actionObjectTemplate";
import setRelation from "../../engine/simpleActions/setRelation";
import gameproperties from "../../engine/blueprints/gameproperties";
export default class baseTemplateObject {
    constructor(name, stats = {},type) {
        if (!name) {throw new Error("Missing template name") }
        this.verifyTemplateCreation(name, typeIndex[type]);
        this.init(type, name);
        this.addStats(stats);
    }
    /*-----------------------------------------
                    verifyTemplateCreation
            input: name as string, type as string 
            output: true if not error
    -----------------------------------------*/
    verifyTemplateCreation(name, type) {
        if (!type) { throw new Error("Incompatible type passed"); }
        if (!name || type.templates[name]) { throw new Error(name+ " template creation requires a specific and unique name"); }
        return true;
    }
    /*-----------------------------------------
                    init
            input: name as string, type as string 
            output: grabs the blueprint and basic
    -----------------------------------------*/
    init(type, name) {//initialises the obj by passing blueprints and stats and attach them to this.
        this.addStats(cloneObj(basic));
        this.addStats(cloneObj(typeIndex[type].blueprint));
        this.setStat("name", name);
        
    }
    /*-----------------------------------------
                    addStats
            input: stats as object
            output: true if successfull false if not
    -----------------------------------------*/
    addStats(stats) {
        if (typeof stats === 'object' && !Array.isArray(stats)) {//needs to be obj 
            Object.keys(stats).forEach((k) => {
                this.setStat(k, stats[k]);
            });
            return true;
        }
        return false;
    }
    /*-----------------------------------------
                setObjectGameFile
        input: 
        output: true if successfull false if not
-----------------------------------------*/
    setObjectGameFile() {//sets object in gamefile as template
        if (typeIndex[this._type].templates && !typeIndex[this._type].templates[this.name]) {//if template does not already exist
            typeIndex[this._type].templates[this.name] = this;
            return true;
        }
        return false;
    }
    updateObjectGameFile(statName, value) {
        this[statName] = value;
        if (statName === 'name') {//name change of template
            if (this.name && typeIndex[this._type].templates[this.name]) { delete typeIndex[this._type].templates[this.name]; }//delete template
            if (!this.setObjectGameFile()) { throw new Error("failed to set object (" + this.name + ")"); }
        }
        if (this.name) {
            if (typeIndex[this._type].templates[this.name]) {//only write if name exists and template initiated
                typeIndex[this._type].templates[this.name][statName] = cloneObj(value);//updates gameFile template if this.name
            }
        }
        return this;
    }
    /*-----------------------------------------
                setStat
        input: statName as string,value as whatever
        output: 
-----------------------------------------*/
    setStat(statName, value) {
        const stat = this.getStat(statName);
        if (Array.isArray(stat)) {
            if (!Array.isArray(value)) {//add value to array
                stat.push(value);
                return this.updateObjectGameFile(statName, stat);
            }
            return this.updateObjectGameFile(statName, stat.concat(value));
        }
        if (stat !== null && typeof stat === 'object'  && typeof value === 'object') {//add object to object
            return this.updateObjectGameFile(statName,Object.assign(stat, value));
        }
        return this.updateObjectGameFile(statName,value);//update string,number/etc
    }
    /*-----------------------------------------
                addReference
        input: when the reference could be another object
        output: this
-----------------------------------------*/
    addReference(stat, ref) {
        if (Array.isArray(ref)) {
            ref.map(r => this.addReference(stat, r));
            return this;
        }
        const name = typeof ref === 'object' ? ref.name : ref;
        this.setStat(stat, name);
        return this;
    }
    /*-----------------------------------------
                   getStat
           input: statName as string
           output: value of stat (cloned,sliced)
   -----------------------------------------*/
    getStat(statName) {
        if (typeof this[statName] !== 'object') {
            return this[statName];
        } else {
            if (Array.isArray(statName)) {
                let stat = cloneObj(this);
                statName.forEach(s => stat = stat[s]);
                return stat;
            }
            if (Array.isArray(this[statName])) { return this[statName].slice() }
            return cloneObj(this[statName]);
        }
    }
    addKeyEvent(action, trigger, keyCode) {
        if (gameproperties._keyEvents[trigger][keyCode] === undefined) {
            gameproperties._keyEvents[trigger][keyCode] = [];
        }
        gameproperties._keyEvents[trigger][keyCode].push({ target: { name: this.getStat('name') }, action: action.name });

        this.addAction(action, trigger+'_'+keyCode);
        return this;
    }
    addAction(action, trigger) {
        //if (!this.validateTrigger(trigger)) { throw new Error("Incorrect trigger used"); }
        if (trigger === "click" || trigger === "mousewheeldown" || trigger === "mousewheelup" || trigger === "mouseover" || trigger === "mouseleave" || trigger === "mousehold" || trigger === "hover") {
            this.setStat("interactive", true);
        }
        const objAction = this.getStat("action");
        if (objAction[trigger]) {
            objAction[trigger].push(action.name);
        } else {
            objAction[trigger] = [action.name];
        }
        this.setStat("action", objAction);
        return this;
    }
    validateTrigger(trigger) {
        switch (trigger) {
            case "oncreate":
            case "click":
            case "onmouseenter":
            case "onmouseleave":
            case "tileenter":
            case "tileleave":
            case "tilefall":
            case "tilerise":
            case "onland":
            case "outofbounds":
            case "animationend":
            case "animationstart":
            case "ondestroy":
            case "phasestart":
            case "phaseend":
            case "pathend":
            case "onremove":
            case "keydown":
            case "keypress":
            case "keyrelease":
                return true;
            default:
                return false
        }
    }
    addRelation(source, sourceStat, stat) {
        const sourceTarget = typeof source === 'string' ? { name: source }:source;
        const a = new actionObjectTemplate(sourceStat + "_relation" + source.id);
        a.addSimpleAction(setRelation, { source: sourceTarget, target: { name: this.getStat("name") }, sourceStat: sourceStat, targetStat: stat },);
        this.addAction(a, "oncreate");
        return this;
    }
    addCreateDependency(source, sourceStat, stat, template) {
        const target = typeof source === 'object' ? source : { name: source };
        this.setStat("_dependency", {
            target: target,
            sourceStat: sourceStat,
            stat: stat,
            template: template,
            type: "create",
        });
        return this;
    }
}