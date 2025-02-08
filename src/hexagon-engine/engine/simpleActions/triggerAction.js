import { event } from "../event/eventHandling";

export default function triggerAction(caller, { eventType }) {
    if (!eventType) { throw new Error("cannot add action without event") }
    event.call({ obj: caller, action: caller.action[eventType], e: eventType });
    return [];
}