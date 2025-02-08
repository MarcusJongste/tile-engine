import gameproperties from "../blueprints/gameproperties";
import cloneObj from "../generalfunctions/cloneObj";
import { setTransition } from "./transition";

export function applyTargetModifiers(caller, { modifiers, target, f, params }) {
    return applyModifiers(target, modifiers.target, target, caller);
}
export function applyParamModifiers(caller, { modifiers, target, f, params }) {
    return { f: f, target: target, params: applyModifiers(params, modifiers.params, target, caller,f) };
}
function applyModifiers(params, modifiers, target, caller,f) {
    let newParams = cloneObj(params);
    //const mod = params.modifications;
    modifiers.forEach(mod =>{
        switch (mod.type) {
            case "calc":
                newParams[mod.name] = calcModification(mod, newParams);
                break;
            case "set":
                newParams[mod.name] = getValueModification(mod, newParams, target, caller);
                break;
            case "limit":
                newParams[mod.name] = getValueLimit(mod,newParams);
                break;
            case "transition":
                newParams[mod.name] = setTransition(f, newParams, target, caller, mod);
                break;
            default:
                throw new Error("Unknown Modification triggered (" + mod.type + ")");
        }
    });
    return newParams

}
function getValueLimit(mod,params) {
    let value = typeof mod.v === 'string' ? params[mod.v] : mod.v;// applyModifiers({}, mod.v, target, caller)[mod.name];
    if (mod.min) { value = value < mod.min ? mod.min : value; }
    if (mod.max) { value = value > mod.max ? mod.max : value; }
    return value;
}
function getValueModification(mod, params,target = null, caller = null) {
    //if (Array.isArray(params[mod.sourceStat])) { return applyModifiers({}, mod.source, target, caller)[mod.name]; }//modifier applied on value to set
    if (mod.source === 'target') { return target === null ? mod : target[mod.sourceStat]; }
    if (mod.source === 'targetcustom') { return target === null ? mod : target.customstats[mod.sourceStat]; }
    if (mod.source === 'caller') { return caller === null ? mod : caller[mod.sourceStat]; }
    if (mod.source === 'callercustom') { return caller === null ? mod : caller.customstats[mod.sourceStat]; }
    if (mod.source === 'level') { return gameproperties.levelconstants[mod.sourceStat]; }
    if (mod.source === 'levelcustom') { return gameproperties.customstats[mod.sourceStat]; }
    throw new Error("Cannot apply value from Modificaction Unknown source (" + mod.source + ")");
}
function calcModification(mod,params) {
    const a = typeof mod.a === 'string' ? params[mod.a]: mod.a;
    const b = typeof mod.b === 'string' ? params[mod.b] : mod.b;

    switch (mod.calc) {
        case "add":
            return a + b;
        case "subtract":
            return a - b;
        case "multiply":
            return a * b;
        case "divide":
            return a / b;
        default:
            throw new Error("unknown calculation requested (" + mod.calc + ")");

    }
}