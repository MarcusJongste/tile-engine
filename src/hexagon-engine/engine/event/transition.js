import cloneObj from "../generalfunctions/cloneObj";
import { transitionList } from "./engineTick";
import { executeAction } from "./eventHandling";

//setTransition(f, params, target, caller, modifiers, mod);
export function setTransition(action, params, target, caller, mod) {
    if (transitionList.filter(trans => trans.action === action && trans.target === target && trans.mod === mod).length === 0) {
        transitionList.push({ action: action, params: params, target: target, caller: caller, step: createSteps(params, mod.v, mod.t, mod.steps), tIndex: transitionList.length });
    }
}
export function removeTransition(i) {
    transitionList.splice(i, 1);
}
export function runTransition({ action, params, target, caller, modifiers, step,tIndex }) {
    const [ p,newStep, targetReached ]= setTransitionParams(caller,params,step,tIndex);
    executeAction.call({}, target, { f: action, params: p });

    return [p,newStep,targetReached];
}
function setTransitionParams(caller,params, step,tIndex) {
    const returnParams = cloneObj(params);
    returnParams.tIndex = tIndex;//passing transition index if a simple action needs to cancel the transition
    const newStep = cloneObj(step);
    let reached = false;
    newStep.totalSteps.done++;
    if (Array.isArray(newStep.step)) {
        let [rp,arrStep, reached] = setTransitionParams(params, { step: newStep.step[step.tIndex], target: newStep.target[newStep.tIndex] });
        if (reached) {
            if (newStep.tIndex < newStep.step.length-1) {
                newStep.tIndex = newStep.tIndex + 1;
                newStep.totalSteps = { total: newStep.step[newStep.tIndex], done: 0 };
                reached = false;
            }
        }
        return [rp, newStep, reached];
    }
    if (typeof newStep.step === 'object') {
        Object.keys(newStep.step).forEach(k => {
            const current = params[k] !== undefined ? params[k] : caller[k];
            const [target, tr] = verifyTransitionEnd(newStep.step[k], current, newStep.target[k], newStep.totalSteps);
            reached = tr ? true : reached;
            returnParams[k] = target;
        });
       // verifyTileEvents(returnParams, t);
    }

    return [returnParams,newStep,reached];
}
function verifyTransitionEnd(step, current, target,frames) {
    if (typeof current === 'number' && typeof target === 'number') {
        const distance = target - current;
        if (distance > step && step < 0) { return [target, true] }
        if (distance < step && step > 0) { return [target, true] }

        return [current + step, false];
    }
    if (typeof current === 'boolean' && typeof target === 'boolean') {
        if (frames.total === frames.done) { return [target, true]; }
        return [step, false];
    }
    return [target, false];
}
function createSteps(p,currentV, targetV, steps) {
    const returnSteps = {
        step: null,
        target: null,
        tIndex:0
    };
    if (Array.isArray(targetV)) {//multiple transitions
        returnSteps.step = [];
        returnSteps.target = [];
        targetV.forEach((tv, i) => {
            const st = i === 0 ? createSteps(p, currentV, tv, steps[i]) : createSteps(p,targetV[i-1],tv,steps[i]);
            returnSteps.step.push(st.step);
            returnSteps.target.push(st.target);
        });
        return returnSteps;
    }
    if (typeof currentV === 'object') {//for each key (first trigger)
        returnSteps.step = {};
        returnSteps.target = {};
        returnSteps.totalSteps = { total: steps, done: 0 };
        Object.keys(currentV).forEach(k => {
            const createdData = createSteps(p,currentV[k], targetV[k], steps)
            returnSteps.step[k] = createdData.step;
            returnSteps.target[k] = createdData.target;

        });
    } else {//when not multiple keys
        const cv = typeof currentV === 'string' ? p[currentV] : currentV;
        const tv = typeof targetV === 'string' ? p[targetV] : targetV;
        if (typeof cv === 'number' && typeof tv === 'number') {
            const distance = tv - cv;
            returnSteps.step = distance / steps;
            returnSteps.target = tv;
        }
        if (typeof cv === 'boolean' && typeof tv === 'boolean') {
            returnSteps.step = cv;
            returnSteps.target = tv;
        }
    }
    return returnSteps;
}