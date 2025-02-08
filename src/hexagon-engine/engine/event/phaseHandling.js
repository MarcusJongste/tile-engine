import { phases } from "../blueprints/templates";
import cloneObj from "../generalfunctions/cloneObj";
import { event, storage } from "./eventHandling";

export const phaseHistory = [];
let currentPhase = null;
export function newPhase(phaseName) {
    triggerPhaseEvents(phaseHistory[currentPhase],'phaseend');
    phaseHistory.push(cloneObj(phases[phaseName]));
    currentPhase = phaseHistory.length;
    triggerPhaseEvents(phaseHistory[currentPhase], 'phasestart');
}

function triggerPhaseEvents(phase,e) {
    if (phase.action[e]) { event.call({ obj: phase, action: phase.action[e], e: e }) }
    phase.enabledObjects.forEach(e => {
        storage.getObjects(e).forEach(o => {
            if (o.action[e]) { event.call({obj:o,action:o.action[e],e:e}) }
        })
    })
}