import { levels, tiles } from "../blueprints/templates";
import levelconstants from "../constants/levelconstant";
import createUniqueObject from "../componentfunctions/createUniqueObject";
import cloneObj from "../generalfunctions/cloneObj";

export default function setLevel(caller, { levelName }) {
    let newLevelConstants = cloneObj(levels[levelName]);
    let { layout,  isometric, _objects } = newLevelConstants;
    const updates = [];
   layout = layout.map((y, yPos) => {
        return y.map((x, xPos) => {
            const hexagon = getHexagonStats(x, {
                x: xPos+0.5,
                y: yPos+0.5,
                _unique: false,
            });
            if (!isometric) {hexagon.z = 0 }
            if (hexagon != null) { updates.push(hexagon) };
            return hexagon;
        });

    });
    _objects = _objects.map(o => {
        const z = layout[Math.floor(o.stats.y)] && layout[Math.floor(o.stats.y)][Math.floor(o.stats.x)] ? layout[Math.floor(o.stats.y)][Math.floor(o.stats.x)].z : o.stats.z;
        const uniqueObj = createUniqueObject(o.name, 'gameobject', Object.assign(o.stats, { z: z }))
        updates.push(uniqueObj);
        return uniqueObj;
    });
    newLevelConstants._objects = _objects;
    newLevelConstants.layout = layout;
    return [{
        target: { name: "game" },
        value: [{
            stat: '_objects',
            newValue: updates
        }, {
            stat: 'levelconstants',
            newValue: newLevelConstants
        }]
    }];
}
function getHexagonStats(tileName, stats) {
    return tileName && tiles[tileName] ? createUniqueObject(tileName, "tile", stats) : null;// createUniqueObject(null, "tile", Object.assign(stats, { _type: 'emptyTile' }));
}
