import { newPhase } from "../event/phaseHandling";

export default function phaseStart(caller, { phaseName }) {
    newPhase(phaseName);
}