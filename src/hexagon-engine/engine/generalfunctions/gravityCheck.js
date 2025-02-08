import levelconstants from "../constants/levelconstant";
import { storage, tileEvent } from "../event/eventHandling";

export default function gravityCheck(caller, params) {//should be performed on move and creation
    if (!caller.gravityAffected && (!caller.flying || params.flying === false)) {
        const x = params.x === undefined ? caller.x : params.x;
        const y = params.y === undefined ? caller.y : params.y;
        const z = params.z === undefined ? caller.z : params.z;

        const targetTile = storage.getObjects({ x: Math.floor(x), y: Math.floor(y), _type: 'tile' })[0];//future will change to fetching walkingplanes
        if (targetTile !== undefined) {
            if (z > targetTile.z) {
                const { gravity } = levelconstants;
                storage.updateObject(caller, [{
                    stat: 'gravityAffected',
                    newValue: true
                }, {
                        stat: 'gravity',
                        newValue: gravity/10,
                }, {
                    stat: 'ground',
                    newValue: targetTile.z,
                    }]);

                if (params.z === undefined) {//if there's no vertical movement
                    tileEvent.call({ obj: caller, params: { tile: { x: Math.floor(x), y: Math.floor(y) } }, e: "falling" });
                }
            }
        }
    }
}