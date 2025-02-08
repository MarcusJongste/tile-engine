import typeIndex from "../blueprints/typeIndex";
import Texture from "../components/functionalcomponents/Texture"
import cloneObj from "../generalfunctions/cloneObj";

export default function createTextures(textures, id, action, orientation = 0) {
    return textures.map((t, index) => {
        const texture = typeof t === 'string'? cloneObj(typeIndex.texture.templates[t]):t;
        return <Texture key={t.name + "_" + id + "_" + index} {...texture} id={id} action={action}  orientation={orientation }></Texture>;
    });
}