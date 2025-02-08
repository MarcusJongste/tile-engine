import gameproperties from "../blueprints/gameproperties";
//easy readability, no need to load whole gameproperty into places..
const levelconstants = gameproperties.levelconstants;

export function updatelevelconstant(newLC) {
    Object.keys(newLC).forEach(k => {
        if (levelconstants[k] !== newLC[k]) {
            levelconstants[k] = newLC[k]
        }
    });
}

export default levelconstants;