import { useStat } from "./useStat";
import { storage } from "../event/eventHandling";
import changeStat from "./changeStat";
import typeIndex from "../blueprints/typeIndex";
import cloneObj from "../generalfunctions/cloneObj";

//grabs live object from storage, and blueprint and returns usestate object
// the blueprint is used to minimize footprint (component gets only props he/she needs)
export default function instantiateObject(id) {
    const storedObject = storage.getObject({ id: id });
    const obj = {};
    if (storedObject !== null) {
        //set default useStats for each component
        const defaultBlueprint = {
            id: null,
            _children: [],
            action: {},
            interactive: false,
            ui: [],
            uiOpen: [],
            textures:[],
            _parentId:null,
        };
        //combine default and specifictype blueprint
        const blueprint = Object.assign(defaultBlueprint, typeIndex[storedObject._type].blueprint);
        //set useState only required stats
        Object.keys(blueprint).forEach((k) => {
            obj[k] = useStat(storedObject[k]);
        })
        // create change function where obj is this
        const change = changeStat.bind(obj);
        //link function to stored object, this means changes to component can be triggered from js logic
        if (!storage.linkObject({ id: storedObject.id, change: change })) {
            console.log("Warning linking failed for " + obj.name.val)
        }
        //trigger onCreate function for obj
        storage.onCreate(storedObject);
        //return usestat functions
        return obj;
    }
    throw new Error("unable to find object in storage (" + id + ")");
}

