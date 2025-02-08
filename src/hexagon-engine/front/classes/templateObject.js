import cloneObj from "../../engine/generalfunctions/cloneObj";
import { basic } from "../../engine/blueprints/blueprints";

import typeIndex from "../../engine/blueprints/typeIndex";
import { createAction } from "../generalfunctions/createFunctions";
import createUi from "../../engine/simpleActions/createUi";
export default class templateObject {
    constructor(name, stats, type) {
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
        if (!name || type.templates[name]) { throw new Error(type.name + " template creation requires a specific and unique name"); }
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
        if (!this.setObjectGameFile()) { throw new Error("failed to set object (" + this.name + ")"); };//set's object in gamefile so it's template can be grabbed and used
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
    /*-----------------------------------------
                    setAction
            input: action object to be set, trigger is event that will start action
            output: 
    -----------------------------------------*/
    setAction(a, trigger) {
        //check if createAction instance
        if (trigger) {
            if (trigger === "click") {
                this.setStat("interactive", true);
            }
            const objAction = this.getStat("action");
            if (objAction[trigger]) {
                objAction[trigger].push(a.name);
            } else {
                objAction[trigger] = [a.name];
            }
            this.setStat("action", objAction);
        }
        return this;//return this so you can chain functions
    }
    /*-----------------------------------------
                    setStat
            input: statName as string,value as whatever
            output: 
    -----------------------------------------*/
    setStat(statName, value) {
        if (Array.isArray(this[statName]) && !Array.isArray(value)) {//add to array
            const newValue = this[statName].slice();
            newValue.push(value);
            this[statName] = newValue;
        } else {
            this[statName] = value;
        }
        if (this.name && typeIndex[this._type].templates[this.name]) {//only write if name exists and template initiated
            typeIndex[this._type].templates[this.name][statName] = cloneObj(this[statName]);//updates gameFile template if this.name
        }
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
            if (Array.isArray(this[statName])) { return this[statName].slice() }
            return cloneObj(this[statName]);
        }
    }
    /*-----------------------------------------
                    setSimpleAction
            input: f as function to be executed,params as parameters to be passed
            output: 
    -----------------------------------------*/
    setSimpleAction(f, params, target = {name:"caller"}) {
        if (this.getStat("_type") === 'action') {
            //const objActions = this.getStat("actions");
            //objActions.push({ f: f, params: params,target:target});
            return this.setStat("actions", { f: f, params: params, target: target });
        }
        throw new Error("cannot set simple action on (" + this._type + ")")
    }
    /*-----------------------------------------
                    addChild
            input: (obj)ectCreation object
            output: this for chaining
    -----------------------------------------*/
    addChild(obj) {
        if (obj instanceof templateObject) {
            this.setStat("_children",cloneObj(obj));
        }
        return this;
    }
    addUi(obj) {
        const customAction = createAction("create_" + obj.name + "_" + this.name).setSimpleAction(createUi, { uiName: obj.name });
        this.addAction(customAction, "oncreate");
    }
    addDirectDependency(source, sourceStat, stat) {
        const target = typeof source === 'object' ? source : { name: source };
        this.setStat("_dependency",{
            target:  target ,
            sourceStat: sourceStat,
            stat: stat,
            type: "direct",
        });
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