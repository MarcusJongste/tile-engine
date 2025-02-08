import levelconstants from "../constants/levelconstant";

export default function setOrientation(caller, { direction },returnAngleOnly = false) {
    const { rotation } = levelconstants;
    let angle = direction?Math.atan2(direction.y - caller.y, direction.x - caller.x) * (180 / Math.PI):0;
    angle = angle < 0 ? angle + 360 : angle;
    const returnOrientation = angle + rotation + caller.rotation -90;
    if (returnAngleOnly) { return returnOrientation; }
    return [{
        target: { id: caller.id },
        value: {
            stat: "orientation",
            newValue: returnOrientation,
        }
    },];
}