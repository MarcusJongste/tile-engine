import typeIndex from "../blueprints/typeIndex";
import cloneObj from "../generalfunctions/cloneObj";

export default function addTexture(caller, { texture }) {
    const t = cloneObj(typeIndex.texture.templates[texture]);
    return [{
        target: { id: caller.id },
        value: {
            stat: "_textures",
            newValue: caller._textures.concat(t),
        }
     },];
}