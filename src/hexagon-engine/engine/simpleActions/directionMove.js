
import levelconstants from "../constants/levelconstant";
import move from "./move";

export default function directionMove(caller, { direction, amount }) {
    const { rotation } = levelconstants;
    const xCord = Math.cos((direction-rotation) * (Math.PI/180 )) * amount + caller.x;//direction should be percentage so for example 0.5 x and 0.5 y will move half speed right and half speed down
    const yCord = Math.sin((direction-rotation) * (Math.PI/180)) * amount + caller.y;
    return move(caller,  { x: xCord, y: yCord });
 
}