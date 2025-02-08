import cloneObj from "../generalfunctions/cloneObj";

export default function removeAction(caller, { action, event }) {
    if (!event) { throw new Error("cannot remove action without event") }
    const currActions = cloneObj(caller.action);
    if (!currActions[event]) { throw new Error("cannot remove action without an existing event") }
    currActions[event] = currActions[event].filter(a=> a !==action);
    return [{
        target: { id: caller.id },
        value: {
            stat: "action",
            newValue: currActions,
        }
    },];
}