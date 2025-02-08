import { event } from "../event/eventHandling";
import matchObjectToLayer from "./additionalFunctions/matchObjectToLayer";

export default function removeObj(caller, {}){
    const layer = matchObjectToLayer(caller);
    if (caller.action.onremove) { event.call({ obj: caller, action: caller.action.onremove, e: "onremove" }); }
    return [{
        target: { name: layer.name },
        value: {
            stat: "_objects",
            newValue: layer._objects.filter(item => item.id === caller.id),
        },
    }]
}