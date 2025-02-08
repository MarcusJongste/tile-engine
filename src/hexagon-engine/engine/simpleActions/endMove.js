import { removeTransition } from "../event/transition";

export default function endMove(caller, { tIndex }) {
    if (tIndex !== undefined) {
        removeTransition(tIndex);
    }
    return [{
        target: { id: caller.id },
        value: [{
            stat: "x",
            newValue: caller.x
        }, {
                stat: "y",
                newValue: caller.y
            }, {
                stat: "z",
                newValue: caller.z
            }]
    }];
}