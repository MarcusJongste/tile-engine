import cloneObj from "../generalfunctions/cloneObj";
import { storage } from "../event/eventHandling";
//templates
import typeIndex from "../blueprints/typeIndex";
import { basic } from "../blueprints/blueprints";
import setOrientation from "../simpleActions/setOrientation";


export default function createUniqueObject(name, _type, stats = {}) {//grabs template and creates object and adds it to storage
    const template = fetchTemplate(name, _type);
    const obj = Object.assign(template, stats);
    if (obj !== null) {
        obj.textures = obj.textures.map(t => cloneObj(typeIndex.texture.templates[t]));
        if (obj.depthTexture) {
            obj.depthTexture = obj.depthTexture.map(t => cloneObj(typeIndex.texture.templates[t]));
        }
        obj.orientation = obj.orientation === null ? setOrientation(obj, {}, true) : obj.orientation;

        obj.id = storage.addObject(obj);
    }
    return obj;
}
function fetchTemplate(name, _type) {
    const type = typeIndex[_type];
    //return template and basic stats
    const template = type.templates[name] ? cloneObj(type.templates[name]) : null;
    const blueprint = Object.assign(cloneObj(basic), cloneObj(type.blueprint), { name: _type + "_" + storage.objectArr.length });
    //return [template,blueprint];
    return template ? template : blueprint;//type.templates[name] ? cloneObj(type.templates[name]) : Object.assign(cloneObj(basic), cloneObj(type.blueprint), { name: _type + "_" + storage.objectArr.length });
}

