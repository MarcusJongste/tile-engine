import cloneObj from "../generalfunctions/cloneObj";

export default function removeTexture(caller, { texture }) {
    const t = cloneObj(caller.textures);
    const newT = t.filter(te=>te.name !== texture)
    return [{
        target: { id: caller.id },
        value: {
            stat: "_textures",
            newValue: newT,
        }
    },];
}