import gravityCheck from "../generalfunctions/gravityCheck";

export default function toggleFlying(caller,) {
    const newValue = !caller.flying;
    if (!newValue) {

    }
    return [{
        target: { id: caller.id },
        value: {
            stat: "flying",
            newValue: !caller.flying
        }
    }].concat(gravityCheck(caller, { flying: false, x: caller.x, y: caller.y, z: caller.z, tIndex: null }))
}