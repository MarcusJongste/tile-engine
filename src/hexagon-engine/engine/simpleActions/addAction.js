import cloneObj from "../generalfunctions/cloneObj";

export default function addAction(caller, { action,event }) {
    if (!event) { throw new Error("cannot add action without event") }
    const currActions = cloneObj(caller.action);
    currActions[event] = currActions[event] === undefined ? [] : currActions[event];
    currActions[event].push(action);
    return [{
        target: { id: caller.id },
        value: {
            stat: "action",
            newValue: currActions,
        }
    },];
}