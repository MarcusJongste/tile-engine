import { storage } from "../../event/eventHandling";

//function loops through defined layers and see which criteria this obj matches then returns it.
export default function matchObjectToLayer(obj) {
    const layer = storage.getObjects({ _type: 'layer' }).filter(l => {
        return !Object.keys(l.criteria).map(c => {
            if (Array.isArray(l.criteria[c])) { return obj[c] !== undefined && l.criteria[c].includes(obj[c]) }
            return obj[c] !== undefined && obj[c] === l.criteria[c];
        }).includes(false); 
    });
    if (layer.length === 1) { return layer[0] }
    throw new Error("missing layer ("+obj.name+")")
}