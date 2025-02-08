
import gameproperties from "../blueprints/gameproperties";
import createUniqueObject from "../componentfunctions/createUniqueObject";
import { keyEvent, storage } from "../event/eventHandling";
import '../event/engineTick.js';
import '../../../CustomCode.js';

export const id = createUniqueObject("game", "game").id;
window.addEventListener("keydown", keyEvent);
window.addEventListener("keyup", keyEvent);
console.log(gameproperties);
console.log(storage.objectArr)
//setTimeout(() => { console.log(storage.getObjects({ range: { distance: 3 }, _type: "tile" }, { x: 3, y: 3 })); },1000)

