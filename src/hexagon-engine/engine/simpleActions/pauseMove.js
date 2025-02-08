import { toggleTransition } from "../event/engineTick";
import pauseAnimation from "./pauseAnimation";

export default function pauseMove(caller, {target }) {
    console.log("pause Move");
    toggleTransition();
    return pauseAnimation(caller, { target: target });
}
