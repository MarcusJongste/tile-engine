import { event } from "../event/eventHandling";

export default function validateStat(caller, { valueA, comp, valueB,actionTrue,actionFalse }) {
     switch (comp) {
        case "morethen":
            if (typeof valueA !== 'number' || typeof valueB !== 'number') { return [] }
            return valueA > valueB ? triggerEvent(caller, actionTrue) : triggerEvent(caller, actionFalse);
        case "lessthen":
            if (typeof valueA !== 'number' || typeof valueB !== 'number') { return [] }
            return valueA < valueB ? triggerEvent(caller, actionTrue) : triggerEvent(caller, actionFalse);
        case "equals":
             return valueA === valueB ? triggerEvent(caller, actionTrue) : triggerEvent(caller, actionFalse);
         case "contains":
             if (typeof valueA !== 'string' || typeof valueB !== 'string') { return [] }
             return valueA.contains( valueB) ? triggerEvent(caller, actionTrue) : triggerEvent(caller, actionFalse);
         default:
            throw new Error("wrong comparison passed (" + comp + ")");
    }
}
function triggerEvent(obj,action){
    event.call({ obj: obj, e: 'validated', action: { validated: [action] } });

}