import levelconstants from "../constants/levelconstant";
import { storage } from "../event/eventHandling";
import cloneObj from "../generalfunctions/cloneObj";

export default function pauseAnimation(caller, { target }) {
    if (target) {
        const t = storage.getObject(target);
        return [{
            target: target,
            value: {
                stat: "animated",
                newValue: !t.moving
            }
        }];
    }
    const newLC = cloneObj(levelconstants);
    newLC.gamespeed = newLC.gamespeed === 0 ? newLC._gamespeed : 0;
    return [{
        target: { name: "game" },
        value: {
            stat: "levelconstants",
            newValue: newLC
        }
    }];

}
